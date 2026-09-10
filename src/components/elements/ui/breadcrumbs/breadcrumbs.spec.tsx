import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Breadcrumbs, BreadcrumbsItem, BreadcrumbsList } from "./breadcrumbs";

describe("Breadcrumbs", () => {
  it("renders a trail of links in order", () => {
    const { container } = render(
      <Breadcrumbs>
        <BreadcrumbsList>
          <BreadcrumbsItem>
            <a href="/">Home</a>
          </BreadcrumbsItem>
          <BreadcrumbsItem>
            <a href="/projects">Projects</a>
          </BreadcrumbsItem>
        </BreadcrumbsList>
      </Breadcrumbs>
    );

    expect(container.querySelector(".breadcrumbs")).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual(["Home", "Projects"]);
  });
});
