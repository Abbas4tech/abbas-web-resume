import { gql } from "@apollo/client";

export const GET_EXPERIENCE_PAGE = gql`
  query GetExperiencePage($id: String!) {
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
        ... on ExperiencePageData {
          title
          experiencesCollection {
            items {
              company
              companyIcon {
                name
                iconCode
                classes
                showTooltip
              }
              description
              position
              roleIcon {
                name
                iconCode
                classes
                showTooltip
              }
              workedRemotely
              startDate
              endDate
              durationIcon {
                name
                iconCode
                classes
                showTooltip
              }
              location
              locationIcon {
                name
                iconCode
                classes
                showTooltip
              }
              currentlyWorking
              techStack {
                title
                skillProgress
                skillIconsCollection {
                  items {
                    name
                  }
                }
              }
              techStackIcon {
                name
                iconCode
                classes
                showTooltip
              }
            }
          }
        }
      }
    }
  }
`;
