# Terraform Infrastructure Management for Vercel

This directory manages the **Vercel project infrastructure, Git integration, and environment variables** declaratively using Terraform and the official [Vercel Terraform Provider](https://registry.terraform.io/providers/vercel/vercel/latest/docs). See [ADR 0039](../docs/adr/0039-infrastructure-as-code-vercel-terraform.md) and [ADR 0032](../docs/adr/0032-vercel-environment-variable-cleanup.md).

> **Note**: Application code builds and daily preview/production deployments remain automated via **Vercel's native GitHub integration** (as documented in [docs/10-deployment.md](../docs/10-deployment.md)). Terraform is used purely for infrastructure settings and environment variable drift prevention.

---

## Managed Resources

1. **Vercel Project (`vercel_project.resume`)**:
   - Framework preset: `nextjs`
   - Connected GitHub repository: `Abbas4tech/abbas-web-resume`
   - Build & install commands (`pnpm build`, `pnpm install`)

2. **Environment Variables (`vercel_project_environment_variable`)**:
   - Structured according to [ADR 0032 (Vercel Environment Variable Cleanup)](../docs/adr/0032-vercel-environment-variable-cleanup.md):
     - `CONTENTFUL_SPACE_ID` (Production, Preview, Development)
     - `CONTENTFUL_API_BASE_URL` (Production, Preview, Development)
     - `CONTENTFUL_CDA_TOKEN` (Production, Preview, Development - marked sensitive)
     - `CONTENTFUL_ENVIRONMENT = "production"` (Production scope only)
     - `CONTENTFUL_ENVIRONMENT = "development"` (Preview and Development scopes)

3. **Custom Domain (`vercel_project_domain.custom`)**:
   - Optional custom domain mapping.

---

## Prerequisites

1. **Terraform CLI** (v1.5.0 or newer): [Download Terraform](https://developer.hashicorp.com/terraform/downloads)
2. **Vercel API Token**:
   - Generate a token at [vercel.com/account/tokens](https://vercel.com/account/tokens).
3. **Contentful Credentials**:
   - Space ID and Content Delivery API (CDA) token from Contentful Settings.

---

## Quick Start

### 1. Configure Variables
Copy the example variables file:
```bash
cd infra
cp terraform.tfvars.example terraform.tfvars
```
Fill in your actual `vercel_api_token`, `contentful_space_id`, and `contentful_cda_token` in `terraform.tfvars`.

> `terraform.tfvars` is gitignored and will never be committed.

### 2. Initialize Provider
```bash
terraform init
```

### 3. Plan & Verify
Check the actions Terraform will perform:
```bash
terraform plan
```

### 4. Apply
Apply the configuration to Vercel:
```bash
terraform apply
```

---

## Importing an Existing Vercel Project (Zero Downtime)

If your project already exists on Vercel and you want Terraform to manage it without recreating or disrupting it:

1. Obtain your Vercel Project ID (from Vercel Dashboard -> Project -> Settings -> General -> Project ID).
2. Run the import command:
```bash
terraform import vercel_project.resume <YOUR_VERCEL_PROJECT_ID>
```
3. Run `terraform plan` to verify that Terraform matches the live configuration before applying environment variables.
