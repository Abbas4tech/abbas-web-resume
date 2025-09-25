import { gql } from "@apollo/client";

export const GET_HOME_PAGE = gql`
  query GetHomePage($id: String!) {
    page(id: $id) {
      title
      contentAnimation
      headingAnimation
      pageData {
        ... on HomePageData {
          infoCollection {
            items {
              title
              value
              icon {
                classes
                showTooltip
                name
                iconCode
              }
            }
          }
          description {
            json
          }
        }
      }
    }
  }
`;
