import { gql } from "@apollo/client";

export const GET_METAPAGES = gql`
  query GetMetpages {
    metaPageCollection {
      items {
        title
        pageUrl
        isDefaultPage
      }
    }
  }
`;
