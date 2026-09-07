import { graphql, HttpResponse } from "msw";
import { fixtureLayout, fixturePages } from "./fixture-site";

interface GetPageByPathVariables {
  path?: string;
}

export const handlers = [
  graphql.query("GetLayout", () =>
    HttpResponse.json({
      data: { layoutCollection: { items: [fixtureLayout] } },
    })
  ),
  graphql.query<Record<string, unknown>, GetPageByPathVariables>(
    "GetPageByPath",
    ({ variables }) => {
      const page = fixturePages.find((item) => item.path === variables.path);

      return HttpResponse.json({
        data: { pageCollection: { items: page ? [page] : [] } },
      });
    }
  ),
];
