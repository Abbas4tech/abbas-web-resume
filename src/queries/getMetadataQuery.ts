import { gql } from "@apollo/client";

export const GET_METADATA = gql`
  query GetExperiencePageMetadata($id: String!) {
    page(id: $id) {
      pageSeo {
        title
        description
        keywords
        countryName
        publisher
        creator
        url
        siteName
        imagesCollection {
          items {
            title
            url
            width
            height
          }
        }
        favicon {
          url
        }
      }
    }
  }
`;
