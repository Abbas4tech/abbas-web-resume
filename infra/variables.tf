variable "vercel_api_token" {
  description = "Vercel API Token used to authenticate Terraform with Vercel"
  type        = string
  sensitive   = true
}

variable "vercel_team_id" {
  description = "Optional Vercel Team ID if the project belongs to a team scope"
  type        = string
  default     = ""
}

variable "vercel_project_name" {
  description = "Name of the Vercel project"
  type        = string
  default     = "abbas-web-resume"
}

variable "github_repository" {
  description = "GitHub repository identifier in the format 'owner/repo'"
  type        = string
  default     = "Abbas4tech/abbas-web-resume"
}

variable "contentful_space_id" {
  description = "Contentful Space ID"
  type        = string
}

variable "contentful_api_base_url" {
  description = "Contentful GraphQL API Base URL"
  type        = string
  default     = "https://graphql.contentful.com/content/v1/spaces"
}

variable "contentful_cda_token" {
  description = "Contentful Content Delivery API (CDA) Access Token"
  type        = string
  sensitive   = true
}

variable "custom_domain" {
  description = "Optional custom domain name to attach to the Vercel project"
  type        = string
  default     = ""
}
