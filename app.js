let currentArticleKey = 'cat-intro';
const openTreeKeys = new Set();

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[char]));
}

function formatInline(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}


const manualImageBasePath = 'lumiteach_assets/manual';
const fallbackManualImageLanguage = 'en';

function normalizeManualImagePath(imagePath) {
  return String(imagePath || '').replace(/^\/+/, '');
}

function getManualImageCandidates(imagePath) {
  const normalizedPath = normalizeManualImagePath(imagePath);
  const language = currentLanguage || defaultLanguage;
  const candidates = [
    `${manualImageBasePath}/${language}/${normalizedPath}`,
    `${manualImageBasePath}/${defaultLanguage}/${normalizedPath}`,
    `${manualImageBasePath}/${fallbackManualImageLanguage}/${normalizedPath}`,
    `${manualImageBasePath}/${normalizedPath}`
  ];

  return candidates.filter((candidate, index) => candidate && candidates.indexOf(candidate) === index);
}

function handleManualImageError(imageElement) {
  const fallbacks = (imageElement.dataset.fallbackSrcs || '').split('|').filter(Boolean);
  const nextSrc = fallbacks.shift();

  if (nextSrc) {
    imageElement.dataset.fallbackSrcs = fallbacks.join('|');
    imageElement.src = nextSrc;
    return;
  }

  imageElement.hidden = true;
  imageElement.closest('.manual-image')?.classList.add('manual-image-missing');
}

function renderRichText(value) {
  const lines = String(value).split(/\n/);
  const html = [];
  let paragraph = [];
  let listItems = [];
  let quoteLines = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${formatInline(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    html.push(`<ul>${listItems.map((item) => `<li>${formatInline(item)}</li>`).join('')}</ul>`);
    listItems = [];
  };

  const flushQuote = () => {
    if (!quoteLines.length) return;
    html.push(`<blockquote>${renderRichText(quoteLines.join('\n'))}</blockquote>`);
    quoteLines = [];
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      flushQuote();
      return;
    }

    if (trimmed.startsWith('[[image:') && trimmed.endsWith(']]')) {
      flushParagraph();
      flushList();
      flushQuote();

      const imageKey = trimmed.slice(8, -2);
      const [imagePath, imageCaption = ''] = imageKey.split('|');
      const imageCandidates = getManualImageCandidates(imagePath);
      const image = manualImages[imagePath] || {
        src: imageCandidates[0],
        fallbackSrcs: imageCandidates.slice(1),
        alt: imageCaption,
        caption: imageCaption
      };

      if (image) {
        html.push(`
          <figure class="manual-image">
            <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt || '')}" data-fallback-srcs="${escapeHtml((image.fallbackSrcs || []).join('|'))}" onerror="handleManualImageError(this)" />
            ${image.caption ? `<figcaption>${escapeHtml(image.caption)}</figcaption>` : ''}
          </figure>
        `);
      }
      return;
    }

    if (trimmed.startsWith('[[callout:') && trimmed.endsWith(']]')) {
      flushParagraph();
      flushList();
      flushQuote();

      const calloutValue = trimmed.slice(10, -2);
      const [icon = 'i', title = '', ...bodyParts] = calloutValue.split('|');
      const body = bodyParts.join('|').replace(/\\n/g, '\n\n');

      html.push(`
        <aside class="section-callout">
          <span class="section-callout-icon" aria-hidden="true">${escapeHtml(icon || 'i')}</span>
          <div class="section-callout-content">
            ${title ? `<strong>${formatInline(title)}</strong>` : ''}
            <div class="section-callout-body">${renderRichText(body)}</div>
          </div>
        </aside>
      `);
      return;
    }

    if (trimmed.startsWith('>')) {
      flushParagraph();
      flushList();
      quoteLines.push(trimmed.replace(/^>\s?/, ''));
      return;
    }

    flushQuote();

    if (trimmed.startsWith('### ')) {
      flushParagraph();
      flushList();
      html.push(`<h3>${formatInline(trimmed.slice(4))}</h3>`);
      return;
    }

    if (trimmed.startsWith('- ')) {
      flushParagraph();
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList();
    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();
  flushQuote();

  return html.join('');
}

function activeTranslations() {
  return translations[currentLanguage] || translations[defaultLanguage];
}

function normalizeLanguageKey(language) {
  const normalized = String(language || '').trim().toLowerCase();
  return translations[normalized] ? normalized : null;
}

function getUrlLanguage() {
  const params = new URLSearchParams(location.search);
  return normalizeLanguageKey(params.get('lang') || params.get('language') || params.get('locale'));
}

function getStoredLanguage() {
  return normalizeLanguageKey(localStorage.getItem('lumiteach-language'));
}

function getInitialLanguage() {
  return getUrlLanguage() || getStoredLanguage() || defaultLanguage;
}

function updateDocumentLanguage() {
  document.documentElement.lang = currentLanguage;
}

function syncLanguageSelect() {
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) languageSelect.value = currentLanguage;
}

function routeUrlFor(hash = '', language = currentLanguage) {
  const params = new URLSearchParams(location.search);
  params.delete('language');
  params.delete('locale');
  params.set('lang', normalizeLanguageKey(language) || defaultLanguage);

  const query = params.toString();
  return `${location.pathname}${query ? `?${query}` : ''}${hash || ''}`;
}

function replaceCurrentUrlWithLanguage(hash = location.hash) {
  const nextUrl = routeUrlFor(hash);
  const currentUrl = `${location.pathname}${location.search}${hash || ''}`;
  if (nextUrl !== currentUrl) {
    const key = hash ? decodeURIComponent(hash.replace('#', '')) : null;
    history.replaceState({ key, language: currentLanguage }, '', nextUrl);
  }
}

function persistCurrentLanguage() {
  localStorage.setItem('lumiteach-language', currentLanguage);
}

function refreshForLanguage() {
  updateDocumentLanguage();
  syncLanguageSelect();
  applyStaticTranslations();
  renderCategories();
  renderTree(currentArticleKey);
  if (document.getElementById('articleView').classList.contains('active')) {
    renderArticle(currentArticleKey);
  }
  renderSearchResults(document.getElementById('searchInput')?.value || '');
}

function setLanguage(language, options = {}) {
  const { updateUrl = false, rerender = false } = options;
  currentLanguage = normalizeLanguageKey(language) || defaultLanguage;
  persistCurrentLanguage();
  updateDocumentLanguage();
  syncLanguageSelect();
  if (updateUrl) replaceCurrentUrlWithLanguage();
  if (rerender) refreshForLanguage();
}

function syncLanguageFromUrl(options = {}) {
  const { rerender = false } = options;
  const urlLanguage = getUrlLanguage();
  if (!urlLanguage || urlLanguage === currentLanguage) return false;
  setLanguage(urlLanguage, { rerender });
  return true;
}

function tUI(key) {
  return activeTranslations().ui?.[key] || translations[defaultLanguage].ui[key] || key;
}

function tFixed(key) {
  return activeTranslations().fixed?.[key] || translations[defaultLanguage].fixed[key] || key;
}

function tLanguageName(key) {
  const translatedName = activeTranslations().languageNames?.[key] || translations[defaultLanguage].languageNames[key] || key;
  const nativeName = nativeLanguageNames[key];

  if (!nativeName || key === currentLanguage || translatedName === nativeName) {
    return translatedName;
  }

  return `${translatedName} - ${nativeName}`;
}

function formatTranslationTemplate(template, variables = {}) {
  return Object.entries(variables).reduce((result, [key, value]) => {
    return result.replaceAll(`{${key}}`, value);
  }, template);
}

function normalizeTranslationTerms(value) {
  if (currentLanguage === defaultLanguage || typeof value !== 'string') return value;

  const terms = translationTermMemory[currentLanguage];
  if (!terms) return value;

  const protectedImagePaths = [];
  const protectedValue = value.replace(/\[\[image:([^|\]]+)(\|[^\]]*)?\]\]/g, (_, imagePath, captionPart = '') => {
    const index = protectedImagePaths.push(imagePath) - 1;
    return `[[image:__LUMITEACH_IMAGE_PATH_${index}__${captionPart}]]`;
  });

  const replaceTerm = (result, source, target) => {
    const escapedSource = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!/[A-Za-z0-9]/.test(source)) return result.replaceAll(source, target);
    const boundaryPattern = new RegExp(`(^|[^A-Za-z0-9])${escapedSource}(?=$|[^A-Za-z0-9])`, 'g');
    return result.replace(boundaryPattern, (_, prefix) => `${prefix}${target}`);
  };

  const normalizedValue = terms.reduce((result, [source, target]) => {
    return replaceTerm(result, source, target);
  }, protectedValue);

  return normalizedValue.replace(/__LUMITEACH_IMAGE_PATH_(\d+)__/g, (_, index) => protectedImagePaths[Number(index)] || '');
}

function hasKoreanText(value) {
  return /[가-힣]/.test(String(value || ''));
}

function getLocalizedTitleCandidate(key, fallback) {
  const translatedTitle = activeTranslations().articles?.[key]?.title || activeTranslations().manualTree?.[key]?.title || fallback;
  const normalizedTitle = normalizeTranslationTerms(translatedTitle);
  return hasKoreanText(normalizedTitle) ? '' : normalizedTitle;
}

function stripLeadingRenderableTitleNumber(title) {
  return String(title || '').replace(/^\s*\d{1,2}(?:[-.]\d+){0,4}\.?\s*/, '');
}

function getLeafArticleTitleNumber(number) {
  const segments = String(number || '').replace(/\.$/, '').split('-');
  if (segments.length < 3) return '';

  const leafNumber = Number(segments[segments.length - 1]);
  return Number.isFinite(leafNumber) ? `${leafNumber}.` : '';
}

function applyVisibleArticleTitleNumber(article, title) {
  const titleNumber = getLeafArticleTitleNumber(article?.number);
  if (!titleNumber) return title;

  const strippedTitle = stripLeadingRenderableTitleNumber(title);
  return strippedTitle ? `${titleNumber} ${strippedTitle}` : title;
}

const localizedToolkitTitleKeys = new Set(['toolkit-wheel', 'toolkit-dice', 'toolkit-bell', 'toolkit-sound-monitor', 'toolkit-clock', 'toolkit-annotate', 'toolkit-share-web-link', 'toolkit-quick-quiz', 'toolkit-quick-poll', 'toolkit-digital-timer', 'toolkit-hourglass', 'toolkit-pie-timer', 'toolkit-first-to-buzz', 'toolkit-presentation-lottery', 'toolkit-card-draw', 'toolkit-lucky-ladder', 'toolkit-group-maker', 'toolkit-ruler', 'toolkit-triangle', 'toolkit-protractor']);

function shouldUseCanonicalToolkitTitle(key, field) {
  return field === 'title' && key.startsWith('toolkit-') && !localizedToolkitTitleKeys.has(key);
}

