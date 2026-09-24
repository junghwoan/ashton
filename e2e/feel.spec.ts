import { expect, test } from "@playwright/test";

const widths = [1440, 1280, 390];

for (const width of widths) {
  test(`type and layout at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.goto("/");
    await expect(page.locator(".rf-name")).toHaveText("DJ TY");
    await expect(page.locator(".brand-name")).toHaveText("Ashton TY Hwang");

    const nameSize = await page.locator(".rf-name").evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    const pillarSize = await page.locator(".pillars b").first().evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    const asideSize = await page.locator(".rf-aside p").first().evaluate((el) => parseFloat(getComputedStyle(el).fontSize));

    if (width >= 1280) {
      expect(nameSize).toBeGreaterThan(180);
      expect(pillarSize).toBeGreaterThan(60);
      expect(asideSize).toBeGreaterThan(24);
    }

    const portrait = page.locator(".rf-portrait img");
    const box = await portrait.boundingBox();
    const natural = await portrait.evaluate((img: HTMLImageElement) => ({ w: img.naturalWidth, h: img.naturalHeight }));
    expect(box).not.toBeNull();
    if (box) {
      const shown = box.width / box.height;
      const real = natural.w / natural.h;
      expect(Math.abs(shown - real)).toBeLessThan(0.05);
    }

    if (width === 390) await page.locator("#project.is-plain").waitFor();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
    await expect(page.locator("iframe.release-player")).toHaveCount(0);
    await expect(page.getByText("Pronounced Tai.")).toHaveCount(0);
    await expect(page.locator(".brand-mark")).toHaveCount(0);
    await expect(page.getByText("five, 2026")).toBeVisible();
    if (width === 390) {
      const projectHeight = await page.locator("#project").evaluate((el) => el.getBoundingClientRect().height);
      expect(projectHeight).toBeLessThan(1400);
    }
    await page.getByRole("button", { name: "Night", exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    const nightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(nightBg).not.toBe("rgb(240, 238, 235)");
  });
}
