import { gql } from "@apollo/client";

export const GET_PROJECTS_PAGE = gql`
  query GetProjectsPage($id: String!) {
    page(id: $id) {
      title
      pageIcon {
        iconCode
        name
        showTooltip
        classes
      }
      headingAnimation
      contentAnimation
      pageData {
        ... on ProjectsPageData {
          title
          projectsCollection {
            items {
              title
              description
              thumbnail {
                title
                height
                width
                url
                description
                fileName
              }
              deployedLink
              deployedLinkIcon {
                iconCode
                name
                showTooltip
                classes
              }
            }
          }
        }
      }
    }
  }
`;
