# رفام مصر — الموقع الإلكتروني

موقع تعريفي بشركة رفام مصر لنظم الاتصالات وشبكاتها. صفحة واحدة (Single Page)، عربي بالكامل، اتجاه من اليمين لليسار (RTL)، مبني بـ HTML / CSS / JavaScript خام بدون أي أطر عمل أو خطوة بناء (build step).

## المعاينة محليًا

من داخل مجلد `rfam-misr-website/` شغّل خادمًا محليًا بسيطًا:

```bash
python3 -m http.server 8000
```

ثم افتح المتصفح على:

```
http://localhost:8000
```

## النشر (Deployment)

الموقع عبارة عن ملفات ثابتة (Static) فقط، يمكن رفعه كما هو على أي استضافة:

- **cPanel**: ارفع محتويات المجلد كاملة إلى `public_html/` (أو مجلد فرعي) عبر File Manager أو FTP.
- **Netlify**: اسحب مجلد `rfam-misr-website/` مباشرة في واجهة Netlify Drop، أو اربطه بمستودع Git.
- **GitHub Pages**: ارفع المحتوى إلى الفرع (branch) المخصص لـ Pages، مع التأكد أن `index.html` في الجذر.
- **Azure Static Web Apps**: اربط المستودع، واجعل `app_location` يشير إلى `rfam-misr-website/` بدون أمر بناء (Build command فارغ).

## قائمة مهام المالك (TODO)

- [ ] استبدال `assets/logo.svg` باللوجو الرسمي، وتحديث ألوان `:root` في `css/styles.css` (أعلى الملف، بجانب التعليق `TODO`) لتطابق ألوان اللوجو.
- [ ] استبدال صور `assets/projects/` بصور سابقة الأعمال الحقيقية (project-01.svg … project-08.svg) — إما بنفس الأسماء، أو بتحديث المسارات في `index.html`.
- [ ] تحديث رابط خرائط جوجل في قسم «تواصل معنا» بالموقع الدقيق للمقر في مدينة نصر (ابحث عن التعليق `TODO` في `index.html` بجانب الـ `iframe`).
- [ ] مراجعة أرقام شريط الإحصائيات (سنة التأسيس، سنوات الخبرة، عدد المحافظات) وإضافة «عدد المشروعات المنفَّذة» عند توفّر رقم مؤكَّد.

---

# RFAM Misr — Website

A single-page company profile website for RFAM Misr (شركة رفام مصر لنظم الاتصالات وشبكاتها). Fully Arabic, right-to-left (RTL), built with plain HTML / CSS / JavaScript — no frameworks, no build step.

## Local preview

From inside the `rfam-misr-website/` folder, run a simple local server:

```bash
python3 -m http.server 8000
```

Then open:

```
http://localhost:8000
```

## Deployment

This is a fully static site — deploy the folder as-is to any static host:

- **cPanel**: upload the folder's contents to `public_html/` (or a subfolder) via File Manager or FTP.
- **Netlify**: drag the `rfam-misr-website/` folder into Netlify Drop, or connect a Git repo.
- **GitHub Pages**: push the contents to the branch configured for Pages, with `index.html` at the root.
- **Azure Static Web Apps**: connect the repo and set `app_location` to `rfam-misr-website/` with an empty build command.

## Owner TODO list

- [ ] Replace `assets/logo.svg` with the official logo, and update the `:root` colors in `css/styles.css` (top of file, next to the `TODO` comment) to match the official logo colors.
- [ ] Replace the images in `assets/projects/` with real past-project photos (project-01.svg … project-08.svg) — either keep the same filenames or update the paths in `index.html`.
- [ ] Update the Google Maps link in the "Contact" section with the exact HQ location in Nasr City (look for the `TODO` HTML comment next to the `iframe` in `index.html`).
- [ ] Review the stats-strip numbers (founding year, years of experience, governorates served) and add a "completed projects" counter once a confirmed number is available.