function applyVisibleCategoryNumber(key, title) {
  const categoryNumber = categoryNumberMap.get(key);
  if (!categoryNumber) return title;
  return categoryNumber + ' ' + stripLeadingCategoryNumber(title);
}

function tTree(key, field, fallback) {
  if (shouldUseCanonicalToolkitTitle(key, field)) return fallback;

  const fallbackValue = field === 'title' ? applyVisibleCategoryNumber(key, fallback) : fallback;
  const localizedValue = activeTranslations().manualTree?.[key]?.[field];
  if (localizedValue) {
    const normalizedValue = normalizeTranslationTerms(localizedValue);
    if (!(currentLanguage !== defaultLanguage && hasKoreanText(normalizedValue))) {
      return field === 'title' ? applyVisibleCategoryNumber(key, normalizedValue) : normalizedValue;
    }
  }

  return fallbackValue;
}

function tArticleField(key, field, fallback) {
  if (shouldUseCanonicalToolkitTitle(key, field)) return fallback;

  const localizedArticle = activeTranslations().articles?.[key]?.[field];
  if (localizedArticle) {
    const value = normalizeTranslationTerms(localizedArticle);
    if (!(currentLanguage !== defaultLanguage && hasKoreanText(value))) return value;
  }

  if (field === 'title') {
    const localizedTreeTitle = activeTranslations().manualTree?.[key]?.title;
    if (localizedTreeTitle) {
      const value = normalizeTranslationTerms(localizedTreeTitle);
      if (!hasKoreanText(value)) return value;
    }
  }

  if (field === 'desc') {
    const localizedTreeDescription = activeTranslations().manualTree?.[key]?.description;
    if (localizedTreeDescription) {
      const value = normalizeTranslationTerms(localizedTreeDescription);
      if (!hasKoreanText(value)) return value;
    }
  }

  return fallback;
}

function tArticleArray(key, field, fallback) {
  const value = activeTranslations().articles?.[key]?.[field];
  if (Array.isArray(value)) {
    const normalizedValue = value.map((item) => normalizeTranslationTerms(item));
    if (!(currentLanguage !== defaultLanguage && normalizedValue.some((item) => hasKoreanText(item)))) {
      return normalizedValue;
    }
  }

  return fallback;
}

function tHubDescription(key, fallback) {
  const localizedDescription = activeTranslations().hubDescriptions?.[key];
  if (localizedDescription) {
    const normalizedDescription = normalizeTranslationTerms(localizedDescription);
    if (!(currentLanguage !== defaultLanguage && hasKoreanText(normalizedDescription))) return normalizedDescription;
  }

  return fallback;
}

function tArticleBody(key, index, fallback) {
  const localizedBody = activeTranslations().articleBodies?.[key]?.[index];
  if (localizedBody) {
    const normalizedBody = normalizeTranslationTerms(localizedBody);
    if (!(currentLanguage !== defaultLanguage && hasKoreanText(normalizedBody))) return normalizedBody;
  }

  return fallback;
}

function localizeArticle(article) {
  const title = tArticleField(article.key, 'title', article.title);

  return {
    ...article,
    category: tArticleField(article.key, 'category', article.category),
    title: applyVisibleArticleTitleNumber(article, title),
    desc: tArticleField(article.key, 'desc', article.desc),
    note: tArticleField(article.key, 'note', article.note),
    sections: tArticleArray(article.key, 'sections', article.sections)
  };
}

function applyStaticTranslations() {
  document.querySelector('.logo').textContent = tUI('logo');
  document.querySelector('.home-hero h1').textContent = tUI('homeTitle');
  document.querySelector('.home-hero p').textContent = tUI('homeDesc');
  document.getElementById('searchInput').placeholder = tUI('searchPlaceholder');
  document.querySelector('.section-title').textContent = tUI('categoryTitle');
  const languageLabel = document.querySelector('label[for="languageSelect"]');
  languageLabel.textContent = tUI('languageLabel');
  const languageSelect = document.getElementById('languageSelect');
  languageSelect.setAttribute('aria-label', tUI('languageLabel'));
  Array.from(languageSelect.options).forEach((option) => {
    option.textContent = tLanguageName(option.value);
  });
  const menuButton = document.getElementById('mobileMenuToggle');
  if (menuButton) {
    const open = document.body.classList.contains('mobile-nav-open');
    menuButton.setAttribute('aria-label', open ? tFixed('menuClose') : tFixed('menuOpen'));
  }
}

function findArticle(key) {
  return articles.find((article) => article.key === key) || articles[0];
}

function findTreePath(key) {
  for (const category of manualTree) {
    if (category.key === key) return [category.key];

    for (const group of category.children) {
      if (group.key === key || group.articles.some((article) => article.key === key)) {
        return [category.key, group.key];
      }
    }
  }

  return [];
}

function openTreePath(key) {
  findTreePath(key).forEach((treeKey) => openTreeKeys.add(treeKey));
}

function getPageDepth(key) {
  if (key.startsWith('cat-')) return 1;
  if (key.startsWith('group-')) return 2;
  return 3;
}

function isTreeGroupPage(key) {
  return manualTree.some((category) => category.children.some((group) => group.key === key));
}

function getChildPages(key) {
  const category = manualTree.find((item) => item.key === key);
  if (category) {
    return category.children.map((group) => findArticle(group.key));
  }

  const group = manualTree.flatMap((item) => item.children).find((item) => item.key === key);
  if (group && group.articles.length > 0) {
    return group.articles.map((article) => findArticle(article.key));
  }

  return [];
}

function getHubLabel(key) {
  return getPageDepth(key) === 1 ? tFixed('categoryLabel') : tFixed('sectionLabel');
}

function getHubMark(title) {
  return 'LT';
}

function getHubDescription(article) {
  const localized = localizeArticle(article);
  const copyParts = [localized.desc, localized.note]
    .filter(Boolean)
    .filter((item) => !(currentLanguage !== defaultLanguage && hasKoreanText(item)));
  const fallback = copyParts.join(' ') || hubDescriptions[article.key] || '';

  return tHubDescription(article.key, fallback);
}

function getHubMenuMeta(article) {
  const childPageCount = getChildPages(article.key).length;
  if (childPageCount > 0) return `${childPageCount}${tFixed('pageCount')}`;

  return tFixed('documentLabel');
}

function isCompactToolkitHub(key) {
  return key.startsWith('group-toolkit-');
}

