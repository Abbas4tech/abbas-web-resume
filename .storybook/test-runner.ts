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
        axeOptions: {
          rules: {
            // Disabled for the same reason as tests/e2e/fixtures/test-base.ts
            // (see ADR 0022 §"PR 11"): axe-core samples rendered pixels, and
            // font hinting/anti-aliasing differences between local macOS and
            // CI's Linux runners flip already-borderline DaisyUI color tokens
            // unpredictably. Real contrast auditing belongs in a tool that
            // isn't sensitive to which machine rendered the page.
            "color-contrast": { enabled: false },
          },
        },
      });
    }
  },
};

export default config;
