resource "vercel_project_domain" "custom" {
  count      = var.custom_domain != "" ? 1 : 0
  project_id = vercel_project.resume.id
  domain     = var.custom_domain
}
