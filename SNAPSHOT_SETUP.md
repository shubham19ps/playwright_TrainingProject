# Playwright Snapshot Setup for Linux CI

## 🐞 Issue

**Error in GitHub Actions:**
```
Error: A snapshot doesn't exist at .../home-page-chromium-linux.png, writing actual.
```

**Root Cause:**
Playwright creates platform-specific snapshots:
- Windows: `*-chromium-win32.png`
- Linux: `*-chromium-linux.png`
- macOS: `*-chromium-darwin.png`

Your CI runs on **Linux (ubuntu-latest)**, but you only have **Windows** snapshots.

## ✅ Solutions

### ✅ Solution 1: Auto-generate Linux snapshots (Recommended - Already Configured)

The workflow is configured to automatically update snapshots on the first run:

1. **First CI run**: Generates Linux snapshots and commits them
2. **Subsequent runs**: Uses the committed snapshots for comparison

**The workflow will:**
- Run tests with `--update-snapshots` flag
- Commit new Linux snapshots if tests fail due to missing snapshots
- Auto-push to your repository

**Note:** You'll need to grant workflow write permissions:
- Go to **Settings → Actions → General → Workflow permissions**
- Select **Read and write permissions**
- Save

---

### Solution 2: Generate Linux snapshots locally using Docker

Run this command to generate Linux snapshots on your Windows machine:

```bash
docker run --rm --network host -v %cd%:/work/ -w /work/ mcr.microsoft.com/playwright:v1.62.1-jammy /bin/bash -c "npm install && npx playwright test --update-snapshots"
```

Then commit the generated Linux snapshots:
```bash
git add tests/**/*-snapshots/
git commit -m "Add Linux snapshots for CI"
git push
```

---

### Solution 3: Skip screenshots in CI

Modify tests to skip screenshots in CI environment:

```typescript
// Only run screenshot assertions locally
if (!process.env.CI) {
  await expect(page).toHaveScreenshot('home-page.png', { maxDiffPixelRatio: 0.1 });
}
```

---

### Solution 4: Use GitHub Actions to generate snapshots manually

Run the workflow manually:

1. Go to **Actions** tab
2. Select **Playwright Tests** workflow
3. Click **Run workflow**
4. After the first run, snapshots will be auto-committed

---

## Recommended Approach

✅ **Use Solution 1** (already configured in the workflow)

1. Push your code with the updated workflow
2. The first run will generate Linux snapshots
3. Snapshots will be auto-committed to your repo
4. Future runs will use these snapshots

---

## Verification

After setup, you should see these files in your repo:
```
tests/scenario4_CompletePurchase.spec.ts-snapshots/
  ├── home-page-chromium-win32.png          (existing)
  ├── home-page-chromium-linux.png          (new - auto-generated)
  ├── checkout-complete-chromium-win32.png  (existing)
  └── checkout-complete-chromium-linux.png  (new - auto-generated)
```
