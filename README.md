# LumiTeach Manual

Static LumiTeach service guide for GitHub Pages.

## Image Localization

Manual image tokens stay language-neutral in content, for example:

```text
[[image:edit-lesson-create/01.png|caption]]
```

The renderer resolves images in this order:

1. `lumiteach_assets/manual/{currentLanguage}/edit-lesson-create/01.png`
2. `lumiteach_assets/manual/ko/edit-lesson-create/01.png`
3. `lumiteach_assets/manual/en/edit-lesson-create/01.png`
4. `lumiteach_assets/manual/edit-lesson-create/01.png` as the legacy shared fallback

So localized screenshots can be added under `lumiteach_assets/manual/ko`, `en`, `pt`, `es`, `ja`, or `vi` without changing the article body. If a localized image is missing, the existing shared image remains visible.

