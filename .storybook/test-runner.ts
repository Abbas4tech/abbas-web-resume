import type { TestRunnerConfig } from "@storybook/test-runner";
import { getStoryContext } from "@storybook/test-runner";
import { checkA11y, injectAxe } from "axe-playwright";

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    // Run accessibility tests
    const storyContext = await getStoryContext(page, context);
    if (!storyContext.parameters?.a11y?.disable) {
      await checkA11y(page, "#storybook-root", {
        detailedReport: true,
        detailedReportOptions: { html: true },
      });
    }
  },
};

export default config;