const phosphorIcons = {
  plus: '<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H136v48a8,8,0,0,1-16,0V136H72a8,8,0,0,1,0-16h48V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z"/>',
  'pencil-simple-line': '<path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM192,108.69,147.32,64l24-24L216,84.69Z"/>',
  'text-aa': '<path d="M200,156c0,6.5-7.33,12-16,12s-16-5.5-16-12,7.33-12,16-12S200,149.5,200,156ZM232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM143.37,172.88l-44-104a8,8,0,0,0-14.74,0l-44,104a8,8,0,0,0,14.74,6.24L66.84,152h50.32l11.47,27.12a8,8,0,0,0,14.74-6.24ZM216,124c0-15.44-14.36-28-32-28a34.86,34.86,0,0,0-20.78,6.68,8,8,0,0,0,9.56,12.83A18.84,18.84,0,0,1,184,112c8.56,0,15.8,5.36,16,11.76v8A35.24,35.24,0,0,0,184,128c-17.64,0-32,12.56-32,28s14.36,28,32,28a35.13,35.13,0,0,0,16.93-4.26A8,8,0,0,0,216,176ZM73.61,136h36.78L92,92.53Z"/>',
  'squares-four': '<path d="M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z"/>',
  'tray-arrow-down': '<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM90.34,114.34a8,8,0,0,1,11.32,0L120,132.69V72a8,8,0,0,1,16,0v60.69l18.34-18.35a8,8,0,0,1,11.32,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32A8,8,0,0,1,90.34,114.34ZM208,208H48V168H76.69L96,187.32A15.89,15.89,0,0,0,107.31,192h41.38A15.86,15.86,0,0,0,160,187.31L179.31,168H208v40Z"/>',
  sparkle: '<path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z"/>',
  'users-three': '<path d="M64.12,147.8a4,4,0,0,1-4,4.2H16a8,8,0,0,1-7.8-6.17,8.35,8.35,0,0,1,1.62-6.93A67.79,67.79,0,0,1,37,117.51a40,40,0,1,1,66.46-35.8,3.94,3.94,0,0,1-2.27,4.18A64.08,64.08,0,0,0,64,144C64,145.28,64,146.54,64.12,147.8Zm182-8.91A67.76,67.76,0,0,0,219,117.51a40,40,0,1,0-66.46-35.8,3.94,3.94,0,0,0,2.27,4.18A64.08,64.08,0,0,1,192,144c0,1.28,0,2.54-.12,3.8a4,4,0,0,0,4,4.2H240a8,8,0,0,0,7.8-6.17A8.33,8.33,0,0,0,246.17,138.89Zm-89,43.18a48,48,0,1,0-58.37,0A72.13,72.13,0,0,0,65.07,212,8,8,0,0,0,72,224H184a8,8,0,0,0,6.93-12A72.15,72.15,0,0,0,157.19,182.07Z"/>',
  'presentation-chart': '<path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM104,144a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32,0a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z"/>',
  'sliders-horizontal': '<path d="M32,80a8,8,0,0,1,8-8H77.17a28,28,0,0,1,53.66,0H216a8,8,0,0,1,0,16H130.83a28,28,0,0,1-53.66,0H40A8,8,0,0,1,32,80Zm184,88H194.83a28,28,0,0,0-53.66,0H40a8,8,0,0,0,0,16H141.17a28,28,0,0,0,53.66,0H216a8,8,0,0,0,0-16Z"/>',
  'user-circle-gear': '<path d="M228.25,63.07l-4.66-2.69a23.6,23.6,0,0,0,0-8.76l4.66-2.69a8,8,0,0,0-8-13.86l-4.67,2.7A23.92,23.92,0,0,0,208,33.38V28a8,8,0,0,0-16,0v5.38a23.92,23.92,0,0,0-7.58,4.39l-4.67-2.7a8,8,0,1,0-8,13.86l4.66,2.69a23.6,23.6,0,0,0,0,8.76l-4.66,2.69a8,8,0,0,0,4,14.93,7.92,7.92,0,0,0,4-1.07l4.67-2.7A23.92,23.92,0,0,0,192,78.62V84a8,8,0,0,0,16,0V78.62a23.92,23.92,0,0,0,7.58-4.39l4.67,2.7a7.92,7.92,0,0,0,4,1.07,8,8,0,0,0,4-14.93ZM200,64a8,8,0,1,1,8-8A8,8,0,0,1,200,64ZM128,76a44,44,0,1,1-44,44A44,44,0,0,1,128,76Zm102.56,34.68a103.92,103.92,0,1,1-85.24-85.24,8,8,0,0,1-2.64,15.78A88.07,88.07,0,0,0,40,128a87.62,87.62,0,0,0,22.24,58.41A79.71,79.71,0,0,1,84,165.1a4,4,0,0,1,4.83.32,59.81,59.81,0,0,0,78.27,0,4,4,0,0,1,4.84-.32,79.86,79.86,0,0,1,21.79,21.31A87.62,87.62,0,0,0,216,128a88.85,88.85,0,0,0-1.22-14.68,8,8,0,1,1,15.78-2.64Z"/>',
  translate: '<path d="M160,129.89,175.06,160H144.94l6.36-12.7v0ZM224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM207.16,188.42l-40-80a8,8,0,0,0-14.32,0L139.66,134.8a62.31,62.31,0,0,1-23.61-10A79.61,79.61,0,0,0,135.6,80H152a8,8,0,0,0,0-16H112V56a8,8,0,0,0-16,0v8H56a8,8,0,0,0,0,16h63.48a63.73,63.73,0,0,1-15.3,34.05,65.93,65.93,0,0,1-9-13.61,8,8,0,0,0-14.32,7.12,81.75,81.75,0,0,0,11.4,17.15A63.62,63.62,0,0,1,56,136a8,8,0,0,0,0,16,79.56,79.56,0,0,0,48.11-16.13,78.33,78.33,0,0,0,28.18,13.66l-19.45,38.89a8,8,0,0,0,14.32,7.16L136.94,176h46.12l9.78,19.58a8,8,0,1,0,14.32-7.16Z"/>',
  'book-open-text': '<path d="M232,48H168a32,32,0,0,0-32,32v87.73a8.17,8.17,0,0,1-7.47,8.25,8,8,0,0,1-8.53-8V80A32,32,0,0,0,88,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,23.94,7.9,7.9,0,0,0,5.12,7.55A8,8,0,0,0,136,232a24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM208,168H168.27a8.17,8.17,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h39.73a8.17,8.17,0,0,1,8.25,7.47A8,8,0,0,1,208,168Zm0-32H168.27a8.17,8.17,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h39.73a8.17,8.17,0,0,1,8.25,7.47A8,8,0,0,1,208,136Zm0-32H168.27A8.17,8.17,0,0,1,160,96.53,8,8,0,0,1,168,88h39.73A8.17,8.17,0,0,1,216,95.47,8,8,0,0,1,208,104Z"/>',
  'books': '<path d="M231.65,194.55,198.46,36.75a16,16,0,0,0-19-12.39L132.65,34.42a16.08,16.08,0,0,0-12.3,19l33.19,157.8A16,16,0,0,0,169.16,224a16.25,16.25,0,0,0,3.38-.36l46.81-10.06A16.09,16.09,0,0,0,231.65,194.55ZM136,50.15c0-.06,0-.09,0-.09l46.8-10,3.33,15.87L139.33,66Zm10,47.38-3.35-15.9,46.82-10.06,3.34,15.9Zm70,100.41-46.8,10-3.33-15.87L212.67,182,216,197.85C216,197.91,216,197.94,216,197.94ZM104,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V48A16,16,0,0,0,104,32ZM56,48h48V64H56Zm48,160H56V192h48v16Z"/>',
  'graduation-cap': '<path d="M176,207.24a119,119,0,0,0,16-7.73V240a8,8,0,0,1-16,0Zm11.76-88.43-56-29.87a8,8,0,0,0-7.52,14.12L171,128l17-9.06Zm64-29.87-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V130.67L171,128l-43,22.93L43.83,106l0,0L25,96,128,41.07,231,96l-18.78,10-.06,0L188,118.94a8,8,0,0,1,4,6.93v73.64a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12Z"/>',
  'code': '<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM92.8,145.6a8,8,0,1,1-9.6,12.8l-32-24a8,8,0,0,1,0-12.8l32-24a8,8,0,0,1,9.6,12.8L69.33,128Zm58.89-71.4-32,112a8,8,0,1,1-15.38-4.4l32-112a8,8,0,0,1,15.38,4.4Zm53.11,60.2-32,24a8,8,0,0,1-9.6-12.8L186.67,128,163.2,110.4a8,8,0,1,1,9.6-12.8l32,24a8,8,0,0,1,0,12.8Z"/>',
  'question': '<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,168a12,12,0,1,1,12-12A12,12,0,0,1,128,192Zm8-48.72V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36s40,16.15,40,36C168,125.38,154.24,139.93,136,143.28Z"/>',
  'chats-circle': '<path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86Zm-16.25,1.47L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"/>',
  'lightbulb': '<path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-32.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z"/>',
  'clipboard-text': '<path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"/>',
  'book-open-user': '<path d="M240,80V200a8,8,0,0,1-8,8H160a24,24,0,0,0-24,23.94,7.9,7.9,0,0,1-5.12,7.55A8,8,0,0,1,120,232a24,24,0,0,0-24-24H24a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H88a32,32,0,0,1,32,32v63.73a8.17,8.17,0,0,0,7.47,8.25,8,8,0,0,0,8.53-8V104a32,32,0,0,1,32-32h64A8,8,0,0,1,240,80ZM88.81,56H89a47.92,47.92,0,0,1,36,17.4,4,4,0,0,0,6.08,0A47.92,47.92,0,0,1,167,56h.19a4,4,0,0,0,3.54-5.84,48,48,0,0,0-85.46,0A4,4,0,0,0,88.81,56Z"/>',
  'exam': '<path d="M96,113.89,107.06,136H84.94ZM232,56V216a8,8,0,0,1-11.58,7.16L192,208.94l-28.42,14.22a8,8,0,0,1-7.16,0L128,208.94,99.58,223.16a8,8,0,0,1-7.16,0L64,208.94,35.58,223.16A8,8,0,0,1,24,216V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM135.16,156.42l-32-64a8,8,0,0,0-14.32,0l-32,64a8,8,0,0,0,14.32,7.16L76.94,152h38.12l5.78,11.58a8,8,0,1,0,14.32-7.16ZM208,128a8,8,0,0,0-8-8H184V104a8,8,0,0,0-16,0v16H152a8,8,0,0,0,0,16h16v16a8,8,0,0,0,16,0V136h16A8,8,0,0,0,208,128Z"/>',
  'monitor-play': '<path d="M168,224a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,224ZM232,64V176a24,24,0,0,1-24,24H48a24,24,0,0,1-24-24V64A24,24,0,0,1,48,40H208A24,24,0,0,1,232,64Zm-68,56a8,8,0,0,0-3.41-6.55l-40-28A8,8,0,0,0,108,92v56a8,8,0,0,0,12.59,6.55l40-28A8,8,0,0,0,164,120Z"/>',
  'chart-bar': '<path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16h8V136a8,8,0,0,1,8-8H72a8,8,0,0,1,8,8v64H96V88a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8V200h16V40a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8V200h8A8,8,0,0,1,232,208Z"/>',
  'trophy': '<path d="M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"/>',
  'cards': '<path d="M200,88V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V88A16,16,0,0,1,40,72H184A16,16,0,0,1,200,88Zm16-48H64a8,8,0,0,0,0,16H216V176a8,8,0,0,0,16,0V56A16,16,0,0,0,216,40Z"/>',
  'magic-wand': '<path d="M248,152a8,8,0,0,1-8,8H224v16a8,8,0,0,1-16,0V160H192a8,8,0,0,1,0-16h16V128a8,8,0,0,1,16,0v16h16A8,8,0,0,1,248,152ZM56,72H72V88a8,8,0,0,0,16,0V72h16a8,8,0,0,0,0-16H88V40a8,8,0,0,0-16,0V56H56a8,8,0,0,0,0,16ZM184,192h-8v-8a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0v-8h8a8,8,0,0,0,0-16ZM219.31,80,80,219.31a16,16,0,0,1-22.62,0L36.68,198.63a16,16,0,0,1,0-22.63L176,36.69a16,16,0,0,1,22.63,0l20.68,20.68A16,16,0,0,1,219.31,80ZM208,68.69,187.31,48l-32,32L176,100.69Z"/>',
  'cursor-text': '<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm-64,88a8,8,0,0,1,0,16h-8v24a16,16,0,0,0,16,16h8a8,8,0,0,1,0,16h-8a31.92,31.92,0,0,1-24-10.87A31.92,31.92,0,0,1,104,192H96a8,8,0,0,1,0-16h8a16,16,0,0,0,16-16V136h-8a8,8,0,0,1,0-16h8V96a16,16,0,0,0-16-16H96a8,8,0,0,1,0-16h8a31.92,31.92,0,0,1,24,10.87A31.92,31.92,0,0,1,152,64h8a8,8,0,0,1,0,16h-8a16,16,0,0,0-16,16v24Z"/>',
  'intersect-square': '<path d="M216,88H168V40a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8V160a8,8,0,0,0,8,8H88v48a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V96A8,8,0,0,0,216,88ZM48,152V48H152V88H96a8,8,0,0,0-8,8v56Zm160,56H104V168h56a8,8,0,0,0,8-8V104h40Z"/>',
  'file-arrow-up': '<path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34Zm-56,67.32a8,8,0,0,1-11.32,0L136,139.31V184a8,8,0,0,1-16,0V139.31l-10.34,10.35a8,8,0,0,1-11.32-11.32l24-24a8,8,0,0,1,11.32,0l24,24A8,8,0,0,1,157.66,149.66ZM152,88V44l44,44Z"/>',
  'file-text': '<path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,176H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm-8-56V44l44,44Z"/>',
  'file-audio': '<path d="M152,180a40.55,40.55,0,0,1-20,34.91A8,8,0,0,1,124,201.09a24.49,24.49,0,0,0,0-42.18A8,8,0,0,1,132,145.09,40.55,40.55,0,0,1,152,180ZM99.06,128.61a8,8,0,0,0-8.72,1.73L68.69,152H48a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8H68.69l21.65,21.66A8,8,0,0,0,104,224V136A8,8,0,0,0,99.06,128.61ZM216,88V216a16,16,0,0,1-16,16H168a8,8,0,0,1,0-16h32V96H152a8,8,0,0,1-8-8V40H56v80a8,8,0,0,1-16,0V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-56-8h28.69L160,51.31Z"/>',
  'check-square': '<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm-34.34,77.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/>',
  'list-checks': '<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM117.66,149.66l-32,32a8,8,0,0,1-11.32,0l-16-16a8,8,0,0,1,11.32-11.32L80,164.69l26.34-26.35a8,8,0,0,1,11.32,11.32Zm0-64-32,32a8,8,0,0,1-11.32,0l-16-16A8,8,0,0,1,69.66,90.34L80,100.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM192,168H144a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm0-64H144a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Z"/>',
  'chat-circle-text': '<path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"/>',
  'arrows-down-up': '<path d="M119.39,172.94a8,8,0,0,1-1.73,8.72l-32,32a8,8,0,0,1-11.32,0l-32-32A8,8,0,0,1,48,168H72V48a8,8,0,0,1,16,0V168h24A8,8,0,0,1,119.39,172.94Zm94.27-98.6-32-32a8,8,0,0,0-11.32,0l-32,32A8,8,0,0,0,144,88h24V208a8,8,0,0,0,16,0V88h24a8,8,0,0,0,5.66-13.66Z"/>',
  'circles-three': '<path d="M128,120a44,44,0,1,1,44-44A44.05,44.05,0,0,1,128,120Zm60,8a44,44,0,1,0,44,44A44.05,44.05,0,0,0,188,128ZM68,128a44,44,0,1,0,44,44A44.05,44.05,0,0,0,68,128Z"/>',
  'check-circle': '<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/>',
  'star': '<path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"/>',
  'clock-countdown': '<path d="M208,96a12,12,0,1,1,12,12A12,12,0,0,1,208,96ZM196,72a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm28.66,56a8,8,0,0,0-8.63,7.31A88.12,88.12,0,1,1,120.66,40,8,8,0,0,0,119.34,24,104.12,104.12,0,1,0,232,136.66,8,8,0,0,0,224.66,128ZM128,56a72,72,0,1,1-72,72A72.08,72.08,0,0,1,128,56Zm-8,72a8,8,0,0,0,8,8h48a8,8,0,0,0,0-16H136V80a8,8,0,0,0-16,0Zm40-80a12,12,0,1,0-12-12A12,12,0,0,0,160,48Z"/>',
  'dice-five': '<path d="M192,32H64A32,32,0,0,0,32,64V192a32,32,0,0,0,32,32H192a32,32,0,0,0,32-32V64A32,32,0,0,0,192,32ZM92,176a12,12,0,1,1,12-12A12,12,0,0,1,92,176Zm0-72a12,12,0,1,1,12-12A12,12,0,0,1,92,104Zm36,36a12,12,0,1,1,12-12A12,12,0,0,1,128,140Zm36,36a12,12,0,1,1,12-12A12,12,0,0,1,164,176Zm0-72a12,12,0,1,1,12-12A12,12,0,0,1,164,104Z"/>',
  'bell-ringing': '<path d="M224,71.1a8,8,0,0,1-10.78-3.42,94.13,94.13,0,0,0-33.46-36.91,8,8,0,1,1,8.54-13.54,111.46,111.46,0,0,1,39.12,43.09A8,8,0,0,1,224,71.1ZM35.71,72a8,8,0,0,0,7.1-4.32A94.13,94.13,0,0,1,76.27,30.77a8,8,0,1,0-8.54-13.54A111.46,111.46,0,0,0,28.61,60.32,8,8,0,0,0,35.71,72Zm186.1,103.94A16,16,0,0,1,208,200H167.2a40,40,0,0,1-78.4,0H48a16,16,0,0,1-13.79-24.06C43.22,160.39,48,138.28,48,112a80,80,0,0,1,160,0C208,138.27,212.78,160.38,221.81,175.94ZM150.62,200H105.38a24,24,0,0,0,45.24,0Z"/>',
  'gauge': '<path d="M240,152v24a16,16,0,0,1-16,16H115.93a4,4,0,0,1-3.24-6.35L174.27,101a8.21,8.21,0,0,0-1.37-11.3,8,8,0,0,0-11.37,1.61l-72,99.06A4,4,0,0,1,86.25,192H32a16,16,0,0,1-16-16V153.13c0-1.79,0-3.57.13-5.33a4,4,0,0,1,4-3.8H48a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,47.73,128H23.92a4,4,0,0,1-3.87-5c12-43.84,49.66-77.13,95.52-82.28a4,4,0,0,1,4.43,4V72a8,8,0,0,0,8.53,8A8.17,8.17,0,0,0,136,71.73V44.67a4,4,0,0,1,4.43-4A112.18,112.18,0,0,1,236.23,123a4,4,0,0,1-3.88,5H208.27a8.17,8.17,0,0,0-8.25,7.47,8,8,0,0,0,8,8.53h27.92a4,4,0,0,1,4,3.86C240,149.23,240,150.61,240,152Z"/>',
  'clock': '<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z"/>',
  'note-pencil': '<path d="M224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Zm5.66-58.34-96,96A8,8,0,0,1,128,168H96a8,8,0,0,1-8-8V128a8,8,0,0,1,2.34-5.66l96-96a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,229.66,69.66Zm-17-5.66L192,43.31,179.31,56,200,76.69Z"/>',
  'link-simple': '<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM144.56,173.66l-21.45,21.45a44,44,0,0,1-62.22-62.22l21.45-21.46a8,8,0,0,1,11.32,11.31L72.2,144.2a28,28,0,0,0,39.6,39.6l21.45-21.46a8,8,0,0,1,11.31,11.32Zm-34.9-16a8,8,0,0,1-11.32-11.32l48-48a8,8,0,0,1,11.32,11.32Zm85.45-34.55-21.45,21.45a8,8,0,0,1-11.32-11.31L183.8,111.8a28,28,0,0,0-39.6-39.6L122.74,93.66a8,8,0,0,1-11.31-11.32l21.46-21.45a44,44,0,0,1,62.22,62.22Z"/>',
  'chart-pie-slice': '<path d="M100,116.43a8,8,0,0,0,4-6.93v-72A8,8,0,0,0,93.34,30,104.06,104.06,0,0,0,25.73,147a8,8,0,0,0,4.52,5.81,7.86,7.86,0,0,0,3.35.74,8,8,0,0,0,4-1.07ZM88,49.62v55.26L40.12,132.51C40,131,40,129.48,40,128A88.12,88.12,0,0,1,88,49.62ZM232,128A104,104,0,0,1,38.32,180.7a8,8,0,0,1,2.87-11L120,123.83V32a8,8,0,0,1,8-8,104.05,104.05,0,0,1,89.74,51.48c.11.16.21.32.31.49s.2.37.29.55A103.34,103.34,0,0,1,232,128Z"/>',
  'lightning': '<path d="M213.85,125.46l-112,120a8,8,0,0,1-13.69-7l14.66-73.33L45.19,143.49a8,8,0,0,1-3-13l112-120a8,8,0,0,1,13.69,7L153.18,90.9l57.63,21.61a8,8,0,0,1,3,12.95Z"/>',
  'ticket': '<path d="M232,104a8,8,0,0,0,8-8V64a16,16,0,0,0-16-16H32A16,16,0,0,0,16,64V96a8,8,0,0,0,8,8,24,24,0,0,1,0,48,8,8,0,0,0-8,8v32a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V160a8,8,0,0,0-8-8,24,24,0,0,1,0-48ZM32,167.2a40,40,0,0,0,0-78.4V64H88V192H32Z"/>',
  'ladder': '<path d="M215.52,213.26,164.51,73l9.09-25H184a8,8,0,0,0,0-16H88a8,8,0,0,0,0,16h4.58L32.48,213.26a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,40,224a8,8,0,0,0,7.52-5.27L57.24,192h47l-7.74,21.26a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,104,224a8,8,0,0,0,7.52-5.27L130,168H182l18.45,50.73A8,8,0,0,0,208,224a8.14,8.14,0,0,0,2.73-.48A8,8,0,0,0,215.52,213.26ZM109.39,64h30a8,8,0,0,1,0,16H109.39a8,8,0,1,1,0-16Zm.86,96H80.3a8,8,0,0,1,0-16h30a8,8,0,0,1,0,16Zm14.54-40H94.84a8,8,0,0,1,0-16h30a8,8,0,0,1,0,16Zm11,32L156,96.41,176.21,152Z"/>',
  'ruler': '<path d="M235.32,96,96,235.31a16,16,0,0,1-22.63,0L20.68,182.63a16,16,0,0,1,0-22.63l29.17-29.17a4,4,0,0,1,5.66,0l34.83,34.83a8,8,0,0,0,11.71-.43,8.18,8.18,0,0,0-.6-11.09L66.82,119.51a4,4,0,0,1,0-5.65l15-15a4,4,0,0,1,5.66,0l34.83,34.83a8,8,0,0,0,11.71-.43,8.18,8.18,0,0,0-.6-11.09L98.83,87.51a4,4,0,0,1,0-5.65l15-15a4,4,0,0,1,5.65,0l34.83,34.83a8,8,0,0,0,11.72-.43,8.18,8.18,0,0,0-.61-11.09L130.83,55.51a4,4,0,0,1,0-5.65L160,20.69a16,16,0,0,1,22.63,0l52.69,52.68A16,16,0,0,1,235.32,96Z"/>',
  'triangle': '<path d="M236.78,211.81A24.34,24.34,0,0,1,215.45,224H40.55a24.34,24.34,0,0,1-21.33-12.19,23.51,23.51,0,0,1,0-23.72L106.65,36.22a24.76,24.76,0,0,1,42.7,0L236.8,188.09A23.51,23.51,0,0,1,236.78,211.81Z"/>',
  'angle': '<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM112,88a64.07,64.07,0,0,1,64,64,8,8,0,0,1-16,0,48.05,48.05,0,0,0-48-48,8,8,0,0,1,0-16Zm88,104H80a8,8,0,0,1-8-8V104H56a8,8,0,0,1,0-16H72V72a8,8,0,0,1,16,0V176H200a8,8,0,0,1,0,16Z"/>',
  'calculator': '<path d="M200,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24ZM88,200a12,12,0,1,1,12-12A12,12,0,0,1,88,200Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,88,160Zm40,40a12,12,0,1,1,12-12A12,12,0,0,1,128,200Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,128,160Zm40,40a12,12,0,1,1,12-12A12,12,0,0,1,168,200Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,168,160Zm16-56a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8Z"/>',
  'magnifying-glass': '<path d="M168,112a56,56,0,1,1-56-56A56,56,0,0,1,168,112Zm61.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88,88,0,1,1,11.32-11.31l50.06,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z"/>',
  'folders': '<path d="M224,64H154.67L126.93,43.2a16.12,16.12,0,0,0-9.6-3.2H72A16,16,0,0,0,56,56V72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H192.89A15.13,15.13,0,0,0,208,200.89V184h16.89A15.13,15.13,0,0,0,240,168.89V80A16,16,0,0,0,224,64Zm0,104H208V112a16,16,0,0,0-16-16H122.67L94.93,75.2a16.12,16.12,0,0,0-9.6-3.2H72V56h45.33L147.2,78.4A8,8,0,0,0,152,80h72Z"/>',
  'list-magnifying-glass': '<path d="M32,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H40A8,8,0,0,1,32,64Zm8,72h72a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Zm88,48H40a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16Zm109.66,2.34L217.36,166A40,40,0,1,0,206,177.36l20.3,20.3a8,8,0,0,0,11.32-11.32Z"/>',
  'dots-three-circle': '<path d="M128,24A104,104,0,1,0,232,128,104.13,104.13,0,0,0,128,24ZM84,140a12,12,0,1,1,12-12A12,12,0,0,1,84,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,172,140Z"/>',
  'identification-card': '<path d="M112,120a16,16,0,1,1-16-16A16,16,0,0,1,112,120ZM232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM135.75,166a39.76,39.76,0,0,0-17.19-23.34,32,32,0,1,0-45.12,0A39.84,39.84,0,0,0,56.25,166a8,8,0,0,0,15.5,4c2.64-10.25,13.06-18,24.25-18s21.62,7.73,24.25,18a8,8,0,1,0,15.5-4ZM200,144a8,8,0,0,0-8-8H152a8,8,0,0,0,0,16h40A8,8,0,0,0,200,144Zm0-32a8,8,0,0,0-8-8H152a8,8,0,0,0,0,16h40A8,8,0,0,0,200,112Z"/>',
  'chalkboard-teacher': '<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H53.39a8,8,0,0,0,7.23-4.57,48,48,0,0,1,86.76,0,8,8,0,0,0,7.23,4.57H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM104,168a32,32,0,1,1,32-32A32,32,0,0,1,104,168Zm112,32H159.43a63.93,63.93,0,0,0-13.16-16H192a8,8,0,0,0,8-8V80a8,8,0,0,0-8-8H64a8,8,0,0,0-8,8v96a8,8,0,0,0,6,7.75A63.72,63.72,0,0,0,48.57,200H40V56H216Z"/>',
  'chalkboard': '<path d="M240,192h-8V56a16,16,0,0,0-16-16H40A16,16,0,0,0,24,56V192H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16Zm-24,0H144V176a8,8,0,0,1,8-8h56a8,8,0,0,1,8,8Zm0-48a8,8,0,0,1-16,0V72H56V184a8,8,0,0,1-16,0V64a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8Z"/>',
  'article': '<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM176,168H80a8,8,0,0,1,0-16h96a8,8,0,0,1,0,16Zm0-32H80a8,8,0,0,1,0-16h96a8,8,0,0,1,0,16Zm0-32H80a8,8,0,0,1,0-16h96a8,8,0,0,1,0,16Z"/>',
  'circle-notch': '<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,176A72,72,0,0,1,92,65.64a8,8,0,0,1,8,13.85,56,56,0,1,0,56,0,8,8,0,0,1,8-13.85A72,72,0,0,1,128,200Z"/>',
  'arrow-square-up': '<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm-42.34,93.66a8,8,0,0,1-11.32,0L136,107.31V168a8,8,0,0,1-16,0V107.31l-18.34,18.35a8,8,0,0,1-11.32-11.32l32-32a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,165.66,125.66Z"/>',
  'math-operations': '<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM146.34,77.66a8,8,0,0,1,11.32-11.32L168,76.69l10.34-10.35a8,8,0,0,1,11.32,11.32L179.31,88l10.35,10.34a8,8,0,0,1-11.32,11.32L168,99.31l-10.34,10.35a8,8,0,0,1-11.32-11.32L156.69,88ZM112,176H96v16a8,8,0,0,1-16,0V176H64a8,8,0,0,1,0-16H80V144a8,8,0,0,1,16,0v16h16a8,8,0,0,1,0,16Zm0-80H64a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm80,96H144a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm0-32H144a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Z"/>',
  'folder-open': '<path d="M245,110.64A16,16,0,0,0,232,104H216V88a16,16,0,0,0-16-16H130.67L102.94,51.2a16.14,16.14,0,0,0-9.6-3.2H40A16,16,0,0,0,24,64V208h0a8,8,0,0,0,8,8H211.1a8,8,0,0,0,7.59-5.47l28.49-85.47A16.05,16.05,0,0,0,245,110.64ZM93.34,64,123.2,86.4A8,8,0,0,0,128,88h72v16H69.77a16,16,0,0,0-15.18,10.94L40,158.7V64Z"/>',
  'brain': '<path d="M212,76V72a44,44,0,0,0-74.86-31.31,3.93,3.93,0,0,0-1.14,2.8v88.72a4,4,0,0,0,6.2,3.33A47.67,47.67,0,0,1,167.68,128a8.18,8.18,0,0,1,8.31,7.58,8,8,0,0,1-8,8.42,32,32,0,0,0-32,32v33.88a4,4,0,0,0,1.49,3.12,47.92,47.92,0,0,0,74.21-17.16,4,4,0,0,0-4.49-5.56A68.06,68.06,0,0,1,192,192h-7.73a8.18,8.18,0,0,1-8.25-7.47,8,8,0,0,1,8-8.53h8a51.6,51.6,0,0,0,24-5.88v0A52,52,0,0,0,212,76Zm-12,36h-4a36,36,0,0,1-36-36V72a8,8,0,0,1,16,0v4a20,20,0,0,0,20,20h4a8,8,0,0,1,0,16ZM88,28A44.05,44.05,0,0,0,44,72v4a52,52,0,0,0-4,94.12h0A51.6,51.6,0,0,0,64,176h7.73A8.18,8.18,0,0,1,80,183.47,8,8,0,0,1,72,192H64a67.48,67.48,0,0,1-15.21-1.73,4,4,0,0,0-4.5,5.55A47.93,47.93,0,0,0,118.51,213a4,4,0,0,0,1.49-3.12V176a32,32,0,0,0-32-32,8,8,0,0,1-8-8.42A8.18,8.18,0,0,1,88.32,128a47.67,47.67,0,0,1,25.48,7.54,4,4,0,0,0,6.2-3.33V43.49a4,4,0,0,0-1.14-2.81A43.85,43.85,0,0,0,88,28Zm8,48a36,36,0,0,1-36,36H56a8,8,0,0,1,0-16h4A20,20,0,0,0,80,76V72a8,8,0,0,1,16,0Z"/>',
  'list-numbers': '<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM56.84,75.58a8,8,0,0,1,3.58-10.74l16-8A8,8,0,0,1,88,64v48a8,8,0,0,1-16,0V76.94l-4.42,2.22A8,8,0,0,1,56.84,75.58ZM92,180a8,8,0,0,1,0,16H68a8,8,0,0,1-6.4-12.8l21.67-28.89A3.92,3.92,0,0,0,84,152a4,4,0,0,0-7.77-1.33,8,8,0,0,1-15.09-5.34,20,20,0,1,1,35,18.53L84,180Zm100,4H120a8,8,0,0,1,0-16h72a8,8,0,0,1,0,16Zm0-48H120a8,8,0,0,1,0-16h72a8,8,0,0,1,0,16Zm0-48H120a8,8,0,0,1,0-16h72a8,8,0,0,1,0,16Z"/>',
  'browser': '<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V88H40V56Z"/>',
  'play': '<path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"/>',
  'hourglass': '<path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.08,16.08,0,0,0,6.41,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16,16,0,0,0-6.36-12.77L141.26,128l52.38-39.59A16.05,16.05,0,0,0,200,75.64Z"/>',
  'arrow-counter-clockwise': '<path d="M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L60.63,81.29l17,17A8,8,0,0,1,72,112H24a8,8,0,0,1-8-8V56A8,8,0,0,1,29.66,50.3L49.31,70,60.25,60A96,96,0,0,1,224,128Z"/>',
  eye: '<path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"/>',
  'paint-bucket': '<path d="M256,208a24,24,0,0,1-48,0c0-17.91,15.57-41.77,17.34-44.44a8,8,0,0,1,13.32,0C240.43,166.23,256,190.09,256,208ZM132.49,124.49a12,12,0,0,0-17-17l0,0s0,0,0,0a12,12,0,0,0,17,16.94ZM37.65,18.34A8,8,0,0,0,26.34,29.66l32.6,32.6L70.25,51ZM234.53,139.07a8,8,0,0,0,3.13-13.24L122.17,10.34a8,8,0,0,0-11.31,0L70.25,51l40.43,40.42a28,28,0,1,1-11.31,11.32L58.94,62.26,15,106.17a24,24,0,0,0,0,33.94L99.89,225a24,24,0,0,0,33.94,0l78.49-78.49Z"/>',
  'image-square': '<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H208v77.38l-24.69-24.7a16,16,0,0,0-22.62,0L53.37,208H48ZM80,96a16,16,0,1,1,16,16A16,16,0,0,1,80,96Z"/>',
  'gear-six': '<path d="M237.94,107.21a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A111.92,111.92,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.63a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,214.15,158.12,231a7.91,7.91,0,0,0,3.9,1,8.09,8.09,0,0,0,2.57-.42,112.1,112.1,0,0,0,36.68-20.73,8,8,0,0,0,2.83-6.07l.15-33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"/>'
};

