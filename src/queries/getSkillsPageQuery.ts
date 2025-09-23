import { gql } from "@apollo/client";

export const GET_SKILLS_PAGE = gql`
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
        ... on SkillsPageData {
          title
          skillsSetCollection(limit: 10) {
            items {
              title
              icon {
                iconCode
                classes
                showTooltip
                name
              }
              skillsArrayCollection(limit: 10) {
                items {
                  title
                  skillProgress
                  skillIconsCollection(limit: 10) {
                    items {
                      classes
                      showTooltip
                      name
                      iconCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
