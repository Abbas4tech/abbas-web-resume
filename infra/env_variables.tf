# Common Contentful Variables across all scopes (Production, Preview, Development)
# Ref: ADR 0032 (Vercel Environment Variable Cleanup)
locals {
  common_environment_variables = {
    CONTENTFUL_SPACE_ID = {
      value     = var.contentful_space_id
      sensitive = false
    }
    CONTENTFUL_API_BASE_URL = {
      value     = var.contentful_api_base_url
      sensitive = false
    }
    CONTENTFUL_CDA_TOKEN = {
      value     = var.contentful_cda_token
      sensitive = true
    }
  }
}

resource "vercel_project_environment_variable" "common" {
  for_each   = local.common_environment_variables
  project_id = vercel_project.resume.id
  key        = each.key
  value      = each.value.value
  target     = ["production", "preview", "development"]
  sensitive  = each.value.sensitive
}

# Production Environment Scope -> targets Contentful 'production' environment
resource "vercel_project_environment_variable" "contentful_env_production" {
  project_id = vercel_project.resume.id
  key        = "CONTENTFUL_ENVIRONMENT"
  value      = "production"
  target     = ["production"]
  sensitive  = false
}

# Preview & Development Scopes -> targets Contentful 'development' environment
resource "vercel_project_environment_variable" "contentful_env_development" {
  project_id = vercel_project.resume.id
  key        = "CONTENTFUL_ENVIRONMENT"
  value      = "development"
  target     = ["preview", "development"]
  sensitive  = false
}