const phosphorDuotoneIcons = {
  'gear-six': '<path d="M230.1,108.76,198.25,90.62c-.64-1.16-1.31-2.29-2-3.41l-.12-36A104.61,104.61,0,0,0,162,32L130,49.89c-1.34,0-2.69,0-4,0L94,32A104.58,104.58,0,0,0,59.89,51.25l-.16,36c-.7,1.12-1.37,2.26-2,3.41l-31.84,18.1a99.15,99.15,0,0,0,0,38.46l31.85,18.14c.64,1.16,1.31,2.29,2,3.41l.12,36A104.61,104.61,0,0,0,94,224l32-17.87c1.34,0,2.69,0,4,0L162,224a104.58,104.58,0,0,0,34.08-19.25l.16-36c.7-1.12,1.37-2.26,2-3.41l31.84-18.1A99.15,99.15,0,0,0,230.1,108.76ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" opacity="0.2"/><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm109.94-52.79a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A111.92,111.92,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.63a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,214.15,158.12,231a7.91,7.91,0,0,0,3.9,1,8.09,8.09,0,0,0,2.57-.42,112.1,112.1,0,0,0,36.68-20.73,8,8,0,0,0,2.83-6.07l.15-33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21Zm-15,34.91-28.57,16.25a8,8,0,0,0-3,3c-.58,1-1.19,2.06-1.81,3.06a7.94,7.94,0,0,0-1.22,4.21l-.15,32.25a95.89,95.89,0,0,1-25.37,14.3L134,199.13a8,8,0,0,0-3.91-1h-.19c-1.21,0-2.43,0-3.64,0a8.1,8.1,0,0,0-4.1,1l-28.84,16.1A96,96,0,0,1,67.88,201l-.11-32.2a8,8,0,0,0-1.22-4.22c-.62-1-1.23-2-1.8-3.06a8.09,8.09,0,0,0-3-3.06l-28.6-16.29a90.49,90.49,0,0,1,0-28.26L61.67,97.63a8,8,0,0,0,3-3c.58-1,1.19-2.06,1.81-3.06a7.94,7.94,0,0,0,1.22-4.21l.15-32.25a95.89,95.89,0,0,1,25.37-14.3L122,56.87a8,8,0,0,0,4.1,1c1.21,0,2.43,0,3.64,0a8,8,0,0,0,4.1-1l28.84-16.1A96,96,0,0,1,188.12,55l.11,32.2a8,8,0,0,0,1.22,4.22c.62,1,1.23,2,1.8,3.06a8.09,8.09,0,0,0,3,3.06l28.6,16.29A90.49,90.49,0,0,1,222.9,142.12Z"/>',
  'sliders-horizontal': '<path d="M128,80a24,24,0,1,1-24-24A24,24,0,0,1,128,80Zm40,72a24,24,0,1,0,24,24A24,24,0,0,0,168,152Z" opacity="0.2"/><path d="M40,88H73a32,32,0,0,0,62,0h81a8,8,0,0,0,0-16H135a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16Zm64-24A16,16,0,1,1,88,80,16,16,0,0,1,104,64ZM216,168H199a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16h97a32,32,0,0,0,62,0h17a8,8,0,0,0,0-16Zm-48,24a16,16,0,1,1,16-16A16,16,0,0,1,168,192Z"/>',
  'user-circle-gear': '<path d="M224,128a95.76,95.76,0,0,1-31.8,71.37A72,72,0,0,0,128,160a40,40,0,1,0-40-40,40,40,0,0,0,40,40,72,72,0,0,0-64.2,39.37h0A96,96,0,0,1,184.92,50.69a16,16,0,0,0,20.39,20.39A95.61,95.61,0,0,1,224,128Z" opacity="0.2"/><path d="M228.25,63.07l-4.66-2.69a23.6,23.6,0,0,0,0-8.76l4.66-2.69a8,8,0,0,0-8-13.86l-4.67,2.7A23.92,23.92,0,0,0,208,33.38V28a8,8,0,0,0-16,0v5.38a23.92,23.92,0,0,0-7.58,4.39l-4.67-2.7a8,8,0,1,0-8,13.86l4.66,2.69a23.6,23.6,0,0,0,0,8.76l-4.66,2.69a8,8,0,0,0,4,14.93,7.92,7.92,0,0,0,4-1.07l4.67-2.7A23.92,23.92,0,0,0,192,78.62V84a8,8,0,0,0,16,0V78.62a23.92,23.92,0,0,0,7.58-4.39l4.67,2.7a7.92,7.92,0,0,0,4,1.07,8,8,0,0,0,4-14.93ZM192,56a8,8,0,1,1,8,8A8,8,0,0,1,192,56Zm29.35,48.11a8,8,0,0,0-6.57,9.21A88.85,88.85,0,0,1,216,128a87.62,87.62,0,0,1-22.24,58.41,79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75A88,88,0,0,1,128,40a88.76,88.76,0,0,1,14.68,1.22,8,8,0,0,0,2.64-15.78,103.92,103.92,0,1,0,85.24,85.24A8,8,0,0,0,221.35,104.11ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0Z"/>',
  translate: '<path d="M224,184H144l40-80ZM96,127.56h0A95.78,95.78,0,0,0,128,56H64A95.78,95.78,0,0,0,96,127.56Z" opacity="0.2"/><path d="M247.15,212.42l-56-112a8,8,0,0,0-14.31,0l-21.71,43.43A88,88,0,0,1,108,126.93,103.65,103.65,0,0,0,135.69,64H160a8,8,0,0,0,0-16H104V32a8,8,0,0,0-16,0V48H32a8,8,0,0,0,0,16h87.63A87.7,87.7,0,0,1,96,116.35a87.74,87.74,0,0,1-19-31,8,8,0,1,0-15.08,5.34A103.63,103.63,0,0,0,84,127a87.55,87.55,0,0,1-52,17,8,8,0,0,0,0,16,103.46,103.46,0,0,0,64-22.08,104.18,104.18,0,0,0,51.44,21.31l-26.6,53.19a8,8,0,0,0,14.31,7.16L148.94,192h70.11l13.79,27.58A8,8,0,0,0,240,224a8,8,0,0,0,7.15-11.58ZM156.94,176,184,121.89,211.05,176Z"/>',
  sparkle: '<path d="M194.82,151.43l-55.09,20.3-20.3,55.09a7.92,7.92,0,0,1-14.86,0l-20.3-55.09-55.09-20.3a7.92,7.92,0,0,1,0-14.86l55.09-20.3,20.3-55.09a7.92,7.92,0,0,1,14.86,0l20.3,55.09,55.09,20.3A7.92,7.92,0,0,1,194.82,151.43Z" opacity="0.2"/><path d="M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z"/>'
};

