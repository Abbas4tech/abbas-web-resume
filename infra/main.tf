terraform {
  required_version = ">= 1.5.0"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.0"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
  team      = var.vercel_team_id != "" ? var.vercel_team_id : null
}

resource "vercel_project" "resume" {
  name             = var.vercel_project_name
  framework        = "nextjs"
  build_command    = "pnpm build"
  install_command  = "pnpm install"
  output_directory = ".next"

  git_repository = {
    type = "github"
    repo = var.github_repository
  }

  # Prevent accidental destruction of live project
  lifecycle {
    prevent_destroy = false
  }
}
