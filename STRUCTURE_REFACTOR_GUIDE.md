# LumiTeach 최종 구조 정리 가이드

현재 LumiTeach 매뉴얼은 `index.html` 한 파일 안에 CSS, 한국어 원본 콘텐츠, 번역 데이터, 렌더링 로직이 모두 들어가 있는 상태입니다. 콘텐츠, 번역, 이미지 검수가 끝난 뒤 배포 안정성을 유지하면서 파일 구조를 정리합니다.

## 목표

기능과 화면은 바꾸지 않고, 현재 한 HTML에 들어 있는 코드를 역할별 파일로 분리합니다.

목표 구조:

```text
lumiteach_help_center/
├─ index.html
├─ styles.css
├─ app.js
├─ data/
│  ├─ manual-data.js
│  └─ translations.js
├─ lumiteach_assets/
│  └─ manual/
├─ translation_queue.json
└─ translation_queue.md
```

## 진행 원칙

1. 기능과 화면은 변경하지 않습니다.
2. 현재 `index.html`에서 동작하는 메뉴, 검색, 언어 변경, LNB, 모바일 메뉴, 이미지 표시를 그대로 유지합니다.
3. `file://` 직접 실행과 GitHub Pages 배포가 모두 깨지지 않게 합니다.
4. JSON `fetch` 방식은 피하고, 로컬 실행 안정성을 위해 `.js` 데이터 파일로 분리합니다.
5. `index.html`과 `lumiteach_help_center.html`이 둘 다 필요하면 같은 구조로 동기화합니다.
6. 구조 분리 중 콘텐츠 문장, 번역 문장, 이미지 배치는 임의로 수정하지 않습니다.

## 분리 기준

- CSS 전체: `styles.css`
- 메뉴 트리, `articleTemplates`, `articleBodies`, 이미지/허브 데이터: `data/manual-data.js`
- `translations`, 언어명, 용어 치환 데이터: `data/translations.js`
- 렌더링 함수, 검색, 언어 전환, 트리 토글, 모바일 메뉴: `app.js`
- `index.html`: DOM 구조와 `link` / `script` 참조만 유지

## 검증 항목

- 홈 화면 정상 표시
- 카테고리/하위 메뉴 클릭 정상
- LNB 열림/닫힘 상태 유지
- 모바일 햄버거 메뉴 정상 동작
- 검색 정상 동작
- 한국어, 영어, 포르투갈어, 스페인어, 일본어, 베트남어 언어 변경 정상
- 이미지 경로 깨짐 없음
- GitHub Pages 주소에서 정상 동작
- `translation_queue.json`, `translation_queue.md`는 관리용 파일로 유지

## 나중에 사용할 요청 문구

아래 문구를 그대로 요청하면 됩니다.

> 이제 최종 구조 정리 진행해줘. 현재 한 HTML 안에 있는 CSS, 콘텐츠 데이터, 번역 데이터, 렌더링 로직을 `styles.css`, `data/manual-data.js`, `data/translations.js`, `app.js`로 분리하고, GitHub Pages와 로컬 실행이 모두 깨지지 않게 검증까지 해줘. 기능 변경은 하지 말고 구조만 정리해줘.