const hubSvgIcons = {
  play: '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M24 17v30l24-15L24 17z" fill="currentColor"/></svg>',
  browser: '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><rect x="9" y="14" width="46" height="36" rx="8" fill="none" stroke="currentColor" stroke-width="5"/><path d="M9 26h46" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="20" cy="20" r="2.6" fill="currentColor"/><circle cx="29" cy="20" r="2.6" fill="currentColor"/></svg>',
  document: '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M18 9h21l11 11v35H18V9z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M39 9v13h13" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M26 34h18M26 44h14" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
  'idea-board': '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="13" width="44" height="34" rx="8" fill="none" stroke="currentColor" stroke-width="5"/><path d="M21 51h22" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><circle cx="24" cy="28" r="4" fill="currentColor"/><circle cx="34" cy="23" r="4" fill="currentColor"/><circle cx="42" cy="34" r="4" fill="currentColor"/></svg>',
  brainstorm: '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><circle cx="22" cy="36" r="7" fill="currentColor"/><circle cx="43" cy="36" r="7" fill="currentColor"/><path d="M10 54c2-8 8-12 16-12s14 4 16 12M28 54c2-8 8-12 16-12s14 4 16 12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M15 12h19a7 7 0 0 1 0 14H24l-8 6v-6h-1a7 7 0 0 1 0-14zM39 13h8a7 7 0 0 1 0 14h-2" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/></svg>',
  whiteboard: '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><rect x="9" y="10" width="46" height="30" rx="5" fill="none" stroke="currentColor" stroke-width="5"/><path d="M20 47h24M32 40v7" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M17 30l7-7 7 7 9-11 7 7" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 55l6-2 27-27a5 5 0 0 0-7-7L14 46l-2 6 3 3z" fill="#fff" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round"/><path d="M37 22l6 6" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/></svg>',
  rewrite: '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><rect x="12" y="14" width="32" height="38" rx="6" fill="none" stroke="currentColor" stroke-width="5"/><path d="M21 26h15M21 36h20M21 46h11M48 10l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" fill="currentColor"/></svg>',
  'true-false': '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><circle cx="23" cy="32" r="14" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="45" cy="32" r="14" fill="none" stroke="currentColor" stroke-width="5"/><path d="M15 32l6 6 11-13M39 26l12 12M51 26L39 38" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'multiple-choice': '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><rect x="12" y="13" width="10" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="4"/><rect x="12" y="29" width="10" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="4"/><rect x="12" y="45" width="10" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="4"/><path d="M16 33l3 3 7-8M31 18h20M31 34h20M31 50h20" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'short-answer': '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M14 48h36M14 36h20" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M31 45l5-1 17-17a5 5 0 0 0-7-7L29 37l-1 5 3 3z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg>',
  matching: '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><circle cx="17" cy="18" r="5" fill="currentColor"/><circle cx="17" cy="32" r="5" fill="currentColor"/><circle cx="17" cy="46" r="5" fill="currentColor"/><circle cx="47" cy="18" r="5" fill="currentColor"/><circle cx="47" cy="32" r="5" fill="currentColor"/><circle cx="47" cy="46" r="5" fill="currentColor"/><path d="M22 18h20M22 32l20 14M22 46l20-14" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/></svg>',
  'open-ended': '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M14 15h36a8 8 0 0 1 8 8v17a8 8 0 0 1-8 8H31l-13 8v-8h-4a8 8 0 0 1-8-8V23a8 8 0 0 1 8-8z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M18 28h28M18 38h20" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
  sequencing: '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><circle cx="22" cy="16" r="6" fill="currentColor"/><circle cx="42" cy="32" r="6" fill="currentColor"/><circle cx="22" cy="48" r="6" fill="currentColor"/><path d="M27 19l10 8M37 37l-10 8M42 41v11l8-5.5L42 41z" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'agree-disagree': '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><rect x="9" y="15" width="20" height="34" rx="8" fill="none" stroke="currentColor" stroke-width="5"/><rect x="35" y="15" width="20" height="34" rx="8" fill="none" stroke="currentColor" stroke-width="5"/><path d="M14 32l5 5 8-12M40 26l10 12M50 26L40 38" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'opinion-scale': '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M13 34h38" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><circle cx="15" cy="34" r="5" fill="currentColor"/><circle cx="24" cy="34" r="5" fill="currentColor"/><circle cx="33" cy="34" r="7" fill="currentColor"/><circle cx="42" cy="34" r="5" fill="currentColor"/><circle cx="51" cy="34" r="5" fill="currentColor"/><path d="M33 18v8M33 42v8" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
  'traffic-light': '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><rect x="20" y="8" width="24" height="48" rx="12" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="32" cy="20" r="5" fill="currentColor"/><circle cx="32" cy="32" r="5" fill="currentColor"/><circle cx="32" cy="44" r="5" fill="currentColor"/></svg>',
  vote: '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M17 31h30l5 12v11H12V43l5-12z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M21 30l17-17 9 9-17 17-9-9zM24 43h16" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/></svg>',
  assignment: '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M16 11h25l9 9v33H16V11z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M40 11v11h11M24 36h14M38 36l-6-6M38 36l-6 6" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'self-study': '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M12 16h18a8 8 0 0 1 8 8v28a8 8 0 0 0-8-8H12V16zM52 16H38a8 8 0 0 0-8 8" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><circle cx="45" cy="32" r="6" fill="currentColor"/><path d="M34 51c2-8 7-12 13-12s11 4 13 12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
  assessment: '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><rect x="15" y="12" width="34" height="42" rx="7" fill="none" stroke="currentColor" stroke-width="5"/><path d="M25 11h14M23 31l6 6 12-14M24 45h16" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  class: '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="23" r="8" fill="currentColor"/><circle cx="17" cy="30" r="6" fill="currentColor"/><circle cx="47" cy="30" r="6" fill="currentColor"/><path d="M13 52c2-9 9-14 19-14s17 5 19 14M5 52c1-6 5-10 12-10M47 42c7 0 11 4 12 10" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
  'teaching-report': '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="12" width="44" height="30" rx="6" fill="none" stroke="currentColor" stroke-width="5"/><path d="M21 34V24M32 34V19M43 34v-7M22 51h20M32 42v9" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
  'assignment-report': '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M18 10h28v44H18V10z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M27 42V31M37 42V22M26 21h11M26 51h12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
  'class-management': '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><circle cx="26" cy="24" r="8" fill="currentColor"/><path d="M10 50c2-10 8-15 16-15s14 5 16 15" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><circle cx="47" cy="38" r="9" fill="none" stroke="currentColor" stroke-width="5"/><path d="M47 25v5M47 46v5M34 38h5M55 38h5" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
  storage: '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M8 21h18l5 6h25v24H8V21z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M12 18h16l4 5" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
  creator: '<svg class="hub-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><rect x="12" y="13" width="40" height="38" rx="8" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="30" cy="29" r="7" fill="currentColor"/><path d="M18 47c2-8 7-12 12-12s10 4 12 12M48 17l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" fill="currentColor"/></svg>'
};

