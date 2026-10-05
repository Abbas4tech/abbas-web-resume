"""
Fails a pull request that changes the Contentful content model (or the
GraphQL sources that query it) without also updating the documentation and
generated artifacts that must move with it.

Why this exists: the content model has several derived artifacts —
`docs/contentful/content-model.md` (human mirror of `setup-content-model.ts`),
the codegen output under `src/contentful/generated/`, and the field unions /
constrained-fields doc produced by `pnpm generate:unions`. They used to drift
silently because nothing tied them to the source change. See ADR 0039 and
docs/contentful/schema-change-workflow.md.

Pure standard library, same convention as check-changeset.py.
"""

import os
import subprocess
import sys

SETUP_SCRIPT = "src/contentful/scripts/setup-content-model.ts"
CONTENT_MODEL_DOC = "docs/contentful/content-model.md"
GRAPHQL_PREFIX = "src/contentful/"
GENERATED_SDK = "src/contentful/generated/contentful-sdk.generated.ts"
WORKFLOW_DOC = "docs/contentful/schema-change-workflow.md"


def changed_files(base_ref):
    subprocess.check_call(f"git fetch origin {base_ref}", shell=True)
    output = subprocess.check_output(
        f"git diff origin/{base_ref}...HEAD --name-only", shell=True, text=True
    )
    return {line for line in output.strip().split("\n") if line}


def main():
    if os.environ.get("GITHUB_EVENT_NAME") != "pull_request":
        print("Not a pull request. Skipping Contentful sync check.")
        sys.exit(0)

    base_ref = os.environ.get("GITHUB_BASE_REF")
    if not base_ref:
        print("No GITHUB_BASE_REF found. Skipping Contentful sync check.")
        sys.exit(0)

    files = changed_files(base_ref)
    problems = []

    if SETUP_SCRIPT in files and CONTENT_MODEL_DOC not in files:
        problems.append(
            f"{SETUP_SCRIPT} changed but {CONTENT_MODEL_DOC} did not. "
            "Update the human-readable content model reference."
        )

    graphql_changed = any(
        f.startswith(GRAPHQL_PREFIX) and f.endswith(".graphql") for f in files
    )
    if graphql_changed and GENERATED_SDK not in files:
        problems.append(
            f"A .graphql source changed but {GENERATED_SDK} did not. "
            "Run `pnpm generate` and commit the output."
        )

    if problems:
        for problem in problems:
            print(f"::error::{problem}")
        print(f"See {WORKFLOW_DOC} for the full schema-change checklist.")
        sys.exit(1)

    print("Contentful docs and generated artifacts are in sync with source changes.")
    sys.exit(0)


if __name__ == "__main__":
    main()
