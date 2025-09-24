import { gql } from "@apollo/client";

export const GetAppData = gql`
  query GetHeaderInfo($id: String!) {
    userInfo(id: $id) {
      title
      name
      bannerData {
        bannerAnimation
        title
        profilePicture {
          description
          fileName
          width
          height
          title
          url
        }
        bannerAnimation
        socialLinksCollection {
          items {
            description
            fileName
            width
            height
            title
            url
          }
        }
      }
      defaultTheme
      themeList
      resume {
        description
        fileName
        title
        url
      }
      role
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
      resumeIcon {
        classes
        showTooltip
        name
        iconCode
      }
      resume {
        description
        fileName
        title
        url
      }
      themeIcon {
        classes
        showTooltip
        name
        iconCode
      }
      themeList
      defaultTheme
      layoutSettings {
        drawerSide
        drawerVariant
        title
      }
    }
  }
`;