function renderHubIcon(visual) {
  if (visual.iconLibrary === 'phosphor' && visual.iconType) {
    const iconWeight = visual.iconWeight === 'duotone' ? 'duotone' : 'fill';
    const phosphorSet = iconWeight === 'duotone' ? phosphorDuotoneIcons : phosphorIcons;
    const svgPaths = phosphorSet[visual.iconType] || phosphorIcons[visual.iconType];
    if (svgPaths) {
      return `<svg class="hub-svg-icon phosphor-icon phosphor-${iconWeight}" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">${svgPaths}</svg>`;
    }
  }

  if (visual.iconType && hubSvgIcons[visual.iconType]) {
    return hubSvgIcons[visual.iconType];
  }

  return escapeHtml(visual.icon);
}

function renderHubVisual(article) {
  const visual = hubVisuals[article.key] || {
    icon: article.number,
    bg: 'linear-gradient(135deg, #f7f7f6, #eaf1ff)',
    color: 'var(--active-text)',
    size: '28px'
  };

  const style = [
    `--symbol-bg:${visual.bg}`,
    `--symbol-color:${visual.color}`,
    `--symbol-size:${visual.size || '38px'}`
  ].join(';');

  return `
    <span class="hub-thumb" aria-hidden="true">
      <span class="hub-symbol" style="${escapeHtml(style)}">${renderHubIcon(visual)}</span>
    </span>
  `;
}

