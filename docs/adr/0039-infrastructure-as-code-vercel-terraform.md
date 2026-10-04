---
status: accepted
date: 2026-10-04
---

# 39. Infrastructure as Code for Vercel Management (Terraform)

## Context

Managing cloud infrastructure and SaaS platform settings via manual UI clicks introduces configuration drift and silent misconfigurations over time. As documented in [ADR 0032](./0032-vercel-environment-variable-cleanup.md), the Vercel project had previously accumulated legacy environment variables, and more critically, Production was found to be missing `CONTENTFUL_ENVIRONMENT` and `CONTENTFUL_CDA_TOKEN` while Preview had them configured.

While ADR 0032 cleaned up the variable set to the exact four runtime variables (`CONTENTFUL_SPACE_ID`, `CONTENTFUL_CDA_TOKEN`, `CONTENTFUL_API_BASE_URL`, `CONTENTFUL_ENVIRONMENT`), it noted a key negative consequence:
> *"No automated check keeps Vercel's variable set in sync with `.env.local` or the codebase's actual `process.env` reads going forward — this was a one-time manual audit... not a standing guardrail."*

Furthermore, recreating or auditing project settings, GitHub repository bindings, build commands, framework presets, or domain mappings required navigating the Vercel web console without a declarative, version-controlled source of truth.

## Decision

Adopted **Terraform** using the official [Vercel Terraform Provider](https://registry.terraform.io/providers/vercel/vercel/latest/docs) (`vercel/vercel`), isolated in the `infra/` directory at the repository root.

1. **Declarative Resource Scope (`infra/`)**:
   - **Vercel Project (`vercel_project.resume`)**: Declares project name, framework (`nextjs`), build command (`pnpm build`), install command (`pnpm install`), and GitHub repository integration (`Abbas4tech/abbas-web-resume`).
   - **Environment Variables (`vercel_project_environment_variable`)**: Encodes the variable mapping established in ADR 0032:
     - Common across all scopes (`production`, `preview`, `development`): `CONTENTFUL_SPACE_ID`, `CONTENTFUL_API_BASE_URL`, and `CONTENTFUL_CDA_TOKEN` (marked `sensitive = true`).
     - Scope-specific: `CONTENTFUL_ENVIRONMENT = "production"` on Production, and `CONTENTFUL_ENVIRONMENT = "development"` on Preview & Development.
   - **Custom Domain (`vercel_project_domain.custom`)**: Optional declarative domain attachment.

2. **Separation of Infrastructure Configuration vs Application Deployments**:
   - Terraform is strictly scoped to **Infrastructure as Code (IaC)**: project creation, configuration settings, environment variables, and domains.
   - Application code builds, preview deployments for PRs, and production deployments on merge remain managed by **Vercel's native GitHub integration** (as documented in [docs/10-deployment.md](../10-deployment.md)). Terraform is not used as a runtime deployment runner.

3. **Zero-Downtime Adoption**:
   - Existing live Vercel projects can be imported into Terraform state via `terraform import vercel_project.resume <PROJECT_ID>` without tearing down or recreating live services.

## Considered Options

- **Pure Vercel CLI Scripting in CI**: Write custom bash/Python scripts invoking `vercel env add/ls`. Rejected — lacks declarative state management, diffing (`terraform plan`), dependency graphs, and drift detection.
- **Full Deployment Orchestration via Terraform**: Use Terraform `vercel_deployment` resources to trigger deployments on every commit. Rejected — anti-pattern for Next.js on Vercel; adds unnecessary latency and duplicates Vercel's native Git webhook engine and PR preview comment system.
- **Keep Manual Vercel Dashboard Configuration**: Status quo. Rejected — prone to silent configuration drift between environment scopes as documented in ADR 0032.

## Consequences

### Positive
- **Elimination of Environment Variable Drift**: Variables across Production, Preview, and Development scopes are explicitly defined in code and version-controlled.
- **Reproducibility & Disaster Recovery**: The entire Vercel configuration can be provisioned or audited in seconds via `terraform plan` / `terraform apply`.
- **Clean Architectural Boundary**: Located in `infra/`, keeping Next.js application code and CI workflows clean and unencumbered.
- **Security**: Sensitive tokens (`CONTENTFUL_CDA_TOKEN`, `vercel_api_token`) are marked sensitive in HCL and `.tfvars` files are excluded from Git.

### Negative / Trade-offs
- **State Management Requirement**: Requires managing a `terraform.tfstate` file (locally or via a remote backend like Terraform Cloud / S3) when running Terraform operations.
- **Tooling Requirement**: Running Terraform updates requires the Terraform CLI (v1.5.0+) and a Vercel personal/team API token.
