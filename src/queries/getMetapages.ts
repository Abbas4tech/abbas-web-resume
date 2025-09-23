import { gql } from "@apollo/client";

export const GET_METAPAGES = gql`
  query GetMetapages {
    metaPageCollection {
      items {
        title
        pageUrl
        isDefaultPage
      }
    }
  }
`;