function getCoverVisual(article) {
  return hubVisuals[article.key] || hubCovers[article.key] || {
    icon: article.number,
    bg: 'linear-gradient(135deg, #f7f7f6, #eaf1ff)',
    color: 'var(--active-text)',
    size: '28px'
  };
}

function getCoverTileLayout(index, count) {
  const safeCount = Math.max(count, 1);
  const center = (safeCount - 1) / 2;
  const distance = Math.abs(index - center);
  const maxDistance = Math.max(Math.ceil((safeCount - 1) / 2), 1);
  const spacing = safeCount === 1 ? 0 : 76;
  const normalizedDistance = distance / maxDistance;

  return {
    x: Math.round((index - center) * spacing),
    y: 0,
    rotate: 0,
    scale: Math.max(0.86, 1.12 - normalizedDistance * 0.24).toFixed(2),
    size: 92,
    z: Math.round(100 - distance)
  };
}

function renderCoverTile(article, index, count) {
  const visual = getCoverVisual(article);
  const layout = getCoverTileLayout(index, count);
  const style = [
    `--cover-bg:${visual.bg}`,
    `--cover-color:${visual.color}`,
    `--cover-size:${visual.size || '30px'}`,
    `--tile-x:${layout.x}px`,
    `--tile-y:${layout.y}px`,
    `--tile-rotate:${layout.rotate}deg`,
    `--tile-scale:${layout.scale}`,
    `--tile-size:${layout.size}px`,
    `--tile-z:${layout.z}`
  ].join(';');

  return `<span class="cover-tile" style="${escapeHtml(style)}">${renderHubIcon(visual)}</span>`;
}

function renderHubCover(article, childPages = []) {
  if (childPages.length > 0) {
    const coverChildren = childPages;
    return `
      <div class="hub-cover-cluster">
        ${coverChildren.map((child, index) => renderCoverTile(child, index, coverChildren.length)).join('')}
      </div>
    `;
  }

  const cover = hubCovers[article.key];
  if (cover) {
    const style = [
      `--cover-bg:${cover.bg}`,
      `--cover-color:${cover.color}`,
      `--cover-size:${cover.size || '52px'}`
    ].join(';');

    return `<div class="hub-cover-symbol" style="${escapeHtml(style)}">${renderHubIcon(cover)}</div>`;
  }

  return `<div class="hub-cover-mark">${escapeHtml(getHubMark(article.title))}</div>`;
}

function getSectionBody(article, section, index) {
  const localizedBody = activeTranslations().articleBodies?.[article.key]?.[index];
  if (localizedBody) {
    const normalizedBody = normalizeTranslationTerms(localizedBody);
    if (!(currentLanguage !== defaultLanguage && hasKoreanText(normalizedBody))) return normalizedBody;
  }

  if (articleBodies[article.key]) {
    return articleBodies[article.key][index] || articleBodies[article.key][0];
  }

  const depth = getPageDepth(article.key);

  if (depth === 1) {
    const category = manualTree.find((item) => item.key === article.key);
    const childTitles = category.children.map((group) => group.title).join(', ');
    const articleCount = category.children.reduce((sum, group) => sum + group.articles.length, 0);
    const bodies = [
      `${section}에서는 이 카테고리에서 다루는 큰 흐름을 잡습니다. ${childTitles}를 차례로 보면 처음 들어온 사용자도 어디서 시작해야 하는지 빠르게 판단할 수 있습니다.`,
      `이 영역에는 ${articleCount}개의 세부 가이드가 연결되어 있습니다. 필요한 기능부터 바로 들어가도 되고, 처음이라면 위에서 아래 순서대로 읽는 구성이 가장 자연스럽습니다.`,
      `다음 단계에서는 2Depth 페이지에서 사용 목적을 좁힌 뒤, 3Depth 작업 가이드에서 실제 버튼과 설정 순서를 확인합니다.`
    ];
    return bodies[index] || bodies[0];
  }

  if (depth === 2) {
    const group = manualTree.flatMap((category) => category.children).find((item) => item.key === article.key);
    const childTitles = group.articles.map((child) => child.title).join(', ');
    const bodies = [
      `${section}에서는 이 묶음에서 먼저 이해해야 할 기준을 정리합니다. 바로 세부 문서로 이동하기 전에 어떤 상황에서 이 기능을 쓰는지 확인하세요.`,
      `이 섹션에는 ${childTitles} 문서가 연결되어 있습니다. 사용자가 하려는 작업에 가장 가까운 문서를 선택하면 불필요한 설명을 줄일 수 있습니다.`,
      `실제 설정이나 운영 방법은 3Depth 문서에서 다룹니다. 2Depth는 방향을 잡는 허브 페이지로 보고, 세부 조작은 연결된 작업 가이드에서 확인하세요.`
    ];
    return bodies[index] || bodies[0];
  }

  const bodies = [
    `${section} 단계에서는 먼저 현재 화면에서 필요한 진입점을 찾고, 설정해야 할 값이 무엇인지 확인합니다. 기능을 실행하기 전에 대상 학생, 공개 범위, 저장 상태처럼 결과에 영향을 주는 조건을 함께 점검하세요.`,
    `${section}할 때는 변경 내용이 기존 Lesson, Assignment, Assessment에 어떤 영향을 주는지 확인해야 합니다. 특히 이미 학생에게 배포된 콘텐츠라면 수정 내용이 학생 화면에 반영되는 시점을 확인하는 것이 좋습니다.`,
    `${section} 후에는 결과 화면이나 목록으로 돌아가 정상적으로 저장되었는지 확인합니다. 문제가 보이면 필터, 권한, 마감일, 제출 상태처럼 자주 놓치는 조건부터 다시 살펴보세요.`
  ];
  return bodies[index] || bodies[0];
}

function renderArticleCallout(article) {
  const callout = articleCallouts[article.key];
  if (!callout) return '';

  return `
    <section class="callout">
      <div class="callout-icon">i</div>
      <div>
        <h3>${escapeHtml(callout.title)}</h3>
        <p>${escapeHtml(callout.body)}</p>
      </div>
    </section>
  `;
}

function renderArticleIntro(article) {
  const intro = activeTranslations().articleIntros?.[article.key] || articleIntros[article.key];
  if (!intro) return '';
  const normalizedIntro = normalizeTranslationTerms(intro);

  if (currentLanguage !== defaultLanguage && hasKoreanText(normalizedIntro)) {
    return `<div class="article-intro section-copy">${renderRichText(articleIntros[article.key] || intro)}</div>`;
  }

  return `<div class="article-intro section-copy">${renderRichText(normalizedIntro)}</div>`;
}

function renderSectionMedia(article, index) {
  const media = articleMedia[article.key]?.[index];
  if (!media) return '';
  return `<div class="media-block" aria-label="${escapeHtml(media.label || '가이드 미디어')}"></div>`;
}

function renderSectionInfoCard(article, index) {
  const card = articleInfoCards[article.key]?.[index];
  if (!card) return '';

  return `
    <div class="info-card">
      <h3>${escapeHtml(card.title)}</h3>
      <p>${escapeHtml(card.body)}</p>
    </div>
  `;
}

function renderCategories() {
  document.getElementById('categoryGrid').innerHTML = manualTree.map((category) => {
    const count = category.children.reduce((sum, child) => sum + child.articles.length + 1, 1);
    return `
    <article class="category-card" onclick="showArticle('${category.key}')">
      <h3>${escapeHtml(tTree(category.key, 'title', category.title))}</h3>
      <p>${escapeHtml(tTree(category.key, 'description', category.description))}</p>
      <span>${count}${escapeHtml(tFixed('pageCount'))}</span>
    </article>
  `;
  }).join('');
}

function renderTree(activeKey) {
  if (openTreeKeys.size === 0) openTreePath(activeKey);

  document.getElementById('leftTree').innerHTML = manualTree.map((category) => {
    const categoryOpen = openTreeKeys.has(category.key);
    const children = category.children.map((group) => {
      const groupOpen = openTreeKeys.has(group.key);
      const hasLinks = group.articles.length > 0;
      const links = group.articles.map((article) => {
        const articleTitle = applyVisibleArticleTitleNumber(article, tTree(article.key, 'title', article.title));
        return `
        <button class="tree-link ${article.key === activeKey ? 'active' : ''}" onclick="showArticle('${article.key}')">${escapeHtml(articleTitle)}</button>
      `;
      }).join('');
      const groupTitle = tTree(group.key, 'title', group.title);

      return `
        <div class="tree-sub ${groupOpen ? 'open' : ''}" data-tree-key="${group.key}">
          <div class="tree-parent ${group.key === activeKey ? 'active' : ''}">
            ${hasLinks ? `<button class="chevron" onclick="toggleTree(this)" aria-label="${escapeHtml(groupTitle + tFixed('openCloseSuffix'))}">›</button>` : '<span class="chevron-placeholder" aria-hidden="true"></span>'}
            <button class="tree-label" onclick="showArticle('${group.key}')">${escapeHtml(groupTitle)}</button>
          </div>
          <div class="tree-children">${links}</div>
        </div>
      `;
    }).join('');
    const categoryTitle = tTree(category.key, 'title', category.title);
    const hasChildren = category.children.length > 0;

    return `
      <div class="tree-block ${hasChildren && categoryOpen ? 'open' : ''}" data-tree-key="${category.key}">
        <div class="tree-parent ${category.key === activeKey ? 'active' : ''}">
          ${hasChildren ? `<button class="chevron" onclick="toggleTree(this)" aria-label="${escapeHtml(categoryTitle + tFixed('openCloseSuffix'))}">›</button>` : '<span class="chevron-placeholder" aria-hidden="true"></span>'}
          <button class="tree-label" onclick="showArticle('${category.key}')">${escapeHtml(categoryTitle)}</button>
        </div>
        <div class="tree-children">${children}</div>
      </div>
    `;
  }).join('');
}

