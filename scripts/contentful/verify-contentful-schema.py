"""
Verifies the app's real Contentful queries against a live environment's
current schema, using only Python's standard library — no Node/pnpm needed.

Why this exists: `pnpm build` (`next build`) never actually calls these
queries — the catch-all route (src/app/(app)/[[...slug]]/page.tsx) has no
`generateStaticParams`, so it's fully dynamic and rendered per request, not
at build time. A green build proves the code compiles, not that a given
environment's live schema still supports what the code queries. Unit/E2E
tests can't catch this either — they run against MSW-mocked fixtures that
always match whatever the adapters expect, regardless of a real
environment's actual schema. `pnpm contentful:setup` (the script that pushes
this repo's schema to Contentful) has historically only ever targeted the
`development` environment, so `production` silently drifted out of sync
with it and 500'd in production before this check existed.

Rather than hand-copying the app's GraphQL queries into Python (a second
copy that could drift from the real one on its own), this reads the
already-generated `contentful-sdk.generated.ts` — the artifact
`graphql-codegen` produces from the real `.graphql` source files — and
resolves its `gql` template-literal interpolations itself, so any query the
real app is built from is exactly what gets sent here too. Any time the
`.graphql` sources change and codegen regenerates that file, this check
picks it up automatically with zero manual sync.
"""

import json
import os
import re
import sys
import urllib.error
import urllib.request

GENERATED_SDK_PATH = "src/contentful/generated/contentful-sdk.generated.ts"

# Matches every `export const <Name> = gql`<body>`;` block in the generated
# file — both the two real operations (GetLayoutDocument,
# GetPageByPathDocument) and every fragment they depend on.
DOCUMENT_PATTERN = re.compile(r"export const (\w+) = gql`(.*?)`;", re.DOTALL)
# Matches a `${OtherDocumentName}` interpolation inside one of those bodies —
# how `gql` template literals splice in a fragment they depend on.
INTERPOLATION_PATTERN = re.compile(r"\$\{(\w+)\}")


def load_documents(path):
    """Parses every gql-tagged document in the generated SDK file into
    {name: {"body": <clean GraphQL text>, "depends_on": [<other names>]}}.
    """
    with open(path, encoding="utf-8") as f:
        content = f.read()

    documents = {}
    for match in DOCUMENT_PATTERN.finditer(content):
        name, raw_body = match.group(1), match.group(2)
        depends_on = INTERPOLATION_PATTERN.findall(raw_body)
        clean_body = INTERPOLATION_PATTERN.sub("", raw_body).strip()
        documents[name] = {"body": clean_body, "depends_on": depends_on}
    return documents


def build_query(documents, root_name):
    """Flattens one operation and its full transitive fragment closure into
    a single, valid GraphQL document string — each fragment defined exactly
    once, however many times it's transitively referenced. This is exactly
    what `graphql-tag`'s `gql` + `print()` do at JS runtime; this just does
    it via string assembly instead of a real GraphQL parser.
    """
    seen = set()
    parts = []

    def visit(name):
        if name in seen:
            return
        seen.add(name)
        doc = documents[name]
        parts.append(doc["body"])
        for dependency in doc["depends_on"]:
            visit(dependency)

    visit(root_name)
    return "\n\n".join(parts)


def run_query(base_url, space_id, environment, token, query, variables):
    endpoint = f"{base_url}/{space_id}/environments/{environment}"
    payload = json.dumps({"query": query, "variables": variables or {}}).encode("utf-8")
    request = urllib.request.Request(
        endpoint,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        return json.loads(error.read().decode("utf-8"))


def report(label, environment, response_body):
    errors = response_body.get("errors")
    if errors:
        print(f'❌ {label} failed on "{environment}":')
        for error in errors:
            print(f"   - {error.get('message')}")
        return False
    print(f'✅ {label} succeeded on "{environment}"')
    return True


def main():
    environment = os.environ.get("CONTENTFUL_ENVIRONMENT")
    space_id = os.environ.get("CONTENTFUL_SPACE_ID")
    token = os.environ.get("CONTENTFUL_CDA_TOKEN")
    base_url = os.environ.get("CONTENTFUL_API_BASE_URL")

    if not (environment and space_id and token and base_url):
        print(
            "::error::CONTENTFUL_ENVIRONMENT, CONTENTFUL_SPACE_ID, "
            "CONTENTFUL_CDA_TOKEN, and CONTENTFUL_API_BASE_URL are all required."
        )
        sys.exit(1)

    print(f'\nVerifying real Contentful queries against "{environment}"...\n')

    documents = load_documents(GENERATED_SDK_PATH)
    layout_query = build_query(documents, "GetLayoutDocument")
    page_by_path_query = build_query(documents, "GetPageByPathDocument")

    ok = True

    layout_result = run_query(base_url, space_id, environment, token, layout_query, {})
    ok = report("GetLayout", environment, layout_result) and ok

    # Not part of the generated SDK — this ad hoc query's only job is
    # discovering real page paths to feed into the real GetPageByPath query
    # below, the same way a site visitor's requests would.
    discovery_result = run_query(
        base_url,
        space_id,
        environment,
        token,
        "query { pageCollection(limit: 50) { items { path } } }",
        {},
    )
    paths = []
    if discovery_result.get("errors"):
        ok = report("Page path discovery", environment, discovery_result) and ok
    else:
        paths = [item["path"] for item in discovery_result["data"]["pageCollection"]["items"]]

    if not paths and ok:
        print(f'⚠️  No pages found on "{environment}" — nothing to verify for GetPageByPath.')

    for path in paths:
        page_result = run_query(
            base_url, space_id, environment, token, page_by_path_query, {"path": path}
        )
        ok = report(f'GetPageByPath("{path}")', environment, page_result) and ok

    if not ok:
        print(
            f'\n::error::"{environment}" has real queries failing against its live '
            f"schema. Run `CONTENTFUL_ENVIRONMENT={environment} pnpm contentful:setup` "
            "to sync its content types, then re-run this check.\n"
        )
        sys.exit(1)

    print(f'\nAll real queries succeeded against "{environment}".')
    sys.exit(0)


if __name__ == "__main__":
    main()
