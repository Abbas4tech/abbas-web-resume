import { gql } from "@apollo/client";

export const GET_METAPAGES = gql`
  query GetMetaPages($id: String!) {
    userInfo(id: $id) {
      pagesCollection {
        items {
          pageUrl
          isDefaultPage
          title
          pageIcon {
            classes
            iconCode
            name
            showTooltip
          }
        }
      }
    }
  }
`;