function getRenderableSections(article) {
  if (article.sections.length > 0) {
    return article.sections.map((title, index) => ({ title, index, showTitle: true }));
  }

  const bodyCount = Math.max(
    activeTranslations().articleBodies?.[article.key]?.length || 0,
    articleBodies[article.key]?.length || 0
  );

  return Array.from({ length: bodyCount }, (_, index) => ({
    title: '',
    index,
    showTitle: false
  }));
}

function getHeadingTocTarget(heading, index) {
  if (heading.matches('h2')) {
    const section = heading.closest('.article-section');
    if (section?.id) return section.id;
  }

  if (!heading.id) heading.id = `toc-heading-${index + 1}`;
  return heading.id;
}

function renderRightToc() {
  const rightToc = document.getElementById('rightToc');
  const articleContent = document.getElementById('articleContent');
  const headings = Array.from(articleContent.querySelectorAll('.article-title, .article-section > h2, .section-copy h3'))
    .filter((heading) => heading.textContent.trim());

  rightToc.innerHTML = headings.length ? `
    <div class="toc-title">${escapeHtml(tFixed('onThisPage'))}</div>
    ${headings.map((heading, index) => {
      const level = Number(heading.tagName.slice(1));
      const targetId = getHeadingTocTarget(heading, index);
      return `<a class="toc-link toc-link-level-${level}" href="#${targetId}">${escapeHtml(heading.textContent.trim())}</a>`;
    }).join('')}
  ` : '';
}

function renderArticle(key) {
  const sourceArticle = findArticle(key);
  const article = localizeArticle(sourceArticle);
  const childPages = getChildPages(sourceArticle.key);
  const currentIndex = articles.findIndex((item) => item.key === sourceArticle.key);
  const prev = articles[currentIndex - 1];
  const next = articles[currentIndex + 1];
  const articleMain = document.querySelector('.article-main');
  const renderableSections = getRenderableSections(article);

  articleMain.classList.toggle('hub-layout', childPages.length > 0);

  if (childPages.length > 0) {
    document.getElementById('articleContent').innerHTML = `
      <article class="hub-page ${isCompactToolkitHub(sourceArticle.key) ? 'compact-hub-page' : ''}">
        <div class="hub-cover" aria-hidden="true">
          ${renderHubCover(article, childPages)}
        </div>
        <div class="hub-kicker">${escapeHtml(getHubLabel(article.key))}</div>
        <h1 class="hub-title">${escapeHtml(article.title)}</h1>
        <p class="hub-desc">${formatInline(article.desc)}</p>
        <div class="hub-menu-list">
          ${childPages.map((child) => {
            const localizedChild = localizeArticle(child);
            return `
            <button class="hub-menu-item" onclick="showArticle('${localizedChild.key}')">
              <span>
                <h2>${escapeHtml(localizedChild.title)}</h2>
                <p>${formatInline(getHubDescription(child))}</p>
                <span class="hub-menu-count">${escapeHtml(getHubMenuMeta(child))}</span>
              </span>
              ${renderHubVisual(child)}
            </button>
          `;
          }).join('')}
        </div>
      </article>
    `;

    document.getElementById('rightToc').innerHTML = '';
    return;
  }

  const bottomNavItems = [
    prev ? `<button onclick="showArticle('${prev.key}')">← ${escapeHtml(localizeArticle(prev).title)}</button>` : '',
    next ? `<button onclick="showArticle('${next.key}')">${escapeHtml(localizeArticle(next).title)} →</button>` : ''
  ].filter(Boolean);
  const bottomNavClass = `bottom-nav${!prev ? ' only-next' : ''}${!next ? ' only-prev' : ''}`;
  const bottomNavMarkup = bottomNavItems.length
    ? `<nav class="${bottomNavClass}" aria-label="이전 및 다음 아티클">${bottomNavItems.join('')}</nav>`
    : '';

  document.getElementById('articleContent').innerHTML = `
    ${hubCovers[article.key] && isTreeGroupPage(article.key) ? `<div class="hub-cover article-cover" aria-hidden="true">${renderHubCover(article)}</div>` : ''}
    <header class="article-header">
      <div class="article-kicker">${escapeHtml(article.number)} ${escapeHtml(article.category)}</div>
      <h1 class="article-title">${escapeHtml(article.title)}</h1>
      <div class="article-desc">${renderRichText(article.desc)}</div>
      <div class="author-row">
        <div class="avatar" aria-hidden="true"></div>
        <div><strong>${escapeHtml(tFixed('authorName'))}</strong><br />${escapeHtml(tFixed('updatedAt'))}</div>
      </div>
    </header>

    <div class="content-body">
      ${renderArticleCallout(article)}
      ${renderArticleIntro(article)}

      ${renderableSections.map((section) => `
        <section class="article-section" id="section-${section.index + 1}">
          ${section.showTitle ? `<h2>${escapeHtml(section.title)}</h2>` : ''}
          <div class="section-copy">${renderRichText(getSectionBody(article, section.title, section.index))}</div>
          ${renderSectionMedia(article, section.index)}
          ${renderSectionInfoCard(article, section.index)}
        </section>
      `).join('')}

      ${bottomNavMarkup}
    </div>
  `;

  renderRightToc();
}

function showHome(options = {}) {
  const { updateHistory = true } = options;
  closeMobileMenu();
  document.body.classList.remove('article-active');
  document.getElementById('articleView').classList.remove('active');
  document.getElementById('homeView').classList.add('active');
  document.getElementById('searchResults').classList.remove('active');

  if (updateHistory && location.hash) {
    history.pushState({ key: null }, '', routeUrlFor());
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showArticle(key, options = {}) {
  const { updateHistory = true } = options;
  if (!isVisibleArticleKey(key)) key = articles[0].key;
  closeMobileMenu();
  currentArticleKey = key;
  document.body.classList.add('article-active');
  document.getElementById('homeView').classList.remove('active');
  document.getElementById('articleView').classList.add('active');
  openTreePath(key);
  renderTree(key);
  renderArticle(key);

  const nextHash = `#${encodeURIComponent(key)}`;
  if (updateHistory && location.hash !== nextHash) {
    history.pushState({ key }, '', routeUrlFor(nextHash));
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setMobileMenu(open) {
  document.body.classList.toggle('mobile-nav-open', open);
  const button = document.getElementById('mobileMenuToggle');
  if (button) {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? tFixed('menuClose') : tFixed('menuOpen'));
  }
}

function toggleMobileMenu() {
  setMobileMenu(!document.body.classList.contains('mobile-nav-open'));
}

function closeMobileMenu() {
  setMobileMenu(false);
}

function toggleTree(button) {
  const treeNode = button.closest('.tree-block, .tree-sub');
  const treeKey = treeNode.dataset.treeKey;
  const isOpen = treeNode.classList.toggle('open');

  if (isOpen) {
    openTreeKeys.add(treeKey);
  } else {
    openTreeKeys.delete(treeKey);
  }
}

function renderSearchResults(query) {
  const box = document.getElementById('searchResults');
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    box.classList.remove('active');
    box.innerHTML = '';
    return;
  }

  const matches = articles.filter((article) => {
    const localized = localizeArticle(article);
    return [localized.title, localized.category, localized.desc, localized.note, localized.sections.join(' '), (articleBodies[article.key] || []).join(' ')]
      .join(' ')
      .toLowerCase()
      .includes(normalized);
  }).slice(0, 8);

  box.innerHTML = matches.length
    ? matches.map((article) => {
      const localized = localizeArticle(article);
      return `
      <div class="result-item" onclick="showArticle('${article.key}')">
        <strong>${escapeHtml(localized.title)}</strong>
        <span>${escapeHtml(localized.category)} · ${escapeHtml(localized.desc)}</span>
      </div>
    `;
    }).join('')
    : `<div class="result-item"><strong>${escapeHtml(tFixed('noSearchResultsTitle'))}</strong><span>${escapeHtml(tFixed('noSearchResultsDesc'))}</span></div>`;

  box.classList.add('active');
}

window.showHome = showHome;
window.showArticle = showArticle;
window.toggleTree = toggleTree;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;

document.addEventListener('DOMContentLoaded', function () {
  const hashKey = decodeURIComponent(location.hash.replace('#', ''));
  const initialKey = hashKey && isVisibleArticleKey(hashKey) ? hashKey : currentArticleKey;
  currentArticleKey = initialKey;
  currentLanguage = getInitialLanguage();
  persistCurrentLanguage();
  updateDocumentLanguage();
  openTreePath(initialKey);

  applyStaticTranslations();
  renderCategories();
  renderTree(initialKey);

  const input = document.getElementById('searchInput');
  input.addEventListener('input', (event) => renderSearchResults(event.target.value));
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const query = input.value.trim().toLowerCase();
      const firstMatch = articles.find((article) => localizeArticle(article).title.toLowerCase().includes(query));
      if (firstMatch) showArticle(firstMatch.key);
    }
  });

  const languageSelect = document.getElementById('languageSelect');
  languageSelect.value = currentLanguage;
  languageSelect.addEventListener('change', (event) => {
    setLanguage(event.target.value, { updateUrl: true, rerender: true });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-wrap')) {
      document.getElementById('searchResults').classList.remove('active');
    }
  });

  document.addEventListener('click', (event) => {
    const tocLink = event.target.closest('.toc-link');
    if (!tocLink) return;

    const target = document.querySelector(tocLink.getAttribute('href'));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  window.addEventListener('popstate', () => {
    syncLanguageFromUrl({ rerender: true });
    const nextKey = decodeURIComponent(location.hash.replace('#', ''));
    if (nextKey && isVisibleArticleKey(nextKey)) {
      showArticle(nextKey, { updateHistory: false });
    } else {
      showHome({ updateHistory: false });
    }
  });

  window.addEventListener('hashchange', () => {
    syncLanguageFromUrl({ rerender: true });
    const nextKey = decodeURIComponent(location.hash.replace('#', ''));
    if (nextKey && isVisibleArticleKey(nextKey) && nextKey !== currentArticleKey) {
      showArticle(nextKey, { updateHistory: false });
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) closeMobileMenu();
  });

  history.replaceState(
    { key: hashKey && isVisibleArticleKey(hashKey) ? hashKey : null, language: currentLanguage },
    '',
    routeUrlFor(location.hash)
  );

  if (hashKey && isVisibleArticleKey(hashKey)) showArticle(hashKey, { updateHistory: false });
});
