import { gql } from "@apollo/client";

export const GET_HEADER_INFO = gql`
  query GetHeaderInfo($id: String!) {
    userInfo(id: $id) {
      title
      defaultTheme
      themeList
      resume {
        description
        fileName
        title
        url
      }
      resumeIcon {
        classes
        showTooltip
        name
        iconCode
      }
    }
  }
`;
