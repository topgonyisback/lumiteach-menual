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
  return {
    ...article,
    category: tArticleField(article.key, 'category', article.category),
    title: tArticleField(article.key, 'title', article.title),
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
  return tHubDescription(article.key, hubDescriptions[article.key] || localized.desc);
}

function isCompactToolkitHub(key) {
  return key.startsWith('group-toolkit-');
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
      <span class="hub-symbol" style="${escapeHtml(style)}">${escapeHtml(visual.icon)}</span>
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
  const layouts = {
    1: [
      { left: 50, top: 50, rotate: -4, scale: 1.14, z: 3 }
    ],
    2: [
      { left: 42, top: 50, rotate: -8, scale: 1.05, z: 2 },
      { left: 58, top: 50, rotate: 8, scale: 1.05, z: 3 }
    ],
    3: [
      { left: 50, top: 42, rotate: -5, scale: 1.08, z: 3 },
      { left: 35, top: 62, rotate: 8, scale: 0.96, z: 2 },
      { left: 65, top: 62, rotate: -8, scale: 0.96, z: 2 }
    ],
    4: [
      { left: 50, top: 46, rotate: -4, scale: 1.12, z: 4 },
      { left: 34, top: 35, rotate: 9, scale: 0.92, z: 2 },
      { left: 66, top: 36, rotate: -9, scale: 0.92, z: 2 },
      { left: 50, top: 68, rotate: 7, scale: 0.95, z: 3 }
    ],
    5: [
      { left: 50, top: 48, rotate: -5, scale: 1.12, z: 4 },
      { left: 34, top: 35, rotate: 10, scale: 0.9, z: 2 },
      { left: 66, top: 35, rotate: -10, scale: 0.9, z: 2 },
      { left: 39, top: 68, rotate: -8, scale: 0.94, z: 3 },
      { left: 61, top: 68, rotate: 8, scale: 0.94, z: 3 }
    ],
    6: [
      { left: 50, top: 49, rotate: -4, scale: 1.1, z: 5 },
      { left: 33, top: 33, rotate: 10, scale: 0.88, z: 2 },
      { left: 67, top: 33, rotate: -10, scale: 0.88, z: 2 },
      { left: 31, top: 68, rotate: -7, scale: 0.9, z: 3 },
      { left: 69, top: 68, rotate: 8, scale: 0.9, z: 3 },
      { left: 50, top: 24, rotate: 6, scale: 0.86, z: 1 }
    ]
  };

  return (layouts[count] || layouts[6])[index] || layouts[1][0];
}

function renderCoverTile(article, index, count) {
  const visual = getCoverVisual(article);
  const layout = getCoverTileLayout(index, count);
  const style = [
    `--cover-bg:${visual.bg}`,
    `--cover-color:${visual.color}`,
    `--cover-size:${visual.size || '30px'}`,
    `--tile-left:${layout.left}%`,
    `--tile-top:${layout.top}%`,
    `--tile-rotate:${layout.rotate}deg`,
    `--tile-scale:${layout.scale}`,
    `--tile-z:${layout.z}`
  ].join(';');

  return `<span class="cover-tile" style="${escapeHtml(style)}">${escapeHtml(visual.icon)}</span>`;
}

function renderHubCover(article, childPages = []) {
  if (childPages.length > 0) {
    const coverChildren = childPages.slice(0, 6);
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

    return `<div class="hub-cover-symbol" style="${escapeHtml(style)}">${escapeHtml(cover.icon)}</div>`;
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
      const links = group.articles.map((article) => `
        <button class="tree-link ${article.key === activeKey ? 'active' : ''}" onclick="showArticle('${article.key}')">${escapeHtml(tTree(article.key, 'title', article.title))}</button>
      `).join('');
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
                <span class="hub-menu-count">${escapeHtml(localizedChild.number)} ${escapeHtml(tFixed('documentLabel'))}</span>
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

  document.getElementById('articleContent').innerHTML = `
    ${hubCovers[article.key] && isTreeGroupPage(article.key) ? `<div class="hub-cover article-cover" aria-hidden="true">${renderHubCover(article)}</div>` : ''}
    <header class="article-header">
      <div class="article-kicker">${escapeHtml(article.number)} ${escapeHtml(article.category)}</div>
      <h1 class="article-title">${escapeHtml(article.title)}</h1>
      <p class="article-desc">${formatInline(article.desc)}</p>
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

      <nav class="bottom-nav" aria-label="이전 및 다음 아티클">
        <button ${prev ? `onclick="showArticle('${prev.key}')"` : 'disabled'}>${prev ? `← ${escapeHtml(localizeArticle(prev).title)}` : escapeHtml(tFixed('firstArticle'))}</button>
        <button ${next ? `onclick="showArticle('${next.key}')"` : 'disabled'}>${next ? `${escapeHtml(localizeArticle(next).title)} →` : escapeHtml(tFixed('lastArticle'))}</button>
      </nav>
    </div>
  `;

  const tocLinks = renderableSections.filter((section) => section.showTitle && section.title.trim());
  document.getElementById('rightToc').innerHTML = tocLinks.length ? `
    <div class="toc-title">${escapeHtml(tFixed('onThisPage'))}</div>
    ${tocLinks.map((section) => `<a class="toc-link" href="#section-${section.index + 1}">${escapeHtml(section.title)}</a>`).join('')}
  ` : '';
}

function routeUrlFor(hash = '') {
  return `${location.pathname}${location.search}${hash}`;
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
  currentLanguage = localStorage.getItem('lumiteach-language') || defaultLanguage;
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
    currentLanguage = event.target.value;
    localStorage.setItem('lumiteach-language', currentLanguage);
    applyStaticTranslations();
    renderCategories();
    renderTree(currentArticleKey);
    if (document.getElementById('articleView').classList.contains('active')) {
      renderArticle(currentArticleKey);
    }
    renderSearchResults(document.getElementById('searchInput').value);
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
    const nextKey = decodeURIComponent(location.hash.replace('#', ''));
    if (nextKey && isVisibleArticleKey(nextKey)) {
      showArticle(nextKey, { updateHistory: false });
    } else {
      showHome({ updateHistory: false });
    }
  });

  window.addEventListener('hashchange', () => {
    const nextKey = decodeURIComponent(location.hash.replace('#', ''));
    if (nextKey && isVisibleArticleKey(nextKey) && nextKey !== currentArticleKey) {
      showArticle(nextKey, { updateHistory: false });
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) closeMobileMenu();
  });

  history.replaceState({ key: hashKey && isVisibleArticleKey(hashKey) ? hashKey : null }, '', location.href);

  if (hashKey && isVisibleArticleKey(hashKey)) showArticle(hashKey, { updateHistory: false });
});
