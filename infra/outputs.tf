output "vercel_project_id" {
  description = "The unique ID of the Vercel Project"
  value       = vercel_project.resume.id
}

output "vercel_project_name" {
  description = "The name of the Vercel Project"
  value       = vercel_project.resume.name
}

output "vercel_project_framework" {
  description = "The framework preset configured on Vercel"
  value       = vercel_project.resume.framework
}

output "custom_domain" {
  description = "The custom domain associated with the project, if configured"
  value       = var.custom_domain != "" ? var.custom_domain : "None"
}
