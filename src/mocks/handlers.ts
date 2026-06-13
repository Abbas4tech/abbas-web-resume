import { graphql, HttpResponse } from "msw";

export const mockLayoutData = {
  GetLayout: {
    layoutCollection: {
      items: [
        {
          sys: { id: "1" },
          internalName: "Default Layout",
          title: "Abbas Web Resume",
          role: "Software Engineer",
          defaultTheme: "light",
          drawerVariant: "permanent",
          drawerSide: "left",
          logo: {
            sys: { id: "logo1" },
            image: {
              url: "https://images.ctfassets.net/mock-logo.png",
              title: "Mock Logo",
              width: 100,
              height: 100,
            },
          },
          resume: {
            sys: { id: "res1" },
            url: "/resume.pdf",
            title: "Download Resume",
          },
          globalSeo: {
            sys: { id: "gseo1" },
            title: "Abbas",
            description: "Portfolio",
          },
          themeList: ["light", "dark"],
          email: "mock@example.com",
          footerText: "2024 Abbas",
          resumeIcon: {
            sys: { id: "ri1" },
            iconCode: "fa/FaFileAlt",
            name: "Resume",
          },
          themeIcon: {
            sys: { id: "ti1" },
            iconCode: "fa/FaPalette",
            name: "Theme",
          },
          navigation: {
            sys: { id: "navlist1" },
            customEntriesCollection: {
              items: [
                {
                  sys: { id: "navitem1" },
                  __typename: "Page",
                  title: "Home",
                  pageUrl: "/",
                  pageIcon: {
                    sys: { id: "pi1" },
                    iconCode: "fa/FaHome",
                    name: "Home",
                  },
                },
                {
                  sys: { id: "navitem2" },
                  __typename: "Page",
                  title: "About",
                  pageUrl: "/about",
                  pageIcon: {
                    sys: { id: "pi2" },
                    iconCode: "fa/FaUser",
                    name: "About",
                  },
                },
              ],
            },
          },
        },
      ],
    },
  },
  GetPageByPath: {
    pageCollection: {
      items: [
        {
          sys: { id: "p1" },
          title: "Home",
          internalName: "Home Page",
          pageUrl: "/",
          seo: {
            sys: { id: "pseo1" },
            title: "Home",
            description: "Home Page",
          },
          blocksCollection: { items: [] },
        },
      ],
    },
  },
};

export const handlers = [
  graphql.query("GetLayout", () =>
    HttpResponse.json({ data: mockLayoutData.GetLayout })
  ),
  graphql.query("GetPageByPath", () =>
    HttpResponse.json({ data: mockLayoutData.GetPageByPath })
  ),
];
