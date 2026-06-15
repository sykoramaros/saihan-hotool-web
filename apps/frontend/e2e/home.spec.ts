import { test, expect } from "@playwright/test"

// Předpoklad: CMS běží na http://localhost:2011
// Spuštění: make start (v kořeni projektu) před spuštěním testů

test.describe("Hlavní stránka", () => {
  test("načte hlavní stránku", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveURL(/localhost:5175/)
  })

  test("zobrazí navigaci s odkazy", async ({ page }) => {
    await page.goto("/")
    const nav = page.getByRole("navigation").first()
    await expect(nav).toBeVisible({ timeout: 8000 })
    const links = nav.getByRole("link")
    await expect(links).not.toHaveCount(0)
  })

  test("zobrazí hlavní nadpis z CMS", async ({ page }) => {
    await page.goto("/")
    const heading = page.getByRole("heading").first()
    await expect(heading).toBeVisible({ timeout: 8000 })
  })
})
