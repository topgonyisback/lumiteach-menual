const manualTree = [
  { key: 'cat-intro', title: '01. Get Started Guide', description: '계정 준비부터 첫 수업 진행까지 한 번에 따라가는 시작 안내서', children: [] },
  { key: 'cat-start', title: '02. 설정하기', description: '프로필, 언어, AI Credit 설정', children: [
    { key: 'setting-open', title: 'Setting 진입하기', articles: [] },
    { key: 'setting-profile', title: 'Profile 설정하기', articles: [] },
    { key: 'setting-language', title: 'Language 설정하기', articles: [] },
    { key: 'setting-ai-credit', title: 'AI Credit 확인하기', articles: [] }
  ] },
  { key: 'cat-lesson', title: '03. Lesson 만들고 관리하기', description: 'Edit Lesson, 자료 수정, Activity 활용', children: [
    { key: 'group-edit-lesson', title: 'Edit Lesson 사용하기', articles: [{ key: 'edit-lesson-create', title: '1. 신규 Lesson 생성하기' }, { key: 'edit-lesson-rename', title: '2. Lesson 명 변경하기' }, { key: 'edit-lesson-add-activity', title: '3. Activity 추가하기' }, { key: 'edit-lesson-load-storage', title: '4. My Storage로 다른 Lesson 불러오기' }, { key: 'edit-lesson-ai-make', title: '5. AI Make로 Activity 추가하기' }, { key: 'edit-lesson-interaction', title: '6. Interaction 모드로 수업하기' }, { key: 'edit-lesson-presentation', title: '7. Presentation 모드로 수업하기' }, { key: 'edit-lesson-undo-redo', title: '8. Redo / Undo 사용하기' }, { key: 'edit-lesson-preview', title: '9. Preview 확인하기' }, { key: 'edit-lesson-background-color', title: '10. 배경 색 변경하기' }] }
  ] },
  { key: 'cat-assignment', title: '05. Assignment 내보내기', description: 'Self Study 모드와 Assessment 활용', children: [
    { key: 'group-assessment-run', title: 'Assessment 활용하기', articles: [] }
  ] },
  { key: 'setting-curriculum', title: '05. Curriculum', description: '교육과정별 Lesson과 Assessment 탐색', children: [] },
  { key: 'cat-teaching', title: '07. 실시간 수업 진행하기', description: 'Teaching Mode로 참여형 수업 운영', children: [
    { key: 'group-teaching-mode', title: '수업 모드 사용하기', articles: [{ key: 'teaching-overview', title: 'Teaching Mode 시작하기' }, { key: 'teaching-interaction', title: 'Interaction으로 참여 유도하기' }, { key: 'teaching-presentation', title: 'Presentation으로 수업하기' }, { key: 'teaching-battle', title: 'Battle Mode로 퀴즈 진행하기' }] }
  ] },
  { key: 'cat-reports', title: '08. 결과 확인하고 리포트 보기', description: '제출 이력, 학생 답변, 리더보드 확인', children: [
    { key: 'group-reports-results', title: '학습 결과 확인하기', articles: [{ key: 'reports-submission', title: '제출 이력 확인하기' }, { key: 'reports-answer', title: '학생 답변 확인하기' }, { key: 'reports-leaderboard', title: '리더보드 확인하기' }] }
  ] },
  { key: 'cat-storage', title: '09. 내 자료 정리하기', description: 'My Storage 자료 보관과 Lesson 관리', children: [
    { key: 'storage-overview', title: 'My Storage 화면 이해하기', articles: [] },
    { key: 'storage-folder', title: '검색 / 탭 / 정렬 사용하기', articles: [] },
    { key: 'storage-move', title: '폴더 · Lesson 카드 확인하기', articles: [] },
    { key: 'storage-trash', title: 'Lesson 메뉴와 미리보기 확인하기', articles: [] }
  ] }
];


const removedTeachingKeys = new Set(["cat-teaching","group-teaching-mode","teaching-overview","teaching-interaction","teaching-presentation","teaching-battle"]);
const teachingCategoryIndex = manualTree.findIndex((category) => category.key === 'cat-teaching');
if (teachingCategoryIndex >= 0) manualTree.splice(teachingCategoryIndex, 1);

const exploreCategory = {
  key: 'cat-explore',
  title: '05. 내 소속 자료 활용하기',
  description: '소속에서 공유된 Lesson 확인과 Creator Page 관리',
  children: [
    { key: 'explore-browse', title: '내 소속 자료 보기', articles: [] },
    { key: 'explore-creator-page', title: 'Creator Page 관리하기', articles: [] }
  ]
};
if (!manualTree.some((category) => category.key === exploreCategory.key)) {
  const storageCategoryIndexForExplore = manualTree.findIndex((category) => category.key === 'cat-storage');
  manualTree.splice(storageCategoryIndexForExplore >= 0 ? storageCategoryIndexForExplore + 1 : manualTree.length, 0, exploreCategory);
}

const articleTemplates = {
  'cat-intro': ['01.', 'LumiTeach Help Center', 'Get Started Guide', 'LumiTeach에 오신 것을 환영합니다. 이 가이드는 처음 시작하는 선생님이 계정 준비부터 첫 수업을 직접 진행하기까지의 과정을 한 번에 따라올 수 있도록 만든 시작 안내서입니다.', '각 기능의 자세한 설명은 해당 가이드로 연결해 두었으니, 여기서는 "첫 수업을 끝까지 돌려보는 것"을 목표로 합니다.', ['핵심 개념 먼저 이해하기', 'Step 1. LumiTeach 둘러보기', 'Step 2. 계정 & 프로필 설정', 'Step 3. 첫 수업(Lesson) 만들기', 'Step 4. 수업 진행하기', 'Step 5. 학생 화면 이해하기', 'Step 6. 결과 확인 & 마무리', '다음 단계로 — 더 깊이 알아보기']],
  'cat-start': ['02.', 'LumiTeach Help Center', '설정하기', 'LumiTeach 계정의 프로필, 언어, AI Credit 정보를 확인하고 관리하는 방법을 안내합니다.', 'Setting 변경 사항은 계정과 화면 표시 방식에 영향을 줄 수 있으므로 저장 전 적용 범위를 확인하세요.', ['Setting 진입하기', 'Profile 설정하기', 'Language 설정하기', 'AI Credit 확인하기']],
  'cat-lesson': ['03.', 'LumiTeach Help Center', 'Lesson 만들고 관리하기', 'Edit Lesson 화면에서 Lesson을 구성하고 자료를 수정하며 Activity를 활용하는 방법을 정리합니다.', 'Lesson은 이후 과제, 평가, 실시간 수업의 출발점이므로 Edit Lesson의 주요 작업 흐름을 먼저 익히는 것이 중요합니다.', ['Edit Lesson 사용하기', '자료 수정하기', 'Activity 활용하기']],
  'cat-activities': ['04.', 'LumiTeach Help Center', 'Activity 추가하기', '학생이 실제로 수행할 학습 활동을 고르고, 만들고, AI로 생성하는 방법을 안내합니다.', 'Activity 유형은 수업 목표에 맞춰 선택해야 합니다. 정답 확인, 의견 수집, 실시간 참여는 각각 다른 구성이 필요합니다.', ['Activity 유형 고르기', 'Activity 만들기', 'AI로 초안 만들기']],
  'cat-assignment': ['05.', 'LumiTeach Help Center', 'Assignment 내보내기', 'Lesson을 학생에게 Self Study 모드나 Assessment 형태로 제공하는 흐름을 안내합니다.', '학생에게 내보내기 전에는 학습 방식, 접근 범위, 제출 또는 응시 조건을 함께 확인해야 합니다.', ['Self Study 모드 활용하기', 'Assessment 활용하기', '결과 확인으로 이어가기']],
  'cat-assessment': ['06.', 'LumiTeach Help Center', 'Assessment 만들기', '평가를 만들고 문항을 구성한 뒤 학생에게 배포하고 결과를 확인하는 흐름을 안내합니다.', 'Assessment는 점수와 결과 해석까지 이어지므로 문항별 기준과 배점을 먼저 정리하는 것이 좋습니다.', ['평가 생성하기', '문항 구성하기', '결과 확인하기']],
  'cat-teaching': ['07.', 'LumiTeach Help Center', '실시간 수업 진행하기', 'Teaching Mode로 Lesson을 실시간 수업에서 활용하고 학생 참여를 이끄는 방법을 안내합니다.', '실시간 수업에서는 교사의 화면 제어와 학생 참여 상태가 함께 중요하므로 수업 전에 모드를 미리 확인하세요.', ['Teaching Mode 시작하기', '수업 모드 선택하기', '참여 결과 확인하기']],
  'cat-reports': ['08.', 'LumiTeach Help Center', '결과 확인하고 리포트 보기', '학생 제출 이력, 답변, 리더보드를 확인해 학습 결과를 살펴보는 방법을 안내합니다.', '결과가 보이지 않을 때는 데이터가 없는 것이 아니라 필터나 제출 상태 때문에 숨겨진 경우도 많습니다.', ['제출 이력 확인하기', '학생 답변 확인하기', '리더보드 확인하기']],
  'cat-storage': ['09.', 'LumiTeach Help Center', '내 자료 정리하기', 'My Storage는 내가 만들거나 편집한 모든 수업 자료(Lesson·폴더)를 모아 관리하는 개인 보관함입니다.', '상단 안내 문구: "Find all the resources you\'ve created or edited here."', ['My Storage 이해하기', '자료 찾고 정렬하기', 'Lesson 관리하기']],
  'group-intro-service': ['01-A.', 'LumiTeach 시작하기', '서비스 이해하기', 'LumiTeach를 처음 접하는 교사가 서비스의 목적과 전체 사용 흐름을 빠르게 이해할 수 있도록 안내합니다.', 'LumiTeach는 하나의 기능만 사용하는 도구라기보다, Lesson을 중심으로 제작, 배포, 수업 진행, 결과 확인이 이어지는 수업 운영 흐름입니다.', ['LumiTeach는 어떤 서비스인가요?', '수업 콘텐츠는 어떤 구조로 만들어지나요?', '처음에는 어떤 순서로 보면 좋나요?']],
  'group-intro-basics': ['01-B.', 'LumiTeach 시작하기', '기본 개념 익히기', '사용자 역할과 핵심 용어를 먼저 익혀 LumiTeach의 기능 구조를 이해합니다.', 'Teacher, Student, Admin의 역할과 Lesson, Activity, Assignment 같은 용어를 먼저 정리해두세요.', ['사용자 역할 이해하기', '핵심 용어 익히기', '기능 관계 파악하기']],
  'group-start-setup': ['02-A.', '설정하기', 'Setting 사용하기', 'Setting에서는 LumiTeach 계정의 프로필, 언어, AI Credit 정보를 관리합니다.', '프로필 정보나 언어 설정처럼 바로 화면에 반영되는 항목은 변경 후 Save 또는 Apply 상태를 확인하세요.', ['Setting 진입하기', 'Profile 설정하기', 'Language 설정하기', 'AI Credit 확인하기']],
  'setting-open': ['02-1.', '설정하기', 'Setting 진입하기', '화면 우측 상단의 프로필 메뉴에서 Setting 팝업으로 이동하는 방법입니다.', '드롭다운에는 Setting 외에도 Privacy Policy, Terms of Service, Service Manual, Help Center, Log out 항목이 함께 표시됩니다.', ['프로필 메뉴 열기', 'Setting 선택하기']],
  'setting-profile': ['02-2.', '설정하기', 'Profile 설정하기', 'Profile 탭에서 프로필 이미지, 이름, Bio, Institution 등 계정 기본 정보를 확인하고 수정합니다.', '이메일은 계정 식별 정보로 표시만 되며 직접 수정할 수 없습니다.', ['프로필 이미지 변경하기', '이름과 Bio 수정하기', 'Institution 요청하기', 'Account 확인하기']],
  'setting-language': ['02-3.', '설정하기', 'Language 설정하기', 'Language 탭에서 LumiTeach 인터페이스에 표시되는 언어를 선택합니다.', '언어 설정은 인터페이스에만 적용되며 Curriculum 콘텐츠는 지역 언어 기준을 따릅니다.', ['Language 탭 확인하기', '표시 언어 선택하기', 'Save로 적용하기']],
  'setting-curriculum': ['05.', 'LumiTeach Help Center', 'Curriculum', 'Curriculum은 LumiTeach가 제공하는 교육과정(커리큘럼)별 Lesson과 평가(Assessment)를 탐색하는 페이지입니다.', '학년·영역별로 정리된 콘텐츠를 둘러보고 바로 수업을 시작할 수 있습니다.', ['Curriculum 진입하기', '화면 구성', '교육과정 변경 (Change Curriculum)', 'Curriculum Tree (좌측 패널)', 'Lesson / Assessment 탭', 'Lesson 상세 보기']],
  'setting-ai-credit': ['02-5.', '설정하기', 'AI Credit 확인하기', 'AI Credit 탭에서 AI 기능 사용에 소요되는 크레딧 현황과 사용 이력을 확인합니다.', 'Free Plan 기준으로 매월 제공되는 크레딧과 다음 충전 예정일을 함께 확인할 수 있습니다.', ['플랜과 남은 크레딧 확인하기', 'Usage History 확인하기']],
  'group-lesson-create': ['03-A.', 'Lesson 만들고 관리하기', 'Lesson 만들기', '수업 콘텐츠의 기본 단위인 Lesson을 만들고 내용을 구성하는 방법을 안내합니다.', 'Lesson은 Activity, Assignment, Teaching Mode와 연결되는 중심 단위이므로 구조를 먼저 이해하는 것이 좋습니다.', ['Lesson 구조 이해하기', '새 Lesson 만들기', '내용 수정하기']],
  'group-edit-lesson': ['03-B.', 'Lesson 만들고 관리하기', 'Edit Lesson 사용하기', 'Edit Lesson 화면에서 Lesson을 만들고, Activity를 추가하고, 수업 모드로 실행하는 기본 작업을 안내합니다.', 'Edit Lesson은 Lesson 제작의 중심 화면입니다. 생성, 편집, 미리보기, 수업 시작까지 이어지는 주요 버튼 위치를 먼저 익혀두세요.', ['Lesson 기본 작업하기', 'Activity 추가하고 불러오기', '수업 실행 전 확인하기']],
  'group-lesson-manage': ['03-C.', 'Lesson 만들고 관리하기', 'Lesson 관리하기', '만든 Lesson을 복제, 이동, 삭제, 복구하며 재사용하는 방법을 안내합니다.', '비슷한 수업을 반복해서 운영한다면 복제와 폴더 정리를 함께 활용하세요.', ['복제해서 재사용하기', '폴더로 정리하기', '삭제하고 복구하기']],
  'group-activities-create': ['04-A.', 'Activity 추가하기', 'Activity 만들기', 'Lesson 안에 학생이 수행할 Activity를 추가하고 유형별로 구성하는 방법을 안내합니다.', '학습 목표에 따라 Quiz, Board, Interactive Activity 중 적절한 유형을 선택하세요.', ['Activity 유형 고르기', 'Quiz 만들기', '참여형 Activity 만들기']],
  'group-activities-ai': ['04-B.', 'Activity 추가하기', 'AI로 Activity 만들기', 'AI를 활용해 Activity 초안을 생성하고 수업 목적에 맞게 수정하는 방법을 안내합니다.', 'AI 생성 결과는 초안으로 보고, 교사가 내용과 난이도를 검토한 뒤 사용하는 것이 안전합니다.', ['프롬프트 준비하기', 'AI로 생성하기', '결과 수정하기']],
  'group-assignment-mode': ['05-A.', 'Assignment 내보내기', '과제 방식 선택하기', 'Lesson을 학생에게 과제로 제공할 때 사용할 Assignment 방식을 선택합니다.', 'Individual, Challenge, Flash Card는 목적이 다르므로 학습 목표와 Activity 유형을 함께 보고 선택하세요.', ['모드 차이 이해하기', 'Individual 선택하기', 'Challenge와 Flash Card 비교하기']],
  'group-assignment-policy': ['05-B.', 'Assignment 내보내기', '제출 정책 설정하기', '마감일과 자동 제출 조건을 설정해 과제 운영 기준을 정합니다.', '과제를 배포하기 전에 제출 가능 기간과 자동 제출 정책을 학생에게 명확히 안내하세요.', ['마감일 정하기', '자동 제출 설정하기', '제출 상태 확인하기']],
  'group-assessment-run': ['05-B.', 'Assignment 내보내기', 'Assessment 활용하기', 'Assessment는 Curriculum에서 제공되는 평가지를 학생에게 배정하고, 학생이 자신의 기기에서 정해진 기한 안에 풀어 제출하는 과제형(비동기) 평가 기능입니다.', '이 매뉴얼은 ① 평가지 찾기 → ② 배정(Assign) → ③ 공유 → ④ 학생 응시 → ⑤ 결과 · 리뷰 순서로 설명합니다.', ['평가지 찾기 (Curriculum → Assessment)', '평가지 배정하기 (Assign)', '학생에게 공유하기 (Share Assessment)', '학생 화면 — 응시', '결과 확인 & 리뷰']],
  'group-teaching-mode': ['07-A.', '실시간 수업 진행하기', '수업 모드 사용하기', 'Teaching Mode를 사용해 Lesson을 실시간 수업으로 운영합니다.', '수업 방식에 따라 Interaction, Presentation, Battle Mode를 선택하면 학생 참여 흐름을 다르게 만들 수 있습니다.', ['Teaching Mode 시작하기', '수업 방식 선택하기', '참여 결과 확인하기']],
  'group-reports-results': ['08-A.', '결과 확인하고 리포트 보기', '학습 결과 확인하기', '제출 이력, 학생 답변, 리더보드를 확인하며 학습 결과를 살펴봅니다.', '결과 화면에서는 필터와 제출 상태를 먼저 확인해야 원하는 학생 데이터를 빠르게 찾을 수 있습니다.', ['제출 이력 보기', '학생 답변 확인하기', '리더보드 확인하기']],
  'intro-overview': ['01-1.', 'LumiTeach 시작하기 / 서비스 이해하기', 'LumiTeach가 무엇인지 알아보기', 'LumiTeach는 교사가 AI 기반으로 수업 콘텐츠를 만들고, 학생에게 과제·평가·실시간 수업을 제공할 수 있는 교육 서비스입니다.', '처음 시작하는 교사와 운영자가 서비스의 큰 구조를 이해할 수 있도록 안내합니다.', ['서비스 목적 이해하기', '기본 구조 살펴보기', '사용 흐름 파악하기']],
  'intro-users': ['01-2.', 'LumiTeach 시작하기 / 기본 개념 익히기', '주요 사용자 역할 이해하기', 'LumiTeach를 사용하는 교사, 학생, 기관 관리자, 운영자의 역할을 설명합니다.', '사용자 역할에 따라 접근 가능한 기능과 화면이 달라질 수 있습니다.', ['Teacher 역할 이해하기', 'Student 역할 이해하기', 'Admin 역할 이해하기']],
  'intro-glossary': ['01-3.', 'LumiTeach 시작하기 / 기본 개념 익히기', '기본 용어 익히기', 'Lesson, Activity, Assignment, Assessment, Teaching Mode 등 주요 용어를 정의합니다.', '매뉴얼을 읽기 전 용어를 먼저 이해하면 기능 흐름을 빠르게 파악할 수 있습니다.', ['Lesson 이해하기', 'Activity 이해하기', 'Assignment 이해하기']],
  'start-login': ['02-1-1.', '설정하기 / 처음 환경 설정하기', '회원가입하고 로그인하기', '계정 생성 또는 기존 계정으로 로그인하는 방법입니다.', '기관 계정으로 초대받은 경우 초대받은 계정으로 로그인해야 합니다.', ['계정 생성하기', '로그인하기', '기관 계정 확인하기']],
  'start-dashboard': ['02-1-2.', '설정하기 / 처음 환경 설정하기', '대시보드 둘러보기', '로그인 후 처음 보이는 대시보드의 주요 영역을 안내합니다.', '대시보드에서는 내 Lesson, 최근 콘텐츠, 과제와 평가 진입점을 확인할 수 있습니다.', ['내 콘텐츠 확인하기', '최근 항목 살펴보기', '빠른 시작 사용하기']],
  'start-first-lesson': ['02-1-3.', '설정하기 / 처음 환경 설정하기', '첫 Lesson 만들기', 'Create Lesson을 선택해 첫 수업 콘텐츠를 만드는 흐름입니다.', '제목, 설명, 학습 목표를 입력한 뒤 Activity를 추가합니다.', ['Lesson 생성하기', 'Activity 추가하기', '저장하기']],
  'lesson-overview': ['03-1-1.', 'Lesson 만들고 관리하기 / Lesson 만들기', 'Lesson 구조 이해하기', 'Lesson은 수업 콘텐츠를 구성하는 기본 단위입니다.', 'Lesson 안에 여러 Activity를 담고, 과제 또는 실시간 수업으로 제공할 수 있습니다.', ['Lesson의 역할 이해하기', '구성 요소 살펴보기', '사용 흐름 파악하기']],
  'lesson-create': ['03-1-2.', 'Lesson 만들고 관리하기 / Lesson 만들기', '새 Lesson 만들기', '새 Lesson을 만들고 기본 정보를 입력하는 방법입니다.', '수업 제목, 설명, 학습 목표를 미리 정리해두면 빠르게 만들 수 있습니다.', ['Create Lesson 선택하기', '기본 정보 입력하기', 'Activity 추가하기']],
  'lesson-edit': ['03-1-3.', 'Lesson 만들고 관리하기 / Lesson 만들기', 'Lesson 내용 수정하기', '생성한 Lesson의 내용과 Activity 구성을 수정합니다.', '배포된 Lesson을 수정할 때 학생 화면 반영 정책을 확인해야 합니다.', ['제목 수정하기', 'Activity 수정하기', '순서 변경하기']],
  'edit-lesson-create': ['1.1.', 'Lesson 만들고 관리하기 / Edit Lesson 사용하기', '1. 신규 Lesson 생성하기', 'Lesson은 LumiTeach에서 수업을 구성하는 콘텐츠의 최소 단위입니다.', 'Lesson을 만드는 방법은 크게 두 가지입니다. Home 화면에서 바로 생성하거나 수업 중 Teaching 상태에서 생성할 수 있습니다.', ['방법 1. Home 화면에서 생성하기', '방법 2. Teaching 중에 생성하기']],
  'edit-lesson-rename': ['1.2.', 'Lesson 만들고 관리하기 / Edit Lesson 사용하기', '2. Lesson 명 변경하기', 'Lesson 명은 수업을 구분하는 중요한 식별자입니다.', '생성 시 기본값인 Untitled Lesson으로 저장되므로 수업 내용을 잘 나타내는 이름으로 변경해두는 것이 좋습니다.', ['방법 1. Edit Lesson 화면에서 변경하기', '방법 2. My Storage에서 변경하기']],
  'edit-lesson-add-activity': ['1.3.', 'Lesson 만들고 관리하기 / Edit Lesson 사용하기', '3. Activity 추가하기', 'Activity는 Lesson을 구성하는 슬라이드 단위의 활동입니다.', 'Activity를 추가하는 방법은 + Manual과 ✦ AI Make 두 가지입니다.', ['방법 1. + Manual로 추가하기', '방법 2. ✦ AI Make로 추가하기']],
  'edit-lesson-load-storage': ['1.4.', 'Lesson 만들고 관리하기 / Edit Lesson 사용하기', '4. My Storage로 다른 Lesson 불러오기', 'My Storage에 저장된 다른 Lesson을 현재 작업 중인 Edit Lesson에 불러올 수 있습니다.', 'Lesson 전체를 가져오거나 원하는 Activity만 선택적으로 가져올 수 있어 수업 콘텐츠를 효율적으로 재활용할 수 있습니다.', ['방법 1. Edit Lesson에서 불러오기', '방법 2. Teaching 중에 불러오기']],
  'edit-lesson-ai-make': ['1.5.', 'Lesson 만들고 관리하기 / Edit Lesson 사용하기', '5. AI Make로 Activity 추가하기', '✦ AI Make는 파일을 업로드하면 AI가 자동으로 Activity를 생성해주는 기능입니다.', '파일은 로컬 파일과 Google Drive 두 가지 방식으로 가져올 수 있습니다.', ['방법 1. 로컬 파일로 AI Make 사용하기', '방법 2. Google Drive로 AI Make 사용하기']],
  'edit-lesson-interaction': ['1.6.', 'Lesson 만들고 관리하기 / Edit Lesson 사용하기', '6. Interaction 모드로 수업하기', 'Interaction 모드는 학생이 실시간으로 응답에 참여할 수 있는 수업 모드입니다.', '교사가 슬라이드를 진행하면 학생은 자신의 기기에서 Quiz, Discussion 등 Activity에 직접 참여할 수 있습니다.', ['Step 1. Interaction 모드 선택하기', 'Step 2. 참여 범위 설정하기 (Choose Access Type)', 'Step 3. Interaction 수업 화면']],
  'edit-lesson-presentation': ['1.7.', 'Lesson 만들고 관리하기 / Edit Lesson 사용하기', '7. Presentation 모드로 수업하기', 'Presentation 모드는 인터넷 연결 없이도 수업을 진행할 수 있는 오프라인 수업 모드입니다.', '학생과의 실시간 상호작용 없이 교사가 Lesson 콘텐츠를 화면에 표시하며 수업을 이끌어갑니다.', ['Step 1. Presentation 모드 선택하기', 'Step 2. Presentation 수업 화면']],
  'edit-lesson-undo-redo': ['1.8.', 'Lesson 만들고 관리하기 / Edit Lesson 사용하기', '8. Redo / Undo 사용하기', 'Edit Lesson에서 작업 중 실수로 잘못 수정했거나 이전 상태로 되돌리고 싶을 때 Undo / Redo 기능을 활용할 수 있습니다.', 'Undo / Redo 기능으로 직전 작업을 취소하거나 취소했던 작업을 다시 실행할 수 있습니다.', ['Undo / Redo 버튼 위치', '사용 시 참고사항']],
  'edit-lesson-preview': ['1.9.', 'Lesson 만들고 관리하기 / Edit Lesson 사용하기', '9. Preview 확인하기', 'Preview는 실제 수업을 시작하기 전에 Lesson이 교사와 학생 화면에서 어떻게 보이는지 미리 확인할 수 있는 기능입니다.', '응답 내용은 저장되지 않으므로 자유롭게 테스트할 수 있습니다.', ['Preview 버튼 위치', 'Preview 화면 구성', 'View Mobile 토글']],
  'edit-lesson-background-color': ['1.10.', 'Lesson 만들고 관리하기 / Edit Lesson 사용하기', '10. 배경 색 변경하기', 'Edit Lesson에서 각 Activity 슬라이드의 배경 색상을 원하는 색으로 자유롭게 변경할 수 있습니다.', '선택한 색상은 슬라이드에 실시간으로 반영됩니다.', ['배경 색 변경 방법', '참고사항']],
  'lesson-duplicate': ['03-2-1.', 'Lesson 만들고 관리하기 / Lesson 관리하기', 'Lesson 복제해서 재사용하기', 'Lesson을 저장하거나 기존 Lesson을 복제하여 재사용합니다.', '비슷한 수업을 여러 개 만들 때 복제 기능을 활용하면 효율적입니다.', ['저장하기', '복제하기', '다른 폴더로 이동하기']],
  'lesson-delete': ['03-2-2.', 'Lesson 만들고 관리하기 / Lesson 관리하기', 'Lesson 삭제하고 복구하기', '더 이상 사용하지 않는 Lesson을 삭제하거나 복구합니다.', '영구 삭제 전 복구 가능 여부와 삭제 범위를 확인해야 합니다.', ['휴지통으로 이동하기', '복구하기', '영구 삭제하기']],
  'activities-overview': ['04-1-1.', 'Activity 추가하기 / Activity 만들기', 'Activity 유형 고르기', 'Activity는 Lesson 안에서 학생이 실제로 수행하는 학습 활동 단위입니다.', '학습 목표에 따라 Quiz, Board, Interactive, AI Activity를 선택합니다.', ['Activity 이해하기', '주요 유형 비교하기', '사용 흐름 파악하기']],
  'activities-quiz': ['04-1-2.', 'Activity 추가하기 / Activity 만들기', 'Quiz Activity 만들기', '정답 기반 문제 풀이에 사용하는 Activity입니다.', 'Quiz Activity는 Challenge, Flash Card, Battle Mode와 연결될 수 있습니다.', ['문항 만들기', '정답 설정하기', '결과 확인하기']],
  'activities-board': ['04-1-3.', 'Activity 추가하기 / Activity 만들기', 'Board Activity 만들기', '학생 의견 작성, 공유, 토론형 활동에 적합한 Activity입니다.', '정답보다 의견, 아이디어, 토론 결과를 수집할 때 사용합니다.', ['응답 작성하게 하기', '응답 공유하기', '응답 관리하기']],
  'activities-interactive': ['04-1-4.', 'Activity 추가하기 / Activity 만들기', 'Interactive Activity 만들기', '수업 중 학생 참여를 유도하는 실시간 활동입니다.', 'Interaction Mode에서 학생 참여를 이끌어낼 때 적합합니다.', ['학생 참여 유도하기', '교사 화면에서 제어하기', '참여 현황 확인하기']],
  'activities-ai-create': ['04-2-1.', 'Activity 추가하기 / AI로 Activity 만들기', 'AI로 Activity 생성하기', 'AI를 활용해 Activity 초안을 생성하는 방법입니다.', '학년, 주제, 난이도, 문항 수, 활동 목적을 함께 입력하면 더 적절한 결과를 얻을 수 있습니다.', ['프롬프트 입력하기', 'AI 생성 실행하기', '생성 결과 검토하기']],
  'activities-ai-edit': ['04-2-2.', 'Activity 추가하기 / AI로 Activity 만들기', 'AI 생성 결과 수정하기', 'AI가 생성한 Activity를 수업 목적에 맞게 수정합니다.', 'AI 생성 결과는 반드시 교사가 검토한 뒤 사용해야 합니다.', ['내용 수정하기', '난이도 조정하기', '저장하기']],
  'assignment-overview': ['05-1-1.', 'Assignment 내보내기 / 과제 방식 선택하기', 'Assignment 방식 이해하기', 'Lesson을 학생이 혼자 수행할 수 있도록 과제로 제공하는 기능입니다.', '학습 목적에 따라 Individual, Challenge, Flash Card 중 적절한 모드를 선택합니다.', ['Assignment 이해하기', '제공 모드 비교하기', '결과 확인 흐름 보기']],
  'assignment-individual': ['05-1-2.', 'Assignment 내보내기 / 과제 방식 선택하기', 'Individual 과제 내기', '학생이 개별적으로 Lesson 내 Activity를 수행하는 기본 과제 모드입니다.', '개별 복습, 수업 후 과제, 자기주도 학습에 적합합니다.', ['사용 목적 확인하기', '과제 내기', '제출 확인하기']],
  'assignment-challenge': ['05-1-3.', 'Assignment 내보내기 / 과제 방식 선택하기', 'Challenge 과제 내기', 'Quiz Activity 기반으로 구성되는 도전형 과제 모드입니다.', 'Challenge는 Lesson에 Quiz Activity가 포함되어 있어야 사용할 수 있습니다.', ['사용 조건 확인하기', '진행 방식 이해하기', '결과 확인하기']],
  'assignment-flashcard': ['05-1-4.', 'Assignment 내보내기 / 과제 방식 선택하기', 'Flash Card 과제 내기', 'Quiz Activity 기반으로 학생이 알아요/몰라요 형태로 복습하는 모드입니다.', '학생의 인지 여부를 빠르게 확인하는 복습 활동에 적합합니다.', ['사용 조건 확인하기', '학생 응답 이해하기', '리포트 확인하기']],
  'assignment-deadline': ['05-2-1.', 'Assignment 내보내기 / 제출 정책 설정하기', '마감일 설정하기', '과제 제출 마감일을 설정하고 학생에게 안내합니다.', '마감일은 학생 제출 가능 여부와 자동 제출 정책에 영향을 줄 수 있습니다.', ['마감일 설정하기', '마감일 수정하기', '학생에게 안내하기']],
  'assignment-auto-submit': ['05-2-2.', 'Assignment 내보내기 / 제출 정책 설정하기', '자동 제출 설정하기', '학생이 제출하지 않은 과제를 정해진 조건에 따라 자동 제출 처리합니다.', '자동 제출 정책은 수업 운영 기준에 맞춰 사전에 확인하는 것이 좋습니다.', ['자동 제출 조건 확인하기', '제출 상태 확인하기', '예외 상황 처리하기']],
  'assessment-create': ['05-2-1.', 'Assignment 내보내기 / Assessment 활용하기', '평가지 찾기', 'Curriculum 화면에서 Assessment 탭을 열고 교육과정 트리와 필터로 배정할 평가지 카드를 찾습니다.', 'Assessment 카드는 제목, 문항 수, 문제 유형, 과목 정보를 함께 보여줍니다.', ['Curriculum으로 이동하기', 'Assessment 탭 선택하기', '평가지 카드 확인하기']],
  'assessment-questions': ['05-2-2.', 'Assignment 내보내기 / Assessment 활용하기', 'Assessment 배정 설정하기', 'Assessment 카드에서 Assign 창을 열고 제목, Curriculum Details, Due Date, Shuffle Questions, Assigned to를 설정합니다.', '학생에게 배정하기 전 모바일/데스크톱 미리보기와 배포 범위를 확인하세요.', ['미리보기 확인하기', '제목과 Due Date 설정하기', '배포 범위 선택하기']],
  'assessment-distribute': ['05-2-3.', 'Assignment 내보내기 / Assessment 활용하기', 'Assessment 공유하고 응시하기', 'Share Assessment 창에서 URL, Copy Link, QR Code, Access Code를 학생에게 공유하고 학생 응시 화면을 확인합니다.', '학생은 Nickname을 입력하고 Start를 눌러 각 문항에 답한 뒤 Submit으로 제출합니다.', ['Share Assessment 확인하기', '학생 입장 화면 확인하기', '문제 풀고 제출하기']],
  'assessment-results': ['05-2-4.', 'Assignment 내보내기 / Assessment 활용하기', '결과 확인하고 리뷰하기', '제출 완료 후 Correct, Wrong, Not Submitted 수와 문항별 결과를 확인하고 상세 리뷰로 이동합니다.', 'Review Mode에서는 학생이 선택한 답과 The correct answer is 영역의 정답을 함께 확인합니다.', ['제출 완료 화면 확인하기', 'Results 그리드 확인하기', 'Review Mode 확인하기']],
  'teaching-overview': ['07-1-1.', '실시간 수업 진행하기 / 수업 모드 사용하기', 'Teaching Mode 시작하기', '교사가 Lesson을 실시간 수업으로 운영하는 모드입니다.', '수업 목적에 따라 Interaction, Presentation, Battle Mode를 선택합니다.', ['수업 시작하기', '모드 선택하기', '학생 참여 확인하기']],
  'teaching-interaction': ['07-1-2.', '실시간 수업 진행하기 / 수업 모드 사용하기', 'Interaction으로 참여 유도하기', '교사와 학생이 실시간으로 활동을 주고받는 수업 모드입니다.', '질문, 응답, 공유가 필요한 수업에 적합합니다.', ['실시간 참여 유도하기', '응답 수집하기', '응답 공유하기']],
  'teaching-presentation': ['07-1-3.', '실시간 수업 진행하기 / 수업 모드 사용하기', 'Presentation으로 수업하기', 'Lesson을 발표 자료처럼 보여주는 수업 모드입니다.', '교사가 흐름을 제어하며 설명 중심 수업을 진행할 수 있습니다.', ['슬라이드 진행하기', '화면 제어하기', '수업 종료하기']],
  'teaching-battle': ['07-1-4.', '실시간 수업 진행하기 / 수업 모드 사용하기', 'Battle Mode로 퀴즈 진행하기', 'Quiz 기반으로 학생 참여를 경쟁형으로 운영하는 모드입니다.', '학생 참여 동기를 높이고 즉각적인 반응을 확인할 수 있습니다.', ['참여 조건 확인하기', '퀴즈 진행하기', '리더보드 확인하기']],
  'reports-submission': ['08-1-1.', '결과 확인하고 리포트 보기 / 학습 결과 확인하기', '제출 이력 확인하기', '학생별 제출 이력을 확인합니다.', '제출 시간, 제출 상태, 과제별 진행 상황을 함께 볼 수 있습니다.', ['제출 목록 보기', '상태 확인하기', '필터 적용하기']],
  'reports-answer': ['08-1-2.', '결과 확인하고 리포트 보기 / 학습 결과 확인하기', '학생 답변 확인하기', '학생이 제출한 답변 내용을 확인합니다.', '개별 피드백이나 재지도에 필요한 근거로 활용할 수 있습니다.', ['답변 보기', '피드백 남기기', '다시 확인하기']],
  'reports-leaderboard': ['08-1-3.', '결과 확인하고 리포트 보기 / 학습 결과 확인하기', '리더보드 확인하기', 'Challenge 또는 Battle Mode의 순위를 확인합니다.', '점수 기준과 동점 처리 방식을 함께 확인하세요.', ['순위 보기', '점수 기준 확인하기', '결과 공유하기']],
  'storage-overview': ["09-1-1.","내 자료 정리하기","My Storage 화면 이해하기","상단 내비게이션에서 My Storage로 진입하고 화면의 좌측 패널과 우측 영역을 확인합니다.","My Storage는 내가 만들거나 편집한 모든 수업 자료(Lesson·폴더)를 모아 관리하는 개인 보관함입니다.",["My Storage 진입하기","화면 구성"]],
  'storage-folder': ["09-1-2.","내 자료 정리하기","검색 / 탭 / 정렬 사용하기","검색창, All / Lessons 탭, 정렬 옵션으로 폴더와 Lesson을 찾는 방법을 확인합니다.","검색 결과에는 항목 수, 활동 수, 수정 시각이 함께 표시됩니다.",["검색하기","탭 전환하기","정렬하기"]],
  'storage-move': ["09-1-3.","내 자료 정리하기","폴더 · Lesson 카드 확인하기","각 폴더와 Lesson 카드에서 체크박스, 즐겨찾기, ⋮ 메뉴, 항목 수와 수정 시각을 확인합니다.","폴더와 Lesson 모두 Favorites에 추가할 수 있습니다.",["카드 요소 확인하기","즐겨찾기 확인하기","항목별 작업 메뉴 열기"]],
  'storage-trash': ["09-1-4.","내 자료 정리하기","Lesson 메뉴와 미리보기 확인하기","Lesson 카드의 ⋮ 메뉴와 Start Teaching, Lesson 미리보기 창에서 할 수 있는 작업을 확인합니다.","Lesson 미리보기에서 활동 구성과 수업 모드 버튼을 확인한 뒤 Edit으로 편집할 수 있습니다.",["Lesson 메뉴 확인하기","Start Teaching으로 바로 시작하기","Lesson 미리보기 확인하기"]]
};

// BEGIN GENERATED LUMITEACH PAGES

Object.assign(articleTemplates, {
  "cat-explore": [
        "05.",
        "LumiTeach Help Center",
        "내 소속 자료 활용하기",
        "내 소속에서 공유된 Lesson을 확인하고, Creator Page에서 내 Lesson을 공개하고 관리하는 방법을 안내합니다.",
        "화면에 표시되는 검색, 필터, 정렬, Publish 흐름을 기준으로 필요한 작업만 진행합니다.",
        [
              "내 소속 자료 보기",
              "Creator Page 관리하기"
        ]
  ],
  "explore-browse": [
        "05-1.",
        "내 소속 자료 활용하기",
        "내 소속 자료 보기",
        "내 소속에서 공유된 Lesson을 검색, 필터, 정렬하고 Lesson preview에서 내용을 확인하는 방법입니다.",
        "화면에 표시되는 **Search**, **Subject**, **Grade**, **Latest**, **Use Lesson** 항목을 기준으로 진행합니다.",
        []
  ],
  "explore-creator-page": [
        "05-2.",
        "내 소속 자료 활용하기",
        "Creator Page 관리하기",
        "Creator Page에서 내 Lesson을 선택해 내 소속 자료로 공개하고, 공개된 Lesson을 관리하는 방법입니다.",
        "화면에 표시되는 **+ Publish Lesson**, **Next**, **Publish**, **Edit**, **Delete** 버튼을 기준으로 진행합니다.",
        []
  ]
});

const generatedEditLessonBaseArticles = [{ key: "edit-lesson-background-image", title: "11. 배경 이미지 추가하여 변경하기" }, { key: "edit-lesson-activity-common-setting", title: "12. Activity Common Setting" }];
const generatedSelfStudyGroup = { key: 'group-edit-lesson-self-study', title: 'Self Study 모드 활용하기', articles: [{ key: "edit-lesson-self-study-individual", title: "1. Individual" }, { key: "edit-lesson-self-study-challenge", title: "2. Challenge" }, { key: "edit-lesson-self-study-flash-card", title: "3. Flash Card" }] };
const generatedEditLessonGroups = [
  { key: 'group-lesson-material-edit', title: 'Lesson 자료 수정하기', articles: [{ key: "edit-lesson-text-properties", title: "1. Text 속성 변경하기" }, { key: "edit-lesson-rewrite", title: "2. Rewrite 사용하기" }, { key: "edit-lesson-add-text-object", title: "3. Text 객체 추가하기" }, { key: "edit-lesson-add-shape", title: "4. 도형 객체 추가하기" }, { key: "edit-lesson-upload-image", title: "5. 이미지 업로드하기" }, { key: "edit-lesson-image-properties", title: "6. 이미지 객체 속성 변경하기" }] },
  { key: 'group-lesson-embed', title: '자료 Embed 하기', articles: [{ key: "edit-lesson-webviewer", title: "1. Web Viewer" }, { key: "edit-lesson-youtube", title: "2. Youtube" }, { key: "edit-lesson-document", title: "3. Document 불러오기" }, { key: "edit-lesson-sound", title: "4. Sound 첨부하기" }] },
  { key: 'group-lesson-quiz-activity', title: 'Quiz Activity 활용하기', articles: [{ key: "edit-lesson-quiz-true-false", title: "1. True or False" }, { key: "edit-lesson-quiz-multiple-choice", title: "2. Multiple Choice" }, { key: "edit-lesson-quiz-short-answer", title: "3. Short Answer" }, { key: "edit-lesson-quiz-fill-blank", title: "4. Fill in the Blank" }, { key: "edit-lesson-quiz-matching", title: "5. Matching" }, { key: "edit-lesson-quiz-open-ended", title: "6. Open-Ended" }, { key: "edit-lesson-quiz-sequencing", title: "7. Sequencing" }, { key: "edit-lesson-quiz-sorting", title: "8. Sorting" }] },
  { key: 'group-lesson-discussion-activity', title: 'Discussion Activity 활용하기', articles: [{ key: "edit-lesson-discussion-agree-disagree", title: "1. Agree / Disagree" }, { key: "edit-lesson-discussion-opinion-scale", title: "2. Opinion Scale" }, { key: "edit-lesson-discussion-traffic-light", title: "3. Traffic Light" }, { key: "edit-lesson-discussion-vote", title: "4. Vote" }] },
  { key: 'group-lesson-idea-board-activity', title: 'Idea Board Activity 활용하기', articles: [{ key: "edit-lesson-idea-board-brainstorming", title: "1. Brainstorming" }, { key: "edit-lesson-idea-board-whiteboard", title: "2. Whiteboard" }] }
];

const lessonCategoryForGeneratedPages = manualTree.find((category) => category.key === 'cat-lesson');
const editLessonGroupForGeneratedPages = lessonCategoryForGeneratedPages.children.find((group) => group.key === 'group-edit-lesson');
editLessonGroupForGeneratedPages.articles.push(...generatedEditLessonBaseArticles);
const editLessonGroupIndex = lessonCategoryForGeneratedPages.children.findIndex((group) => group.key === 'group-edit-lesson');
lessonCategoryForGeneratedPages.children.splice(editLessonGroupIndex + 1, 0, ...generatedEditLessonGroups);
const assignmentCategoryForGeneratedPages = manualTree.find((category) => category.key === 'cat-assignment');
assignmentCategoryForGeneratedPages.children.unshift(generatedSelfStudyGroup);

Object.assign(articleTemplates, {
      "group-edit-lesson-self-study": [
            "05-A.",
            "Assignment 내보내기",
            "Self Study 모드 활용하기",
            "학생이 Lesson을 스스로 학습할 수 있도록 Individual, Challenge, Flash Card 모드를 활용하는 방법을 안내합니다.",
            "수업 목적에 따라 개인 학습, 경쟁형 복습, 플래시카드 복습 중 적절한 모드를 선택하세요.",
            [
                  "Self Study 방식 이해하기",
                  "모드별 차이 확인하기",
                  "학생에게 공유하기"
            ]
      ],
      "group-lesson-material-edit": [
            "03-B-2.",
            "Lesson 만들고 관리하기",
            "Lesson 자료 수정하기",
            "Edit Lesson 화면에서 텍스트, 도형, 이미지 등 수업 자료 객체를 추가하고 수정하는 방법을 안내합니다.",
            "자료 편집은 슬라이드 구성과 학생 화면에 직접 영향을 주므로 저장 상태를 함께 확인하세요.",
            [
                  "텍스트 수정하기",
                  "객체 추가하기",
                  "이미지 수정하기"
            ]
      ],
      "group-lesson-embed": [
            "03-B-3.",
            "Lesson 만들고 관리하기",
            "자료 Embed 하기",
            "웹페이지, 유튜브, 문서, 사운드처럼 외부 자료를 Lesson 안에 삽입하는 방법을 안내합니다.",
            "외부 자료를 사용할 때는 학생 화면에서 접근 가능한 형식인지 함께 확인하는 것이 좋습니다.",
            [
                  "Web Viewer 사용하기",
                  "Youtube 삽입하기",
                  "Document 불러오기"
            ]
      ],
      "group-lesson-quiz-activity": [
            "03-B-4.",
            "Lesson 만들고 관리하기",
            "Quiz Activity 활용하기",
            "True or False, Multiple Choice, Short Answer 등 Quiz Activity 유형별 구성과 수업 진행 방식을 안내합니다.",
            "Quiz Activity는 정답, 결과 표시, 학생 응답 방식이 유형마다 다르므로 목적에 맞는 유형을 선택하세요.",
            [
                  "Quiz 유형 고르기",
                  "문항 구성하기",
                  "결과 확인하기"
            ]
      ],
      "group-lesson-discussion-activity": [
            "03-B-5.",
            "Lesson 만들고 관리하기",
            "Discussion Activity 활용하기",
            "Agree / Disagree, Opinion Scale, Traffic Light, Vote 등 의견 기반 Activity를 활용하는 방법을 안내합니다.",
            "Discussion Activity는 정답보다 학생 의견과 이유를 수집하는 데 초점을 둡니다.",
            [
                  "의견 방식 선택하기",
                  "학생 의견 수집하기",
                  "결과로 토론하기"
            ]
      ],
      "group-lesson-idea-board-activity": [
            "03-B-6.",
            "Lesson 만들고 관리하기",
            "Idea Board Activity 활용하기",
            "Brainstorming과 Whiteboard처럼 학생의 생각을 모으거나 직접 그리며 참여하는 Idea Board Activity를 안내합니다.",
            "정답을 고르는 Activity가 아니라 학생의 의견, 아이디어, 손글씨·그림 작업을 수업 중 함께 확인하는 활동입니다.",
            [
                  "Brainstorming으로 의견 모으기",
                  "Whiteboard로 직접 표현하기",
                  "학생 참여 화면 확인하기"
            ]
      ]
});

Object.assign(articleTemplates, {
      "edit-lesson-background-image": [
            "11.",
            "Lesson 만들고 관리하기 / Edit Lesson 사용하기",
            "11. 배경 이미지 추가하여 변경하기",
            "단색 배경 대신 원하는 이미지를 슬라이드 배경으로 설정할 수 있습니다. 로컬 파일 업로드 또는 웹 검색으로 이미지를 가져올 수 있습니다.",
            "배경 이미지 추가하여 변경하기 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "배경 이미지 설정 방법",
                  "이미지 업로드하기",
                  "이미지 적용하기"
            ]
      ],
      "edit-lesson-self-study-individual": [
            "1.",
            "Assignment 내보내기 / Self Study 모드 활용하기",
            "1. Individual",
            "Individual은 학생이 혼자 문제를 풀며 학습하는 Self Study 모드입니다. 교사가 Lesson을 과제로 배포하면 학생은 자신의 기기에서 개인 학습으로 진행할 수 있습니다.",
            "Individual 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Step 1. Individual 모드 선택하기",
                  "Step 2. 과제 설정하기",
                  "Step 3. 과제 공유하기"
            ]
      ],
      "edit-lesson-self-study-challenge": [
            "2.",
            "Assignment 내보내기 / Self Study 모드 활용하기",
            "2. Challenge",
            "Challenge는 경쟁 방식으로 학생들의 참여를 높이는 Self Study 모드입니다. 리더보드를 통해 학생들이 서로 순위를 확인하며 동기부여를 받을 수 있습니다. Individual 모드와 설정 방식은 유사하지만, **Show Leaderboard** 옵션이 추가로 제공됩니다.",
            "Challenge 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Step 1. Challenge 모드 선택하기",
                  "Step 2. 과제 설정하기",
                  "Step 3. 과제 공유하기"
            ]
      ],
      "edit-lesson-self-study-flash-card": [
            "3.",
            "Assignment 내보내기 / Self Study 모드 활용하기",
            "3. Flash Card",
            "Flash Cards는 플래시 카드 방식으로 지식을 반복 학습하는 Self Study 모드입니다. 학생이 카드를 넘기며 스스로 내용을 익히는 방식으로 운영됩니다. Individual, Challenge와 달리 **Check correctness**와 **Show Leaderboard** 옵션이 없어 설정이 간단합니다.",
            "Flash Card 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Step 1. Flash Cards 모드 선택하기",
                  "Step 2. 과제 설정하기",
                  "Step 3. 과제 공유하기"
            ]
      ],
      "edit-lesson-activity-common-setting": [
            "12.",
            "Lesson 만들고 관리하기 / Edit Lesson 사용하기",
            "12. Activity Common Setting",
            "Activity Common Setting은 Quiz, Discussion 등 각 Activity에 공통으로 적용되는 설정입니다. Activity를 선택하면 우측 패널에 설정 옵션이 표시됩니다.",
            "Activity Common Setting 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Common Setting",
                  "Time Limit"
            ]
      ],
      "edit-lesson-text-properties": [
            "2.1.",
            "Lesson 만들고 관리하기 / Lesson 자료 수정하기",
            "1. Text 속성 변경하기",
            "Edit Lesson에서 텍스트 객체를 클릭하면 상단에 텍스트 속성 툴바가 나타납니다. 이 툴바를 통해 폰트, 크기, 스타일, 색상, 정렬 등 다양한 속성을 변경할 수 있습니다.",
            "Text 속성 변경하기 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "툴바 구성",
                  "참고사항"
            ]
      ],
      "edit-lesson-rewrite": [
            "2.1.1.",
            "Lesson 만들고 관리하기 / Lesson 자료 수정하기",
            "2. Rewrite 사용하기",
            "Rewrite는 슬라이드 내 텍스트 객체를 AI가 자동으로 다듬어주는 기능입니다. 텍스트를 직접 수정하지 않아도 원하는 방향으로 빠르게 변환할 수 있습니다.",
            "Rewrite 사용하기 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "사용 방법",
                  "Rewrite 옵션"
            ]
      ],
      "edit-lesson-add-text-object": [
            "2.3.",
            "Lesson 만들고 관리하기 / Lesson 자료 수정하기",
            "3. Text 객체 추가하기",
            "슬라이드에 텍스트 객체를 자유롭게 추가할 수 있습니다. 레이아웃에 포함된 텍스트 외에도 별도의 텍스트 객체를 원하는 위치에 추가하여 내용을 보강할 때 활용합니다.",
            "Text 객체 추가하기 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "텍스트 객체 추가 방법",
                  "텍스트 유형",
                  "추가 후 편집"
            ]
      ],
      "edit-lesson-add-shape": [
            "2.4.",
            "Lesson 만들고 관리하기 / Lesson 자료 수정하기",
            "4. 도형 객체 추가하기",
            "슬라이드에 도형 객체를 자유롭게 추가할 수 있습니다. 원, 사각형, 삼각형, 화살표 등 12가지 도형을 제공하며, 추가 후 색상·투명도·크기·정렬 등 다양한 속성을 조정할 수 있습니다.",
            "도형 객체 추가하기 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "도형 추가 방법",
                  "제공 도형 목록",
                  "도형 속성 변경"
            ]
      ],
      "edit-lesson-upload-image": [
            "2.5.",
            "Lesson 만들고 관리하기 / Lesson 자료 수정하기",
            "5. 이미지 업로드하기",
            "슬라이드에 이미지 객체를 추가할 수 있습니다. 로컬 파일을 직접 업로드하거나, 웹에서 이미지를 검색하여 가져올 수 있습니다.",
            "이미지 업로드하기 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "이미지 추가 방법",
                  "방법 1. From File (로컬 파일 업로드)",
                  "방법 2. Search from web (웹 검색)",
                  "이미지 속성 변경"
            ]
      ],
      "edit-lesson-image-properties": [
            "2.6.",
            "Lesson 만들고 관리하기 / Lesson 자료 수정하기",
            "6. 이미지 객체 속성 변경하기",
            "슬라이드에 추가된 이미지 객체를 클릭하면 상단에 속성 툴바가 나타납니다. 투명도, 모서리 라운드, 정렬, 레이어 순서 등 다양한 속성을 조정할 수 있습니다.",
            "이미지 객체 속성 변경하기 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Opacity (투명도)",
                  "Corner rounded (모서리 라운드)",
                  "정렬",
                  "레이어 순서",
                  "복제 / 삭제"
            ]
      ],
      "edit-lesson-webviewer": [
            "3.1.",
            "Lesson 만들고 관리하기 / 자료 Embed 하기",
            "1. Web Viewer",
            "Web Viewer는 웹 페이지 URL을 슬라이드에 삽입하여, 수업 중 학생들에게 특정 웹 사이트를 바로 보여줄 수 있는 Embed Activity입니다.",
            "Web Viewer 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Web Viewer Activity 추가하기",
                  "Web link 설정하기",
                  "Background Color 설정하기",
                  "학생 화면에서의 표시"
            ]
      ],
      "edit-lesson-youtube": [
            "3.2.",
            "Lesson 만들고 관리하기 / 자료 Embed 하기",
            "2. Youtube",
            "Youtube는 YouTube 영상 URL을 슬라이드에 삽입하여, 수업 중 학생들에게 영상을 바로 재생하여 보여줄 수 있는 Embed Activity입니다.",
            "Youtube 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Youtube Activity 추가하기",
                  "Youtube Link 설정하기",
                  "수업 중 재생 방법",
                  "Background Color 설정하기"
            ]
      ],
      "edit-lesson-document": [
            "3.3.",
            "Lesson 만들고 관리하기 / 자료 Embed 하기",
            "3. Document 불러오기",
            "Document는 PDF, PPT 등 문서 파일을 슬라이드에 삽입하는 Embed Activity입니다. 업로드한 문서의 각 페이지가 슬라이드 배경 이미지로 자동 변환되어, 수업 자료를 그대로 보여주며 수업을 진행할 수 있습니다.",
            "Document 불러오기 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Document Activity 추가하기",
                  "문서 업로드하기",
                  "Upload Documents 팝업",
                  "페이지 선택 및 가져오기",
                  "가져오기 완료 후"
            ]
      ],
      "edit-lesson-sound": [
            "3.4.",
            "Lesson 만들고 관리하기 / 자료 Embed 하기",
            "4. Sound 첨부하기",
            "Lesson의 슬라이드에 배경 음악이나 효과음 등 오디오 파일을 첨부하여 수업에 활용할 수 있습니다. 첨부된 사운드는 해당 슬라이드가 표시되는 동안 재생됩니다.",
            "Sound 첨부하기 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "오디오 파일 업로드하기",
                  "업로드 완료 후 화면",
                  "오디오 객체 삭제하기"
            ]
      ],
      "edit-lesson-quiz-true-false": [
            "4.1.",
            "Lesson 만들고 관리하기 / Quiz Activity 활용하기",
            "1. True or False",
            "**True or False**는 학생이 제시된 문장이 맞는지 틀린지 선택하는 퀴즈 Activity입니다. 개념 확인, 빠른 진단 평가, 수업 중 이해도 점검에 활용할 수 있습니다.",
            "True or False 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                                  "Edit Lesson - Activity 추가 및 구성",
                                  "Teaching - 수업 진행",
                                  "Student View - 학생 화면"
            ]
      ],
      "edit-lesson-quiz-multiple-choice": [
            "4.2.",
            "Lesson 만들고 관리하기 / Quiz Activity 활용하기",
            "2. Multiple Choice",
            "**Multiple Choice**는 교사가 제시한 질문에 대해 학생들이 여러 보기 중 하나를 선택하는 퀴즈 Activity입니다. 보기를 텍스트로 구성하거나 이미지로 구성할 수 있어 다양한 유형의 문제를 만들 수 있습니다.",
            "Multiple Choice 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Edit Lesson - Activity 추가 및 구성",
                  "Teaching - 수업 진행",
                  "Student View - 학생 화면"
            ]
      ],
      "edit-lesson-quiz-short-answer": [
            "4.3.",
            "Lesson 만들고 관리하기 / Quiz Activity 활용하기",
            "3. Short Answer",
            "**Short Answer**는 학생들이 직접 단답형 텍스트를 입력하여 답변하는 퀴즈 Activity입니다. 교사가 허용 답변을 여러 개 등록할 수 있어 다양한 표현을 모두 정답으로 처리할 수 있습니다.",
            "Short Answer 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Edit Lesson - Activity 추가 및 구성",
                  "Teaching - 수업 진행",
                  "Student View - 학생 화면"
            ]
      ],
      "edit-lesson-quiz-fill-blank": [
            "4.4.",
            "Lesson 만들고 관리하기 / Quiz Activity 활용하기",
            "4. Fill in the Blank",
            "**Fill in the Blank**은 문장 속 빈칸에 들어갈 단어를 학생이 직접 입력하는 퀴즈 Activity입니다. 교사가 문장에서 빈칸으로 처리할 단어를 대괄호로 감싸면 학생 화면에 물음표(?) 타일로 표시됩니다.",
            "Fill in the Blank 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Edit Lesson - Activity 추가 및 구성",
                  "Teaching - 수업 진행",
                  "Student View - 학생 화면"
            ]
      ],
      "edit-lesson-quiz-matching": [
            "4.5.",
            "Lesson 만들고 관리하기 / Quiz Activity 활용하기",
            "5. Matching",
            "**Matching**은 왼쪽 항목과 오른쪽 항목을 서로 연결하는 퀴즈 Activity입니다. 텍스트끼리 매칭하거나 이미지끼리 매칭하는 두 가지 레이아웃을 지원합니다.",
            "Matching 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Edit Lesson - Activity 추가 및 구성",
                  "Teaching - 수업 진행",
                  "Student View - 학생 화면"
            ]
      ],
      "edit-lesson-quiz-open-ended": [
            "4.6.",
            "Lesson 만들고 관리하기 / Quiz Activity 활용하기",
            "6. Open-Ended",
            "**Open-Ended**는 학생이 자유롭게 텍스트로 답변을 작성하는 주관식 퀴즈 Activity입니다. 정해진 보기 없이 자신의 생각을 문장으로 표현하며, 교사가 모범 답안을 설정하여 수업 후 공개할 수 있습니다.",
            "Open-Ended 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Edit Lesson - Activity 추가 및 구성",
                  "Teaching - 수업 진행",
                  "Student View - 학생 화면"
            ]
      ],
      "edit-lesson-quiz-sequencing": [
            "4.7.",
            "Lesson 만들고 관리하기 / Quiz Activity 활용하기",
            "7. Sequencing",
            "**Sequencing**은 주어진 항목들을 올바른 순서로 배열하는 퀴즈 Activity입니다. 이미지 카드를 순서대로 드래그하거나, 텍스트 항목을 클릭·드래그하여 정답 순서를 완성합니다.",
            "Sequencing 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Edit Lesson - Activity 추가 및 구성",
                  "Teaching - 수업 진행",
                  "Student View - 학생 화면"
            ]
      ],
      "edit-lesson-quiz-sorting": [
            "4.8.",
            "Lesson 만들고 관리하기 / Quiz Activity 활용하기",
            "8. Sorting",
            "**Sorting**은 주어진 항목들을 올바른 그룹으로 분류하는 퀴즈 Activity입니다. 이미지 카드나 텍스트 항목을 드래그하여 정해진 카테고리 박스에 분류합니다.",
            "Sorting 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Edit Lesson - Activity 추가 및 구성",
                  "Teaching - 수업 진행",
                  "Student View - 학생 화면"
            ]
      ],
      "edit-lesson-discussion-agree-disagree": [
            "5.1.",
            "Lesson 만들고 관리하기 / Discussion Activity 활용하기",
            "1. Agree / Disagree",
            "**Agree / Disagree**는 주제에 대해 찬성(Agree) 또는 반대(Disagree) 입장을 선택하고, 그 이유를 텍스트로 작성하는 Discussion Activity입니다. 학생들의 의견이 카드 형태로 공유되어 토론 수업을 이끌 수 있습니다.",
            "Agree / Disagree 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Edit Lesson - Activity 추가 및 구성",
                  "Teaching - 수업 진행",
                  "Student View - 학생 화면"
            ]
      ],
      "edit-lesson-discussion-opinion-scale": [
            "5.2.",
            "Lesson 만들고 관리하기 / Discussion Activity 활용하기",
            "2. Opinion Scale",
            "**Opinion Scale**은 학생들이 주어진 주제나 문장에 대해 얼마나 동의하는지를 5단계 척도로 표현하는 Discussion Activity입니다. Strongly Agree(강한 동의)부터 Strongly Disagree(강한 반대)까지의 스케일 바에서 자신의 위치를 선택하고, 그 이유를 자유롭게 작성합니다. 정답/오답이 없는 활동으로, 학생 개개인의 의견과 근거를 이끌어내는 데 효과적입니다.",
            "Opinion Scale 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Opinion Scale란?",
                  "Edit Lesson - 활동 설정하기",
                  "Teaching - 수업 진행하기",
                  "Student View - 학생 화면"
            ]
      ],
      "edit-lesson-discussion-traffic-light": [
            "5.3.",
            "Lesson 만들고 관리하기 / Discussion Activity 활용하기",
            "3. Traffic Light",
            "**Traffic Light**는 신호등의 색상을 활용하여 학생들이 주어진 주제에 대한 의견을 직관적으로 표현하는 Discussion Activity입니다. 초록(Agree), 노랑(Neutral), 빨강(Disagree) 세 가지 선택지로 구성되며, 각 색상이 의견의 방향을 시각적으로 전달합니다. 정답/오답이 없는 활동으로, 색상과 함께 자신의 이유를 작성하며 다양한 관점을 나눌 수 있습니다.",
            "Traffic Light 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Traffic Light란?",
                  "Edit Lesson - 활동 설정하기",
                  "Teaching - 수업 진행하기",
                  "Student View - 학생 화면"
            ]
      ],
      "edit-lesson-discussion-vote": [
            "5.4.",
            "Lesson 만들고 관리하기 / Discussion Activity 활용하기",
            "4. Vote",
            "**Vote**는 학생들이 주어진 여러 선택지 중 하나에 투표하여 의견을 표현하는 Discussion Activity입니다. 이미지 기반(Image-Based)과 텍스트 기반(Text-Based) 두 가지 레이아웃을 지원하며, 선택지를 자유롭게 추가하고 각 선택지에 이미지를 첨부할 수 있습니다. 정답/오답이 없는 활동으로, 학생들의 선호와 이유를 자유롭게 이끌어내는 데 효과적입니다.",
            "Vote 작업 전후로 저장 상태와 학생 화면 반영 여부를 함께 확인하세요.",
            [
                  "Vote란?",
                  "Edit Lesson - 활동 설정하기",
                  "Teaching - 수업 진행하기",
                  "Student View - 학생 화면"
            ]
      ],
      "edit-lesson-idea-board-brainstorming": [
            "6.1.",
            "Lesson 만들고 관리하기 / Idea Board Activity 활용하기",
            "1. Brainstorming",
            "**Brainstorming**은 하나의 질문을 던지고 학생들이 각자의 의견을 자유롭게 적어 모으는 Idea Board Activity입니다.",
            "모인 의견은 Post-it, Live Wordcloud, Word Cloud, Classification, Mind Map 형태로 확인할 수 있습니다.",
            [
                  "Brainstorming이란?",
                  "Edit Lesson - 활동 만들기",
                  "Teaching - 수업 진행",
                  "Student View - 학생 화면"
            ]
      ],
      "edit-lesson-idea-board-whiteboard": [
            "6.2.",
            "Lesson 만들고 관리하기 / Idea Board Activity 활용하기",
            "2. Whiteboard",
            "**Whiteboard**는 선생님이 준비한 보드에 학생들이 직접 펜으로 그리거나 쓰면서 참여하는 Idea Board Activity입니다.",
            "글자 따라쓰기, 그림 그리기, 음표 그리기처럼 손으로 직접 표현하는 활동에 적합합니다.",
            [
                  "Whiteboard란?",
                  "Edit Lesson - 활동 만들기",
                  "Teaching - 수업 진행",
                  "Student View - 학생 화면"
            ]
      ]
});
// END GENERATED LUMITEACH PAGES



// BEGIN TOOL KIT CONTENT PATCH
const toolkitCategory = {
  "key": "cat-toolkit",
  "title": "08. Tool Kit 사용하기",
  "description": "수업 중 보조 도구 실행과 활용",
  "children": [
    {
      "key": "group-toolkit-normal",
      "title": "Normal",
      "articles": [
        {
          "key": "toolkit-wheel",
          "title": "1. Wheel"
        },
        {
          "key": "toolkit-dice",
          "title": "2. Dice"
        },
        {
          "key": "toolkit-bell",
          "title": "3. Bell"
        },
        {
          "key": "toolkit-sound-monitor",
          "title": "4. Sound Monitor"
        },
        {
          "key": "toolkit-clock",
          "title": "5. Clock"
        },
        {
          "key": "toolkit-annotate",
          "title": "6. Annotate"
        },
        {
          "key": "toolkit-share-web-link",
          "title": "7. Share Web Link"
        },
        {
          "key": "toolkit-quick-quiz",
          "title": "8. Quick Quiz"
        },
        {
          "key": "toolkit-quick-poll",
          "title": "9. Quick Poll"
        }
      ]
    },
    {
      "key": "group-toolkit-timer",
      "title": "Timer",
      "articles": [
        {
          "key": "toolkit-digital-timer",
          "title": "10. DigitalTimer"
        },
        {
          "key": "toolkit-hourglass",
          "title": "11. Hourglass"
        },
        {
          "key": "toolkit-pie-timer",
          "title": "12. Pie Timer"
        }
      ]
    },
    {
      "key": "group-toolkit-competition",
      "title": "Competition",
      "articles": [
        {
          "key": "toolkit-first-to-buzz",
          "title": "13. First to Buzz"
        }
      ]
    },
    {
      "key": "group-toolkit-draw",
      "title": "Draw",
      "articles": [
        {
          "key": "toolkit-presentation-lottery",
          "title": "14. Presentation Lottery"
        },
        {
          "key": "toolkit-card-draw",
          "title": "15. Card Draw"
        },
        {
          "key": "toolkit-lucky-ladder",
          "title": "16. Lucky Ladder"
        },
        {
          "key": "toolkit-group-maker",
          "title": "17. Group Maker"
        }
      ]
    },
    {
      "key": "group-toolkit-math-tools",
      "title": "Math Tools",
      "articles": [
        {
          "key": "toolkit-ruler",
          "title": "18. Ruler"
        },
        {
          "key": "toolkit-triangle",
          "title": "19. Triangle"
        },
        {
          "key": "toolkit-protractor",
          "title": "20. Protractor"
        }
      ]
    }
  ]
};

const reportsCategoryIndex = manualTree.findIndex((category) => category.key === 'cat-reports');
if (!manualTree.some((category) => category.key === toolkitCategory.key)) {
  manualTree.splice(reportsCategoryIndex >= 0 ? reportsCategoryIndex : manualTree.length, 0, toolkitCategory);
}


// BEGIN CLASS CATEGORY PATCH
const classCategory = {
  key: 'cat-class',
  title: 'Class 사용하기',
  description: 'Class별 수업·과제 리포트와 학생 명단 관리',
  children: [
    { key: 'class-teaching-report', title: 'Teaching Report 확인하기', articles: [] },
    { key: 'class-assignment-report', title: 'Assignment Report 확인하기', articles: [] },
    { key: 'class-management', title: 'Class Management 사용하기', articles: [] }
  ]
};
const existingClassCategoryIndex = manualTree.findIndex((category) => category.key === classCategory.key);
if (existingClassCategoryIndex >= 0) manualTree.splice(existingClassCategoryIndex, 1);
const oldReportsCategoryIndex = manualTree.findIndex((category) => category.key === 'cat-reports');
if (oldReportsCategoryIndex >= 0) {
  manualTree.splice(oldReportsCategoryIndex, 1, classCategory);
} else {
  const storageCategoryIndexForClass = manualTree.findIndex((category) => category.key === 'cat-storage');
  manualTree.splice(storageCategoryIndexForClass >= 0 ? storageCategoryIndexForClass : manualTree.length, 0, classCategory);
}

Object.assign(articleTemplates, {
  'cat-class': ['07.', 'LumiTeach Help Center', 'Class 사용하기', 'Class 메뉴에서 실시간 수업과 과제 결과를 확인하고, 수업에 사용할 학생 명단을 관리하는 방법을 안내합니다.', 'Class는 학생 참여 결과를 보는 리포트 영역과 실제 수업·과제 대상이 되는 학급 관리 영역을 함께 다룹니다.', ['Teaching Report 확인하기', 'Assignment Report 확인하기', 'Class Management 사용하기']],
  'class-teaching-report': ['07-1.', 'Class 사용하기', 'Teaching Report 확인하기', 'Teaching Report에서 실시간 수업 참여율, 정답률, 완료률과 학생별 활동 현황을 종합적으로 확인합니다.', '수업 목록, 요약 지표, 학생 분포 차트, 학생별 표와 상세 화면을 순서대로 확인합니다.', ['진입 및 필터', '수업 목록', '요약 지표', '학생 분포 차트', 'Student Activity Performance', '학생 상세 화면']],
  'class-assignment-report': ['07-2.', 'Class 사용하기', 'Assignment Report 확인하기', 'Assignment Report에서 과제로 배포한 과제/평가의 학생별 참여와 결과를 확인합니다.', '과제 목록, 정답률 분포, 학생별 표, Share Assignment, 학생 상세 화면을 순서대로 확인합니다.', ['진입 및 필터', '과제 목록', '정답률 분포', 'Student Activity Performance', '과제 공유', '학생 상세 화면']],
  'class-management': ['07-3.', 'Class 사용하기', 'Class Management 사용하기', 'Class Management에서 학급을 만들고 학생별 개인 로그인 정보와 QR을 발급·관리합니다.', 'Class 단위 과제 배포와 리포트 추적을 위해 학급, 학생 목록, Student Code, Personal QR Code를 관리합니다.', ['진입 및 필터', '학급 만들기', '학급 카드 & 관리', '학생 목록', '학생 등록', '개인 QR 코드']]
});
// END CLASS CATEGORY PATCH

const renumberedCategoryTitles = {
  'cat-reports': '09. 결과 확인하고 리포트 보기',
  'cat-storage': '10. 내 자료 정리하기'
};
Object.entries(renumberedCategoryTitles).forEach(([key, title]) => {
  const category = manualTree.find((item) => item.key === key);
  if (category) category.title = title;
});

Object.assign(articleTemplates, {
      "cat-toolkit": [
            "08.",
            "LumiTeach Help Center",
            "Tool Kit 사용하기",
            "LumiTeach의 Tool Kit은 수업 중 활용할 수 있는 다양한 보조 도구 모음입니다. 화면 우측 또는 하단의 도구 패널에서 카테고리별로 원하는 도구를 선택해 사용할 수 있습니다.",
            "Tool Kit은 수업 흐름을 보조하는 도구입니다. 학생 참여, 시간 관리, 무작위 추첨, 수학 보조 도구처럼 수업 상황에 맞는 카테고리를 먼저 선택하세요.",
            [
                  "Normal",
                  "Timer",
                  "Competition",
                  "Draw",
                  "Math Tools"
            ]
      ],
      "group-toolkit-normal": [
            "08-A.",
            "Tool Kit 사용하기",
            "Normal",
            "수업 중 가장 자주 쓰이는 기본 보조 도구를 안내합니다.",
            "Normal 도구는 Teaching 화면 하단의 Tool Kit에서 빠르게 실행할 수 있습니다.",
            [
                  "기본 도구 구성 보기",
                  "도구별 사용법 확인하기",
                  "수업 중 활용하기"
            ]
      ],
      "toolkit-wheel": [
            "1.",
            "Tool Kit 사용하기 / Normal",
            "1. Wheel",
            "Wheel 은 입력한 항목 중 하나를 무작위로 뽑아주는 룰렛(돌림판) 도구입니다. 학생 호명, 발표 순서 정하기, 무작위 추첨 등에 활용할 수 있습니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "Step 1. 룰렛 개수 설정",
                  "Step 2. 항목 입력 및 돌리기",
                  "Step 3. 결과 확인"
            ]
      ],
      "toolkit-dice": [
            "2.",
            "Tool Kit 사용하기 / Normal",
            "2. Dice",
            "Dice 는 주사위를 굴려 무작위 숫자를 얻는 도구입니다. 게임 활동, 무작위 순번 정하기, 수업 중 간단한 추첨 등에 활용할 수 있습니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "Step 1. 주사위 개수 설정",
                  "Step 2. 주사위 굴리기",
                  "Step 3. 결과 확인"
            ]
      ],
      "toolkit-bell": [
            "3.",
            "Tool Kit 사용하기 / Normal",
            "3. Bell",
            "Bell 은 학생들의 주의를 집중시킬 때 사용하는 알림 종 도구입니다. 화면에 메시지를 띄우고 종소리를 울려 학생들의 시선을 모을 수 있습니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "Step 1. 메시지 입력 (선택)",
                  "Step 2. 종 울리기",
                  "Step 3. 정지"
            ]
      ],
      "toolkit-sound-monitor": [
            "4.",
            "Tool Kit 사용하기 / Normal",
            "4. Sound Monitor",
            "Sound Monitor 는 교실의 소음 수준이나 발표자의 목소리 크기를 실시간으로 측정해 보여주는 도구입니다. 학생들의 소란을 관리하거나 발표 연습에 활용할 수 있습니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "측정 모드",
                  "Noise Meter (소음 측정)",
                  "Speech Meter (발표 측정)",
                  "우측 설정 패널"
            ]
      ],
      "toolkit-clock": [
            "5.",
            "Tool Kit 사용하기 / Normal",
            "5. Clock",
            "Clock 은 현재 날짜와 시간을 화면에 크게 표시하는 시계 도구입니다. 디지털 시계와 아날로그 시계 두 가지 형태를 지원합니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "시계 형태 선택",
                  "Digital",
                  "Analog"
            ]
      ],
      "toolkit-annotate": [
            "6.",
            "Tool Kit 사용하기 / Normal",
            "6. Annotate",
            "Annotate 는 수업 화면에 메모(주석)를 작성하고 저장할 수 있는 도구입니다. 공지, 인사말, 강조할 내용을 큰 글씨로 띄울 때 활용합니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "메모 작성",
                  "서식 도구",
                  "저장 및 관리"
            ]
      ],
      "toolkit-share-web-link": [
            "7.",
            "Tool Kit 사용하기 / Normal",
            "7. Share Web Link",
            "Share Web Link 는 수업 중 학생들의 화면으로 웹 링크를 전송하는 도구입니다. 참고 자료나 외부 사이트를 학생들에게 바로 공유할 수 있습니다.\n\n⚠️ 학생 화면에서 링크가 정상적으로 열리려면 팝업이 허용되어야 합니다. 최초 1회 \"Please allow pop-ups on the student page (one-time setup).\" 안내에 따라 팝업을 허용해 주세요.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "Enter link (링크 직접 입력)",
                  "Favorite link (즐겨찾기 링크)",
                  "학생 화면"
            ]
      ],
      "toolkit-quick-quiz": [
            "8.",
            "Tool Kit 사용하기 / Normal",
            "8. Quick Quiz",
            "Quick Quiz 는 수업 중 즉석에서 퀴즈를 만들어 학생들에게 출제하는 도구입니다. 객관식과 주관식 두 가지 유형을 지원합니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "퀴즈 유형 선택",
                  "Multiple Choice (객관식) 작성",
                  "출제 및 정답 공개",
                  "결과 확인"
            ]
      ],
      "toolkit-quick-poll": [
            "9.",
            "Tool Kit 사용하기 / Normal",
            "9. Quick Poll",
            "Quick Poll 은 수업 중 간단한 질문을 던지고 학생들의 응답을 즉석에서 집계하는 도구입니다. 각 선택지의 − / + 버튼으로 응답 수를 직접 기록할 수 있으며, 네 가지 형식을 지원합니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "공통 사용법",
                  "형식 (4종)",
                  "Agree / Disagree",
                  "Traffic Light",
                  "Opinion Scale",
                  "Vote"
            ]
      ],
      "group-toolkit-timer": [
            "08-B.",
            "Tool Kit 사용하기",
            "Timer",
            "수업 시간을 관리할 수 있는 타이머 도구를 안내합니다.",
            "Timer 도구는 활동 제한 시간, 발표 시간, 모둠 활동 시간을 시각적으로 관리할 때 유용합니다.",
            [
                  "타이머 도구 구성 보기",
                  "시간 설정 방식 확인하기",
                  "수업 중 활용하기"
            ]
      ],
      "toolkit-digital-timer": [
            "10.",
            "Tool Kit 사용하기 / Timer",
            "10. DigitalTimer",
            "DigitalTimer 는 설정한 시간을 숫자(MM:SS)로 표시하며 카운트다운하는 디지털 타이머입니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "시간 설정 및 시작",
                  "진행 중 제어"
            ]
      ],
      "toolkit-hourglass": [
            "11.",
            "Tool Kit 사용하기 / Timer",
            "11. Hourglass",
            "Hourglass 는 모래시계 애니메이션과 함께 시간을 카운트다운하는 타이머입니다. 남은 시간을 시각적으로 직관적으로 보여줍니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "시간 설정 및 시작",
                  "진행 중 제어"
            ]
      ],
      "toolkit-pie-timer": [
            "12.",
            "Tool Kit 사용하기 / Timer",
            "12. Pie Timer",
            "Pie Timer 는 원형 다이얼에서 색칠된 부채꼴(파이)이 줄어들며 남은 시간을 보여주는 타이머입니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "다이얼 범위 선택 (Choose Mode)",
                  "시간 설정 (Set Time)",
                  "시작 및 제어"
            ]
      ],
      "group-toolkit-competition": [
            "08-C.",
            "Tool Kit 사용하기",
            "Competition",
            "학생 참여를 높이는 경쟁·게임형 도구를 안내합니다.",
            "Competition 도구는 순위, 반응 속도, 무작위 경쟁 요소가 필요한 수업 활동에 적합합니다.",
            [
                  "경쟁형 도구 구성 보기",
                  "참여 방식 확인하기",
                  "결과 확인하기"
            ]
      ],
      "toolkit-first-to-buzz": [
            "13.",
            "Tool Kit 사용하기 / Competition",
            "13. First to Buzz",
            "First to Buzz 는 학생들이 버튼을 누르는 속도를 겨루는 순발력 게임입니다. 가장 빨리 누른 학생이 높은 순위를 차지합니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "게임 시작",
                  "학생 참여",
                  "결과 확인"
            ]
      ],
      "group-toolkit-draw": [
            "08-D.",
            "Tool Kit 사용하기",
            "Draw",
            "무작위 추첨과 뽑기를 진행할 수 있는 도구를 안내합니다.",
            "Draw 도구는 발표자 선정, 역할 배정, 상품 추첨처럼 공정한 무작위 선택이 필요할 때 활용합니다.",
            [
                  "추첨 도구 구성 보기",
                  "입력 방식 확인하기",
                  "결과 다시 뽑기"
            ]
      ],
      "toolkit-presentation-lottery": [
            "14.",
            "Tool Kit 사용하기 / Draw",
            "14. Presentation Lottery",
            "Presentation Lottery 는 복권(스크래치 티켓)을 긁어 당첨자를 뽑는 추첨 도구입니다. 발표자 선정이나 무작위 추첨에 활용할 수 있습니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "Step 1. 추첨 설정",
                  "Step 2. 추첨하기",
                  "Step 3. 결과 공개",
                  "결과 관리"
            ]
      ],
      "toolkit-card-draw": [
            "15.",
            "Tool Kit 사용하기 / Draw",
            "15. Card Draw",
            "Card Draw 는 뒤집힌 카드 더미에서 무작위로 카드를 뽑아 학생이나 항목을 선정하는 도구입니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "Step 1. 뽑기 설정",
                  "Step 2. 카드 뽑기",
                  "Step 3. 결과 확인"
            ]
      ],
      "toolkit-lucky-ladder": [
            "16.",
            "Tool Kit 사용하기 / Draw",
            "16. Lucky Ladder",
            "Lucky Ladder 는 사다리타기로 시작 항목과 도착 항목을 무작위로 연결하는 도구입니다. 역할 분담, 상품 배정, 짝 정하기 등에 활용할 수 있습니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "Step 1. 사다리 개수 설정",
                  "Step 2. 시작/도착 항목 입력",
                  "Step 3. 결과 확인"
            ]
      ],
      "toolkit-group-maker": [
            "17.",
            "Tool Kit 사용하기 / Draw",
            "17. Group Maker",
            "Group Maker 는 학생들을 무작위로 모둠(그룹)으로 나누는 도구입니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "Step 1. 인원과 그룹 수 설정",
                  "Step 2. 학생 입력",
                  "Step 3. 그룹 생성 및 조정"
            ]
      ],
      "group-toolkit-math-tools": [
            "08-E.",
            "Tool Kit 사용하기",
            "Math Tools",
            "수학 수업에서 활용할 수 있는 보조 도구를 안내합니다.",
            "Math Tools는 화면 위에서 자, 삼각자, 각도기를 띄워 길이와 각도를 설명할 때 사용합니다.",
            [
                  "수학 도구 구성 보기",
                  "화면 위에서 조작하기",
                  "도구 닫기"
            ]
      ],
      "toolkit-ruler": [
            "18.",
            "Tool Kit 사용하기 / Math Tools",
            "18. Ruler",
            "Ruler 는 화면 위에 띄워 길이를 재거나 직선의 기준으로 사용하는 디지털 자입니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "사용법"
            ]
      ],
      "toolkit-triangle": [
            "19.",
            "Tool Kit 사용하기 / Math Tools",
            "19. Triangle",
            "Triangle 은 화면 위에 띄워 직각이나 각도를 그리고 잴 때 사용하는 디지털 삼각자입니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "사용법"
            ]
      ],
      "toolkit-protractor": [
            "20.",
            "Tool Kit 사용하기 / Math Tools",
            "20. Protractor",
            "Protractor 는 화면 위에 띄워 각도를 측정할 때 사용하는 디지털 각도기입니다.",
            "수업 화면 하단의 Tool Kit에서 해당 도구 아이콘을 클릭해 실행합니다.",
            [
                  "실행 방법",
                  "사용법"
            ]
      ]
});

const syncToolkitVisibleArticleNumbers = () => {
  toolkitCategory.children.forEach((group) => {
    let visibleToolIndex = 1;
    group.articles.forEach((article) => {
      const baseTitle = article.title.replace(/^\d+\.\s*/, '');
      const number = `${visibleToolIndex}.`;
      const title = `${number} ${baseTitle}`;
      article.title = title;
      if (articleTemplates[article.key]) {
        articleTemplates[article.key][0] = number;
        articleTemplates[article.key][2] = title;
      }
      visibleToolIndex += 1;
    });
  });
};
syncToolkitVisibleArticleNumbers();

const renumberedTemplateNumbers = {
  'cat-reports': '09.',
  'group-reports-results': '09-A.',
  'reports-submission': '09-1-1.',
  'reports-answer': '09-1-2.',
  'reports-leaderboard': '09-1-3.',
  'cat-storage': '10.',
  'storage-overview': '10-1-1.',
  'storage-folder': '10-1-2.',
  'storage-move': '10-1-3.',
  'storage-trash': '10-1-4.'
};
Object.entries(renumberedTemplateNumbers).forEach(([key, number]) => {
  if (articleTemplates[key]) articleTemplates[key][0] = number;
});
// END TOOL KIT CONTENT PATCH

const faqCategory = {
  key: 'cat-faq',
  title: '10. 자주 묻는 질문 (FAQ)',
  description: 'LumiTeach 사용 중 자주 묻는 질문과 답변',
  children: []
};
if (!manualTree.some((category) => category.key === faqCategory.key)) {
  manualTree.push(faqCategory);
}

Object.assign(articleTemplates, {
  'cat-faq': ['10.', 'LumiTeach Help Center', '자주 묻는 질문 (FAQ)', 'LumiTeach를 사용하면서 자주 묻는 질문을 주제별로 모았습니다.', '찾는 내용이 없으면 각 기능 가이드를 참고하거나, 처음이라면 Get Started Guide를 먼저 읽어보세요.', ['시작 & 계정', '수업 만들기 (Edit Lesson)', '수업 진행 (Teaching)', '학생 화면 & 참여 (Student View)', '결과 확인', 'Idea Board / Whiteboard', '기타']]
});

const stripLeadingCategoryNumber = (title) => String(title || '').replace(/^\s*\d+\.\s*/, '');
const categoryNumberMap = new Map();
function syncVisibleCategoryNumbers() {
  manualTree.forEach((category, index) => {
    const number = String(index + 1).padStart(2, '0') + '.';
    categoryNumberMap.set(category.key, number);
    category.title = number + ' ' + stripLeadingCategoryNumber(category.title);
    if (articleTemplates[category.key]) articleTemplates[category.key][0] = number;
  });
  const exploreNumber = categoryNumberMap.get('cat-explore');
  if (exploreNumber) {
    const visibleExploreNumber = exploreNumber.replace('.', '');
    if (articleTemplates['explore-browse']) articleTemplates['explore-browse'][0] = visibleExploreNumber + '-1.';
    if (articleTemplates['explore-creator-page']) articleTemplates['explore-creator-page'][0] = visibleExploreNumber + '-2.';
  }
}
syncVisibleCategoryNumbers();
const storageNumber = categoryNumberMap.get('cat-storage')?.replace('.', '');
if (storageNumber) {
  ['storage-overview', 'storage-folder', 'storage-move', 'storage-trash'].forEach((key, index) => {
    if (articleTemplates[key]) articleTemplates[key][0] = storageNumber + '-' + String(index + 1) + '.';
  });
}



// BEGIN CLASS NUMBER PATCH
const classNumber = categoryNumberMap.get('cat-class')?.replace('.', '');
if (classNumber) {
  ['class-teaching-report', 'class-assignment-report', 'class-management'].forEach((key, index) => {
    if (articleTemplates[key]) articleTemplates[key][0] = classNumber + '-' + String(index + 1) + '.';
  });
}
// END CLASS NUMBER PATCH

// BEGIN ASSIGNMENT NUMBER PATCH
const assignmentNumber = categoryNumberMap.get('cat-assignment')?.replace('.', '');
if (assignmentNumber) {
  if (articleTemplates['group-edit-lesson-self-study']) articleTemplates['group-edit-lesson-self-study'][0] = assignmentNumber + '-A.';
  if (articleTemplates['group-assessment-run']) articleTemplates['group-assessment-run'][0] = assignmentNumber + '-B.';
  ['edit-lesson-self-study-individual', 'edit-lesson-self-study-challenge', 'edit-lesson-self-study-flash-card'].forEach((key, index) => {
    if (articleTemplates[key]) articleTemplates[key][0] = assignmentNumber + '-1-' + String(index + 1) + '.';
  });
  ['assessment-create', 'assessment-questions', 'assessment-distribute', 'assessment-results'].forEach((key, index) => {
    if (articleTemplates[key]) articleTemplates[key][0] = assignmentNumber + '-2-' + String(index + 1) + '.';
  });
}
// END ASSIGNMENT NUMBER PATCH

const articleOrder = manualTree.flatMap((category) => [
  category.key,
  ...category.children.flatMap((group) => [group.key, ...group.articles.map((article) => article.key)])
]);

const visibleArticleKeySet = new Set(articleOrder);
function isVisibleArticleKey(key) {
  return visibleArticleKeySet.has(key);
}

const articles = articleOrder.map((key) => {
  const value = articleTemplates[key];
  return {
  key,
  number: value[0],
  category: value[1],
  title: value[2],
  desc: value[3],
  note: value[4],
  sections: value[5]
  };
});

// 1Depth는 큰 흐름, 2Depth는 판단 기준, 3Depth는 작업 순서 중심으로 작성합니다.
// 한 섹션은 1-2문단으로 유지하고, 제품 용어는 Lesson, Activity처럼 원문을 유지합니다.
const articleBodies = {
  'cat-intro': [
    "시작하기 전에 자주 등장하는 용어 5가지만 알아두면 전체 흐름이 쉽게 이해됩니다.\n\n- **Lesson**: 수업 한 단위. 여러 장의 슬라이드와 활동(Activity)으로 구성됩니다.\n- **Activity**: 슬라이드에 넣는 학습 요소. Quiz, Discussion, Idea Board 등 종류가 다양합니다.\n- **Start Teaching**: 만든 Lesson을 실제 수업으로 시작하는 버튼입니다.\n- **Access Code**: 학생이 수업에 입장할 때 입력하는 코드입니다.\n- **Tool Kit**: 수업 중 사용하는 보조 도구 모음(타이머, 룰렛, 모둠 편성 등)입니다.",
    "LumiTeach는 수업을 만들고(Edit) → 진행하고(Teaching) → 학생이 참여하는(Student View) 흐름으로 동작합니다. 모든 활동은 이 세 가지 관점으로 이루어져 있으므로, 이 구조만 기억하면 어떤 기능도 쉽게 익힐 수 있습니다.\n\n- **만들기(Edit Lesson)**: 선생님이 슬라이드와 활동을 구성하는 편집 화면입니다.\n- **진행하기(Teaching)**: 만든 수업을 실시간으로 운영하는 화면입니다.\n- **참여하기(Student View)**: 학생이 자신의 기기에서 보고 응답하는 화면입니다.",
    "로그인 후 가장 먼저 본인의 프로필을 정리합니다.\n\n- **Setting**에서 이름, 소개(Bio) 등 기본 정보를 입력합니다.\n- 작성한 Bio는 다른 사용자가 보는 크리에이터 페이지(Explore)에 함께 표시되므로, 나를 소개하는 내용을 적어두면 좋습니다.",
    "이제 실제 수업을 만들어 봅니다.\n\n### 1) 새 Lesson 만들기\n\n새 Lesson을 생성하면 편집 화면(Edit Lesson)으로 들어갑니다. 화면 왼쪽에는 슬라이드 목록, 가운데에는 현재 슬라이드, 오른쪽에는 설정 패널이 있습니다.\n\n### 2) 슬라이드(활동) 추가하기\n\n슬라이드를 추가하는 방법은 두 가지입니다.\n\n- **+ Manual**: 직접 원하는 활동을 골라 추가합니다.\n- **AI Make**: AI의 도움을 받아 자동으로 슬라이드를 생성합니다.\n\n**+ Manual**을 누르면 Create Manually 창이 열리고, 왼쪽에서 카테고리를 골라 활동을 선택할 수 있습니다.\n\n- **General**: 제목·텍스트·이미지 등 기본 슬라이드\n- **Embed**: 외부 콘텐츠(영상·링크 등) 삽입\n- **Quiz**: 객관식·빈칸 등 정답이 있는 문제\n- **Discussion**: 투표·의견 등 정답 없는 토론형 활동\n- **Idea Board**: Brainstorming · Whiteboard · Ideas\n- **Games**: 게임형 활동\n\n### 3) 미리보기로 확인하기\n\n활동을 추가했다면 상단의 **Preview**로 학생에게 어떻게 보이는지 미리 확인하고, **Self Study**(학생 자율 학습용으로 배포)로 활용할 수도 있습니다.",
    "수업을 만들었다면 이제 학생과 함께 진행합니다.\n\n### 1) 수업 시작\n\n편집 화면 오른쪽 위의 **Start Teaching**을 누른 뒤 진행 모드를 선택합니다.\n\n- **Interaction**: 학생과 실시간으로 상호작용하는 수업 모드입니다.\n- **Presentation**: 인터넷 연결 없이 Lesson을 발표 형식으로 진행하는 오프라인 수업 모드입니다.\n\n### 2) 학생 입장 안내\n\n수업이 시작되면 화면에 **Access Code**가 표시됩니다. 학생들은 자신의 기기에서 이 코드를 입력해 입장합니다. 우측 하단에서 현재 접속한 학생 수를 확인할 수 있습니다.\n\n### 3) 진행 중 화면\n\n- **Instructor View**: 진행자 전용 화면으로, 슬라이드 미리보기·타이머·학생 질문(Live Q&A) 등을 한눈에 관리할 수 있습니다.\n- 활동마다 **Let's Begin** / **Show Response** / **Finish Up** 등 진행 버튼이 제공됩니다.\n- 수업 중 보조 도구가 필요하면 **Tool Kit**(타이머, 룰렛, 모둠 편성 등)을 활용합니다.\n\n### 4) 수업 종료\n\n수업을 마치려면 우측 상단의 **End Lesson**을 누릅니다.",
    "학생이 어떤 화면을 보는지 알아두면 수업 운영이 훨씬 수월해집니다.\n\n- 활동이 시작되기 전에는 \"Please wait until your teacher starts the activity.\"(선생님이 시작할 때까지 기다려 주세요) 안내가 표시됩니다.\n- 활동이 시작되면 질문이나 보드가 나타나고, 학생은 답을 입력한 뒤 **Submit**으로 제출합니다.\n- 제출한 응답은 선생님 화면에 실시간으로 모이며, 활동에 따라 단어 구름·카드·마인드맵 등으로 정리되어 함께 볼 수 있습니다.",
    "- 활동을 마치면 결과 보기(**View Result**)로 학생들의 응답을 정리해 확인할 수 있습니다.\n- 결과는 활동 종류에 따라 **Word Cloud** / **Classification** / **Mind Map** 등 여러 형태로 볼 수 있습니다.\n- 수업이 끝나면 **End Lesson**으로 종료하고, 만든 Lesson은 다음에 다시 사용할 수 있도록 저장됩니다.",
    "첫 수업에 성공했다면, 아래 가이드에서 각 기능을 더 자세히 살펴보세요.\n\n- **Edit Lesson**: 활동 종류 전체(General · Embed · Quiz · Discussion · Idea Board · Games)와 상세 설정\n- **Tool Kit**: 수업 중 사용하는 도구(Normal · Timer · Competition · Draw · Math Tools)\n- **Curriculum**: 커리큘럼 구성과 관리\n- **Explore**: 다른 사용자의 콘텐츠 탐색과 크리에이터 페이지\n- **My Storage**: 내가 만든 활동 저장·재사용"
  ],
  'cat-start': [
    '이 카테고리에서는 LumiTeach 계정의 Setting 화면에서 관리하는 항목을 안내합니다. Setting에서는 프로필, 언어, AI Credit처럼 계정 사용 환경과 연결된 정보를 확인하거나 수정할 수 있습니다.',
    'Profile에서는 계정 기본 정보와 기관 정보를 관리하고, Language에서는 인터페이스 표시 언어를 설정합니다. AI Credit에서는 AI 기능 사용에 필요한 크레딧 현황과 사용 이력을 확인합니다.',
    '처음에는 Setting 진입하기로 메뉴 위치를 확인한 뒤, Profile 설정하기, Language 설정하기, AI Credit 확인하기 순서로 필요한 항목을 살펴보세요.'
  ],
  'cat-lesson': [
    '이 카테고리에서는 수업 콘텐츠의 기본 단위인 Lesson을 만들고 관리하는 방법을 다룹니다. Lesson은 Activity, Assignment, Assessment, Teaching Mode와 연결되는 중심 구조이므로 먼저 개념과 구성 방식을 이해해야 합니다.',
    'Lesson 안에는 학생이 실제로 수행할 Activity가 들어가며, 교사는 Lesson의 제목, 설명, 학습 목표, Activity 순서를 조정할 수 있습니다. 이미 만든 Lesson은 복제하거나 폴더로 정리해 다른 수업에서 재사용할 수 있습니다.',
    '처음에는 Lesson 구조 이해하기로 전체 구성을 확인한 뒤 새 Lesson 만들기와 Lesson 내용 수정하기를 순서대로 보는 것이 좋습니다. 기존 자료를 활용하려면 Lesson 복제해서 재사용하기와 Lesson 삭제하고 복구하기 문서를 함께 확인하세요.'
  ],
  'cat-activities': [
    '이 카테고리에서는 Lesson 안에 추가하는 학습 활동 단위인 Activity를 설명합니다. Activity는 학생이 문제를 풀거나 의견을 작성하거나 실시간으로 참여하는 실제 수행 영역입니다.',
    '수업 목표에 따라 Quiz Activity, Board Activity, Interactive Activity, AI Activity 중 적절한 유형을 선택해야 합니다. 정답 확인이 필요한 수업과 의견 공유가 필요한 수업은 Activity 구성 방식이 달라집니다.',
    '먼저 Activity 유형 고르기에서 각 유형의 차이를 확인한 뒤 필요한 Activity 문서를 선택하세요. AI로 초안을 만들고 싶다면 AI로 Activity 생성하기를 먼저 보고, 생성 결과는 AI 생성 결과 수정하기에서 검토하는 흐름을 권장합니다.'
  ],
  'cat-assignment': [
    '이 카테고리에서는 완성한 Lesson을 학생이 혼자 수행할 수 있는 Assignment로 내보내는 방법을 안내합니다. 과제로 배포하기 전에는 어떤 방식으로 학생이 학습할지, 언제까지 제출해야 하는지, 제출 후 결과를 어떻게 확인할지 정해야 합니다.',
    'Assignment에는 Individual, Challenge, Flash Card처럼 목적이 다른 방식이 있습니다. 모든 Lesson에 모든 방식이 적합한 것은 아니므로 Activity 유형과 학습 목표를 함께 보고 선택해야 합니다.',
    '처음에는 Assignment 방식 이해하기로 전체 차이를 확인한 뒤 과제 목적에 맞는 방식을 선택하세요. 배포 전에는 마감일 설정하기와 자동 제출 설정하기를 함께 확인해 학생 제출 흐름이 의도대로 동작하는지 점검합니다.'
  ],
  'cat-assessment': [
    '이 카테고리에서는 학생의 이해도를 확인하기 위한 Assessment를 만들고 운영하는 흐름을 안내합니다. Assessment는 단순히 문항을 만드는 것뿐 아니라 배점, 응시 조건, 결과 확인까지 함께 고려해야 합니다.',
    '평가를 만들 때는 평가 목적과 대상 학생을 먼저 정하고, 문항 유형과 정답 기준을 설정합니다. 배포 후에는 학생 제출 결과와 문항별 응답을 확인해 수업 보완이나 피드백에 활용할 수 있습니다.',
    '처음에는 Assessment 생성하기에서 기본 정보를 만들고, 평가 문항 추가하기에서 문항 구성을 확인하세요. 이후 학생에게 평가 배포하기와 평가 결과 확인하기를 순서대로 보면 운영 흐름을 이해하기 쉽습니다.'
  ],
  'cat-teaching': [
    '이 카테고리에서는 Teaching Mode를 사용해 Lesson을 실시간 수업에서 활용하는 방법을 안내합니다. 교사는 수업 중 화면을 제어하고, 학생 참여 상태를 확인하며, 활동 결과를 수업 흐름 안에서 활용할 수 있습니다.',
    'Teaching Mode에는 수업 방식에 따라 Interaction, Presentation, Battle Mode처럼 다른 운영 방식이 있습니다. 설명 중심 수업인지, 참여형 활동인지, 퀴즈 경쟁형 수업인지에 따라 적절한 모드를 선택해야 합니다.',
    '처음에는 Teaching Mode 시작하기에서 전체 진입 흐름을 확인하세요. 이후 수업 방식에 맞춰 Interaction으로 참여 유도하기, Presentation으로 수업하기, Battle Mode로 퀴즈 진행하기 문서를 선택하면 됩니다.'
  ],
  'cat-reports': [
    '이 카테고리에서는 학생 제출 이력과 답변, 리더보드를 확인하는 방법을 안내합니다. 결과 화면은 과제나 실시간 활동 이후 학생의 수행 상태를 점검하는 공간입니다.',
    '결과를 볼 때는 제출 여부, 제출 시간, 응답 내용, 점수 또는 순위처럼 확인해야 할 기준이 다릅니다. 원하는 결과가 보이지 않을 때는 먼저 필터, 제출 상태, 대상 학생 조건을 확인해야 합니다.',
    '처음에는 제출 이력 확인하기로 전체 제출 상태를 보고, 필요한 경우 학생 답변 확인하기에서 개별 응답을 확인하세요. Challenge나 Battle Mode를 운영했다면 리더보드 확인하기에서 순위와 점수 기준을 함께 살펴봅니다.'
  ],
  'cat-storage': [
    'My Storage는 내가 만들거나 편집한 모든 수업 자료(Lesson·폴더)를 모아 관리하는 개인 보관함입니다.',
    '상단 내비게이션에서 My Storage를 클릭하면 내가 만든 자료와 편집한 자료를 확인할 수 있습니다. 화면에는 검색창, 탭, 정렬, Folders와 Lessons 목록이 표시됩니다.',
    '아래 문서에서 화면 구성, 검색과 정렬, 폴더·Lesson 카드, Lesson 메뉴와 미리보기를 순서대로 확인합니다.'
  ],
  'group-intro-service': [
    'LumiTeach는 교사가 수업 콘텐츠를 만들고, 학생에게 과제나 평가로 제공하며, 실시간 수업에서도 활용할 수 있도록 돕는 AI 기반 수업 제작·운영 도구입니다. 교사는 Lesson을 중심으로 Activity를 구성하고, 필요에 따라 Assignment, Assessment, Teaching Mode로 확장해 수업 전후의 학습 흐름을 관리할 수 있습니다.',
    'LumiTeach의 기본 단위는 Lesson입니다. Lesson 안에는 Quiz, Board, Interactive Activity, AI Activity처럼 학생이 실제로 수행하는 Activity가 들어갑니다. 완성한 Lesson은 학생이 혼자 수행하는 Assignment로 내보내거나, 평가 목적의 Assessment로 구성하거나, Teaching Mode에서 실시간 수업 자료로 사용할 수 있습니다.',
    '처음 사용하는 경우에는 먼저 Lesson의 구조를 이해한 뒤, Activity를 추가하고, 만든 Lesson을 Assignment나 Teaching Mode로 활용하는 흐름을 따라가는 것이 좋습니다. 서비스 용어가 익숙하지 않다면 기본 개념 익히기에서 사용자 역할과 핵심 용어를 먼저 확인한 뒤 다음 문서로 이동합니다.'
  ]
};

Object.assign(articleBodies, {
  'group-intro-basics': [
    '이 섹션은 LumiTeach를 사용할 때 자주 등장하는 사용자 역할과 기본 용어를 정리합니다. 화면이나 기능 이름을 이해하기 전에 Teacher, Student, Admin의 차이를 먼저 확인하면 문서를 읽는 속도가 빨라집니다.',
    '핵심 용어는 Lesson, Activity, Assignment, Assessment, Teaching Mode를 중심으로 이해하면 됩니다. 각 용어는 독립된 기능처럼 보이지만 실제로는 수업 콘텐츠 제작과 운영 흐름 안에서 서로 연결됩니다.',
    '처음이라면 주요 사용자 역할 이해하기를 먼저 읽고, 이어서 기본 용어 익히기로 이동하세요. 용어가 익숙해진 뒤 설정하기로 넘어가면 실제 화면 설명을 더 쉽게 따라갈 수 있습니다.'
  ],
  'group-start-setup': [
    'Setting은 LumiTeach 계정의 프로필, 언어, AI Credit을 관리하는 페이지입니다. 화면 우측 상단 프로필 메뉴에서 진입하며, 각 탭에서 필요한 계정 설정을 확인할 수 있습니다.',
    'Profile 탭에서는 프로필 이미지, 이름, Bio, Institution 정보를 관리합니다. Language는 화면 언어에 영향을 주므로, 사용 환경에 맞게 설정해두는 것이 좋습니다.',
    'AI Credit 탭에서는 현재 플랜과 남은 크레딧, 사용 이력을 확인할 수 있습니다. AI Make처럼 크레딧을 사용하는 기능을 자주 쓴다면 이 화면에서 남은 크레딧과 충전 예정일을 함께 확인하세요.'
  ],
  'setting-open': [
    '[[image:setting-open/01.png|프로필 메뉴의 Setting 항목]]\n\n화면 우측 상단의 프로필 아이콘을 클릭하면 드롭다운 메뉴가 나타납니다. 메뉴에서 **Setting**을 선택하면 Setting 팝업이 열립니다.',
    '드롭다운 메뉴에는 Setting 외에도 **Privacy Policy**, **Terms of Service**, **Service Manual**, **Help Center**, **Log out** 항목이 함께 표시됩니다. 계정 설정을 변경하려면 이 중 **Setting**으로 진입합니다.'
  ],
  'setting-profile': [
    '[[image:setting-profile/01.png|Setting 팝업의 Profile 탭]]\n\n**Profile** 탭에서는 계정의 기본 정보를 확인하고 수정할 수 있습니다. 프로필 이미지, 이름, Email, Bio, Institution, Account 항목이 표시됩니다.\n\n- **Email**: 계정에 등록된 이메일 주소가 표시됩니다. 이메일은 직접 수정할 수 없습니다.\n- **Account**: Delete account 버튼을 통해 계정 삭제를 진행할 수 있습니다.',
    '[[image:setting-profile/02.png|프로필 이미지 Crop 팝업]]\n\n프로필 이미지 우측 하단의 편집 아이콘을 클릭하면 **Crop** 팝업이 열립니다.\n\n- **Upload file** 버튼을 클릭하여 이미지를 업로드합니다.\n- 이미지가 업로드되면 크롭 영역을 조정할 수 있습니다.\n- **Apply**를 클릭하면 프로필 이미지가 저장되고, **Cancel**을 클릭하면 변경이 취소됩니다.\n- 기존 이미지를 삭제하려면 이미지 아래의 **Delete** 링크를 클릭합니다.\n\n[[image:setting-profile/03.png|프로필 이름 입력 상태]]\n\n프로필 이름 우측의 편집 아이콘을 클릭하면 이름 입력 필드가 활성화됩니다. 원하는 이름을 입력한 후 **Save**를 클릭하여 저장하거나, **Cancel**을 클릭하여 취소합니다.\n\nBio 항목도 같은 방식으로 우측 편집 아이콘을 클릭한 뒤 자기소개를 입력하고 저장할 수 있습니다.',
    '[[image:setting-profile/04.png|Institution 입력 상태]]\n\n**Institution** 항목의 + 아이콘을 클릭하면 기관명 입력 필드가 나타납니다. 기관명을 입력한 후 **Request** 버튼을 클릭하면 기관 소속 요청이 전송됩니다.',
    '**Account** 영역에서는 계정 삭제를 진행할 수 있습니다. 삭제 작업은 되돌리기 어려울 수 있으므로, 실제 운영 계정에서는 필요한 자료와 계정 상태를 먼저 확인한 뒤 진행하세요.'
  ],
  'setting-language': [
    '[[image:setting-language/01.png|Language 탭]]\n\n**Language** 탭에서는 LumiTeach 인터페이스의 표시 언어를 설정할 수 있습니다. 탭 상단에는 언어 설정이 인터페이스에만 적용되고, Curriculum 콘텐츠는 지역 언어를 따른다는 안내 문구가 표시됩니다.',
    '[[image:setting-language/02.png|Language 드롭다운]]\n\n드롭다운 메뉴에서 원하는 언어를 선택합니다. 지원 언어는 다음과 같습니다.\n\n- **English**\n- **Japanese - 日本語**\n- **Spanish - Español**\n- **Vietnamese - Tiếng Việt**\n- **Portuguese - Português**',
    '언어를 선택한 후 **Save**를 클릭하면 변경 사항이 적용됩니다. 이 설정은 LumiTeach 인터페이스 표시 언어에 적용되며, Curriculum 콘텐츠 언어는 지역 기준을 따릅니다.'
  ],
  'setting-curriculum': [
          "Curriculum은 LumiTeach가 제공하는 교육과정(커리큘럼)별 Lesson과 평가(Assessment)를 탐색하는 페이지입니다. 학년·영역별로 정리된 콘텐츠를 둘러보고 바로 수업을 시작할 수 있습니다.",
          "[[image:setting-curriculum/01.png|Curriculum 기본 화면]]\n\n### Curriculum 진입하기\n\n상단 내비게이션에서 **Curriculum**을 클릭하면 커리큘럼 페이지가 열립니다.\n\n### 화면 구성\n\n페이지 상단에는 현재 선택된 교육과정의 이름과 설명이 표시됩니다. 예를 들어 **NGSS (Next Generation Science Standards)**가 선택된 경우, 해당 표준에 대한 설명과 전체 콘텐츠 수(**Total**)가 함께 나타납니다.\n\n### Curriculum Tree (좌측 패널)\n\n좌측의 **Curriculum Tree**에서 학년과 영역별로 콘텐츠를 탐색합니다.\n\n상단 드롭다운(예: **grade All**)으로 학년을 필터링합니다.\n\n학교급(**Elementary School**) → 학년(**Grade K ~ Grade 3 …**) → 영역 순으로 펼쳐집니다. 예를 들어 **Grade K** 아래에는 **PS (Physical Science)**, **LS (Life Science)**, **ESS (Earth and Space Science)**, **ETS (Engineering, Technology, and Applications of Science)** 영역이 있습니다.\n\n### Lesson / Assessment 탭\n\n우측 영역에서 **Lesson(수업)**과 **Assessment(평가)** 탭을 전환할 수 있습니다.\n\n**Lesson**: 주제(클러스터)별로 묶인 Lesson 카드가 표시됩니다(예: **Forces and Interactions: Pushes and Pulls**, **Engineering Design**). 각 카드에는 활동 수(**N Activities**)와 과목이 함께 표시됩니다.",
          "[[image:setting-curriculum/02.png|Select Curriculum 창]]\n\n### 교육과정 변경 (Change Curriculum)\n\n상단의 **Change Curriculum** 버튼을 클릭하면 **Select Curriculum** 창이 열립니다. 원하는 교육과정을 선택한 뒤 **Apply** 버튼을 클릭하면 적용됩니다. 선택 가능한 교육과정 예시는 다음과 같습니다.\n\n- **NGSS (Next Generation Science Standards)**\n- **CCSS (Common Core State Standards for Mathematics)**\n- 그 외 등록된 커리큘럼",
          "[[image:setting-curriculum/03.png|Assessment 탭 화면]]\n\n**Assessment**: 평가 콘텐츠 카드가 표시됩니다. 각 카드에는 문항 수(**N Items**)와 과목이 표시됩니다.",
          "[[image:setting-curriculum/04.png|Lesson 상세 Preview Lesson 탭]]\n\n### Lesson 상세 보기\n\nLesson 카드를 클릭하면 상세 창이 열립니다. 상단에는 Lesson 제목과 활동 구성(**Total Activity**, **General**, **Quiz**, **Discussion** 수)이 표시되고, 다음과 같은 수업 모드 버튼이 제공됩니다.\n\n**Interaction / Presentation / Battle Mode / Individual / Challenge / Flash Card**\n\n상세 창은 두 개의 탭으로 구성됩니다.\n\n**Preview Lesson**: Lesson을 구성하는 활동 슬라이드를 미리 볼 수 있습니다.",
          "[[image:setting-curriculum/05.png|Curriculum Details 탭]]\n\n**Curriculum Details**: 해당 Lesson의 교육과정 정보를 확인합니다.\n\n- **School Level**: 학교급 (예: **Elementary School**)\n- **Grade**: 학년 (예: **Grade K**)\n- **Domain**: 영역 (예: **ETS - Engineering, Technology, and Applications of Science**)\n- **Cluster**: 세부 묶음 (예: **Engineering Design**)\n\n우측 상단의 **Edit** 버튼으로 해당 Lesson을 편집할 수 있습니다."
  ],
  'setting-ai-credit': [
    '[[image:setting-ai-credit/01.png|AI Credit 탭의 크레딧 현황과 사용 이력]]\n\n**AI Credit** 탭에서는 AI 기능 사용에 소요되는 크레딧 현황을 확인할 수 있습니다. 현재 플랜 이름과 현재 사이클 기간이 표시되고, 남은 크레딧과 총 크레딧이 프로그레스 바로 나타납니다.\n\n- **Next refill on**: 다음 크레딧 충전 예정일이 표시됩니다.\n- Free Plan 기준으로 매월 990 크레딧이 지급됩니다.',
    '**Usage History**에서는 월별 크레딧 사용 이력을 조회할 수 있습니다. 좌우 화살표를 클릭하여 이전 또는 다음 달로 이동할 수 있습니다.\n\n사용 이력 테이블은 다음 항목으로 구성됩니다.\n\n- **Type**: Used, Monthly Credit Refill, Expired 등 크레딧 변동 유형\n- **Content**: 사용한 기능 이름\n- **Credit Change**: 사용 또는 충전된 크레딧 수\n- **Date**: 변동 발생 날짜'
  ],
  'group-lesson-create': [
    '이 섹션은 Lesson을 새로 만들고 내용을 구성하는 기본 흐름을 다룹니다. Lesson은 수업 콘텐츠의 중심 단위이므로 제목, 설명, 학습 목표, Activity 구성을 함께 생각해야 합니다.',
    'Lesson을 만들 때는 먼저 수업 목표를 정하고, 그 목표를 달성하기 위해 어떤 Activity가 필요한지 결정합니다. 이후 Activity 순서와 내용을 조정해 학생이 따라갈 수 있는 학습 흐름을 만듭니다.',
    '처음에는 Lesson 구조 이해하기를 통해 전체 개념을 확인하고, 새 Lesson 만들기에서 생성 과정을 따라가세요. 이미 만든 Lesson을 수정해야 한다면 Lesson 내용 수정하기로 이어서 확인하면 됩니다.'
  ],
  'group-edit-lesson': [
    '이 섹션은 Edit Lesson 화면에서 가장 자주 사용하는 기본 작업을 순서대로 정리합니다. 신규 Lesson 생성, Lesson 명 변경, Activity 추가처럼 제작을 시작할 때 필요한 작업부터 먼저 확인합니다.',
    '기존 자료를 재사용하거나 AI Make로 Activity를 생성할 수도 있습니다. My Storage에서 다른 Lesson을 불러오면 이미 만든 Activity를 현재 Lesson에 추가할 수 있고, AI Make는 업로드한 파일을 바탕으로 Activity 초안을 만들어줍니다.',
    '수업을 시작하기 전에는 Preview로 교사 화면과 학생 화면을 확인하고, 필요하면 Interaction 또는 Presentation 모드로 실행합니다. 작업 중 실수했을 때는 Undo / Redo를 활용하고, 슬라이드별 배경 색도 Edit Lesson에서 조정할 수 있습니다.'
  ],
  'group-lesson-manage': [
    '이 섹션은 만든 Lesson을 저장, 복제, 이동, 삭제, 복구하는 관리 흐름을 다룹니다. 수업 자료가 많아질수록 새로 만들기보다 기존 Lesson을 정리하고 재사용하는 능력이 중요해집니다.',
    '비슷한 수업을 반복해서 운영할 때는 Lesson을 복제해 새 버전을 만드는 것이 효율적입니다. 삭제가 필요한 경우에는 학생에게 이미 배포된 자료인지, 복구가 가능한 상태인지 먼저 확인해야 합니다.',
    'Lesson 복제해서 재사용하기를 먼저 보고, 정리나 삭제가 필요한 상황에서는 Lesson 삭제하고 복구하기를 확인하세요. 이후 My Storage 문서와 함께 보면 자료 관리 흐름을 더 안정적으로 잡을 수 있습니다.'
  ],
  'group-activities-create': [
    '이 섹션은 Lesson 안에 들어가는 Activity를 직접 만들고 유형을 선택하는 방법을 안내합니다. Activity는 학생이 실제로 수행하는 학습 단위이므로 수업 목표에 맞는 유형을 고르는 것이 중요합니다.',
    'Quiz Activity는 정답 확인에, Board Activity는 의견 수집과 공유에, Interactive Activity는 실시간 참여에 적합합니다. 같은 Lesson 안에서도 여러 Activity를 조합해 학습 흐름을 만들 수 있습니다.',
    '먼저 Activity 유형 고르기로 차이를 확인한 뒤 필요한 유형의 문서를 선택하세요. 어떤 유형을 선택해야 할지 애매하다면 수업에서 학생에게 기대하는 행동을 기준으로 판단하면 됩니다.'
  ],
  'group-activities-ai': [
    '이 섹션은 AI를 활용해 Activity 초안을 만들고 교사가 검토하는 흐름을 안내합니다. AI Activity는 빠르게 초안을 만들 수 있지만, 그대로 배포하기보다 수업 목적에 맞게 수정하는 과정이 필요합니다.',
    '좋은 결과를 얻으려면 학년, 주제, 난이도, 문항 수, 활동 목적을 구체적으로 입력해야 합니다. 생성 후에는 표현, 정답, 난이도, 학생에게 적절한지 여부를 교사가 확인합니다.',
    'AI로 Activity 생성하기에서 초안 생성 방법을 보고, AI 생성 결과 수정하기에서 검토와 보정 흐름을 확인하세요. AI 결과는 수업 자료의 완성본이 아니라 교사가 다듬어야 하는 초안으로 보는 것이 안전합니다.'
  ],
  'group-assignment-mode': [
    '이 섹션은 Lesson을 과제로 내보낼 때 사용할 Assignment 방식을 선택하는 기준을 안내합니다. 과제 방식은 학생이 학습하는 경험과 결과 확인 방식에 직접 영향을 줍니다.',
    'Individual은 개별 학습에, Challenge는 Quiz 기반 도전형 학습에, Flash Card는 빠른 복습에 적합합니다. Lesson에 포함된 Activity 유형에 따라 사용할 수 있는 방식이 달라질 수 있습니다.',
    'Assignment 방식 이해하기로 전체 차이를 먼저 확인하세요. 이후 수업 목적에 맞춰 Individual 과제 내기, Challenge 과제 내기, Flash Card 과제 내기 중 필요한 문서를 선택하면 됩니다.'
  ],
  'group-assignment-policy': [
    '이 섹션은 Assignment를 배포하기 전 제출 기간과 자동 제출 조건을 설정하는 방법을 안내합니다. 제출 정책은 학생이 언제까지 과제를 수행할 수 있는지와 미제출 상태를 어떻게 처리할지 결정합니다.',
    '마감일을 설정할 때는 수업 일정, 학생 안내 시점, 결과 확인 시점을 함께 고려해야 합니다. 자동 제출을 사용할 경우 학생이 직접 제출하지 않은 상태가 어떻게 처리되는지도 확인해야 합니다.',
    '먼저 마감일 설정하기에서 제출 가능 기간을 정하고, 필요하면 자동 제출 설정하기를 함께 확인하세요. 배포 후에는 Results & Reports에서 제출 상태가 의도대로 기록되는지 확인합니다.'
  ],
  'group-assessment-run': [
    '이 섹션은 Assessment를 만들고 학생에게 배포한 뒤 결과를 확인하는 평가 운영 흐름을 안내합니다. 평가를 시작하기 전에 목적, 대상, 문항 유형, 배점 기준을 먼저 정리해야 합니다.',
    'Assessment는 학생의 이해도를 확인하는 용도이므로 문항 구성과 결과 해석이 함께 중요합니다. 배포 후에는 제출 결과와 문항별 응답을 확인해 피드백이나 보충 수업에 활용할 수 있습니다.',
    'Assessment 생성하기, 평가 문항 추가하기, 학생에게 평가 배포하기, 평가 결과 확인하기 순서로 진행하세요. 이 순서가 평가 준비부터 결과 분석까지 가장 자연스러운 흐름입니다.'
  ],
  'group-teaching-mode': [
    '이 섹션은 Teaching Mode로 Lesson을 실시간 수업에 활용하는 방법을 안내합니다. 수업 중에는 교사의 화면 제어, 학생 참여 상태, Activity 진행 흐름이 함께 중요합니다.',
    'Interaction은 학생 참여를 유도할 때, Presentation은 설명 중심 수업을 진행할 때, Battle Mode는 Quiz 기반 참여를 높일 때 적합합니다. 수업 목표와 교실 상황에 맞는 모드를 선택해야 합니다.',
    'Teaching Mode 시작하기에서 전체 흐름을 확인한 뒤, 수업 방식에 맞는 모드 문서를 선택하세요. 실시간 수업 전에는 학생 접속 상태와 사용할 Lesson 구성을 미리 확인하는 것이 좋습니다.'
  ],
  'group-reports-results': [
    '이 섹션은 학생의 제출 이력, 답변, 리더보드를 확인하는 결과 조회 흐름을 안내합니다. 결과 화면은 수업이나 과제 이후 학생의 수행 상태를 확인하는 기준점입니다.',
    '제출 이력은 누가 언제 제출했는지 확인할 때 사용하고, 학생 답변은 개별 응답 내용을 볼 때 사용합니다. 리더보드는 Challenge나 Battle Mode처럼 점수와 순위가 있는 활동에서 활용합니다.',
    '제출 이력 확인하기로 전체 상태를 먼저 보고, 필요한 경우 학생 답변 확인하기로 이동하세요. 경쟁형 활동을 운영했다면 리더보드 확인하기에서 점수 기준과 순위를 함께 확인합니다.'
  ]
});

// BEGIN TOOL KIT BODY PATCH
Object.assign(articleBodies, {
      "cat-toolkit": [
            "Tool Kit은 Teaching 화면에서 수업을 진행하는 동안 바로 꺼내 쓸 수 있는 보조 도구 모음입니다. 학생을 뽑거나, 시간을 재거나, 간단한 퀴즈와 투표를 진행하거나, 수학 도구를 화면 위에 띄우는 방식으로 활용할 수 있습니다.",
            "Tool Kit은 Normal, Timer, Competition, Draw, Math Tools로 구성됩니다. 기본 수업 운영 도구가 필요하면 Normal을, 시간 관리가 필요하면 Timer를, 학생 참여를 게임처럼 운영하려면 Competition 또는 Draw를 선택합니다.",
            "처음에는 Normal과 Timer를 먼저 확인한 뒤, 수업 방식에 따라 Draw, Competition, Math Tools를 살펴보세요. 각 하위 페이지에서는 도구를 실행하는 위치와 주요 버튼, 결과 확인 흐름을 안내합니다."
      ],
      "group-toolkit-normal": [
            "Normal 카테고리는 수업 중 가장 자주 쓰이는 기본 보조 도구를 안내합니다.",
            "이 그룹에는 1. Wheel, 2. Dice, 3. Bell, 4. Sound Monitor, 5. Clock, 6. Annotate, 7. Share Web Link, 8. Quick Quiz, 9. Quick Poll 문서가 연결되어 있습니다. 필요한 도구를 선택하면 실행 위치와 주요 조작 방식을 바로 확인할 수 있습니다.",
            "수업 중에는 도구를 열기 전에 학생에게 활동 목적과 참여 방식을 먼저 안내하세요. 도구별로 결과 확인, 다시 실행, 초기화 방식이 다를 수 있습니다."
      ],
      "toolkit-wheel": [
            "[[image:toolkit-wheel/01.png|Wheel 화면 1]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Wheel 아이콘을 클릭하면 룰렛이 실행됩니다.",
            "[[image:toolkit-wheel/02.png|Wheel 화면 2]]\n\n첫 화면에서 − / + 버튼으로 사용할 룰렛의 개수를 설정합니다. 최대 8개 까지 설정할 수 있으며(\"You can set up to 8 choices\"), 개수를 정한 뒤 Set 버튼을 클릭합니다.",
            "[[image:toolkit-wheel/03.png|Wheel 화면 3]]\n\n우측 입력창에 룰렛에 넣을 항목을 한 줄에 하나씩 입력합니다(\"Please enter one item per line\"). 예를 들어 학생 이름(Ethan, Sophia, Liam, Olivia, Noah)을 한 줄씩 입력하면, 입력한 항목 수만큼 룰렛이 분할되어 표시됩니다. 입력을 마치고 Spin 버튼을 클릭하면 룰렛이 회전합니다.",
            "[[image:toolkit-wheel/04.png|Wheel 화면 4]]\n\n룰렛이 멈추면 상단 핀(화살표)이 가리키는 항목이 당첨 결과로 크게 표시되며 축하 효과(색종이)가 나타납니다.\n\n- Spin Again : 같은 항목 구성으로 룰렛을 다시 돌립니다.\n\n- Reset : 입력한 항목을 초기화하고 처음부터 다시 설정합니다."
      ],
      "toolkit-dice": [
            "[[image:toolkit-dice/01.png|Dice 화면 1]]\n\n[[image:toolkit-dice/02.png|Dice 화면 2]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Dice 아이콘을 클릭합니다.",
            "[[image:toolkit-dice/03.png|Dice 화면 3]]\n\n− / + 버튼으로 굴릴 주사위 개수를 설정합니다. 최대 3개 까지 설정할 수 있으며(\"You can set up to 3 choices\"), 개수를 정한 뒤 Set 버튼을 클릭합니다.",
            "[[image:toolkit-dice/04.png|Dice 화면 4]]\n\n[[image:toolkit-dice/05.png|Dice 화면 5]]\n\n설정한 개수만큼 주사위가 화면에 표시됩니다. 여러 개를 설정하면 색상이 다른 주사위가 나란히 나타납니다. Roll 버튼을 클릭하면 주사위가 굴러갑니다.\n\n- Back : 이전 단계로 돌아가 주사위 개수를 다시 설정합니다.",
            "[[image:toolkit-dice/06.png|Dice 화면 6]]\n\n주사위가 멈추면 각 주사위의 눈(숫자)이 표시되고 축하 효과가 나타납니다.\n\n- Re-roll : 같은 개수로 주사위를 다시 굴립니다.\n\n- Reset : 처음부터 다시 설정합니다."
      ],
      "toolkit-bell": [
            "[[image:toolkit-bell/01.png|Bell 화면 1]]\n\n[[image:toolkit-bell/02.png|Bell 화면 2]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Bell 아이콘을 클릭합니다.",
            "[[image:toolkit-bell/03.png|Bell 화면 3]]\n\n종 아이콘 위 입력란에 학생들에게 보여줄 메시지를 입력할 수 있습니다(\"Type the message for students (optional)\"). 메시지는 선택 사항이며, 예를 들어 \"Everybody Focus !!\"와 같이 입력합니다.",
            "[[image:toolkit-bell/04.png|Bell 화면 4]]\n\n[[image:toolkit-bell/05.png|Bell 화면 5]]\n\nRing 버튼을 클릭하면 종이 좌우로 흔들리며 종소리가 울리고, 입력한 메시지가 화면 상단에 표시됩니다.",
            "[[image:toolkit-bell/06.png|Bell 화면 6]]\n\n종이 울리는 동안 버튼이 Stop 으로 바뀝니다. Stop 버튼을 클릭하면 종소리가 멈춥니다."
      ],
      "toolkit-sound-monitor": [
            "[[image:toolkit-sound-monitor/01.png|Sound Monitor 화면 1]]\n\n[[image:toolkit-sound-monitor/02.png|Sound Monitor 화면 2]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Sound Monitor 아이콘을 클릭합니다. 측정을 위해 마이크 사용 권한이 필요합니다.",
            "[[image:toolkit-sound-monitor/03.png|Sound Monitor 화면 3]]\n\n[[image:toolkit-sound-monitor/04.png|Sound Monitor 화면 4]]\n\n좌측 상단에서 두 가지 모드를 전환할 수 있습니다.",
            "[[image:toolkit-sound-monitor/05.png|Sound Monitor 화면 5]]\n\n교실 전체의 소음 수준을 신호등 형태로 표시합니다. 측정된 데시벨(dB)에 따라 표정과 메시지가 바뀝니다.\n\n- 소음이 낮으면 초록불 + \"it's quiet\"\n\n- 적정 수준이면 노란불 + \"Just right\"\n\n- 너무 시끄러우면 빨간불 + \"Too loud!\"\n\n처음 시작할 때는 \"Get Ready!\" 문구가 표시됩니다.",
            "[[image:toolkit-sound-monitor/06.png|Sound Monitor 화면 6]]\n\n[[image:toolkit-sound-monitor/07.png|Sound Monitor 화면 7]]\n\n발표자의 목소리 크기를 게이지(계기판) 형태로 표시합니다. 목소리가 작으면 \"Louder!\" 또는 \"Speak up!\", 적절하면 \"Loud and Clear!\" 메시지가 나타납니다.",
            "[[image:toolkit-sound-monitor/08.png|Sound Monitor 화면 8]]\n\n- dB : 현재 측정된 소음 수준(데시벨)이 표시됩니다.\n\n- Sensitivity : 마이크 감도를 조절합니다(슬라이더, 기본값 10).\n\n- Theme : 표시 테마를 Light 또는 Random 중에서 선택합니다. (Noise Meter)\n\n- Threshold : 목소리 기준값을 설정합니다. Quiet voice (작은 목소리)와 Loud voice (큰 목소리) 기준을 각각 조절합니다. (Speech Meter)\n\n- TestMode : 테스트 모드를 켜면 실제 소리 없이 슬라이더로 수치를 조절하며 동작을 미리 확인할 수 있습니다."
      ],
      "toolkit-clock": [
            "[[image:toolkit-clock/01.png|Clock 화면 1]]\n\n[[image:toolkit-clock/02.png|Clock 화면 2]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Clock 아이콘을 클릭합니다.",
            "[[image:toolkit-clock/03.png|Clock 화면 3]]\n\n상단에서 Digital (디지털) 또는 Analog (아날로그)를 선택할 수 있습니다. 시계 위에는 항상 현재 날짜(일 - 월 - 연도)가 함께 표시됩니다.",
            "[[image:toolkit-clock/04.png|Clock 화면 4]]\n\n숫자로 시간을 표시합니다. 하단 옵션으로 표시 형식을 조절할 수 있습니다.\n\n- 12 / 24 : 12시간제(AM/PM 표시) 또는 24시간제를 선택합니다.\n\n- 00:00 / 00:00:00 : 시:분만 표시할지, 초까지 표시할지를 선택합니다.",
            "[[image:toolkit-clock/05.png|Clock 화면 5]]\n\n아날로그 시계 판으로 시간을 표시합니다.\n\n- 00:00 / 00:00:00 : 초침 표시 여부를 선택합니다."
      ],
      "toolkit-annotate": [
            "[[image:toolkit-annotate/01.png|Annotate 화면 1]]\n\n[[image:toolkit-annotate/02.png|Annotate 화면 2]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Annotate 아이콘을 클릭합니다.",
            "[[image:toolkit-annotate/03.png|Annotate 화면 3]]\n\n화면 상단의 제목 영역(\"Untitled Annotation\")과 본문에 내용을 입력할 수 있습니다. 예를 들어 \"Hello EveryOne\"과 같이 입력하면 화면에 크게 표시됩니다. 입력 가능한 글자 수는 최대 10,000자이며, 우측 하단에 현재 글자 수가 표시됩니다.",
            "[[image:toolkit-annotate/04.png|Annotate 화면 4]]\n\n하단 툴바에서 텍스트 서식을 지정할 수 있습니다.\n\n- 글자 크기 : 드롭다운(예: 55px)으로 크기를 선택합니다.\n\n- B / I / U : 굵게(Bold) / 기울임(Italic) / 밑줄(Underline)을 적용합니다.\n\n- A : 글자 크기를 키우거나 줄입니다.\n\n- 배경색(채우기) 아이콘 : 색상 선택기(Color)에서 메모 배경색을 변경합니다(예: #4F7A6B).\n\n- + : 새 메모를 추가합니다.",
            "[[image:toolkit-annotate/05.png|Annotate 화면 5]]\n\n- Auto-Save : 켜두면 작성 내용이 자동으로 저장됩니다.\n\n- Save : 현재 메모를 저장합니다.\n\n- Print : 메모를 인쇄합니다.\n\n- List : 저장된 메모 목록( Annotation List )을 엽니다. 최대 50개까지 저장할 수 있으며, 각 메모는 작성 시각과 함께 표시됩니다. 개별 항목은 X 버튼으로, 전체는 Delete All 버튼으로 삭제할 수 있습니다."
      ],
      "toolkit-share-web-link": [
            "[[image:toolkit-share-web-link/01.png|Share Web Link 화면 1]]\n\n[[image:toolkit-share-web-link/02.png|Share Web Link 화면 2]]\n\n[[image:toolkit-share-web-link/03.png|Share Web Link 화면 3]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Share Web Link 아이콘을 클릭합니다.",
            "[[image:toolkit-share-web-link/04.png|Share Web Link 화면 4]]\n\n[[image:toolkit-share-web-link/05.png|Share Web Link 화면 5]]\n\nEnter link 탭에서 입력창에 공유할 링크를 붙여넣거나 입력한 뒤(\"Paste or enter a link to send.\"), Send Link 버튼을 클릭하면 학생 화면으로 링크가 전송됩니다.",
            "[[image:toolkit-share-web-link/06.png|Share Web Link 화면 6]]\n\n[[image:toolkit-share-web-link/07.png|Share Web Link 화면 7]]\n\n[[image:toolkit-share-web-link/08.png|Share Web Link 화면 8]]\n\n자주 사용하는 링크를 저장해 두고 빠르게 보낼 수 있습니다.\n\n- Add Link 버튼을 클릭하고 링크 이름(예: Contents)과 URL을 입력한 뒤 확인(✓)을 누르면 저장됩니다.\n\n- 저장된 링크는 편집(✏️) 또는 삭제(X)할 수 있습니다.\n\n- 목록에서 원하는 링크를 선택한 뒤 Send Link 를 클릭하면 전송됩니다.",
            "[[image:toolkit-share-web-link/09.png|Share Web Link 화면 9]]\n\n[[image:toolkit-share-web-link/10.png|Share Web Link 화면 10]]\n\n링크가 전송되면 학생 화면에 \"Just a moment…\"와 함께 링크 카드가 나타나며, Open Link 버튼을 눌러 해당 페이지를 열 수 있습니다. 교사가 활동을 시작하기 전에는 \"Please wait until your teacher starts the activity.\" 문구가 표시됩니다."
      ],
      "toolkit-quick-quiz": [
            "[[image:toolkit-quick-quiz/01.png|Quick Quiz 화면 1]]\n\n[[image:toolkit-quick-quiz/02.png|Quick Quiz 화면 2]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Quick Quiz 아이콘을 클릭합니다.",
            "[[image:toolkit-quick-quiz/03.png|Quick Quiz 화면 3]]\n\n[[image:toolkit-quick-quiz/04.png|Quick Quiz 화면 4]]\n\n상단에서 Multiple Choice (객관식) 또는 Short Answer (주관식)를 선택합니다.",
            "[[image:toolkit-quick-quiz/05.png|Quick Quiz 화면 5]]\n\n- 상단 입력란(\"Enter Directly\")에 질문을 입력합니다.\n\n- 보기 입력란(\"Enter option 1\", \"Enter option 2\" …)에 선택지를 입력합니다. + 버튼으로 보기를 추가할 수 있으며, 최대 5개까지 설정할 수 있습니다.\n\n- 각 보기 왼쪽의 체크박스를 선택해 정답을 지정합니다.\n\n- Display 버튼을 클릭하면 학생 화면에 퀴즈가 표시됩니다.\n\n⚠️ 비어 있는 보기가 있으면 \"Some options are empty.\" 안내가 표시되며 출제할 수 없습니다. 보기를 모두 채우거나 빈 보기를 삭제한 뒤 진행해 주세요.",
            "[[image:toolkit-quick-quiz/06.png|Quick Quiz 화면 6]]\n\n[[image:toolkit-quick-quiz/07.png|Quick Quiz 화면 7]]\n\nDisplay 를 누르면 학생 화면에 번호가 매겨진 보기가 표시됩니다. 교사가 Show Answer 버튼을 클릭하면 정답이 초록색으로 강조되어 공개되고 축하 효과가 나타납니다.",
            "[[image:toolkit-quick-quiz/08.png|Quick Quiz 화면 8]]\n\n우측 패널의 Activity Results 탭에서 학생들의 응답 결과를, Live Q&A 탭에서 실시간 질문을 확인할 수 있습니다."
      ],
      "toolkit-quick-poll": [
            "[[image:toolkit-quick-poll/01.png|Quick Poll 화면 1]]\n\n[[image:toolkit-quick-poll/02.png|Quick Poll 화면 2]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Quick Poll 아이콘을 클릭합니다.",
            "[[image:toolkit-quick-poll/03.png|Quick Poll 화면 3]]\n\n[[image:toolkit-quick-poll/04.png|Quick Poll 화면 4]]\n\n상단의 \"Enter Directly\" 입력란에 질문을 입력한 뒤, 각 선택지에 표시된 − / + 버튼으로 응답 수를 집계합니다. 상단 탭에서 집계 형식을 자유롭게 전환할 수 있습니다.",
            "[[image:toolkit-quick-poll/05.png|Quick Poll 화면 5]]\n\n[[image:toolkit-quick-poll/06.png|Quick Poll 화면 6]]",
            "[[image:toolkit-quick-poll/07.png|Quick Poll 화면 7]]\n\n[[image:toolkit-quick-poll/08.png|Quick Poll 화면 8]]\n\n찬성(👍 Agree )과 반대(👎 Disagree ) 두 가지로 응답을 집계합니다.\n\n예: \"Social media does more harm than good.\" Do you agree or disagree?",
            "[[image:toolkit-quick-poll/09.png|Quick Poll 화면 9]]\n\n[[image:toolkit-quick-poll/10.png|Quick Poll 화면 10]]\n\n신호등 형태의 세 단계로 집계합니다. Agree (초록) / Neutral (노랑) / Disagree (빨강).",
            "[[image:toolkit-quick-poll/11.png|Quick Poll 화면 11]]\n\n[[image:toolkit-quick-poll/12.png|Quick Poll 화면 12]]\n\n5단계 척도로 의견의 강도를 집계합니다. Strongly Agree / Agree / Neutral / Disagree / Strongly Disagree .\n\n예: \"On a scale of 1–5, how much do you agree?\"",
            "[[image:toolkit-quick-poll/13.png|Quick Poll 화면 13]]\n\n직접 작성한 보기 중에서 선택해 투표합니다. \"Enter option N\" 입력란에 보기를 입력하고 + 버튼으로 최대 5개까지 추가할 수 있습니다.\n\n예: \"Which has the biggest impact on teenagers' mental health?\" (Social media & online content / Academic pressure & grades / Family relationships / Friendships & peer pressure / Sleep & physical health)"
      ],
      "group-toolkit-timer": [
            "Timer 카테고리는 수업 시간을 관리할 수 있는 타이머 도구를 안내합니다.",
            "이 그룹에는 10. DigitalTimer, 11. Hourglass, 12. Pie Timer 문서가 연결되어 있습니다. 필요한 도구를 선택하면 실행 위치와 주요 조작 방식을 바로 확인할 수 있습니다.",
            "수업 중에는 도구를 열기 전에 학생에게 활동 목적과 참여 방식을 먼저 안내하세요. 도구별로 결과 확인, 다시 실행, 초기화 방식이 다를 수 있습니다."
      ],
      "toolkit-digital-timer": [
            "[[image:toolkit-digital-timer/01.png|DigitalTimer 화면 1]]\n\n[[image:toolkit-digital-timer/02.png|DigitalTimer 화면 2]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 DigitalTimer 아이콘을 클릭합니다.",
            "[[image:toolkit-digital-timer/03.png|DigitalTimer 화면 3]]\n\n30s / 1m / 5m / 10m 프리셋 버튼으로 시간을 설정합니다(예: 10m 선택 시 10:00). 설정 후 Start 버튼을 클릭하면 카운트다운이 시작됩니다.",
            "[[image:toolkit-digital-timer/04.png|DigitalTimer 화면 4]]\n\n- Pause : 타이머를 일시정지합니다.\n\n- 새로고침(↻) 아이콘: 설정한 시간을 초기화합니다.\n\n- X : 타이머를 닫습니다."
      ],
      "toolkit-hourglass": [
            "[[image:toolkit-hourglass/01.png|Hourglass 화면 1]]\n\n[[image:toolkit-hourglass/02.png|Hourglass 화면 2]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Hourglass 아이콘을 클릭합니다.",
            "[[image:toolkit-hourglass/03.png|Hourglass 화면 3]]\n\n[[image:toolkit-hourglass/04.png|Hourglass 화면 4]]\n\n30s / 1m / 5m / 10m 프리셋 버튼으로 시간을 설정한 뒤 Start 버튼을 클릭합니다. 타이머가 시작되면 모래가 떨어지는 모래시계 애니메이션과 함께 시간이 줄어듭니다.",
            "[[image:toolkit-hourglass/05.png|Hourglass 화면 5]]\n\n- Pause : 타이머를 일시정지합니다.\n\n- 새로고침(↻) 아이콘: 설정한 시간을 초기화합니다.\n\n- X : 타이머를 닫습니다."
      ],
      "toolkit-pie-timer": [
            "[[image:toolkit-pie-timer/01.png|Pie Timer 화면 1]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Pie Timer 아이콘을 클릭합니다.",
            "[[image:toolkit-pie-timer/02.png|Pie Timer 화면 2]]\n\n20m 또는 60m 중에서 다이얼의 최대 범위를 선택합니다. 20m는 20분, 60m는 60분 눈금으로 표시됩니다.",
            "[[image:toolkit-pie-timer/03.png|Pie Timer 화면 3]]\n\n30s / 1m / 5m / 10m 프리셋 버튼으로 시간을 설정합니다. 다이얼을 직접 조작하거나 숫자를 직접 입력할 수도 있습니다(\"Can enter numbers directly\").",
            "[[image:toolkit-pie-timer/04.png|Pie Timer 화면 4]]\n\n- Start : 카운트다운을 시작합니다. 진행에 따라 부채꼴이 점점 줄어듭니다.\n\n- Pause : 타이머를 일시정지합니다.\n\n- Reset : 설정한 시간을 초기화합니다."
      ],
      "group-toolkit-competition": [
            "Competition 카테고리는 학생 참여를 높이는 경쟁·게임형 도구를 안내합니다.",
            "이 그룹에는 13. First to Buzz 문서가 연결되어 있습니다. 필요한 도구를 선택하면 실행 위치와 주요 조작 방식을 바로 확인할 수 있습니다.",
            "수업 중에는 도구를 열기 전에 학생에게 활동 목적과 참여 방식을 먼저 안내하세요. 도구별로 결과 확인, 다시 실행, 초기화 방식이 다를 수 있습니다."
      ],
      "toolkit-first-to-buzz": [
            "[[image:toolkit-first-to-buzz/01.png|First to Buzz 화면 1]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 First to Buzz 아이콘을 클릭합니다.",
            "[[image:toolkit-first-to-buzz/02.png|First to Buzz 화면 2]]\n\n\"Get ready!\" 화면에서 안내 문구를 확인합니다. \"Press the button only once. The faster you press, the higher your rank.\"(버튼은 한 번만 누르며, 빨리 누를수록 순위가 올라갑니다). Start 버튼을 클릭하면 게임이 시작됩니다.",
            "[[image:toolkit-first-to-buzz/03.png|First to Buzz 화면 3]]\n\n게임이 시작되면 학생 화면에 \"Click!\" 버튼이 나타납니다. 학생들은 버튼을 가능한 한 빨리 한 번 누릅니다.",
            "누른 속도에 따라 순위가 시상대(podium) 형태로 표시됩니다. 1위·2위·3위가 왕관과 함께 표시되며, View all 로 전체 순위를 확인할 수 있습니다. Reset 버튼으로 게임을 초기화합니다."
      ],
      "group-toolkit-draw": [
            "Draw 카테고리는 무작위 추첨과 뽑기를 진행할 수 있는 도구를 안내합니다.",
            "이 그룹에는 14. Presentation Lottery, 15. Card Draw, 16. Lucky Ladder, 17. Group Maker 문서가 연결되어 있습니다. 필요한 도구를 선택하면 실행 위치와 주요 조작 방식을 바로 확인할 수 있습니다.",
            "수업 중에는 도구를 열기 전에 학생에게 활동 목적과 참여 방식을 먼저 안내하세요. 도구별로 결과 확인, 다시 실행, 초기화 방식이 다를 수 있습니다."
      ],
      "toolkit-presentation-lottery": [
            "[[image:toolkit-presentation-lottery/01.png|Presentation Lottery 화면 1]]\n\n[[image:toolkit-presentation-lottery/02.png|Presentation Lottery 화면 2]]\n\n[[image:toolkit-presentation-lottery/03.png|Presentation Lottery 화면 3]]\n\n[[image:toolkit-presentation-lottery/04.png|Presentation Lottery 화면 4]]\n\n[[image:toolkit-presentation-lottery/05.png|Presentation Lottery 화면 5]]\n\n[[image:toolkit-presentation-lottery/06.png|Presentation Lottery 화면 6]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Presentation Lottery 아이콘을 클릭합니다.",
            "[[image:toolkit-presentation-lottery/07.png|Presentation Lottery 화면 7]]\n\n[[image:toolkit-presentation-lottery/08.png|Presentation Lottery 화면 8]]\n\n[[image:toolkit-presentation-lottery/09.png|Presentation Lottery 화면 9]]\n\n[[image:toolkit-presentation-lottery/10.png|Presentation Lottery 화면 10]]\n\n[[image:toolkit-presentation-lottery/11.png|Presentation Lottery 화면 11]]\n\n상단에서 뽑을 개수와 전체 개수를 설정합니다.\n\n- Pick [N] of [M] : 전체 항목 수(M) 중에서 뽑을 수(N)를 − / + 버튼으로 설정합니다. 최대 50개까지 설정할 수 있습니다(\"You can set up to 50 choices\").\n\n- 각 항목(option)을 직접 입력하거나, Load Student List (저장된 명단) 또는 Load Class Student ( Select Class 창에서 학급 선택)로 명단을 불러올 수 있습니다.\n\n- 설정을 마치면 Set 버튼을 클릭합니다.",
            "[[image:toolkit-presentation-lottery/12.png|Presentation Lottery 화면 12]]\n\n[[image:toolkit-presentation-lottery/13.png|Presentation Lottery 화면 13]]\n\n[[image:toolkit-presentation-lottery/14.png|Presentation Lottery 화면 14]]\n\n[[image:toolkit-presentation-lottery/15.png|Presentation Lottery 화면 15]]\n\n[[image:toolkit-presentation-lottery/16.png|Presentation Lottery 화면 16]]\n\n티켓들이 한 줄로 펼쳐집니다. Draw 버튼을 클릭하면 설정한 개수만큼 티켓이 무작위로 뽑힙니다.",
            "[[image:toolkit-presentation-lottery/17.png|Presentation Lottery 화면 17]]\n\n[[image:toolkit-presentation-lottery/18.png|Presentation Lottery 화면 18]]\n\n[[image:toolkit-presentation-lottery/19.png|Presentation Lottery 화면 19]]\n\n[[image:toolkit-presentation-lottery/20.png|Presentation Lottery 화면 20]]\n\n[[image:toolkit-presentation-lottery/21.png|Presentation Lottery 화면 21]]\n\n뽑힌 티켓은 \"Scratch here!\"(여기를 긁으세요) 상태로 나타납니다.\n\n- 티켓을 직접 긁어 하나씩 확인하거나, Open at Once 버튼으로 모든 티켓을 한 번에 공개할 수 있습니다.\n\n- 공개되면 당첨된 이름(예: Emma, 또는 Ethan·Emma·Olivia)이 표시되고 축하 효과가 나타납니다.",
            "[[image:toolkit-presentation-lottery/22.png|Presentation Lottery 화면 22]]\n\n[[image:toolkit-presentation-lottery/23.png|Presentation Lottery 화면 23]]\n\n[[image:toolkit-presentation-lottery/24.png|Presentation Lottery 화면 24]]\n\n[[image:toolkit-presentation-lottery/25.png|Presentation Lottery 화면 25]]\n\n[[image:toolkit-presentation-lottery/26.png|Presentation Lottery 화면 26]]\n\n- View Results : 당첨 결과를 확인합니다.\n\n- Redraw : 같은 구성으로 다시 추첨합니다.\n\n- Reset : 처음부터 다시 설정합니다."
      ],
      "toolkit-card-draw": [
            "[[image:toolkit-card-draw/01.png|Card Draw 화면 1]]\n\n[[image:toolkit-card-draw/02.png|Card Draw 화면 2]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Card Draw 아이콘을 클릭합니다.",
            "[[image:toolkit-card-draw/04.png|Card Draw 화면 3]]\n\n[[image:toolkit-card-draw/04.png|Card Draw 화면 4]]\n\n상단에서 뽑을 개수와 전체 개수를 설정합니다.\n\n- Pick [N] of [M] : 전체 카드 수(M) 중에서 뽑을 카드 수(N)를 − / + 버튼으로 설정합니다. 최대 50개까지 설정할 수 있습니다(\"You can set up to 50 choices\").\n\n- 각 카드에 항목(option)을 직접 입력하거나, Load Student List 로 학생 명단을 불러올 수 있습니다.\n\n- 설정을 마치면 Set 버튼을 클릭해 카드를 구성합니다.",
            "[[image:toolkit-card-draw/05.png|Card Draw 화면 5]]\n\n[[image:toolkit-card-draw/06.png|Card Draw 화면 6]]\n\n뒤집힌 카드들이 펼쳐집니다. Draw 버튼을 클릭하면 설정한 개수만큼 카드가 무작위로 뽑혀 펼쳐집니다.",
            "[[image:toolkit-card-draw/07.png|Card Draw 화면 7]]\n\n[[image:toolkit-card-draw/08.png|Card Draw 화면 8]]\n\n뽑힌 카드의 항목(예: Mason, 또는 Emma·Lily·Mason)이 공개됩니다.\n\n- Redraw : 같은 구성으로 다시 뽑습니다.\n\n- Reset : 처음부터 다시 설정합니다."
      ],
      "toolkit-lucky-ladder": [
            "[[image:toolkit-lucky-ladder/01.png|Lucky Ladder 화면 1]]\n\n[[image:toolkit-lucky-ladder/02.png|Lucky Ladder 화면 2]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Lucky Ladder 아이콘을 클릭합니다.",
            "[[image:toolkit-lucky-ladder/03.png|Lucky Ladder 화면 3]]\n\n[[image:toolkit-lucky-ladder/04.png|Lucky Ladder 화면 4]]\n\n− / + 버튼으로 사다리 가닥(참가) 수를 설정합니다. 최대 8개 까지 설정할 수 있으며(\"You can set up to 8 choices\"), Set 버튼을 클릭합니다.",
            "[[image:toolkit-lucky-ladder/05.png|Lucky Ladder 화면 5]]\n\n[[image:toolkit-lucky-ladder/06.png|Lucky Ladder 화면 6]]\n\nStart Point (시작점)와 End Point (도착점)에 각 항목을 입력합니다. 예를 들어 시작점에 학생 이름(Alex, Jordan, Casey, Morgan, Riley), 도착점에 결과(Golden Nap Pass, Pizza Party for One, Invisible Superpower, Mystery Fish, One Free Excuse)를 입력합니다.\n\n- 사다리의 복잡도는 무작위로 생성됩니다(\"The complexity of the ladder is randomly generated\").\n\n- 입력을 마치면 Start Draw 버튼을 클릭합니다. Back 버튼으로 이전 단계로 돌아갈 수 있습니다.",
            "[[image:toolkit-lucky-ladder/07.png|Lucky Ladder 화면 7]]\n\n사다리가 표시되며 도착 항목은 처음에 가려진(?) 상태입니다.\n\n- 항목을 하나씩 확인하거나, Open at Once 버튼으로 모든 결과를 한 번에 공개할 수 있습니다.\n\n- View as list 버튼으로 시작-도착 연결 결과를 목록으로 볼 수 있습니다(예: Alex → Golden Nap Pass).\n\n- Reset 버튼으로 초기화합니다."
      ],
      "toolkit-group-maker": [
            "[[image:toolkit-group-maker/01.png|Group Maker 화면 1]]\n\n[[image:toolkit-group-maker/02.png|Group Maker 화면 2]]\n\n[[image:toolkit-group-maker/03.png|Group Maker 화면 3]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Group Maker 아이콘을 클릭합니다.",
            "[[image:toolkit-group-maker/04.png|Group Maker 화면 4]]\n\n[[image:toolkit-group-maker/05.png|Group Maker 화면 5]]\n\n상단에서 전체 인원과 나눌 그룹 수를 설정합니다.\n\n- Divide [N] people into [M] Groups : 전체 인원(N)과 그룹 수(M)를 각각 − / + 버튼으로 조절합니다.\n\n- 최대 50명까지 추가할 수 있습니다(\"You can add up to 50 students.\").",
            "[[image:toolkit-group-maker/06.png|Group Maker 화면 6]]\n\n[[image:toolkit-group-maker/07.png|Group Maker 화면 7]]\n\n설정한 인원 수만큼 \"Student name\" 입력란이 생성됩니다. 이름을 직접 입력하거나, 아래 버튼으로 명단을 불러올 수 있습니다.\n\n- Load Student List : 저장된 학생 명단을 불러옵니다.\n\n- Load Class Student : Select Class 창에서 학급(예: 2026 Grade 5 Lumi Class)을 선택해 해당 학급 학생을 한 번에 불러옵니다.",
            "[[image:toolkit-group-maker/08.png|Group Maker 화면 8]]\n\n[[image:toolkit-group-maker/09.png|Group Maker 화면 9]]\n\nSet 버튼을 클릭하면 학생들이 무작위로 그룹(Group1, Group2 …)에 배정됩니다.\n\n- 각 그룹 제목 옆 편집(✏️) 아이콘으로 그룹 이름을 변경할 수 있습니다.\n\n- 학생 항목의 드래그 핸들로 순서를 옮기거나 다른 그룹으로 이동할 수 있으며, X 버튼으로 제외할 수 있습니다.\n\n- Reshuffle : 그룹 구성을 다시 무작위로 섞습니다.\n\n- Reset : 처음부터 다시 설정합니다."
      ],
      "group-toolkit-math-tools": [
            "Math Tools 카테고리는 수학 수업에서 활용할 수 있는 보조 도구를 안내합니다.",
            "이 그룹에는 18. Ruler, 19. Triangle, 20. Protractor 문서가 연결되어 있습니다. 필요한 도구를 선택하면 실행 위치와 주요 조작 방식을 바로 확인할 수 있습니다.",
            "수업 중에는 도구를 열기 전에 학생에게 활동 목적과 참여 방식을 먼저 안내하세요. 도구별로 결과 확인, 다시 실행, 초기화 방식이 다를 수 있습니다."
      ],
      "toolkit-ruler": [
            "[[image:toolkit-ruler/01.png|Ruler 화면 1]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Ruler 아이콘을 클릭합니다.",
            "[[image:toolkit-ruler/02.png|Ruler 화면 2]]\n\n0부터 30까지 눈금이 표시된 자가 화면에 나타납니다.\n\n- 자를 드래그하여 원하는 위치로 이동할 수 있습니다.\n\n- 가운데 회전(↻) 버튼을 사용해 자의 각도를 자유롭게 회전할 수 있습니다.\n\n- 우측 상단의 X 를 클릭하면 자가 닫힙니다."
      ],
      "toolkit-triangle": [
            "[[image:toolkit-triangle/01.png|Triangle 화면 1]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Triangle 아이콘을 클릭합니다.",
            "[[image:toolkit-triangle/02.png|Triangle 화면 2]]\n\n눈금이 표시된 직각삼각자가 화면에 나타납니다.\n\n- 드래그하여 원하는 위치로 이동할 수 있습니다.\n\n- 가운데 회전(↻) 버튼으로 삼각자의 각도를 회전할 수 있습니다.\n\n- 우측 상단의 X 를 클릭하면 닫힙니다."
      ],
      "toolkit-protractor": [
            "[[image:toolkit-protractor/01.png|Protractor 화면 1]]\n\n수업 화면 하단의 도구 모음(Tool Kit)에서 Protractor 아이콘을 클릭합니다.",
            "[[image:toolkit-protractor/02.png|Protractor 화면 2]]\n\n0°부터 180°까지 눈금이 표시된 반원형 각도기가 화면에 나타납니다.\n\n- 드래그하여 원하는 위치로 이동할 수 있습니다.\n\n- 가운데 회전(↻) 버튼으로 각도기를 회전할 수 있습니다.\n\n- 우측 상단의 X 를 클릭하면 닫힙니다."
      ]
});
// END TOOL KIT BODY PATCH


// BEGIN TOOL KIT WHEEL CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-wheel": [
            "수업 화면 하단의 도구 모음(Tool Kit)에서 **Wheel** 아이콘을 클릭하면 룰렛 도구가 열립니다. Wheel은 학생 이름, 발표 순서, 역할, 주제처럼 무작위로 하나를 뽑아야 할 때 사용할 수 있습니다.",
            "[[image:toolkit-wheel/01.png|Wheel 룰렛 개수 설정 화면]]\n\n첫 화면에서 **− / +** 버튼으로 사용할 룰렛의 개수를 설정합니다. 최대 **8개**까지 설정할 수 있으며(\"You can set up to 8 choices\"), 개수를 정한 뒤 **Set** 버튼을 클릭합니다.\n\n룰렛 개수는 한 번에 표시할 선택 구역의 수를 의미합니다. 학생 이름이나 항목 수에 맞춰 필요한 개수를 먼저 정해 주세요.",
            "[[image:toolkit-wheel/03.png|Wheel 항목 입력 후 Spin 실행 화면]]\n\n우측 입력창에 룰렛에 넣을 항목을 **한 줄에 하나씩** 입력합니다(\"Please enter one item per line\"). 예를 들어 Ethan, Sophia, Liam, Olivia, Noah처럼 학생 이름을 줄마다 입력하면 입력한 항목 수만큼 룰렛이 나뉘어 표시됩니다.\n\n입력을 마치면 **Spin** 버튼을 클릭해 룰렛을 회전합니다.",
            "[[image:toolkit-wheel/04.png|Wheel 결과 확인 화면]]\n\n룰렛이 멈추면 상단 핀(화살표)이 가리키는 항목이 결과로 크게 표시되고 축하 효과가 나타납니다.\n\n- **Spin Again**: 같은 항목 구성으로 룰렛을 다시 돌립니다.\n\n- **Reset**: 입력한 항목을 초기화하고 처음부터 다시 설정합니다."
      ]
});
// END TOOL KIT WHEEL CLEANUP PATCH


// BEGIN TOOL KIT DICE CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-dice": [
            "[[image:toolkit-dice/01.png|Tool Kit 목록에서 Dice 선택]]\n\n수업 화면 하단의 도구 모음에서 **+** 버튼을 클릭하면 **All Tools** 목록이 열립니다. **Normal** 카테고리에서 **Dice**를 선택하면 주사위 도구가 실행됩니다.\n\nDice는 게임 활동, 무작위 순번 정하기, 간단한 추첨처럼 숫자를 랜덤으로 정해야 할 때 사용할 수 있습니다.",
            "[[image:toolkit-dice/02.png|Dice 주사위 개수 설정 화면]]\n\n첫 화면에서 **− / +** 버튼으로 굴릴 주사위 개수를 설정합니다. 최대 **3개**까지 설정할 수 있으며(\"You can set up to 3 choices\"), 개수를 정한 뒤 **Set** 버튼을 클릭합니다.\n\n주사위가 여러 개 필요하지 않다면 1개로 두고 진행해도 됩니다.",
            "[[image:toolkit-dice/05.png|Dice 세 개 주사위 굴리기 전 화면]]\n\n설정한 개수만큼 주사위가 화면에 표시됩니다. 여러 개를 설정하면 색상이 다른 주사위가 나란히 나타나므로 각 주사위를 구분하기 쉽습니다.\n\n- **Roll**: 표시된 주사위를 굴립니다.\n\n- **Back**: 이전 단계로 돌아가 주사위 개수를 다시 설정합니다.",
            "[[image:toolkit-dice/06.png|Dice 세 개 주사위 결과 화면]]\n\n주사위가 멈추면 각 주사위의 눈(숫자)이 표시되고 축하 효과가 나타납니다. 결과는 화면에 남아 있어 학생들과 함께 바로 확인할 수 있습니다.\n\n- **Re-roll**: 같은 개수로 주사위를 다시 굴립니다.\n\n- **Reset**: 결과를 초기화하고 처음부터 다시 설정합니다."
      ]
});
// END TOOL KIT DICE CLEANUP PATCH


// BEGIN TOOL KIT BELL CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-bell": [
            "[[image:toolkit-bell/01.png|Tool Kit 목록에서 Bell 선택]]\n\n수업 화면 하단의 도구 모음에서 **+** 버튼을 클릭하면 **All Tools** 목록이 열립니다. **Normal** 카테고리에서 **Bell**을 선택하면 알림 종 도구가 실행됩니다.\n\nBell은 학생들의 주의를 집중시키거나 활동 전환을 알릴 때 사용할 수 있습니다.",
            "[[image:toolkit-bell/03.png|Bell 메시지 입력 화면]]\n\n종 아이콘 위 입력란에 학생들에게 보여줄 메시지를 입력할 수 있습니다(\"Type the message for students (optional)\"). 메시지는 선택 사항이므로 비워둔 상태로도 종을 울릴 수 있습니다.\n\n예를 들어 **Everybody Focus !!**처럼 짧은 안내 문구를 입력하면, 종을 울릴 때 해당 문구가 함께 표시됩니다.",
            "[[image:toolkit-bell/05.png|Bell 종 울림 중 Stop 버튼 화면]]\n\n**Ring** 버튼을 클릭하면 종이 좌우로 흔들리며 종소리가 울립니다. 메시지를 입력해둔 경우 화면 상단에 문구가 함께 표시되어 학생들이 어떤 행동을 해야 하는지 바로 확인할 수 있습니다.\n\n종이 울리는 동안 버튼은 **Stop**으로 바뀝니다.",
            "종소리를 멈추려면 **Stop** 버튼을 클릭합니다. 수업 중 주의를 환기한 뒤 바로 설명을 이어가야 하는 경우, 필요한 만큼만 울린 뒤 Stop으로 종료하세요.\n\n다시 알림이 필요하면 메시지를 유지한 상태로 **Ring**을 다시 클릭할 수 있습니다."
      ]
});
// END TOOL KIT BELL CLEANUP PATCH


// BEGIN TOOL KIT SOUND MONITOR CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-sound-monitor": [
            "[[image:toolkit-sound-monitor/01.png|Tool Kit 목록에서 Sound Monitor 선택]]\n\n수업 화면 하단의 도구 모음에서 **+** 버튼을 클릭하면 **All Tools** 목록이 열립니다. **Normal** 카테고리에서 **Sound Monitor**를 선택하면 소리 측정 도구가 실행됩니다.\n\nSound Monitor는 마이크로 입력되는 소리를 기준으로 동작하므로, 브라우저에서 마이크 권한을 요청하면 허용해야 합니다.",
            "Sound Monitor에는 **Noise Meter**와 **Speech Meter** 두 가지 모드가 있습니다.\n\n- **Noise Meter** : 교실 전체의 소음 수준을 확인할 때 사용합니다. 학생들이 활동 중 너무 조용한지, 적절한지, 시끄러운지를 신호등처럼 보여줍니다.\n\n- **Speech Meter** : 발표자나 말하는 학생의 목소리 크기를 확인할 때 사용합니다. 목소리가 너무 작으면 더 크게 말하도록 안내하고, 적절한 크기일 때는 긍정적인 피드백을 보여줍니다.\n\n좌측 상단의 모드 버튼을 클릭해 두 모드를 전환할 수 있습니다.",
            "[[image:toolkit-sound-monitor/03.png|Noise Meter 조용한 상태]]\n\n[[image:toolkit-sound-monitor/07.png|Noise Meter 적정 소음 상태]]\n\n[[image:toolkit-sound-monitor/08.png|Noise Meter 소음이 큰 상태]]\n\n**Noise Meter**는 측정된 데시벨(dB)에 따라 화면 중앙의 신호등 색상과 메시지를 바꿔 보여줍니다.\n\n- 소음이 낮으면 초록불과 **it's quiet** 메시지가 표시됩니다.\n\n- 적정 수준이면 노란불과 **Just right** 메시지가 표시됩니다.\n\n- 너무 시끄러우면 빨간불과 **Too loud!** 메시지가 표시됩니다.\n\n수업 중 활동 소음 기준을 학생들이 시각적으로 이해해야 할 때 사용하면 좋습니다.",
            "[[image:toolkit-sound-monitor/04.png|Speech Meter 목소리가 작은 상태]]\n\n[[image:toolkit-sound-monitor/05.png|Speech Meter 적절한 목소리 상태]]\n\n**Speech Meter**는 발표자의 목소리 크기를 게이지 형태로 보여줍니다. 바늘이 왼쪽 노란 영역에 머물면 목소리가 작은 상태로 판단해 **Louder!** 또는 **Speak up!** 안내를 보여줍니다.\n\n목소리가 기준 범위에 들어오면 바늘이 초록 영역으로 이동하고 **Loud and Clear!** 메시지가 표시됩니다. 발표 연습이나 학생 발표 전에 적절한 목소리 크기를 맞춰보는 용도로 사용할 수 있습니다.",
            "우측 설정 패널에서는 측정 기준과 표시 방식을 조정할 수 있습니다.\n\n- **dB** : 현재 측정된 소리 크기가 데시벨로 표시됩니다.\n\n- **Sensitivity** : 마이크 감도를 조절합니다. 주변 환경에 따라 반응이 너무 민감하거나 둔하면 값을 조정합니다.\n\n- **Theme** : Noise Meter의 표시 테마를 선택합니다.\n\n- **Threshold** : Speech Meter에서 작은 목소리와 큰 목소리의 기준값을 조정합니다.\n\n- **TestMode** : 실제 소리를 내지 않고 슬라이더로 수치를 바꿔보며 화면 변화를 미리 확인합니다."
      ]
});
// END TOOL KIT SOUND MONITOR CLEANUP PATCH


// BEGIN TOOL KIT CLOCK CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-clock": [
            "수업 화면 하단의 도구 모음에서 **Clock** 아이콘을 클릭하면 시계 도구가 실행됩니다. Clock은 수업 중 현재 시간을 크게 보여주거나, 학생들에게 활동 시작·종료 시간을 안내할 때 사용할 수 있습니다.\n\n시계 화면은 별도의 설정 저장 없이 현재 시간 기준으로 바로 표시됩니다.",
            "Clock 화면 상단에서 **Digital** 또는 **Analog**를 선택해 표시 방식을 바꿀 수 있습니다.\n\n두 모드 모두 시계 위에 현재 날짜가 함께 표시됩니다. 날짜는 **일 - 월 - 연도** 형식으로 보이므로, 수업 화면을 공유할 때 오늘 날짜와 시간을 한 번에 확인할 수 있습니다.",
            "[[image:toolkit-clock/02.png|Clock 디지털 12시간제와 초 표시 화면]]\n\n**Digital** 모드는 숫자로 시간을 크게 표시합니다. 하단 옵션에서 시간 표시 방식을 조절할 수 있습니다.\n\n- **12 / 24** : 12시간제 또는 24시간제를 선택합니다. 12시간제를 선택하면 화면 오른쪽에 **AM/PM**이 함께 표시됩니다.\n\n- **00:00 / 00:00:00** : 시:분만 표시할지, 초까지 표시할지를 선택합니다. 초 단위까지 보여줘야 하는 활동에서는 **00:00:00**을 사용하면 좋습니다.",
            "[[image:toolkit-clock/05.png|Clock 아날로그 초침 표시 화면]]\n\n**Analog** 모드는 시계 판과 바늘로 현재 시간을 보여줍니다. 학생들이 실제 시계 읽기 연습을 하거나, 디지털 숫자보다 시각적인 시간 흐름을 보여주고 싶을 때 적합합니다.\n\n하단의 **00:00 / 00:00:00** 옵션으로 초침 표시 여부를 선택할 수 있습니다. 초침을 켜면 시간 흐름이 더 명확하게 보이고, 끄면 화면이 단순해집니다."
      ]
});
// END TOOL KIT CLOCK CLEANUP PATCH


// BEGIN TOOL KIT ANNOTATE CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-annotate": [
            "수업 화면 하단의 도구 모음에서 **Annotate** 아이콘을 클릭하면 큰 메모 화면이 열립니다. Annotate는 수업 중 짧은 안내 문구, 활동 지시, 정리 문장 등을 화면에 크게 표시할 때 사용하는 도구입니다.\n\n처음 열면 제목 영역에는 **Untitled Annotation**이 표시되고, 본문 입력 영역에 바로 내용을 작성할 수 있습니다.",
            "[[image:toolkit-annotate/01.png|Annotate 작성 화면과 기본 툴바]]\n\n화면 상단의 제목 영역과 본문에 내용을 입력합니다. 예를 들어 **Hello EveryOne**처럼 입력하면 학생 화면에 큰 글씨로 표시됩니다.\n\n입력 가능한 글자 수는 최대 **10,000자**이며, 화면 오른쪽 아래에 현재 글자 수가 표시됩니다. 하단 툴바에서는 글자 크기와 기본 서식을 조정할 수 있습니다.\n\n- **글자 크기** : 드롭다운에서 글자 크기를 선택합니다.\n\n- **B / I / U** : 굵게, 기울임, 밑줄을 적용합니다.\n\n- **A 아이콘** : 글자 크기를 키우거나 줄입니다.\n\n- **+** : 새 메모를 추가합니다.",
            "[[image:toolkit-annotate/02.png|Annotate 배경색 선택 화면]]\n\n채우기 아이콘을 클릭하면 **Color** 선택기가 열립니다. 색상 영역에서 원하는 색을 고르거나, 하단의 색상값 입력 영역에서 색을 직접 지정할 수 있습니다.\n\n배경색을 바꾸면 메모 화면 전체의 분위기가 달라지므로, 주의 환기용 문구나 활동 안내 문구를 더 눈에 띄게 만들 때 활용할 수 있습니다.",
            "[[image:toolkit-annotate/04.png|Annotation List 저장 목록 화면]]\n\n하단의 저장 관련 버튼으로 메모를 보관하거나 다시 불러올 수 있습니다.\n\n- **Auto-Save** : 켜두면 작성 내용이 자동으로 저장됩니다.\n\n- **Save** : 현재 메모를 저장합니다.\n\n- **Print** : 메모를 인쇄합니다.\n\n- **List** : 저장된 메모 목록인 **Annotation List**를 엽니다. 목록에는 저장된 메모 수, 작성 시각, 메모 제목이 표시됩니다.\n\n저장된 메모는 최대 **50개**까지 관리할 수 있습니다. 개별 항목의 **X** 버튼으로 하나씩 삭제하거나, **Delete All**로 전체 메모를 삭제할 수 있습니다."
      ]
});
// END TOOL KIT ANNOTATE CLEANUP PATCH


// BEGIN TOOL KIT SHARE WEB LINK CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-share-web-link": [
            "[[image:toolkit-share-web-link/01.png|Share Web Link 초기 화면]]\n\n수업 화면 하단의 도구 모음에서 **Share Web Link** 아이콘을 클릭하면 링크 전송 창이 열립니다. 이 도구는 수업 중 참고 자료, 외부 웹사이트, 읽기 자료 링크를 학생 화면으로 바로 보내야 할 때 사용합니다.\n\n상단에는 **Enter link**와 **Favorite link** 두 탭이 있습니다. 학생 화면에서 링크가 새 창으로 열리려면 최초 1회 팝업 허용이 필요하므로, 안내 문구가 보이면 학생 페이지에서 팝업을 허용하도록 안내하세요.",
            "[[image:toolkit-share-web-link/02.png|Share Web Link 직접 링크 입력 화면]]\n\n**Enter link** 탭에서는 입력창에 공유할 URL을 붙여넣거나 직접 입력합니다. 링크가 입력되면 하단의 **Send Link** 버튼이 활성화됩니다.\n\n**Send Link**를 클릭하면 입력한 링크가 학생 화면으로 전송됩니다. 수업 중 한 번만 사용할 자료나 즉석에서 공유해야 하는 웹페이지는 Enter link 방식으로 보내면 빠릅니다.",
            "[[image:toolkit-share-web-link/06.png|Favorite link 빈 상태와 Add Link 버튼]]\n\n[[image:toolkit-share-web-link/07.png|Favorite link 이름과 URL 입력 화면]]\n\n[[image:toolkit-share-web-link/08.png|Favorite link 저장 목록 화면]]\n\n자주 사용하는 링크는 **Favorite link** 탭에 저장해두면 반복해서 빠르게 보낼 수 있습니다.\n\n- **Add Link**를 클릭하면 링크 이름과 URL을 입력하는 행이 나타납니다.\n\n- 이름에는 학생이나 교사가 알아보기 쉬운 제목을 입력하고, URL에는 실제로 열 웹 주소를 입력합니다.\n\n- 입력 후 확인 버튼을 누르면 즐겨찾기 목록에 저장됩니다.\n\n- 저장된 링크는 연필 아이콘으로 수정하거나 **X** 버튼으로 삭제할 수 있습니다.\n\n목록에서 필요한 링크를 선택한 뒤 **Send Link**로 학생에게 전송합니다.",
            "[[image:toolkit-share-web-link/09.png|학생 화면에 표시된 링크 카드]]\n\n링크가 전송되면 학생 화면에는 **Just a moment...** 문구와 함께 링크 카드가 표시됩니다. 학생은 **Open Link** 버튼을 눌러 해당 웹페이지를 열 수 있습니다.\n\n수업 활동이 아직 시작되지 않은 상태라면 학생 화면에 **Please wait until your teacher starts the activity.** 안내가 함께 표시될 수 있습니다. 이 경우 학생은 교사가 활동을 시작할 때까지 대기한 뒤 링크를 열면 됩니다."
      ]
});
// END TOOL KIT SHARE WEB LINK CLEANUP PATCH


// BEGIN TOOL KIT QUICK QUIZ CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-quick-quiz": [
            "[[image:toolkit-quick-quiz/01.png|Quick Quiz 초기 작성 화면]]\n\n수업 화면 하단의 도구 모음에서 **Quick Quiz** 아이콘을 클릭하면 즉석 퀴즈 작성 창이 열립니다. Quick Quiz는 수업 중 학생 이해도를 빠르게 확인하거나, 활동 중간에 짧은 확인 문제를 낼 때 사용하는 도구입니다.\n\n상단에서 **Multiple Choice** 또는 **Short Answer** 유형을 선택할 수 있습니다. 기본 화면은 Multiple Choice 작성 상태로 열리며, 우측 패널에서는 이후 학생 응답 결과와 Live Q&A를 확인할 수 있습니다.",
            "[[image:toolkit-quick-quiz/02.png|Quick Quiz 객관식 작성 완료 화면]]\n\n**Multiple Choice**에서는 상단 입력란에 질문을 입력하고, 아래 보기 입력란에 선택지를 작성합니다. 각 보기 왼쪽의 체크박스를 선택하면 해당 보기가 정답으로 지정됩니다.\n\n- **+** 버튼으로 보기를 추가할 수 있습니다.\n\n- 보기는 최대 **5개**까지 설정할 수 있습니다.\n\n- 각 보기 오른쪽의 **X** 버튼으로 불필요한 보기를 삭제할 수 있습니다.\n\n질문, 보기, 정답을 모두 준비한 뒤 **Display** 버튼을 클릭하면 학생 화면에 퀴즈가 표시됩니다.",
            "[[image:toolkit-quick-quiz/04.png|Quick Quiz 빈 보기 오류 안내]]\n\n보기를 추가해두고 내용을 비워둔 상태에서 **Display**를 클릭하면 **Some options are empty.** 안내가 표시됩니다.\n\n이 경우 빈 보기를 모두 채우거나, 사용하지 않을 보기는 **X** 버튼으로 삭제한 뒤 다시 Display를 클릭하세요. 학생에게 출제되기 전 단계에서 오류가 표시되므로, 빈 보기나 정답 누락 여부를 먼저 확인하는 것이 좋습니다.",
            "[[image:toolkit-quick-quiz/06.png|학생 화면에 표시된 Quick Quiz]]\n\n퀴즈가 출제되면 학생 화면에는 질문과 번호가 매겨진 보기가 표시됩니다. 객관식 퀴즈에서는 학생이 보기 중 하나를 선택해 응답할 수 있습니다.\n\n교사 화면에는 **Show Answer** 버튼이 표시되며, 학생 응답을 받은 뒤 정답을 공개할 수 있습니다.",
            "[[image:toolkit-quick-quiz/08.png|Quick Quiz 정답 공개 화면]]\n\n**Show Answer**를 클릭하면 정답으로 지정한 보기가 강조 표시되고, 화면에 축하 효과가 나타납니다. 이 상태에서 학생들은 정답을 바로 확인할 수 있습니다.\n\n우측 패널의 **Activity Results** 탭에서는 학생 응답 결과를 확인하고, **Live Q&A** 탭에서는 실시간 질문을 확인할 수 있습니다."
      ]
});
// END TOOL KIT QUICK QUIZ CLEANUP PATCH



// BEGIN TOOL KIT QUICK POLL CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-quick-poll": [
                "[[image:toolkit-quick-poll/01.png|Quick Poll 기본 실행 화면]]\n\n수업 화면 하단의 도구 모음에서 **Quick Poll** 아이콘을 클릭하면 즉석 투표 창이 열립니다. Quick Poll은 수업 중 짧은 질문을 던지고, 학생들의 응답 수를 바로 집계할 때 사용합니다.\n\n상단 탭에서 **Agree/Disagree**, **Traffic Light**, **Opinion Scale**, **Vote** 중 사용할 형식을 선택합니다. 질문은 상단의 **Enter Directly** 영역에 입력합니다.",
                "Quick Poll은 각 선택지 옆의 **− / +** 버튼으로 응답 수를 조정하는 방식입니다. 학생이 손을 들거나 구두로 답한 결과를 교사가 수업 화면에서 즉시 기록할 때 적합합니다.\n\n응답을 잘못 집계한 경우에는 **−** 버튼으로 수를 줄이고, 추가 응답이 있으면 **+** 버튼으로 수를 늘립니다. 형식을 바꾸면 같은 질문을 다른 응답 방식으로도 빠르게 확인할 수 있습니다.",
                "Quick Poll에서 사용할 수 있는 형식은 네 가지입니다.\n\n- **Agree/Disagree** : 찬성/반대처럼 두 가지 선택지로 빠르게 의견을 확인합니다.\n\n- **Traffic Light** : Agree, Neutral, Disagree 세 단계로 응답을 나눕니다.\n\n- **Opinion Scale** : 5단계 척도로 의견의 강도를 확인합니다.\n\n- **Vote** : 교사가 직접 입력한 보기 중에서 선택하도록 구성합니다.",
                "[[image:toolkit-quick-poll/06.png|Agree Disagree 응답 집계 화면]]\n\n**Agree/Disagree**는 찬성과 반대처럼 명확히 나뉘는 질문에 사용합니다. 질문을 입력한 뒤 학생 응답에 맞춰 **Agree** 또는 **Disagree**의 수를 조정합니다.\n\n토론 전 의견 분포를 빠르게 확인하거나, 수업 중 짧은 찬반 질문을 던질 때 활용하면 좋습니다.",
                "[[image:toolkit-quick-poll/07.png|Traffic Light 질문 입력 화면]]\n\n**Traffic Light**는 학생 응답을 세 단계로 나눠 확인할 때 사용합니다. 초록색 **Agree**, 노란색 **Neutral**, 빨간색 **Disagree**로 표시되기 때문에 학생들도 응답 의미를 직관적으로 이해할 수 있습니다.\n\n찬반이 완전히 갈리지 않는 질문이나, 이해도·자신감·선호도처럼 중간 응답이 필요한 상황에 적합합니다.",
                "[[image:toolkit-quick-poll/12.png|Opinion Scale 응답 집계 화면]]\n\n**Opinion Scale**은 5단계 척도로 의견의 강도를 집계합니다. 단순히 찬성/반대를 나누는 것보다, 얼마나 강하게 동의하거나 반대하는지를 확인하고 싶을 때 사용합니다.\n\n수업 후 설문, 토론 주제에 대한 입장 확인, 활동 만족도 확인처럼 응답의 정도가 중요한 질문에 적합합니다.",
                "[[image:toolkit-quick-poll/13.png|Vote 보기 입력 화면]]\n\n**Vote**는 교사가 직접 보기를 입력해 투표를 구성하는 형식입니다. 보기 입력란에 선택지를 작성하고, 필요한 경우 **+** 버튼으로 보기를 추가합니다.\n\n수업 주제 선택, 활동 방식 결정, 학생 의견 수렴처럼 정해진 보기 중 하나를 고르게 할 때 사용합니다. 사용하지 않는 보기는 삭제하고, 실제로 투표할 보기만 남겨두면 화면이 더 명확해집니다."
      ]
});
// END TOOL KIT QUICK POLL CLEANUP PATCH



// BEGIN TOOL KIT DIGITAL TIMER CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-digital-timer": [
                "[[image:toolkit-digital-timer/01.png|Digital Timer 기본 실행 화면]]\n\n수업 화면 하단의 도구 모음에서 **DigitalTimer** 아이콘을 클릭하면 디지털 타이머가 열립니다. 화면 중앙에는 시간이 크게 표시되고, 아래에는 빠르게 시간을 설정할 수 있는 프리셋 버튼이 함께 표시됩니다.\n\n기본 상태에서는 시간이 **00:00**으로 표시됩니다. 이 상태에서 사용할 시간을 먼저 선택한 뒤 **Start**를 클릭해 타이머를 시작합니다.",
                "[[image:toolkit-digital-timer/02.png|Digital Timer 10분 프리셋 선택 화면]]\n\n**30s / 1m / 5m / 10m** 프리셋 버튼으로 시간을 설정합니다. 예를 들어 **10m**을 선택하면 화면의 시간이 **10:00**으로 바뀌고, 선택한 프리셋이 강조 표시됩니다.\n\n모둠 활동, 발표 준비, 짧은 문제 풀이처럼 제한 시간이 정해진 활동에서는 활동을 시작하기 전에 시간을 먼저 맞춰두세요. 시간을 다시 고르고 싶다면 다른 프리셋을 선택하거나, 새로고침 아이콘으로 초기화할 수 있습니다.",
                "[[image:toolkit-digital-timer/04.png|Digital Timer 카운트다운 진행 화면]]\n\n**Start**를 클릭하면 카운트다운이 시작되고 버튼이 **Pause**로 바뀝니다. 진행 중에는 남은 시간이 초 단위로 줄어들며, 학생들이 활동 종료 시점을 쉽게 확인할 수 있습니다.\n\n- **Pause** : 타이머를 일시정지합니다.\n\n- **새로고침 아이콘** : 설정한 시간을 초기화합니다.\n\n- **X** : 타이머를 닫습니다.\n\n진행 중 설명이 필요하거나 활동을 잠시 멈춰야 할 때는 Pause로 멈춘 뒤 다시 이어서 사용할 수 있습니다."
      ]
});
// END TOOL KIT DIGITAL TIMER CLEANUP PATCH



// BEGIN TOOL KIT HOURGLASS CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-hourglass": [
                "[[image:toolkit-hourglass/01.png|Hourglass 기본 실행 화면]]\n\n수업 화면 하단의 도구 모음에서 **Hourglass** 아이콘을 클릭하면 모래시계 타이머가 열립니다. 화면 왼쪽에는 모래시계 그래픽이 표시되고, 오른쪽에는 남은 시간이 숫자로 크게 표시됩니다.\n\nHourglass는 숫자 타이머와 함께 모래가 떨어지는 시각적 표현을 보여주기 때문에, 학생들이 남은 시간을 직관적으로 확인해야 하는 활동에 적합합니다.",
                "**30s / 1m / 5m / 10m** 프리셋 버튼으로 시간을 설정합니다. 시간을 선택하면 화면의 숫자가 해당 시간으로 바뀌고, **Start** 버튼을 클릭하면 카운트다운이 시작됩니다.\n\n짧은 문제 풀이, 발표 준비, 모둠 토의처럼 제한 시간이 분명한 활동에서 사용하면 좋습니다. 시간을 다시 설정하고 싶다면 시작 전 다른 프리셋을 선택하거나, 새로고침 아이콘으로 초기화합니다.",
                "[[image:toolkit-hourglass/02.png|Hourglass 카운트다운 진행 화면]]\n\n타이머가 시작되면 남은 시간이 줄어드는 동시에 모래시계 안의 모래가 아래로 이동합니다. 숫자와 시각적 표시가 함께 보이므로, 학생들이 활동 종료까지 남은 시간을 쉽게 파악할 수 있습니다.\n\n- **Pause** : 타이머를 일시정지합니다.\n\n- **새로고침 아이콘** : 설정한 시간을 초기화합니다.\n\n- **X** : 타이머를 닫습니다.\n\n진행 중 설명을 추가해야 하거나 활동을 잠시 멈춰야 할 때는 Pause로 정지한 뒤 다시 이어서 사용할 수 있습니다."
      ]
});
// END TOOL KIT HOURGLASS CLEANUP PATCH



// BEGIN TOOL KIT PIE TIMER CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-pie-timer": [
                "[[image:toolkit-pie-timer/01.png|Pie Timer 기본 실행 화면]]\n\n수업 화면 하단의 도구 모음에서 **Pie Timer** 아이콘을 클릭하면 원형 타이머가 열립니다. 왼쪽에는 남은 시간을 부채꼴 형태로 보여주는 다이얼이 있고, 아래에는 시간이 숫자로 크게 표시됩니다. 오른쪽 패널에서는 모드 선택, 시간 설정, 시작과 초기화를 조작합니다.\n\n숫자 시간 영역은 직접 입력도 가능합니다. 마우스를 올리면 **Can enter numbers directly.** 안내가 표시되므로, 프리셋에 없는 시간을 사용해야 할 때는 숫자 영역을 클릭해 시간을 직접 입력합니다.",
                "[[image:toolkit-pie-timer/02.png|Pie Timer 20분 모드 선택 화면]]\n\n**Choose Mode**에서는 다이얼의 최대 범위를 **20m** 또는 **60m** 중에서 선택합니다.\n\n- **20m** : 최대 20분 범위로 표시됩니다. 짧은 활동, 문제 풀이, 발표 준비처럼 20분 이하의 활동에 적합합니다.\n\n- **60m** : 최대 60분 범위로 표시됩니다. 긴 토론, 프로젝트 활동, 수업 전체 시간 관리에 적합합니다.\n\n모드를 바꾸면 왼쪽 원형 다이얼의 눈금과 부채꼴 표시 기준이 함께 바뀝니다. 활동 시간에 맞는 범위를 먼저 선택한 뒤 시간을 설정하세요.",
                "[[image:toolkit-pie-timer/03.png|Pie Timer 5분 프리셋 선택 화면]]\n\n**Set Time**에서는 **30s / 1m / 5m / 10m** 프리셋으로 시간을 빠르게 설정할 수 있습니다. 선택한 프리셋은 파란색으로 강조되고, 왼쪽 다이얼과 하단 숫자 시간이 함께 변경됩니다.\n\n프리셋으로 충분하지 않은 경우에는 다이얼을 조작하거나 숫자 시간 영역을 직접 입력해 원하는 시간을 맞춥니다. 시간을 설정한 뒤 **Start**를 클릭하면 카운트다운이 시작됩니다.",
                "[[image:toolkit-pie-timer/04.png|Pie Timer 카운트다운 진행 화면]]\n\n**Start**를 클릭하면 타이머가 시작되고 버튼이 **Pause**로 바뀝니다. 카운트다운 중에는 오른쪽의 시간 설정 버튼이 비활성화되고, 왼쪽 다이얼의 부채꼴 영역이 남은 시간에 맞춰 줄어듭니다.\n\n- **Pause** : 타이머를 일시정지합니다.\n\n- **Reset** : 설정한 시간을 초기화합니다.\n\n- **X** : Pie Timer 창을 닫습니다.\n\n진행 중 활동을 잠시 멈춰야 하거나 추가 설명이 필요한 경우 Pause로 멈춘 뒤 다시 이어서 사용할 수 있습니다."
      ]
});
// END TOOL KIT PIE TIMER CLEANUP PATCH



// BEGIN TOOL KIT FIRST TO BUZZ CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-first-to-buzz": [
                "수업 화면 하단의 도구 모음에서 **First to Buzz** 아이콘을 클릭하면 순발력 게임 화면이 열립니다. First to Buzz는 학생들이 버튼을 누르는 속도를 겨루는 활동으로, 가장 빠르게 반응한 학생부터 순위가 매겨집니다.\n\n정답을 쓰는 퀴즈가 아니라 반응 속도를 확인하는 게임이므로, 수업 분위기를 전환하거나 짧은 집중 활동을 시작할 때 사용하면 좋습니다.",
                "[[image:toolkit-first-to-buzz/01.png|First to Buzz 준비 화면]]\n\n처음 열리면 **Get ready!** 화면이 표시됩니다. 화면에는 큰 버튼 이미지와 함께 **Press the button only once. The faster you press, the higher your rank.** 안내가 표시됩니다.\n\n학생은 버튼을 한 번만 눌러야 하며, 더 빠르게 누를수록 높은 순위에 올라갑니다. 안내를 확인한 뒤 교사가 **Start**를 클릭하면 참여가 시작됩니다.",
                "[[image:toolkit-first-to-buzz/02.png|First to Buzz 학생 참여 화면]]\n\n게임이 시작되면 학생 화면에 **Click!** 문구와 큰 버튼이 표시됩니다. 학생들은 버튼이 나타난 뒤 가능한 한 빠르게 한 번 누릅니다.\n\n버튼을 누르는 시점이 순위에 반영되므로, 시작 전에 학생들에게 “한 번만 누르기” 규칙을 먼저 안내해두는 것이 좋습니다.",
                "[[image:toolkit-first-to-buzz/03.png|First to Buzz 결과 화면]]\n\n학생들이 버튼을 누르면 반응 속도에 따라 순위가 시상대 형태로 표시됩니다. 1위, 2위, 3위 학생 이름이 화면에 강조되어 보이며, 하단의 **View all**을 클릭하면 전체 순위를 확인할 수 있습니다.\n\n활동을 다시 진행하려면 **Reset**을 클릭해 결과를 초기화합니다. 같은 학생들이 반복해서 참여하는 경우, Reset 후 다시 Start를 눌러 새 라운드를 시작합니다."
      ]
});
// END TOOL KIT FIRST TO BUZZ CLEANUP PATCH



// BEGIN TOOL KIT PRESENTATION LOTTERY CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-presentation-lottery": [
                "[[image:toolkit-presentation-lottery/01.png|Presentation Lottery 기본 설정 화면]]\n\n수업 화면 하단의 도구 모음에서 **Presentation Lottery** 아이콘을 클릭하면 추첨 설정 화면이 열립니다. Presentation Lottery는 입력한 후보 목록이나 학급 학생 명단에서 무작위로 발표자 또는 당첨자를 뽑는 도구입니다.\n\n처음 화면에서는 뽑을 개수와 전체 후보 수를 정하고, 후보 이름을 직접 입력할 수 있습니다. 추첨을 시작하려면 먼저 후보 목록을 준비한 뒤 **Set**을 클릭해야 합니다.",
                "[[image:toolkit-presentation-lottery/02.png|Presentation Lottery 후보 목록 설정 화면]]\n\n[[image:toolkit-presentation-lottery/13.png|Presentation Lottery 학급 선택 화면]]\n\n상단의 **Pick [N] of [M]** 영역에서 전체 후보 수(M) 중 몇 명(N)을 뽑을지 설정합니다. **− / +** 버튼으로 숫자를 조정할 수 있으며, 후보는 최대 **50개**까지 설정할 수 있습니다.\n\n후보 목록은 두 가지 방식으로 준비합니다.\n\n- 직접 입력 : 각 입력칸에 후보 이름을 직접 작성합니다.\n\n- 학급 명단 불러오기 : **Load Class Student**를 클릭한 뒤 **Select Class** 창에서 학급을 선택합니다. 선택한 학급의 학생 명단이 후보 목록으로 채워집니다.\n\n준비가 끝나면 **Set**을 클릭해 추첨 화면으로 이동합니다.",
                "[[image:toolkit-presentation-lottery/14.png|Presentation Lottery 추첨 대기 화면]]\n\n**Set**을 클릭하면 후보 수에 맞춰 티켓이 한 줄로 펼쳐집니다. 상단에는 현재 설정된 추첨 조건이 **Pick 1 of 10**처럼 표시됩니다.\n\n이 화면에서 **Draw**를 클릭하면 설정한 개수만큼 티켓이 무작위로 선택됩니다. 추첨 진행 중 티켓이 움직이는 중간 화면은 결과 확인에 필수적인 정보가 아니므로, 매뉴얼에서는 추첨 전 대기 화면과 결과 공개 화면을 중심으로 확인합니다.",
                "[[image:toolkit-presentation-lottery/21.png|Presentation Lottery 스크래치 티켓 화면]]\n\n추첨이 완료되면 선택된 티켓이 **Scratch here!** 상태로 표시됩니다. 교사는 티켓을 하나씩 긁어 결과를 공개하거나, **Open at Once**를 클릭해 선택된 티켓을 한 번에 모두 공개할 수 있습니다.\n\n여러 명을 뽑도록 설정한 경우에는 선택된 티켓이 여러 장 표시됩니다. 학생들의 기대감을 살리고 싶을 때는 하나씩 공개하고, 빠르게 결과만 확인해야 할 때는 Open at Once를 사용하면 됩니다.",
                "[[image:toolkit-presentation-lottery/22.png|Presentation Lottery 결과 공개 화면]]\n\n결과가 공개되면 선택된 이름이 티켓 안에 표시되고, 배경 효과가 함께 나타납니다. 여러 명을 뽑은 경우에는 선택된 학생들이 각각의 티켓으로 나란히 표시됩니다.\n\n- **View Results** : 추첨 결과를 확인합니다.\n\n- **Reset** : 현재 추첨을 초기화하고 처음 설정 단계로 돌아갑니다.\n\n- **Redraw** : 같은 후보 구성으로 다시 추첨합니다.\n\n동일한 후보 목록으로 발표 순서를 다시 정하거나 추가 당첨자를 뽑아야 할 때는 Redraw를 사용하고, 후보 목록 자체를 바꿔야 할 때는 Reset으로 처음부터 다시 설정합니다."
      ]
});
// END TOOL KIT PRESENTATION LOTTERY CLEANUP PATCH



// BEGIN TOOL KIT CARD DRAW CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-card-draw": [
                "수업 화면 하단의 도구 모음에서 **Card Draw** 아이콘을 클릭하면 카드 뽑기 설정 화면이 열립니다. Card Draw는 후보 이름이나 항목을 카드로 만든 뒤, 무작위로 한 장 또는 여러 장을 뽑는 도구입니다.\n\n발표자 선정, 순서 정하기, 모둠 대표 뽑기처럼 가볍게 무작위 선택이 필요한 상황에 사용할 수 있습니다.",
                "[[image:toolkit-card-draw/04.png|Card Draw 후보 목록 설정 화면]]\n\n상단의 **Pick [N] of [M]** 영역에서 전체 카드 수(M) 중 몇 장(N)을 뽑을지 설정합니다. **− / +** 버튼으로 뽑을 카드 수와 전체 카드 수를 조정할 수 있으며, 후보는 최대 **50개**까지 설정할 수 있습니다.\n\n각 입력칸에는 카드에 표시될 이름이나 항목을 직접 작성합니다. 저장된 학생 명단이 있다면 **Load Student List**로 불러올 수 있고, 설정이 끝나면 **Set**을 클릭해 카드 뽑기 화면으로 이동합니다.",
                "[[image:toolkit-card-draw/05.png|Card Draw 카드 뽑기 대기 화면]]\n\n**Set**을 클릭하면 입력한 후보 수만큼 카드가 뒤집힌 상태로 펼쳐집니다. 상단에는 현재 설정된 조건이 **Pick 3 of 10**처럼 표시됩니다.\n\n이 화면에서 **Draw**를 클릭하면 설정한 개수만큼 카드가 무작위로 선택됩니다. 카드가 섞이거나 움직이는 중간 화면은 결과 확인에 필수적인 정보가 아니므로, 매뉴얼에서는 뽑기 전 대기 화면과 결과 화면을 중심으로 확인합니다.",
                "[[image:toolkit-card-draw/08.png|Card Draw 결과 확인 화면]]\n\n뽑기가 완료되면 선택된 카드가 앞면으로 공개되고, 카드 안에 후보 이름이 표시됩니다. 여러 장을 뽑도록 설정한 경우에는 선택된 카드가 나란히 표시됩니다.\n\n- **Redraw** : 같은 후보 구성으로 다시 뽑습니다.\n\n- **Reset** : 현재 설정을 초기화하고 처음 설정 화면으로 돌아갑니다.\n\n같은 후보 목록으로 한 번 더 뽑아야 하면 Redraw를 사용하고, 후보 수나 이름을 바꿔야 할 때는 Reset으로 다시 설정합니다."
      ]
});
// END TOOL KIT CARD DRAW CLEANUP PATCH


// BEGIN TOOL KIT LUCKY LADDER CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-lucky-ladder": [
        "[[image:toolkit-lucky-ladder/01.png|Lucky Ladder 사다리 개수 설정 화면]]\n\n수업 화면 하단의 도구 모음에서 **Lucky Ladder** 아이콘을 클릭하면 사다리 개수 설정 화면이 열립니다. Lucky Ladder는 시작 항목과 도착 항목을 사다리로 연결해 무작위 결과를 확인하는 도구입니다.\n\n먼저 **− / +** 버튼으로 사다리 가닥 수를 정합니다. 화면 안내처럼 최대 **8개**까지 설정할 수 있으며, 개수를 정한 뒤 **Set**을 클릭합니다.",
        "사다리 개수는 시작 항목과 도착 항목의 개수를 함께 결정합니다. 예를 들어 5개로 설정하면 시작점 5개와 도착점 5개를 입력하게 됩니다.\n\n학생 이름과 보상, 발표 순서와 발표 주제, 모둠과 역할처럼 서로 연결할 항목 수가 같아야 하는 활동에 사용하면 좋습니다.",
        "[[image:toolkit-lucky-ladder/04.png|Lucky Ladder 시작점과 도착점 입력 화면]]\n\n**Start Point**에는 출발 항목을, **End Point**에는 연결될 결과 항목을 입력합니다. 예를 들어 Start Point에는 학생 이름을 넣고, End Point에는 보상, 역할, 발표 주제 같은 결과를 넣을 수 있습니다.\n\n화면 상단의 안내처럼 사다리의 복잡도는 무작위로 생성됩니다. 입력을 마치면 **Start Draw**를 클릭해 사다리 결과 화면으로 이동합니다. 이전 단계로 돌아가 개수를 다시 정해야 한다면 **Back**을 클릭합니다.",
        "[[image:toolkit-lucky-ladder/05.png|Lucky Ladder 결과 공개 전 화면]]\n\n[[image:toolkit-lucky-ladder/06.png|Lucky Ladder 결과 공개 화면]]\n\n[[image:toolkit-lucky-ladder/07.png|Lucky Ladder 목록형 결과 화면]]\n\n사다리가 생성되면 시작 항목은 위쪽에, 도착 결과는 아래쪽에 표시됩니다. 처음에는 결과 카드가 **?** 상태로 가려져 있어, 학생들과 함께 하나씩 결과를 확인할 수 있습니다.\n\n- **Open at Once** : 모든 결과를 한 번에 공개합니다.\n\n- **View as list** : 시작 항목과 도착 항목의 연결 결과를 목록 형태로 확인합니다.\n\n- **Back** : 목록 화면에서 사다리 화면으로 돌아갑니다.\n\n- **Reset** : 현재 사다리 결과를 초기화합니다.\n\n결과를 학생들과 함께 천천히 확인하고 싶다면 가려진 카드를 하나씩 열고, 빠르게 전체 매칭을 공유해야 할 때는 Open at Once 또는 View as list를 사용합니다."
      ]
});
// END TOOL KIT LUCKY LADDER CLEANUP PATCH


// BEGIN TOOL KIT GROUP MAKER CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-group-maker": [
        "[[image:toolkit-group-maker/01.png|Group Maker 기본 실행 화면]]\n\n수업 화면 하단의 도구 모음에서 **Group Maker** 아이콘을 클릭하면 그룹 만들기 창이 열립니다. Group Maker는 학생 이름을 입력하거나 학급 명단을 불러온 뒤, 지정한 그룹 수에 맞춰 학생을 무작위로 나누는 도구입니다.\n\n처음 화면에는 기본값으로 **Divide 2 people into 2 Groups**가 표시됩니다. 상단의 숫자 영역에서 전체 인원과 그룹 수를 먼저 정한 뒤, 아래 입력 영역에 학생 이름을 준비합니다.",
        "[[image:toolkit-group-maker/04.png|Group Maker 인원과 그룹 수 설정 화면]]\n\n상단의 **Divide [N] people into [M] Groups** 영역에서 전체 인원 수와 나눌 그룹 수를 설정합니다. 각 숫자 옆의 **− / +** 버튼으로 값을 조절할 수 있으며, 화면 안내처럼 학생은 최대 **50명**까지 추가할 수 있습니다.\n\n인원 수를 늘리면 아래 입력 영역에 **Student name** 입력칸이 그 수만큼 생성됩니다. 예를 들어 10명으로 설정하면 10개의 이름 입력칸이 표시되고, 그룹 수를 2로 설정하면 결과 화면에서 두 그룹으로 나뉩니다.",
        "[[image:toolkit-group-maker/05.png|Group Maker 학급 선택 화면]]\n\n[[image:toolkit-group-maker/06.png|Group Maker 학생 이름 입력 화면]]\n\n학생 명단은 직접 입력하거나 저장된 명단을 불러와 준비할 수 있습니다. 이름을 직접 입력하려면 각 **Student name** 칸에 학생 이름을 작성합니다.\n\n- **Load Student List** : 저장된 학생 명단을 불러옵니다.\n\n- **Load Class Student** : **Select Class** 창을 열어 학급을 선택하고, 해당 학급의 학생 명단을 한 번에 불러옵니다.\n\n명단이 채워졌는지 확인한 뒤 **Set**을 클릭하면 그룹 배정 결과가 생성됩니다.",
        "[[image:toolkit-group-maker/07.png|Group Maker 그룹 배정 결과 화면]]\n\n[[image:toolkit-group-maker/09.png|Group Maker 다시 섞은 결과 화면]]\n\n**Set**을 클릭하면 학생들이 설정한 그룹 수에 맞춰 무작위로 배정됩니다. 각 그룹은 **Group1, Group2**처럼 표시되고, 그룹 안에는 배정된 학생 이름이 카드 형태로 나열됩니다.\n\n- 그룹 제목 오른쪽의 편집 아이콘으로 그룹 이름을 변경할 수 있습니다.\n\n- 학생 항목 왼쪽의 드래그 핸들로 학생 순서를 바꾸거나 다른 그룹으로 옮길 수 있습니다.\n\n- 학생 항목 오른쪽의 **X** 버튼으로 해당 학생을 제외할 수 있습니다.\n\n- **Reshuffle** : 같은 학생 명단과 그룹 수를 유지한 채 그룹 구성을 다시 무작위로 섞습니다.\n\n- **Reset** : 현재 설정을 초기화하고 처음 설정 화면으로 돌아갑니다.\n\n그룹 구성이 한 번에 마음에 들지 않으면 Reshuffle로 다시 섞고, 학생 수나 그룹 수를 바꿔야 할 때는 Reset으로 처음부터 다시 설정합니다."
      ]
});
// END TOOL KIT GROUP MAKER CLEANUP PATCH


// BEGIN TOOL KIT RULER CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-ruler": [
        "[[image:toolkit-ruler/01.png|Ruler 기본 실행 화면]]\n\n수업 화면 하단의 도구 모음에서 **Ruler** 아이콘을 클릭하면 화면 위에 디지털 자가 표시됩니다. Ruler는 길이를 비교하거나, 선을 그릴 때 직선의 기준으로 사용할 수 있는 Math Tools 도구입니다.\n\n화면에는 **0부터 30까지의 눈금**이 표시된 자가 열리고, 가운데에는 회전 버튼, 오른쪽에는 닫기 버튼이 함께 보입니다.",
        "자 위를 드래그하면 원하는 위치로 이동할 수 있습니다. 화면의 도형, 선, 이미지 위에 자를 올려 길이를 비교하거나 기준선을 맞출 때 사용합니다.\n\n- **드래그** : 자를 원하는 위치로 이동합니다.\n\n- **가운데 회전 버튼** : 자의 각도를 자유롭게 조절합니다. 기울어진 선이나 도형의 방향에 맞춰 자를 돌릴 때 사용합니다.\n\n- **X 버튼** : Ruler 도구를 닫습니다.\n\n수업 중에는 자를 켜둔 상태로 화면 위에서 위치와 각도를 조정하며 설명할 수 있고, 다른 Math Tools가 필요하면 하단 도구 모음에서 삼각자나 각도기를 함께 사용할 수 있습니다."
      ]
});
// END TOOL KIT RULER CLEANUP PATCH


// BEGIN TOOL KIT TRIANGLE CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-triangle": [
        "[[image:toolkit-triangle/01.png|Triangle 기본 실행 화면]]\n\n수업 화면 하단의 도구 모음에서 **Triangle** 아이콘을 클릭하면 화면 위에 디지털 직각삼각자가 표시됩니다. Triangle은 직각을 기준으로 선을 맞추거나, 도형의 기울기와 각도를 설명할 때 사용할 수 있는 Math Tools 도구입니다.\n\n화면에는 **0부터 10까지의 눈금**이 표시된 직각삼각자가 열리고, 가운데에는 회전 버튼, 오른쪽에는 닫기 버튼이 함께 보입니다. 처음 실행하면 삼각자의 두 직각 변을 기준으로 수직선과 수평선을 맞춰 설명하기 좋습니다.",
        "[[image:toolkit-triangle/02.png|Triangle 회전 조작 화면]]\n\n삼각자는 화면 위에서 위치와 각도를 조정하며 사용할 수 있습니다. 직선, 도형, 이미지의 모서리에 삼각자를 맞춰 두면 직각 여부나 기울어진 선의 방향을 설명하기 쉽습니다.\n\n- **드래그** : 삼각자를 원하는 위치로 이동합니다.\n\n- **가운데 회전 버튼** : 삼각자의 각도를 돌려 기울어진 선이나 도형의 방향에 맞춥니다.\n\n- **X 버튼** : Triangle 도구를 닫습니다.\n\n수업 중에는 삼각자를 켜둔 상태로 화면 위 요소에 맞춰 이동하거나 회전하면서, 직각, 평행선, 기울어진 변을 설명하는 데 활용할 수 있습니다."
      ]
});
// END TOOL KIT TRIANGLE CLEANUP PATCH


// BEGIN TOOL KIT PROTRACTOR CLEANUP PATCH
Object.assign(articleBodies, {
      "toolkit-protractor": [
        "[[image:toolkit-protractor/02.png|Protractor 기본 실행 화면]]\n\n수업 화면 하단의 도구 모음에서 **Protractor** 아이콘을 클릭하면 화면 위에 디지털 각도기가 표시됩니다. Protractor는 선이나 도형의 각도를 설명하거나, 화면 위 요소에 맞춰 각도를 읽을 때 사용하는 Math Tools 도구입니다.\n\n화면에는 **0°부터 180°까지의 눈금**이 표시된 반원형 각도기가 열립니다. 바깥쪽과 안쪽에 서로 반대 방향으로 읽는 눈금이 함께 표시되어 있어, 측정하려는 선의 방향에 맞는 눈금을 선택해 읽을 수 있습니다.",
        "각도기를 사용할 때는 기준점과 기준선을 먼저 맞춘 뒤 각도를 읽습니다. 각도기의 중심을 각의 꼭짓점에 맞추고, 한 변을 0° 기준선에 맞춘 다음 다른 변이 지나가는 눈금을 확인합니다.\n\n- **드래그** : 각도기를 원하는 위치로 이동합니다.\n\n- **가운데 회전 버튼** : 각도기를 돌려 기준선을 측정할 선이나 도형의 방향에 맞춥니다.\n\n- **X 버튼** : Protractor 도구를 닫습니다.\n\n수업 중에는 각도기를 켜둔 상태로 화면 위 도형에 맞춰 이동하거나 회전하면서, 예각, 직각, 둔각처럼 각의 크기를 시각적으로 설명할 수 있습니다."
      ]
});
// END TOOL KIT PROTRACTOR CLEANUP PATCH

const articleIntros = {
  'edit-lesson-create': 'Lesson은 LumiTeach에서 수업을 구성하는 콘텐츠의 최소 단위입니다. 새로운 수업을 시작하기 전에 Lesson을 미리 만들어두면 수업 흐름을 사전에 구성할 수 있어 편리합니다.\n\nLesson을 만드는 방법은 크게 두 가지입니다. **Home 화면에서 바로 생성하는 방법**과, **수업 중(Teaching 상태)에 생성하는 방법**입니다.',
  'edit-lesson-rename': 'Lesson 명은 수업을 구분하는 중요한 식별자입니다. 생성 시 기본값인 "Untitled Lesson"으로 저장되므로, 수업 내용을 잘 나타내는 이름으로 변경해두면 나중에 원하는 Lesson을 빠르게 찾을 수 있습니다.\n\nLesson 명을 변경하는 방법은 두 가지입니다.',
  'edit-lesson-add-activity': 'Activity는 Lesson을 구성하는 슬라이드 단위의 활동입니다. 하나의 Lesson 안에 여러 개의 Activity를 추가하여 수업 흐름을 구성할 수 있습니다.\n\nActivity를 추가하는 방법은 **+ Manual**과 **✦ AI Make** 두 가지입니다.',
  'edit-lesson-load-storage': 'My Storage에 저장된 다른 Lesson을 현재 작업 중인 Edit Lesson에 불러올 수 있습니다. Lesson 전체를 가져오거나, 원하는 Activity만 선택적으로 가져올 수 있어 수업 콘텐츠를 효율적으로 재활용할 수 있습니다.\n\nMy Storage에서 Lesson을 불러오는 방법은 두 가지입니다.',
  'edit-lesson-ai-make': '**✦ AI Make**는 파일을 업로드하면 AI가 자동으로 Activity를 생성해주는 기능입니다. 수업 자료(PDF, PPT 등)를 바탕으로 Full Lesson, Quiz, Discussion 등 원하는 유형의 Activity를 빠르게 만들 수 있어, 수업 준비 시간을 크게 단축할 수 있습니다.\n\n파일은 **로컬 파일(From File)**과 **Google Drive** 두 가지 방식으로 가져올 수 있습니다.',
  'edit-lesson-interaction': 'Interaction 모드는 학생이 실시간으로 응답에 참여할 수 있는 수업 모드입니다. 교사가 슬라이드를 진행하면 학생은 자신의 기기에서 Quiz, Discussion 등 Activity에 직접 참여할 수 있어, 쌍방향 수업을 효과적으로 진행할 수 있습니다.',
  'edit-lesson-presentation': 'Presentation 모드는 인터넷 연결 없이도 수업을 진행할 수 있는 오프라인 수업 모드입니다. 학생과의 실시간 상호작용 없이 교사가 Lesson 콘텐츠를 화면에 표시하며 수업을 이끌어가는 발표 중심 모드입니다.',
  'edit-lesson-undo-redo': 'Edit Lesson에서 작업 중 실수로 잘못 수정했거나 이전 상태로 되돌리고 싶을 때 **Undo / Redo** 기능을 활용할 수 있습니다.',
  'edit-lesson-preview': 'Preview는 실제 수업을 시작하기 전에 Lesson이 교사와 학생 화면에서 어떻게 보이는지 미리 확인할 수 있는 기능입니다. 응답 내용은 저장되지 않으므로 자유롭게 테스트할 수 있습니다.',
  'edit-lesson-background-color': 'Edit Lesson에서 각 Activity 슬라이드의 배경 색상을 원하는 색으로 자유롭게 변경할 수 있습니다. 선택한 색상은 슬라이드에 실시간으로 반영됩니다.'
};

Object.assign(articleBodies, {
  'intro-overview': [
    'LumiTeach는 수업 콘텐츠 제작, 과제 배포, 평가 운영, 실시간 수업 진행을 하나의 흐름으로 연결하는 서비스입니다. 교사는 Lesson을 만들고 Activity를 구성한 뒤 수업 목적에 맞게 학생에게 제공합니다.',
    '기본 구조는 Lesson과 Activity를 중심으로 이해하면 됩니다. Lesson은 수업의 틀이고, Activity는 학생이 실제로 수행하는 문제 풀이, 의견 작성, 참여 활동입니다.',
    '처음에는 Lesson을 만들고 Activity를 추가한 뒤 Assignment나 Teaching Mode로 활용하는 흐름을 따라가세요. 전체 구조가 익숙해지면 Assessment와 Results & Reports까지 연결해 수업 운영을 확장할 수 있습니다.'
  ],
  'intro-users': [
    'LumiTeach에서는 사용자 역할에 따라 보이는 화면과 가능한 작업이 달라집니다. 교사는 콘텐츠를 만들고 배포하며, 학생은 배정된 활동을 수행하고 제출합니다.',
    'Teacher는 Lesson, Activity, Assignment, Assessment를 만들고 관리하는 역할입니다. Student는 교사가 제공한 과제나 수업 활동에 참여하고 결과를 제출합니다.',
    'Admin은 기관이나 클래스 운영 기준에 따라 사용자와 콘텐츠 접근 범위를 관리할 수 있습니다. 역할을 먼저 이해하면 권한 문제나 화면 차이를 더 쉽게 파악할 수 있습니다.'
  ],
  'intro-glossary': [
    'LumiTeach 문서에서 반복해서 등장하는 핵심 용어를 먼저 익히면 기능 흐름을 이해하기 쉽습니다. 특히 Lesson, Activity, Assignment는 대부분의 작업에서 함께 등장합니다.',
    'Lesson은 수업 콘텐츠의 기본 단위이고, Activity는 Lesson 안에서 학생이 수행하는 학습 활동입니다. Assignment는 Lesson을 학생이 혼자 수행할 수 있도록 과제로 제공하는 방식입니다.',
    'Assessment는 평가 목적의 콘텐츠이고, Teaching Mode는 Lesson을 실시간 수업에서 운영하는 방식입니다. Results & Reports는 학생 제출 결과와 활동 데이터를 확인하는 영역입니다.'
  ],
  'start-login': [
    '회원가입 또는 로그인 전에는 사용할 계정 유형을 먼저 확인합니다. 기관에서 초대받은 경우에는 초대받은 이메일이나 계정으로 로그인해야 기관 콘텐츠와 클래스 권한이 정상적으로 연결됩니다.',
    '로그인 화면에서 계정 정보를 입력하고 인증 절차를 완료합니다. 로그인 후 예상한 기관이나 클래스가 보이지 않으면 다른 계정으로 접속했는지 먼저 확인하세요.',
    '로그인에 성공하면 대시보드로 이동해 내 콘텐츠와 최근 작업을 확인합니다. 문제가 있으면 계정 정보, 초대 상태, 브라우저 로그인 상태를 순서대로 점검합니다.'
  ],
  'start-dashboard': [
    '대시보드는 LumiTeach에서 작업을 시작하는 첫 화면입니다. 여기에서 내 Lesson, 최근 콘텐츠, 과제와 평가 진입점을 확인할 수 있습니다.',
    '처음에는 모든 영역을 자세히 보려고 하기보다 새 Lesson을 만들 수 있는 위치와 기존 콘텐츠를 찾는 방법을 먼저 익히세요. 이후 작업량이 늘어나면 최근 항목과 검색을 함께 활용하게 됩니다.',
    '대시보드에서 원하는 콘텐츠가 보이지 않으면 계정, 기관, 클래스, 필터 상태를 확인합니다. 콘텐츠가 많아질수록 My Storage와 함께 사용하는 것이 좋습니다.'
  ],
  'start-first-lesson': [
    '첫 Lesson을 만들기 전에는 수업 제목, 설명, 학습 목표를 간단히 정리합니다. 이 정보는 교사가 콘텐츠를 찾고 학생이 수업 목적을 이해하는 데 도움이 됩니다.',
    'Create Lesson을 선택한 뒤 기본 정보를 입력하고, 학생이 수행할 Activity를 추가합니다. 처음에는 복잡한 구성을 만들기보다 하나의 목표와 하나의 Activity로 시작하는 것이 좋습니다.',
    '저장 후에는 Lesson 목록이나 My Storage에서 생성된 Lesson을 확인합니다. 이후 필요에 따라 Activity를 추가하거나 Assignment로 내보내 수업 운영 흐름을 이어갈 수 있습니다.'
  ],
  'lesson-overview': [
    'Lesson은 LumiTeach에서 수업 콘텐츠를 구성하는 기본 단위입니다. 하나의 Lesson 안에는 수업 설명, 학습 목표, 여러 Activity가 함께 들어갈 수 있습니다.',
    'Lesson은 단순한 자료 보관함이 아니라 학생이 따라갈 학습 흐름을 담는 구조입니다. Activity의 순서와 유형에 따라 학생 경험과 결과 확인 방식이 달라집니다.',
    'Lesson 구조를 이해한 뒤에는 새 Lesson 만들기와 Lesson 내용 수정하기를 순서대로 확인하세요. 이후 Assignment, Assessment, Teaching Mode로 확장할 수 있습니다.'
  ],
  'lesson-create': [
    '새 Lesson을 만들 때는 먼저 수업의 주제와 목표를 정합니다. 제목과 설명은 나중에 콘텐츠를 찾거나 학생에게 안내할 때 기준이 됩니다.',
    'Create Lesson을 선택하고 기본 정보를 입력한 뒤 Activity를 추가합니다. 처음 만드는 Lesson이라면 Activity를 많이 넣기보다 핵심 활동부터 구성하는 것이 좋습니다.',
    '저장 후에는 Lesson이 목록에 정상적으로 표시되는지 확인합니다. 이후 Lesson 내용 수정하기에서 제목, 설명, Activity 순서를 조정할 수 있습니다.'
  ],
  'lesson-edit': [
    'Lesson을 수정하기 전에는 이미 학생에게 배포되었는지 확인합니다. 배포된 Lesson은 수정 내용이 학생 화면이나 결과 확인에 영향을 줄 수 있습니다.',
    '편집 화면에서 제목, 설명, 학습 목표, Activity 내용을 수정합니다. Activity 순서를 바꿀 때는 학생이 따라가는 학습 흐름이 자연스러운지 함께 확인하세요.',
    '수정 후에는 저장 상태와 미리보기 화면을 확인합니다. 필요하면 Assignment나 Teaching Mode에서 변경 내용이 의도대로 보이는지도 점검합니다.'
  ],
  'edit-lesson-create': [
    'LumiTeach에 접속하면 상단 네비게이션 바에 **Create** 버튼과 **Start Teaching** 버튼이 표시됩니다. 신규 Lesson을 만들려면 상단의 **Create** 버튼을 클릭합니다.\n\n[[image:edit-lesson-create/01.png|Home 화면 상단의 Create 버튼]]\n\n**Create** 버튼을 클릭하면 Edit Lesson 화면으로 이동합니다. 처음 진입했을 때는 Activity가 없는 빈 상태로 시작되며, 화면 중앙에 "Click the button to create the first activity."라는 안내 문구와 함께 **+ Manual**, **✦ AI Make** 두 가지 버튼이 표시됩니다.\n\n[[image:edit-lesson-create/02.png|빈 Edit Lesson 화면의 + Manual 및 AI Make 버튼]]\n\n- **+ Manual**: 직접 Activity 유형을 선택해 수동으로 추가합니다.\n- **✦ AI Make**: AI가 자동으로 Activity를 생성해줍니다.\n\n원하는 방식으로 Activity를 추가하여 Lesson을 구성하세요.',
    '수업이 진행 중인 상태에서도 새로운 Lesson을 만들 수 있습니다. 현재 수업을 종료하고 새 Lesson을 이어서 생성하는 방식입니다.\n\nHome 화면 상단의 **Start Teaching** 버튼을 클릭하면 드롭다운 메뉴가 나타납니다. 수업 모드를 선택합니다.\n\n[[image:edit-lesson-create/03.png|Start Teaching 드롭다운에서 수업 모드 선택]]\n\n- **Interaction**: 학생과의 실시간 상호작용 중심 수업 모드입니다.\n- **Presentation**: 교사가 콘텐츠를 발표하는 형태의 수업 모드입니다.\n\n수업 모드를 선택하면 **Choose Access Type** 팝업이 나타납니다. 수업 참여 범위를 설정합니다.\n\n- **Public Link (Guest Access)**: 링크가 있는 누구나 참여할 수 있는 공개 수업입니다.\n- **Class Only (Private Access)**: 특정 Class에 배정된 학생만 참여할 수 있는 비공개 수업입니다.\n\n별도로 Class를 지정하지 않았다면 **Public Link**를 선택하세요. 어떤 옵션을 선택하더라도 이후 Lesson 생성은 동일하게 가능합니다. 설정이 완료되면 **Assign** 버튼을 클릭합니다.\n\n[[image:edit-lesson-create/04.png|Choose Access Type 팝업]]\n\nTeaching 화면으로 진입하면 상단에 **Create**, **Load** 버튼과 Access Code, 우측 상단에 **End Lesson** 버튼이 표시됩니다. 상단의 **Create** 버튼을 클릭하면 현재 수업이 종료된다는 안내 팝업이 나타납니다. **Confirm**을 클릭하면 현재 수업이 종료되고, 새로운 Lesson을 생성하는 Edit Lesson 화면으로 이동합니다.\n\n[[image:edit-lesson-create/05.png|Teaching 화면에서 Create로 새 Lesson 생성]]'
  ],
  'edit-lesson-rename': [
    'Edit Lesson 화면 상단에는 현재 Lesson 명이 텍스트 필드 형태로 표시됩니다. Lesson 명을 클릭하면 바로 수정할 수 있는 입력 상태로 전환됩니다. 원하는 이름을 입력한 뒤 **Enter**를 누르면 자동으로 저장됩니다. 우측의 클라우드 아이콘으로 저장 상태를 확인할 수 있습니다.\n\n[[image:edit-lesson-rename/01.png|Edit Lesson 화면 상단의 Lesson 명 입력 영역]]\n\n- Edit Lesson 화면 상단의 Lesson 명을 클릭합니다.\n- 원하는 이름으로 수정합니다.\n- **Enter**를 눌러 저장합니다.',
    'My Storage의 Lessons 화면에서 각 Lesson 카드 우측 상단의 **⋮ (더보기)** 버튼을 클릭하면 드롭다운 메뉴가 나타납니다.\n\n[[image:edit-lesson-rename/02.png|My Storage Lesson 카드의 더보기 메뉴]]\n\n- 메뉴에는 수업 시작(Interaction, Presentation, Battle Mode), Self Study(Individual, Challenge, Flash Card), 부가메뉴(Favorites, Edit Lesson, **Rename**, Duplicate, Move, Publish) 등 다양한 옵션이 표시됩니다.\n- 이 중 **Rename**을 클릭합니다.\n\n**Rename**을 클릭하면 Lesson 카드 하단의 이름 영역이 편집 가능한 텍스트 필드로 전환됩니다. 원하는 Lesson 명을 입력한 뒤 **Enter**를 눌러 저장합니다.\n\n[[image:edit-lesson-rename/03.png|Lesson 카드 하단 이름 편집 상태]]\n\n- My Storage → Lessons 화면에 진입합니다.\n- 변경할 Lesson 카드의 **⋮** 버튼을 클릭합니다.\n- 드롭다운 메뉴에서 **Rename**을 클릭합니다.\n- 새로운 Lesson 명을 입력한 뒤 **Enter**를 눌러 저장합니다.'
  ],
  'edit-lesson-add-activity': [
    'Edit Lesson 화면에 Activity가 없는 경우, 화면 중앙에 "Click the button to create the first activity." 안내 문구와 함께 **+ Manual**, **✦ AI Make** 버튼이 표시됩니다. Activity를 직접 선택하여 추가하려면 **+ Manual** 버튼을 클릭합니다. Activity가 이미 있는 경우에는 좌측 상단의 **+ Manual** 버튼을 클릭합니다.\n\n[[image:edit-lesson-add-activity/01.png|Edit Lesson 화면의 + Manual 버튼]]\n\n**Create Manually** 팝업이 열립니다. 상단에는 **Add**와 **My Storage** 탭이 있으며, 좌측 카테고리에서 원하는 Activity 유형을 선택할 수 있습니다.\n\n[[image:edit-lesson-add-activity/02.png|Create Manually 팝업의 Activity 카테고리]]\n\n카테고리 종류는 다음과 같습니다.\n\n- **General**: 텍스트, 이미지 등 기본 슬라이드 레이아웃 (Text Only, Text & Text, Image, Text Top, Image Middle, Image Top, Image Left, Image Right, Blank)\n- **Embed**: 외부 콘텐츠 삽입 (웹, 유튜브, 문서 등)\n- **Quiz**: 퀴즈 활동 (True or False, 객관식, 단답형 등)\n- **Discussion**: 토론 활동 (찬반, 의견 투표 등)\n- **Idea Board**: 브레인스토밍, 화이트보드\n- **Games**: 게임 기반 활동\n\n원하는 카테고리를 선택한 뒤, 우측에서 세부 Activity 유형을 클릭하면 바로 추가됩니다.\n\nActivity가 추가되면 Edit Lesson 화면에서 바로 내용을 편집할 수 있습니다. 좌측 슬라이드 패널에서 Activity 목록을 확인할 수 있으며, 우측 설정 패널에서 Background Color, Common Setting(3 Second\'s Countdown 등), Result form(Bar Chart, Bubble 등) 등 세부 옵션을 조정할 수 있습니다.\n\n[[image:edit-lesson-add-activity/03.png|Activity 추가 후 Edit Lesson 편집 화면]]',
    '**✦ AI Make** 버튼을 클릭하면 AI가 자동으로 Activity를 생성해줍니다. 주제나 키워드를 입력하면 AI가 적합한 Activity 구성을 제안하므로, 빠르게 수업 콘텐츠를 만들고 싶을 때 활용하세요.'
  ],
  'edit-lesson-load-storage': [
    'Edit Lesson 화면에서 작업 중에 My Storage의 콘텐츠를 바로 가져올 수 있습니다.\n\n[[image:edit-lesson-load-storage/01.png|Edit Lesson에서 My Storage 탭으로 이동]]\n\n- Edit Lesson 화면에 진입합니다.\n- 좌측 상단 또는 화면 중앙의 **+ Manual** 버튼을 클릭합니다.\n- **Create Manually** 팝업이 열리면 상단의 **My Storage** 탭을 클릭합니다.\n- My Storage에 저장된 폴더와 Lesson 목록이 표시됩니다. 원하는 Lesson을 선택합니다.\n- Lesson 내에서 가져올 Activity Slide를 선택합니다.\n- 모든 Activity를 가져오려면 **Select All Activity** 체크박스를 클릭합니다.\n- **Import** 버튼을 클릭하면 선택한 Activity가 현재 Lesson에 추가됩니다.\n\n[[image:edit-lesson-load-storage/02.png|My Storage에서 Lesson 선택]]\n\n[[image:edit-lesson-load-storage/03.png|선택한 Activity를 Import로 가져오기]]',
    '수업 진행 중에도 My Storage에서 다른 Lesson을 불러올 수 있습니다. 수업 흐름에 따라 즉석에서 콘텐츠를 추가할 때 유용합니다.\n\n- Teaching 화면 상단의 **Load** 버튼을 클릭합니다.\n- **Load** 팝업이 열립니다. 좌측 패널에 My Storage의 폴더 구조가 표시됩니다.\n\n[[image:edit-lesson-load-storage/04.png|Teaching 화면의 Load 팝업]]\n\n- **My Storage**: 전체 폴더 목록 (세번째 폴더, 첫번째 폴더, 네번째 폴더 등)\n- **Favorites**: 즐겨찾기로 등록한 폴더와 Lesson 목록\n- 우측 패널에서 **All** 탭(폴더 + Lesson 전체)과 **Lessons** 탭(Lesson만 필터) 중 원하는 보기를 선택합니다.\n- 상단 **Search** 창을 활용하면 특정 Lesson을 빠르게 검색할 수 있습니다.\n- 원하는 폴더나 Lesson을 선택한 뒤 우측 하단의 **Import** 버튼을 클릭하면 현재 수업에 불러옵니다.\n\n[[image:edit-lesson-load-storage/05.png|Teaching 중 Lesson 선택 후 Import]]'
  ],
  'edit-lesson-ai-make': [
    '### Step 1. AI Make 시작하기\n\nEdit Lesson 화면에서 **✦ AI Make** 버튼을 클릭합니다. Activity가 없는 빈 화면에서는 중앙의 **✦ AI Make** 버튼을, Activity가 이미 있는 경우에는 좌측 상단의 **✦ AI Make** 버튼을 클릭합니다.\n\n[[image:edit-lesson-ai-make/01.png|Edit Lesson 화면의 AI Make 버튼]]\n\n### Step 2. 파일 업로드\n\n**Make with AI** 팝업이 열리면 **From File** 탭이 기본으로 선택됩니다. 업로드 영역을 클릭하거나 **Upload file** 버튼을 눌러 파일을 선택합니다.\n\n[[image:edit-lesson-ai-make/02.png|Make with AI 팝업의 From File 탭]]\n\n- 지원 형식: **pdf, doc, docx, ppt, pptx**\n- 파일 제한: 1개, 최대 50MB\n\n파일을 선택하면 "Checking file type..." 메시지와 함께 로딩이 시작됩니다.\n\n[[image:edit-lesson-ai-make/04.png|파일 업로드 후 Checking file type 상태]]\n\n### Step 3. 페이지 선택\n\n파일 분석이 완료되면 문서의 페이지 미리보기가 표시됩니다. AI가 참고할 페이지를 선택합니다.\n\n[[image:edit-lesson-ai-make/05.png|파일 분석 후 페이지 미리보기]]\n\n- 한 번에 최대 **30페이지**까지 선택할 수 있습니다.\n- 페이지 선택 후 **Import N Pages** 버튼을 클릭합니다.\n\n[[image:edit-lesson-ai-make/05.png|AI가 참고할 페이지 선택 후 Import]]\n\n### Step 4. Required information 설정\n\n**Activity Composition**에서 생성할 Activity 유형을 선택합니다.\n\n[[image:edit-lesson-ai-make/06.png|Activity Composition 선택]]\n\n- **Full Lesson**: 업로드한 자료를 바탕으로 수업 흐름 전체를 구성합니다.\n- **Quiz**: 학생 이해도를 평가하는 퀴즈 Activity를 생성합니다.\n- **Discussion**: 다양한 의견을 이끌어내는 토론 기반 Activity를 생성합니다.\n\n**Number of activities to Generate**에서 생성할 Activity 수를 설정합니다. Full Lesson 기준 **5~20개** 범위에서 조정할 수 있습니다.\n\n[[image:edit-lesson-ai-make/13.png|Number of activities to Generate 설정]]\n\n### Step 5. Optional 설정 (선택)\n\n**Optional** 섹션에서 추가 설정을 할 수 있습니다.\n\n[[image:edit-lesson-ai-make/07.png|Optional 설정 영역]]\n\n- **Preference**: Grade(학년), Subject(과목), Language(언어) 설정\n- **Difficulty**: Auto(자동) / Basic / Intermediate / Advanced 설정\n- **Topic**: 생성 방향을 안내할 주제를 200자 이내로 입력 (선택사항)\n\n설정 완료 후 **Generate** 버튼을 클릭합니다.\n\n[[image:edit-lesson-ai-make/14.png|Generate 버튼 실행]]\n\n### Step 6. 생성 완료\n\n"**AI is Generating...**" 화면과 함께 AI가 Activity를 생성합니다. 생성이 완료되면 Edit Lesson에 Activity가 자동으로 추가됩니다.\n\n[[image:edit-lesson-ai-make/08.png|AI is Generating 화면]]\n\n생성 중 **Cancel Generating** 버튼을 클릭하면 취소 확인 팝업이 표시됩니다.\n\n[[image:edit-lesson-ai-make/08.png|Cancel Generating 버튼]]\n\n> **"Used AI credits are non-refundable. Are you sure you want to cancel?"**\n> - **Keep**: 생성을 계속 진행합니다.\n> - **Cancel**: 생성을 중단합니다.\n\n[[image:edit-lesson-ai-make/16.png|AI 생성 취소 확인 팝업]]\n\n⚠️ **취소해도 AI 크레딧은 환불되지 않습니다.** 취소 시점까지 진행된 만큼의 크레딧은 이미 소비된 것으로 처리됩니다. 생성을 시작했다면 가급적 완료까지 진행하는 것을 권장합니다.\n\n[[image:edit-lesson-ai-make/09.png|AI 생성 완료 후 Activity 추가]]\n\n생성된 Activity가 마음에 들지 않더라도 언제든지 직접 수정할 수 있습니다. (Service Tip: "Not satisfied with the AI-generated options? You can click to edit them anytime!")\n\n[[image:edit-lesson-ai-make/09.png|AI 생성 결과 수정 안내]]',
    '**Make with AI** 팝업에서 **Google Drive** 탭을 선택합니다. **Select a file** 창이 열리면 My Drive에서 원하는 파일을 선택합니다.\n\n[[image:edit-lesson-ai-make/10.png|Google Drive 탭에서 파일 선택]]\n\n- Google Drive는 추가 형식도 지원합니다: **pdf, doc, docx, ppt, pptx, odt, rtf, odp, txt**\n- 파일 선택 후 변환 진행률("Converting file N%...")이 표시되며, 완료되면 페이지 미리보기 화면으로 이동합니다.\n\n[[image:edit-lesson-ai-make/11.png|Google Drive 파일 변환 진행률]]\n\n이후 **Step 4~6**은 로컬 파일 방식과 동일합니다.\n\n> ⚠️ AI Make 기능은 **AI 크레딧이 차감**됩니다. 생성 전 하단의 "AI credits will be deducted." 안내를 확인하세요.'
  ],
  'edit-lesson-interaction': [
    'Edit Lesson 화면 우측 상단의 **Start Teaching** 버튼 옆 **∨** 버튼을 클릭하면 수업 모드 드롭다운이 나타납니다. **Interaction**을 선택합니다.\n\n[[image:edit-lesson-interaction/01.png|Start Teaching 드롭다운의 Interaction 선택]]\n\n- **Interaction**: 학생 응답 수신에 유리한 온라인 수업 모드입니다.\n- **Presentation**: 인터넷 연결 없이도 수업할 수 있는 오프라인 모드입니다.\n- **Battle Mode**: 온라인 환경에서만 실행 가능한 배틀 형식의 수업 모드입니다.',
    '**Choose Access Type** 팝업에서 수업 참여 범위를 선택합니다.\n\n[[image:edit-lesson-interaction/02.png|Choose Access Type 팝업]]\n\n- **Public Link (Guest Access)**: 링크나 Access Code를 아는 누구나 참여할 수 있습니다. Class를 별도로 지정하지 않았다면 이 옵션을 선택하세요.\n- **Class Only (Private Access)**: 특정 Class에 배정된 학생만 참여할 수 있습니다.\n\n선택 후 **Assign** 버튼을 클릭합니다.\n\n### Class Only 선택 시 — 클래스 지정하기\n\nClass Only를 선택하면 **Choose a class** 팝업이 추가로 나타납니다. 참여시킬 클래스를 설정합니다.\n\n[[image:edit-lesson-interaction/03.png|Class Only 선택 시 클래스 지정 팝업]]\n\n- **Year**: 학년도 선택 (예: 2026)\n- **School**: 학교 선택\n- **Grade**: 학년 선택\n- **Class Name** (필수): 특정 클래스를 선택합니다.\n\n설정 완료 후 **Apply** 버튼을 클릭합니다.',
    '설정이 완료되면 Interaction 수업 화면으로 진입합니다.\n\n[[image:edit-lesson-interaction/04.png|Interaction 수업 화면]]\n\n- **좌측 상단 — Access Code**: 학생이 LumiTeach에 접속할 때 입력하는 코드입니다. 학생들에게 이 코드를 공유하면 수업에 참여할 수 있습니다.\n- **우측 상단 — Instructor View**: 진행자 보기 화면으로 이동합니다. 교사는 슬라이드 미리보기, 타이머, 학생 질문 등을 한눈에 확인할 수 있습니다.\n- **우측 상단 — End Lesson**: 수업을 종료합니다.\n- **하단 슬라이드 이동 (< 1/5 >)**: 이전/다음 슬라이드로 이동합니다.\n- **하단 우측 — 학생 수**: 현재 수업에 참여 중인 학생 수를 실시간으로 확인할 수 있습니다.'
  ],
  'edit-lesson-presentation': [
    'Edit Lesson 화면 우측 상단의 **Start Teaching** 버튼 옆 **∨** 버튼을 클릭하면 수업 모드 드롭다운이 나타납니다. **Presentation**을 선택합니다.\n\n[[image:edit-lesson-presentation/01.png|Start Teaching 드롭다운의 Presentation 선택]]\n\n- **Interaction**: 학생의 응답을 실시간으로 받는 상호작용 중심 수업 모드입니다.\n- **Presentation**: 인터넷 연결 없이 Lesson을 발표 형식으로 진행하는 오프라인 수업 모드입니다.\n- **Battle Mode**: 온라인 환경에서만 실행 가능한 배틀 방식의 수업 모드입니다.\n\n**Presentation**을 선택하면 Access Type 설정이나 학생 참여 없이 바로 수업 화면으로 진입합니다.',
    'Presentation 모드로 진입하면 **Lesson View** 화면이 표시됩니다.\n\n[[image:edit-lesson-presentation/02.png|Presentation Lesson View 화면]]\n\n- **상단 중앙 — Lesson View**: 현재 Presentation 모드로 수업 중임을 나타냅니다.\n- **상단 우측 — End Lesson**: 수업을 종료합니다.\n- **좌우 화살표 (◀ ▶)**: 슬라이드를 앞뒤로 이동합니다. 키보드 방향키로도 조작할 수 있습니다.\n- **하단 슬라이드 위치 (예: 1/5)**: 전체 슬라이드 중 현재 위치를 표시합니다.\n\n> **Interaction 모드와의 차이**: Presentation 모드에는 Access Code, Instructor View, 학생 수 표시가 없습니다. 교사 화면 단독으로 콘텐츠를 제시하는 방식으로 운영됩니다.'
  ],
  'edit-lesson-undo-redo': [
    'Edit Lesson 화면 상단 중앙에 **← (Undo)** 와 **→ (Redo)** 아이콘이 나란히 위치해 있습니다. Preview, Self Study, Start Teaching 버튼 왼쪽에서 확인할 수 있습니다.\n\n[[image:edit-lesson-undo-redo/01.png|Edit Lesson 화면 상단의 Undo 및 Redo 버튼]]\n\n- **← Undo**: 직전 작업을 취소하고 이전 상태로 되돌립니다.\n- **→ Redo**: 취소했던 작업을 다시 실행합니다.',
    '- Undo / Redo는 최대 **50개의 작업**까지 기억합니다. 50개를 초과한 이전 작업은 되돌릴 수 없습니다.\n- Edit Lesson 화면을 **벗어났다가 다시 진입하면** Undo / Redo 기록이 초기화됩니다. 페이지를 이동하기 전에 작업 내용을 충분히 확인하세요.'
  ],
  'edit-lesson-preview': [
    'Edit Lesson 화면 상단 중앙의 **Preview 👁** 버튼을 클릭합니다. Undo/Redo 아이콘 오른쪽, Self Study 버튼 왼쪽에 위치해 있습니다.\n\n[[image:edit-lesson-preview/01.png|Edit Lesson 화면 상단의 Preview 버튼]]',
    'Preview 화면 진입 시 상단에 다음 안내 문구가 표시됩니다.\n\n> **"This is a preview screen. Your responses will not be saved."**\n> 미리보기 화면이므로 입력한 응답은 저장되지 않습니다.\n\n화면은 두 개의 영역으로 나뉩니다.\n\n[[image:edit-lesson-preview/02.png|Preview 화면의 Presentation Screen과 Audience Screen]]\n\n- **Presentation Screen** (좌측): 교사가 수업 중 보게 되는 화면입니다. Access Code, Instructor View, End Lesson 버튼, 슬라이드 이동 등 실제 수업 UI가 그대로 표시됩니다.\n- **Audience Screen** (우측): 학생 기기에서 보이는 화면입니다. 학생 입장에서 콘텐츠가 어떻게 표시되는지 확인할 수 있습니다.',
    'Preview 화면 우측 하단의 **View Mobile** 토글로 학생 화면을 모바일 기준으로 전환할 수 있습니다.\n\n[[image:edit-lesson-preview/03.png|View Mobile 토글로 모바일 화면 확인]]\n\n- **토글 OFF**: Audience Screen이 PC/태블릿 화면 비율로 표시됩니다.\n- **토글 ON**: Audience Screen이 모바일 세로 화면 비율로 전환됩니다. 스마트폰으로 참여하는 학생의 화면을 미리 확인할 때 유용합니다.\n\n우측 상단의 **X** 버튼을 클릭하면 Preview를 종료하고 Edit Lesson 화면으로 돌아옵니다.'
  ],
  'edit-lesson-background-color': [
    'Edit Lesson 화면 우측 툴바에서 **✏️ (연필) 아이콘**을 클릭합니다. 우측에 **Background Color** 패널이 열립니다.\n\n[[image:edit-lesson-background-color/01.png|우측 툴바의 Background Color 패널]]\n\n### 색상 선택하기\n\n**컬러 피커**에서 원하는 색상을 선택합니다.\n\n[[image:edit-lesson-background-color/02.png|Background Color 컬러 피커]]\n\n- **색상 그라데이션 영역**: 마우스로 원하는 지점을 클릭하거나 드래그하여 색의 밝기와 채도를 조절합니다.\n- **무지개 슬라이더**: 좌우로 드래그하여 색상(Hue)을 변경합니다.\n- **HEX 코드 입력**: 하단 텍스트 필드에 HEX 색상 코드를 직접 입력할 수 있습니다. (예: `#427bff`)\n- **스포이드 아이콘**: 화면에서 특정 색을 직접 추출하여 배경색으로 적용할 수 있습니다.\n\n색상을 선택하면 슬라이드 배경에 즉시 반영됩니다.',
    '- 같은 패널 하단에 **Background Image** 섹션도 있습니다. 배경을 단색이 아닌 이미지로 설정하려면 해당 섹션을 활용하세요. (11. 배경 이미지 추가하여 변경하기 참고)\n- 배경 색 설정은 슬라이드 단위로 적용됩니다. 슬라이드마다 다른 배경색을 지정할 수 있습니다.'
  ],
  'lesson-duplicate': [
    'Lesson 복제는 기존 수업 구조를 유지하면서 새 수업에 맞게 내용을 바꿀 때 사용합니다. 비슷한 단원이나 다른 반 수업을 준비할 때 유용합니다.',
    '복제할 Lesson을 선택한 뒤 복제 기능을 실행합니다. 복제본은 원본과 구분할 수 있도록 제목이나 폴더 위치를 바로 수정하는 것이 좋습니다.',
    '복제 후에는 Activity 내용, 학습 목표, 배포 상태를 다시 확인합니다. 원본을 유지한 채 새 버전을 운영하려면 My Storage에서 폴더 정리까지 함께 진행하세요.'
  ],
  'lesson-delete': [
    'Lesson을 삭제하기 전에는 해당 Lesson이 과제나 수업에 사용 중인지 확인합니다. 이미 학생에게 제공된 콘텐츠라면 삭제가 결과 확인이나 재사용에 영향을 줄 수 있습니다.',
    '삭제가 필요한 Lesson을 선택해 휴지통으로 이동합니다. 실수로 삭제한 경우 복구 가능 기간이나 휴지통 상태를 확인해야 합니다.',
    '영구 삭제 전에는 더 이상 사용할 계획이 없는지 다시 확인하세요. 복구가 필요한 경우 휴지통에서 해당 Lesson을 찾아 복구한 뒤 목록에 정상적으로 돌아왔는지 확인합니다.'
  ],
  'activities-overview': [
    'Activity는 Lesson 안에서 학생이 실제로 수행하는 학습 활동입니다. 수업 목표에 따라 문제 풀이, 의견 공유, 실시간 참여, AI 생성 활동 중 적절한 유형을 선택합니다.',
    'Quiz Activity는 정답이 있는 문제에 적합하고, Board Activity는 의견이나 아이디어를 모을 때 적합합니다. Interactive Activity는 수업 중 참여를 유도할 때 사용합니다.',
    'Activity 유형을 고른 뒤에는 해당 유형의 생성 문서를 확인하세요. AI로 초안을 만들 경우 생성 결과를 반드시 검토하고 수정한 뒤 사용합니다.'
  ],
  'activities-quiz': [
    'Quiz Activity는 정답 기반 문제 풀이가 필요한 수업에 사용합니다. 학생의 이해도를 빠르게 확인하거나 Challenge, Flash Card, Battle Mode와 연결할 때 적합합니다.',
    '문항을 만들 때는 질문, 보기, 정답, 필요하면 해설을 함께 입력합니다. 정답 기준이 명확하지 않으면 결과 확인이나 점수 처리에서 혼동이 생길 수 있습니다.',
    '저장 후에는 학생 화면에서 문항이 의도대로 보이는지 확인합니다. 이후 Assignment나 Teaching Mode에서 Quiz Activity를 활용할 수 있는지 점검하세요.'
  ],
  'activities-board': [
    'Board Activity는 학생 의견, 아이디어, 토론 결과를 수집할 때 사용합니다. 정답보다 다양한 응답을 모으고 공유하는 수업에 적합합니다.',
    '활동을 만들 때는 학생에게 무엇을 작성해야 하는지 질문을 명확히 안내합니다. 응답 공개 여부나 공유 방식이 있다면 수업 운영 방식에 맞게 설정합니다.',
    '수업 후에는 제출된 응답을 확인하고 필요한 경우 정리하거나 피드백합니다. 토론형 수업에서는 Board 결과를 다음 Activity나 Teaching Mode 진행에 연결할 수 있습니다.'
  ],
  'activities-interactive': [
    'Interactive Activity는 수업 중 학생의 실시간 참여를 유도하는 활동입니다. 교사가 진행 흐름을 제어하면서 학생 응답이나 참여 상태를 확인할 수 있습니다.',
    '활동을 구성할 때는 학생이 언제 참여하고 무엇을 제출해야 하는지 명확히 정합니다. 실시간 수업에서는 지시가 모호하면 참여율이나 응답 품질이 낮아질 수 있습니다.',
    '진행 후에는 참여 현황과 응답 결과를 확인합니다. 필요하면 Results & Reports에서 학생별 제출 상태를 함께 확인하세요.'
  ],
  'activities-ai-create': [
    'AI로 Activity를 생성할 때는 학년, 주제, 난이도, 문항 수, 활동 목적을 구체적으로 입력합니다. 입력 정보가 구체적일수록 수업에 맞는 초안을 얻기 쉽습니다.',
    'AI 생성 결과는 완성본이 아니라 검토가 필요한 초안입니다. 문항 표현, 정답, 난이도, 학생 수준과의 적합성을 교사가 반드시 확인해야 합니다.',
    '생성 후에는 필요한 Activity만 선택하거나 내용을 수정해 저장합니다. 이후 AI 생성 결과 수정하기에서 수업 목적에 맞게 다듬는 과정을 이어가세요.'
  ],
  'activities-ai-edit': [
    'AI가 생성한 Activity는 수업 맥락에 맞게 수정해야 합니다. 자동 생성 결과에는 표현이 어색하거나 난이도가 맞지 않는 문항이 포함될 수 있습니다.',
    '수정할 때는 질문의 명확성, 정답 기준, 보기 품질, 학생 수준을 차례로 확인합니다. 필요하면 문항 수를 줄이거나 난이도를 조정해 수업 시간에 맞춥니다.',
    '수정 후에는 저장하고 학생 화면에서 미리 확인합니다. 배포 전에는 교사가 직접 풀어보며 오류나 모호한 표현이 없는지 점검하는 것이 좋습니다.'
  ],
  'assignment-overview': [
    'Assignment는 Lesson을 학생이 혼자 수행할 수 있도록 제공하는 기능입니다. 수업 후 복습, 개별 과제, 도전형 학습, 빠른 개념 확인에 활용할 수 있습니다.',
    'Assignment 방식은 Individual, Challenge, Flash Card로 나뉘며 각 방식은 학생 경험과 결과 확인 방식이 다릅니다. Lesson에 포함된 Activity 유형에 따라 선택 가능한 방식이 달라질 수 있습니다.',
    '먼저 과제 목적을 정한 뒤 적절한 방식을 선택하세요. 배포 전에는 대상 학생, 마감일, 자동 제출 조건을 함께 확인합니다.'
  ],
  'assignment-individual': [
    'Individual은 학생이 개별적으로 Lesson 안의 Activity를 수행하는 기본 과제 방식입니다. 수업 후 복습이나 자기주도 학습에 적합합니다.',
    '과제를 낼 때는 대상 학생과 수행할 Lesson을 선택하고 제출 조건을 설정합니다. 학생이 혼자 읽고 수행할 수 있도록 Lesson 설명과 Activity 안내를 충분히 확인하세요.',
    '배포 후에는 제출 이력에서 학생별 진행 상태를 확인합니다. 미제출 학생이 있다면 마감일과 공개 상태를 먼저 점검하세요.'
  ],
  'assignment-challenge': [
    'Challenge는 Quiz Activity 기반으로 학생이 도전형 과제를 수행하는 방식입니다. 정답 기반 활동으로 참여 동기를 높이고 결과를 비교할 때 적합합니다.',
    'Challenge를 사용하려면 Lesson에 Quiz Activity가 포함되어 있어야 합니다. Quiz 문항의 정답과 난이도가 명확한지 먼저 확인하세요.',
    '배포 후에는 결과 화면에서 점수와 제출 상태를 확인합니다. 순위나 점수를 수업에 활용할 경우 학생에게 평가 기준을 미리 안내하는 것이 좋습니다.'
  ],
  'assignment-flashcard': [
    'Flash Card는 Quiz Activity를 바탕으로 학생이 알아요 또는 몰라요 방식으로 복습하는 과제 방식입니다. 개념 확인이나 빠른 반복 학습에 적합합니다.',
    '사용 전에는 Quiz 문항이 짧고 명확한지 확인합니다. 긴 설명형 문항보다 개념을 빠르게 떠올릴 수 있는 문항이 Flash Card에 더 잘 맞습니다.',
    '학생 응답 후에는 리포트에서 인지 여부와 복습 상태를 확인합니다. 이해가 낮은 문항은 다음 수업에서 다시 다루는 자료로 활용할 수 있습니다.'
  ],
  'assignment-deadline': [
    '마감일은 학생이 과제를 제출할 수 있는 기간을 정하는 설정입니다. 수업 일정과 결과 확인 시점을 고려해 학생에게 충분한 수행 시간을 제공해야 합니다.',
    '마감일을 설정하거나 수정할 때는 이미 배포된 과제인지 확인합니다. 마감일 변경은 학생의 제출 가능 여부에 영향을 줄 수 있습니다.',
    '설정 후에는 학생 화면이나 과제 목록에서 마감일이 의도대로 표시되는지 확인합니다. 자동 제출을 함께 사용할 경우 제출 처리 시점도 같이 점검하세요.'
  ],
  'assignment-auto-submit': [
    '자동 제출은 학생이 직접 제출하지 않은 과제를 정해진 조건에 따라 제출 처리하는 기능입니다. 제출 누락을 줄일 수 있지만 운영 기준을 명확히 정해야 합니다.',
    '설정 전에는 어떤 상태의 과제를 자동 제출로 처리할지 확인합니다. 학생이 작성 중인 응답이나 미완료 활동이 어떻게 기록되는지도 함께 고려해야 합니다.',
    '배포 후에는 제출 상태가 의도대로 변경되는지 Results & Reports에서 확인합니다. 예상과 다르게 처리되면 마감일, 공개 상태, 자동 제출 조건을 순서대로 점검하세요.'
  ],
  'assessment-create': [
    'Assessment를 만들기 전에는 평가 목적과 대상 학생을 먼저 정합니다. 어떤 이해도를 확인할지 분명해야 문항 구성과 결과 해석이 쉬워집니다.',
    'Assessment 생성 화면에서 제목, 설명, 응시 조건 등 기본 정보를 입력합니다. 학생이 평가 목적과 응시 방법을 이해할 수 있도록 안내 문구를 명확히 작성하세요.',
    '저장 후에는 평가 목록에 정상적으로 생성되었는지 확인합니다. 이후 평가 문항 추가하기에서 실제 문항과 배점을 구성합니다.'
  ],
  'assessment-questions': [
    '평가 문항을 추가할 때는 문항 유형, 정답 기준, 배점을 함께 설정합니다. 문항별 기준이 명확해야 결과 확인과 피드백이 안정적으로 이루어집니다.',
    '객관식 문항은 보기와 정답을 정확히 확인하고, 주관식 문항은 채점 기준이나 기대 답안을 정리합니다. 난이도와 문항 수는 응시 시간에 맞게 조정하세요.',
    '문항 추가 후에는 전체 평가 흐름을 미리 확인합니다. 학생에게 배포하기 전 오탈자, 정답 오류, 배점 누락이 없는지 다시 점검하세요.'
  ],
  'assessment-distribute': [
    'Assessment 배포 전에는 대상 학생, 공개 범위, 응시 가능 시간을 확인합니다. 잘못된 대상에게 배포하면 결과 관리와 학생 안내가 어려워질 수 있습니다.',
    '배포 설정에서 응시 조건과 공개 상태를 지정합니다. 학생이 언제 평가를 볼 수 있고 언제까지 제출해야 하는지 명확히 안내하세요.',
    '배포 후에는 학생 화면에서 평가가 정상적으로 보이는지 확인합니다. 문제가 있으면 대상 설정, 공개 상태, 응시 시간을 순서대로 점검합니다.'
  ],
  'assessment-results': [
    '평가 결과에서는 학생별 제출 상태와 점수를 확인합니다. 전체 점수뿐 아니라 문항별 응답을 함께 보면 학생이 어려워한 부분을 더 정확히 파악할 수 있습니다.',
    '결과를 볼 때는 제출 완료 여부, 채점 상태, 문항별 정답률을 차례로 확인합니다. 주관식 문항이 있다면 교사 확인이나 추가 채점이 필요할 수 있습니다.',
    '결과 확인 후에는 보충 설명이 필요한 문항을 정리합니다. 이후 Lesson이나 Activity를 수정해 다음 수업 자료로 연결할 수 있습니다.'
  ],
  'teaching-overview': [
    'Teaching Mode는 Lesson을 실시간 수업에서 운영하기 위한 모드입니다. 교사는 수업 흐름을 제어하고 학생 참여 상태를 확인하면서 Activity를 진행할 수 있습니다.',
    '수업을 시작하기 전에는 사용할 Lesson, Activity 구성, 학생 접속 상태를 확인합니다. 필요한 경우 Presentation, Interaction, Battle Mode 중 수업 목적에 맞는 방식을 선택합니다.',
    '수업 후에는 참여 결과와 제출 상태를 확인합니다. 실시간 활동 결과는 Results & Reports에서 다시 확인하거나 다음 수업 피드백 자료로 활용할 수 있습니다.'
  ],
  'teaching-interaction': [
    'Interaction은 학생이 수업 중 직접 응답하거나 참여하도록 유도하는 방식입니다. 질문, 의견 수집, 즉각적인 이해도 확인이 필요한 수업에 적합합니다.',
    '진행 중에는 교사가 활동을 열고 학생 참여 상태를 확인합니다. 학생이 무엇을 입력해야 하는지 명확히 안내하고, 필요하면 응답 공유 방식을 조정합니다.',
    '활동이 끝나면 응답 결과를 확인하고 수업 설명에 반영합니다. 참여가 낮다면 질문 난이도, 안내 문구, 학생 접속 상태를 함께 점검하세요.'
  ],
  'teaching-presentation': [
    'Presentation은 Lesson을 발표 자료처럼 보여주며 교사가 수업 흐름을 제어하는 방식입니다. 설명 중심 수업이나 자료 제시가 필요한 상황에 적합합니다.',
    '수업 중에는 교사가 화면 진행 순서를 관리하고 필요한 Activity로 이동합니다. 학생에게 보여줄 화면과 교사용 확인 화면을 구분해 사용하는 것이 좋습니다.',
    '수업 종료 후에는 사용한 Lesson과 Activity 결과를 확인합니다. 다음 수업에서 재사용할 경우 Lesson 내용이나 순서를 수정해 보완할 수 있습니다.'
  ],
  'teaching-battle': [
    'Battle Mode는 Quiz 기반으로 학생 참여를 경쟁형으로 운영하는 방식입니다. 빠른 문제 풀이와 순위 확인을 통해 수업 참여도를 높일 수 있습니다.',
    '사용 전에는 Lesson에 Quiz Activity가 포함되어 있는지 확인합니다. 문항 수, 난이도, 정답 설정이 적절해야 공정한 진행이 가능합니다.',
    '진행 후에는 리더보드와 결과를 확인합니다. 점수나 순위를 공유할 때는 학생에게 기준을 설명하고, 필요한 경우 Results & Reports에서 세부 결과를 다시 확인하세요.'
  ],
  'reports-submission': [
    'Submission History에서는 학생별 제출 이력을 확인합니다. 누가 제출했는지, 언제 제출했는지, 제출 상태가 무엇인지 빠르게 파악할 수 있습니다.',
    '목록을 볼 때는 과제나 평가, 클래스, 제출 상태 필터를 확인합니다. 원하는 결과가 보이지 않으면 필터가 너무 좁게 설정되어 있지 않은지 먼저 점검하세요.',
    '제출 이력을 확인한 뒤 미제출 학생이나 지연 제출 학생을 따로 확인합니다. 필요하면 학생 답변 확인하기로 이동해 개별 제출 내용을 검토하세요.'
  ],
  'reports-answer': [
    'Submitted Answer에서는 학생이 제출한 답변 내용을 확인합니다. 개별 피드백이나 오답 분석이 필요한 경우 이 화면을 활용합니다.',
    '답변을 볼 때는 학생 이름, 제출한 Activity, 응답 내용, 제출 시간을 함께 확인합니다. 주관식이나 의견형 응답은 수업 피드백 자료로 활용할 수 있습니다.',
    '확인 후에는 필요한 학생에게 피드백하거나 다음 수업에서 다룰 내용을 정리합니다. 답변이 보이지 않으면 제출 상태와 필터 조건을 먼저 확인하세요.'
  ],
  'reports-leaderboard': [
    'Leaderboard는 Challenge나 Battle Mode처럼 점수와 순위가 있는 활동의 결과를 보여줍니다. 학생 참여도와 빠른 이해도 확인에 활용할 수 있습니다.',
    '순위를 볼 때는 점수 기준, 동점 처리, 제출 완료 여부를 함께 확인합니다. 수업 상황에 따라 순위를 전체 공개할지 교사만 확인할지 판단하세요.',
    '리더보드 확인 후에는 상위 학생뿐 아니라 어려움을 겪은 학생도 함께 살펴봅니다. 필요한 경우 제출 답변이나 문항별 결과를 추가로 확인하세요.'
  ],
  'storage-overview': [
    "[[image:storage-my-storage/01.png|My Storage 기본 화면]]\n\nMy Storage는 내가 만들거나 편집한 모든 수업 자료(Lesson·폴더)를 모아 관리하는 개인 보관함입니다.\n\n> 상단 안내 문구: \"Find all the resources you've created or edited here.\"\n\n상단 내비게이션에서 **My Storage**를 클릭합니다.",
    "[[image:storage-my-storage/05.png|Favorites와 Trash가 표시된 좌측 패널]]\n\n### 좌측 패널\n\n- **+ New**: 새 항목을 생성합니다.\n- **My Storage 트리**: 폴더 구조가 표시됩니다. 폴더 안에 하위 폴더를 구성할 수 있습니다. (예: **Grade 5 - About Earth > 1. Quiz / 2. Discussion / 3. Board > 3.1. BrainStorming / 3.2. White Board / 4. Self Study**)\n- **Favorites**: 즐겨찾기(⭐)한 폴더·Lesson 모음.\n- **Trash**: 삭제한 항목이 보관되는 휴지통.\n\n### 우측 영역\n\n검색창, 탭, 정렬, 그리고 **Folders**(폴더)와 **Lessons**(수업) 목록이 표시됩니다."
  ],
  'storage-folder': [
    "[[image:storage-my-storage/02.png|My Storage 검색 결과 화면]]\n\n- **검색창**: 키워드를 입력하면 폴더·Lesson을 실시간으로 검색합니다. 각 결과에는 항목 수·활동 수·수정 시각이 함께 표시됩니다.",
    "- **All / Lessons 탭**: 전체 보기 또는 Lesson만 보기로 전환합니다.",
    "[[image:storage-my-storage/03.png|My Storage 정렬 옵션]]\n\n- **정렬**: 우측 상단에서 정렬 기준과 순서를 선택합니다.\n- **Sort by**: **Name**(이름) / **Modified date**(수정일)\n- **Sort order**: **Ascending**(오름차순) / **Descending**(내림차순)"
  ],
  'storage-move': [
    "[[image:storage-my-storage/04.png|Lesson 카드의 체크박스와 즐겨찾기]]\n\n각 폴더/Lesson 카드에는 다음 요소가 있습니다.\n\n- **체크박스**: 여러 항목을 선택해 한 번에 관리합니다.\n- **⭐ 즐겨찾기**: 클릭하면 Favorites에 추가됩니다. (폴더·Lesson 모두 가능)\n- **⋮ 메뉴**: 항목별 작업 메뉴를 엽니다. (아래 참고)\n- 폴더 카드에는 항목 수와 수정 시각이, Lesson 카드에는 활동 수(**N Activity**)가 표시됩니다.",
    "[[image:storage-my-storage/05.png|Favorites와 Trash 영역]]\n\n**Favorites**는 즐겨찾기(⭐)한 폴더·Lesson 모음입니다. **Trash**는 삭제한 항목이 보관되는 휴지통입니다.",
    "카드의 **⋮ 메뉴**를 클릭하면 항목별 작업 메뉴를 열 수 있습니다. Lesson 카드의 세부 메뉴는 다음 문서에서 확인합니다."
  ],
  'storage-trash': [
    "[[image:storage-my-storage/06.png|Lesson 카드의 ⋮ 메뉴]]\n\nLesson 카드의 **⋮** 메뉴에서 다음 작업을 할 수 있습니다.\n\n- **수업 모드로 시작**: **Interaction** / **Presentation** / **Battle Mode** / **Individual** / **Challenge** / **Flash Card**\n- **Favorites**: 즐겨찾기 추가/해제\n- **Edit Lesson**: Lesson 편집 화면으로 이동\n- **Rename**: 이름 변경\n- **Duplicate**: 복제\n- **Move**: 다른 폴더로 이동\n- **Publish**: 내 소속 자료로 공개 (→ 내 소속 자료 활용하기의 Creator Page 참고)\n- **Delete**: 삭제(휴지통으로 이동)",
    "[[image:storage-my-storage/07.png|Start Teaching 버튼]]\n\n> 카드 위에 마우스를 올리면 **Start Teaching** 버튼이 나타나며, **Interaction / Presentation / Battle Mode** 중 선택해 바로 수업을 시작할 수 있습니다.",
    "[[image:storage-my-storage/08.png|Lesson 미리보기 창]]\n\nLesson을 클릭하면 미리보기 창이 열립니다. 활동 구성(**Total Activity**, **General**, **Quiz**, **Discussion**, **Board** 수)과 수업 모드 버튼, 슬라이드 썸네일을 확인할 수 있으며, **Edit** 버튼으로 편집할 수 있습니다."
  ]
});

// BEGIN GENERATED LUMITEACH BODIES
Object.assign(articleBodies, {
      "edit-lesson-background-image": [
            "Edit Lesson 화면 우측 툴바에서 **✏️ (연필) 아이콘**을 클릭합니다. Background Color 패널 하단의 **Background Image** 섹션에서 **Upload file** 버튼을 클릭합니다.\n\n[[image:edit-lesson-background-image/01.png|배경 이미지 설정 방법]]\n\n[[image:edit-lesson-background-image/02.png|배경 이미지 설정 방법]]",
            "**Upload Image** 팝업이 열립니다. 이미지를 가져오는 방법은 두 가지입니다.\n\n### 방법 1. From File (로컬 파일)\n\n**From File** 탭에서 로컬에 저장된 이미지를 업로드합니다.\n\n- 업로드 영역에 이미지를 **드래그 앤 드롭**하거나, **Upload file** 버튼을 클릭하여 파일을 선택합니다.\n\n- 지원 형식: **png, jpg, jpeg, webp**\n\n- 파일 제한: 1개, 최대 **20MB**\n\n### 방법 2. Search from web (웹 검색)\n\n**Search from web** 탭에서 키워드로 이미지를 검색하여 바로 가져올 수 있습니다.\n\n[[image:edit-lesson-background-image/03.png|이미지 업로드하기]]",
            "파일 선택 후 이미지 미리보기 화면이 나타납니다. 이미지를 확인하고 우측 하단의 **Apply** 버튼을 클릭하면 슬라이드 배경에 이미지가 적용됩니다.\n\n적용 후 우측 패널 **Background Image** 섹션에 업로드한 파일명이 표시되며, 우측의 **X** 버튼을 클릭하면 배경 이미지를 제거하고 기본 배경으로 돌아올 수 있습니다.\n\n[[image:edit-lesson-background-image/04.png|이미지 적용하기]]"
      ],
      "edit-lesson-self-study-individual": [
            "Edit Lesson 화면 상단의 **Self Study** 버튼을 클릭하면 드롭다운이 나타납니다. **Individual**을 선택합니다.\n\n- **Individual**: 학생이 개별로 문제를 풀며 학습하는 모드입니다.\n\n- **Challenge**: 경쟁을 통해 참여를 높이는 게임형 학습 모드입니다.\n\n- **Flash Cards**: 플래시 카드로 지식을 반복 학습하는 모드입니다.\n\n[[image:edit-lesson-self-study-individual/01.png|Step 1. Individual 모드 선택하기]]\n\n[[image:edit-lesson-self-study-individual/02.png|Step 1. Individual 모드 선택하기]]\n\n[[image:edit-lesson-self-study-individual/03.png|Step 1. Individual 모드 선택하기]]",
            "**Individual** 팝업에서 과제 세부 사항을 설정합니다.\n\n### Assignment Name (과제명)\n\n현재 Lesson 명이 기본값으로 표시됩니다. **Edit** 버튼을 클릭하면 과제명을 직접 입력할 수 있는 텍스트 필드로 전환됩니다. 수정 후 **Save**를 클릭하거나 **Cancel**로 취소합니다.\n\n### Settings\n\n- **Due Date**: 토글을 켜면 마감 날짜와 시간을 설정할 수 있습니다. 날짜(캘린더)와 시간(드롭다운)을 각각 지정합니다.\n\n- **Time Limit**: 토글을 켜면 제한 시간을 설정할 수 있습니다. 최대 **100분**까지 분 단위로 입력합니다.\n\n- **Check correctness for each question**: 학생이 각 문항에 답한 후 즉시 정답 여부를 확인할 수 있도록 합니다. 기본값은 ON입니다.\n\n### Access Level (참여 범위)\n\n- **Public link (Guest access)**: 링크나 Access Code를 아는 누구나 참여할 수 있습니다.\n\n- **Class Only (Private access)**: 특정 Class에 배정된 학생만 참여할 수 있습니다. 선택 시 Year / School / Grade / **Class Name (Required)** 를 설정하는 화면으로 이동합니다.\n\n설정 완료 후 **Assign** 버튼을 클릭합니다.\n\n[[image:edit-lesson-self-study-individual/04.png|Step 2. 과제 설정하기]]\n\n[[image:edit-lesson-self-study-individual/05.png|Step 2. 과제 설정하기]]\n\n[[image:edit-lesson-self-study-individual/06.png|Step 2. 과제 설정하기]]",
            "**Assign** 클릭 후 **Share Assignment** 화면이 표시됩니다. 학생에게 과제를 공유하는 방법은 세 가지입니다.\n\n- **URL**: 과제 링크를 직접 복사하여 공유합니다. **Copy Link** 버튼으로 클립보드에 복사합니다.\n\n- **QR Code**: **QR Code** 버튼을 클릭하면 QR 코드가 생성됩니다. 학생이 스마트폰으로 스캔하면 바로 과제에 접속합니다. (\"Scan to open assignment\")\n\n- **Access Code**: 숫자 코드(예: 5318)를 학생에게 알려주면 LumiTeach 접속 후 코드 입력으로 참여할 수 있습니다.\n\n[[image:edit-lesson-self-study-individual/07.png|Step 3. 과제 공유하기]]\n\n[[image:edit-lesson-self-study-individual/08.png|Step 3. 과제 공유하기]]"
      ],
      "edit-lesson-self-study-challenge": [
            "Edit Lesson 화면 상단의 **Self Study** 버튼을 클릭하면 드롭다운이 나타납니다. **Challenge**를 선택합니다.\n\n- **Individual**: 학생이 개별로 문제를 풀며 학습하는 모드입니다.\n\n- **Challenge**: 경쟁을 통해 참여를 높이는 게임형 학습 모드입니다.\n\n- **Flash Cards**: 플래시 카드로 지식을 반복 학습하는 모드입니다.\n\n[[image:edit-lesson-self-study-challenge/01.png|Step 1. Challenge 모드 선택하기]]\n\n[[image:edit-lesson-self-study-challenge/02.png|Step 1. Challenge 모드 선택하기]]",
            "**Challenge** 팝업에서 과제 세부 사항을 설정합니다.\n\n### Assignment Name (과제명)\n\n**Edit** 버튼을 클릭하면 과제명을 직접 입력할 수 있는 텍스트 필드로 전환됩니다. 수정 후 **Save**를 클릭하거나 **Cancel**로 취소합니다.\n\n### Settings\n\n- **Due Date**: 토글을 켜면 마감 날짜와 시간을 설정할 수 있습니다.\n\n- **Time Limit**: 토글을 켜면 제한 시간을 설정할 수 있습니다. 최대 **100분**까지 분 단위로 입력합니다.\n\n- **Check correctness for each question**: 학생이 각 문항에 답한 후 즉시 정답 여부를 확인할 수 있도록 합니다.\n\n- **Nickname**: 학생의 닉네임을 리더보드에 표시합니다.\n\n- **Anonymous ID**: 익명 ID로 표시하여 학생의 신원을 노출하지 않습니다.\n\n### Access Level (참여 범위)\n\n- **Public link (Guest access)**: 링크나 Access Code를 아는 누구나 참여할 수 있습니다. 별도 Class 설정이 필요 없습니다.\n\n- **Class Only (Private access)**: 특정 Class에 배정된 학생만 참여할 수 있습니다.\n\n설정 완료 후 **Assign** 버튼을 클릭합니다.\n\n[[image:edit-lesson-self-study-challenge/03.png|Step 2. 과제 설정하기]]\n\n[[image:edit-lesson-self-study-challenge/04.png|Step 2. 과제 설정하기]]",
            "**Assign** 클릭 후 **Share Assignment** 화면에서 과제명, Due Date, URL, Access Code를 확인할 수 있습니다.\n\n- **Copy Link**: 과제 URL을 클립보드에 복사합니다.\n\n- **QR Code**: QR 코드를 생성하여 학생이 스캔으로 바로 접속할 수 있습니다.\n\n- **Access Code**: 숫자 코드를 학생에게 알려주면 LumiTeach 접속 후 코드 입력으로 참여할 수 있습니다.\n\n[[image:edit-lesson-self-study-challenge/05.png|Step 3. 과제 공유하기]]\n\n[[image:edit-lesson-self-study-challenge/06.png|Step 3. 과제 공유하기]]"
      ],
      "edit-lesson-self-study-flash-card": [
            "Edit Lesson 화면 상단의 **Self Study** 버튼을 클릭하면 드롭다운이 나타납니다. **Flash Cards**를 선택합니다.\n\n- **Individual**: 학생이 개별로 문제를 풀며 학습하는 모드입니다.\n\n- **Challenge**: 경쟁을 통해 참여를 높이는 게임형 학습 모드입니다.\n\n- **Flash Cards**: 플래시 카드로 지식을 반복 학습하는 모드입니다.\n\n[[image:edit-lesson-self-study-flash-card/01.png|Step 1. Flash Cards 모드 선택하기]]\n\n[[image:edit-lesson-self-study-flash-card/02.png|Step 1. Flash Cards 모드 선택하기]]",
            "**Flash Cards** 팝업에서 과제 세부 사항을 설정합니다.\n\n### Assignment Name (과제명)\n\n**Edit** 버튼을 클릭하면 과제명을 입력할 수 있는 텍스트 필드로 전환됩니다. 수정 후 **Save**를 클릭하거나 **Cancel**로 취소합니다.\n\n### Settings\n\n- **Due Date**: 토글을 켜면 마감 날짜와 시간을 설정할 수 있습니다.\n\n- **Time Limit**: 토글을 켜면 제한 시간을 설정할 수 있습니다. 최대 **100분**까지 분 단위로 입력합니다.\n\n> Flash Cards 모드는 정답 확인(Check correctness)과 리더보드(Show Leaderboard) 옵션을 제공하지 않습니다. 카드를 반복적으로 보며 스스로 학습하는 방식에 최적화된 구성입니다.\n\n### Access Level (참여 범위)\n\n- **Public link (Guest access)**: 링크나 Access Code를 아는 누구나 참여할 수 있습니다.\n\n- **Class Only (Private access)**: 특정 Class에 배정된 학생만 참여할 수 있습니다.\n\n설정 완료 후 **Assign** 버튼을 클릭합니다.\n\n[[image:edit-lesson-self-study-flash-card/03.png|Step 2. 과제 설정하기]]\n\n[[image:edit-lesson-self-study-flash-card/04.png|Step 2. 과제 설정하기]]",
            "**Assign** 클릭 후 **Share Assignment** 화면이 표시됩니다. 과제명, Due Date와 함께 아래 공유 수단이 제공됩니다.\n\n- **URL**: 과제 링크를 직접 복사하여 공유합니다. **Copy Link** 버튼으로 클립보드에 복사합니다.\n\n- **QR Code**: **QR Code** 버튼을 클릭하면 QR 코드가 생성됩니다. 학생이 스마트폰으로 스캔하면 바로 과제에 접속합니다.\n\n- **Access Code**: 숫자 코드를 학생에게 알려주면 LumiTeach 접속 후 코드 입력으로 참여할 수 있습니다.\n\n[[image:edit-lesson-self-study-flash-card/05.png|Step 3. 과제 공유하기]]"
      ],
      "edit-lesson-activity-common-setting": [
            "### 3 Second's Countdown\n\nActivity가 시작되기 전 3초 카운트다운을 표시할지 설정합니다.\n\n- **토글 ON**: Activity 시작 시 화면에 3, 2, 1 카운트다운이 표시된 후 Activity가 진행됩니다.\n\n- **토글 OFF**: 카운트다운 없이 바로 Activity가 시작됩니다.\n\n[[image:edit-lesson-activity-common-setting/01.png|Common Setting]]",
            "Activity 제한 시간을 설정합니다.\n\n- **토글 ON**: 초 단위로 제한 시간을 입력할 수 있습니다. 최대 **300초**까지 입력 가능합니다.\n\n- 값을 입력하지 않으면 **\"Please set the time.\"** 경고 문구가 빨간색으로 표시됩니다. 반드시 시간을 입력해야 저장됩니다.\n\n- **토글 OFF**: 제한 시간 없이 Activity가 진행됩니다.\n\n[[image:edit-lesson-activity-common-setting/02.png|Time Limit]]"
      ],
      "edit-lesson-text-properties": [
            "[[image:edit-lesson-text-properties/01.png|텍스트 객체 선택 시 표시되는 상단 툴바]]\n\nEdit Lesson에서 텍스트 객체를 클릭하면 상단에 텍스트 속성 툴바가 표시됩니다. 이 툴바에서 텍스트의 기본 스타일과 객체 조작 기능을 함께 변경할 수 있습니다.\n\n주요 기능은 다음과 같습니다.\n\n- **Font**: 텍스트 객체에 적용할 글꼴을 선택합니다.\n\n- **Size**: `- / +` 버튼 또는 숫자 입력으로 글자 크기를 조정합니다.\n\n- **Bold / Italic / Underline / Color**: 굵기, 기울임, 밑줄, 텍스트 색상을 변경합니다.\n\n- **Alignment**: 텍스트 정렬을 변경합니다.\n\n[[image:edit-lesson-text-properties/04.png|텍스트 정렬 옵션]]\n\n정렬 메뉴에서는 텍스트를 좌측, 가운데, 우측으로 맞출 수 있습니다. 문장 길이가 길거나 슬라이드 안에서 제목과 설명을 나눠 배치할 때 사용합니다.\n\n[[image:edit-lesson-text-properties/02.png|텍스트 레이어 순서 옵션]]\n\n여러 객체가 겹쳐 있을 때는 레이어 메뉴로 텍스트를 앞으로 보내거나 뒤로 보낼 수 있습니다.\n\n[[image:edit-lesson-text-properties/03.png|텍스트 객체 복제 및 삭제 옵션]]\n\n오른쪽의 복제, 삭제 버튼을 사용해 텍스트 객체를 빠르게 복제하거나 제거할 수 있습니다.",
            "텍스트 속성을 변경할 때는 아래 내용을 함께 확인하세요.\n\n- **폰트 변경**은 텍스트 객체 전체에 적용됩니다. 일부 텍스트만 선택하여 폰트를 바꾸는 방식은 지원되지 않습니다.\n\n- **폰트 크기**는 버튼으로 조절하거나 숫자 필드를 직접 클릭해 원하는 값을 입력할 수 있습니다.\n\n- 텍스트 객체가 이미지나 도형 뒤에 가려진 경우에는 레이어 순서를 조정해야 합니다.\n\n- 복제한 텍스트 객체는 원본 위에 겹쳐 생성될 수 있으므로, 복제 후 위치를 확인하세요."
      ],
      "edit-lesson-rewrite": [
            "Rewrite는 슬라이드 내 텍스트 객체를 AI가 자동으로 다듬어주는 기능입니다. 텍스트를 직접 다시 작성하지 않아도 문장의 길이, 톤, 표현 방식을 빠르게 바꿀 수 있습니다.\n\n사용 흐름은 다음과 같습니다.\n\n- Edit Lesson에서 수정할 텍스트 객체를 클릭합니다.\n\n- 상단 툴바에서 **Rewrite** 아이콘을 클릭합니다.\n\n- 드롭다운에 표시되는 변환 옵션 중 원하는 항목을 선택합니다.\n\n- AI가 텍스트를 변환하면 결과를 확인한 뒤 수업 목적에 맞게 다시 조정합니다.",
            "Rewrite 옵션은 텍스트를 수업 목적에 맞게 빠르게 바꾸는 데 사용합니다.\n\n예를 들어 긴 문장을 짧게 줄이거나, 더 쉬운 표현으로 바꾸거나, 학생에게 친숙한 톤으로 다듬는 방식으로 활용할 수 있습니다.\n\n> 현재 로컬 이미지 폴더의 캡처는 Rewrite 메뉴가 아니라 폰트 선택 드롭다운 화면에 가까워, 이 페이지에는 잘못된 이미지를 붙이지 않았습니다. Rewrite 메뉴 캡처가 추가되면 해당 문단 위에 배치하는 것이 좋습니다."
      ],
      "edit-lesson-add-text-object": [
            "[[image:edit-lesson-add-text-object/04.png|우측 툴바의 Add Text 버튼]]\n\nEdit Lesson 화면 우측 툴바에서 **T (Add Text)** 버튼을 클릭합니다.\n\n[[image:edit-lesson-add-text-object/01.png|Add Text 패널]]\n\n우측에 **Add Text** 패널이 열리며 두 가지 텍스트 유형 중 하나를 선택할 수 있습니다. 이미 슬라이드에 텍스트가 있더라도 별도의 텍스트 객체를 추가해 제목, 안내 문구, 보충 설명을 더할 수 있습니다.",
            "[[image:edit-lesson-add-text-object/02.png|Heading 텍스트 객체 추가]]\n\n### Heading\n\n크고 굵은 텍스트 객체입니다. 슬라이드의 주제, 질문, 강조 문구처럼 눈에 먼저 들어와야 하는 내용에 적합합니다. 기본 폰트 크기는 **48**입니다.\n\n[[image:edit-lesson-add-text-object/03.png|Body text 텍스트 객체 추가]]\n\n### Body text\n\n일반 본문 크기의 텍스트 객체입니다. 설명, 안내 문장, 보조 정보를 추가할 때 사용합니다. 기본 폰트 크기는 **20**입니다.",
            "원하는 유형을 클릭하면 슬라이드 중앙에 **Enter Directly** 안내 문구와 함께 텍스트 객체가 추가됩니다.\n\n추가 후에는 다음 작업을 이어서 할 수 있습니다.\n\n- 객체를 클릭해 원하는 텍스트를 바로 입력합니다.\n\n- 상단 툴바에서 폰트, 크기, 색상, 정렬을 조정합니다.\n\n- 드래그하여 슬라이드 안의 원하는 위치로 이동합니다.\n\n- 필요하면 복제하거나 삭제합니다."
      ],
      "edit-lesson-add-shape": [
            "[[image:edit-lesson-add-shape/01.png|우측 툴바의 Add Shape 버튼]]\n\nEdit Lesson 화면 우측 툴바에서 **Add Shape** 버튼을 클릭합니다.\n\n[[image:edit-lesson-add-shape/02.png|Add Shape 패널]]\n\n**Add Shape** 패널이 열리면 원하는 도형을 선택합니다. 도형은 강조 영역을 만들거나, 시각적 구분선을 추가하거나, 화살표로 흐름을 안내할 때 사용할 수 있습니다.\n\n[[image:edit-lesson-add-shape/03.png|도형이 슬라이드에 추가된 화면]]\n\n도형을 클릭하면 슬라이드 위에 선택 박스가 표시되고, 상단에 도형 속성 툴바가 나타납니다.",
            "총 **12가지** 도형을 제공합니다.\n\n**도형 9종**\n\n- 원형 3종: 정원 / 가로 타원 / 세로 타원\n\n- 사각형 3종: 정사각형 / 가로 직사각형 / 세로 직사각형\n\n- 삼각형 3종: 정삼각형 / 낮은 삼각형 / 좁고 긴 삼각형\n\n**화살표 3종**\n\n- 실선 화살표\n\n- 점선 화살표\n\n- 얇은 점선 화살표\n\n도형을 선택한 뒤에는 크기 조절 핸들을 드래그하여 크기를 바꾸고, 슬라이드 안에서 원하는 위치로 이동할 수 있습니다.",
            "[[image:edit-lesson-add-shape/05.png|도형 색상 변경]]\n\n도형 속성 툴바에서 색상 버튼을 클릭하면 컬러 피커가 열립니다. 색상 그라데이션 영역 또는 HEX 코드를 사용해 도형 색상을 변경할 수 있습니다.\n\n[[image:edit-lesson-add-shape/04.png|도형 투명도 변경]]\n\n**Opacity**에서는 도형의 투명도를 조절합니다. 배경 이미지 위에 강조 영역을 만들 때 투명도를 낮추면 내용이 가려지지 않습니다.\n\n[[image:edit-lesson-add-shape/06.png|도형 모서리 라운드 변경]]\n\n**Corner rounded**에서는 모서리 라운드 정도를 조절합니다. 사각형 도형을 부드러운 박스 형태로 만들 때 사용합니다.\n\n[[image:edit-lesson-add-shape/07.png|도형 정렬 옵션]]\n\n정렬 메뉴에서는 도형을 슬라이드의 좌측, 중앙, 우측, 상단, 중간, 하단 기준으로 맞출 수 있습니다.\n\n[[image:edit-lesson-add-shape/13.png|도형 레이어 순서 옵션]]\n\n레이어 메뉴에서는 도형을 앞으로 보내거나 뒤로 보내 겹치는 객체의 순서를 조정합니다.\n\n[[image:edit-lesson-add-shape/17.png|도형 복제 버튼]]\n\n**Duplicate** 버튼을 클릭하면 같은 도형이 복제됩니다.\n\n[[image:edit-lesson-add-shape/18.png|도형 삭제 버튼]]\n\n**Delete** 버튼을 클릭하면 선택한 도형을 삭제합니다."
      ],
      "edit-lesson-upload-image": [
            "[[image:edit-lesson-upload-image/01.png|우측 툴바의 Add Image 버튼]]\n\nEdit Lesson 화면 우측 툴바에서 **Add Image** 버튼을 클릭합니다.\n\n**Upload Image** 팝업이 열리며, 이미지를 추가하는 방법을 선택할 수 있습니다.\n\n- **From File**: 로컬에 저장된 이미지를 업로드합니다.\n\n- **Search from web**: 웹 이미지를 검색하거나 URL로 가져옵니다.",
            "[[image:edit-lesson-upload-image/02.png|From File 업로드 영역]]\n\n**From File** 탭에서 로컬에 저장된 이미지를 업로드합니다.\n\n- 업로드 영역에 이미지를 드래그 앤 드롭하거나, **Upload file** 버튼을 클릭하여 파일을 선택합니다.\n\n- 지원 형식: **png, jpg, jpeg, webp**\n\n- 파일 제한: 1개, 최대 **20MB**\n\n[[image:edit-lesson-upload-image/03.png|업로드 이미지 미리보기]]\n\n업로드 후 미리보기 화면이 나타납니다. 이미지를 확인하고 **Apply** 버튼을 클릭하면 슬라이드에 추가됩니다.\n\n[[image:edit-lesson-upload-image/04.png|슬라이드에 추가된 이미지 객체]]\n\n추가된 이미지는 슬라이드 위에서 선택, 이동, 크기 조절할 수 있습니다.",
            "[[image:edit-lesson-upload-image/07.png|Search from web 탭]]\n\n**Search from web** 탭에서 웹 이미지를 검색하여 가져올 수 있습니다.\n\n[[image:edit-lesson-upload-image/08.png|웹 이미지 검색어 입력]]\n\n- **URL 입력**: 이미지 URL을 직접 붙여넣어 가져올 수 있습니다.\n\n- **키워드 검색**: 검색어를 입력하면 관련 이미지가 그리드 형태로 표시됩니다.\n\n[[image:edit-lesson-upload-image/09.png|웹 이미지 검색 결과]]\n\n검색 결과에서 원하는 이미지를 선택합니다.\n\n[[image:edit-lesson-upload-image/10.png|웹 검색 이미지가 추가된 화면]]\n\n선택한 이미지가 슬라이드에 추가되면 위치와 크기를 조정할 수 있습니다.",
            "이미지를 추가한 뒤의 투명도, 모서리 라운드, 정렬, 레이어 순서, 복제, 삭제는 **이미지 객체 속성 변경하기** 문서에서 확인합니다.\n\n이 페이지에서는 이미지를 가져오는 방법까지만 다룹니다."
      ],
      "edit-lesson-image-properties": [
            "[[image:edit-lesson-image-properties/01.png|Opacity 패널]]\n\n**Opacity** 버튼을 클릭하면 투명도 조절 패널이 열립니다.\n\n- 슬라이더를 좌우로 드래그하거나 % 값을 직접 입력하여 조절합니다.\n\n- 범위: **0~100%**입니다.\n\n- **100%**는 완전 불투명, **0%**는 완전 투명 상태입니다.",
            "[[image:edit-lesson-image-properties/02.png|Corner rounded 패널]]\n\n**Corner rounded** 버튼을 클릭하면 모서리 라운드 패널이 열립니다.\n\n- 슬라이더로 라운드 정도를 조절합니다.\n\n- **0%**: 직각 모서리 상태입니다.\n\n[[image:edit-lesson-image-properties/03.png|Corner rounded 적용 결과]]\n\n라운드 값을 높이면 이미지 모서리가 둥글게 처리됩니다. 카드형 이미지나 프로필 이미지처럼 부드러운 형태가 필요할 때 사용합니다.",
            "[[image:edit-lesson-image-properties/04.png|이미지 정렬 옵션]]\n\n정렬 버튼을 클릭하면 6가지 정렬 옵션이 나타납니다. 슬라이드 내에서 이미지 객체의 위치를 기준에 맞게 정렬합니다.\n\n- **Align Left**: 좌측 정렬\n\n- **Align Center**: 가로 중앙 정렬\n\n- **Align Right**: 우측 정렬\n\n- **Align Top**: 상단 정렬\n\n- **Align Middle**: 세로 중앙 정렬\n\n- **Align Bottom**: 하단 정렬",
            "[[image:edit-lesson-image-properties/05.png|이미지 레이어 순서 옵션]]\n\n레이어 버튼을 클릭하면 객체의 앞뒤 순서를 조정할 수 있습니다. 여러 이미지, 텍스트, 도형이 겹쳐 있을 때 사용합니다.\n\n- **Bring to Front**: 맨 앞으로 이동\n\n- **Bring Forward**: 한 단계 앞으로 이동\n\n- **Send Backward**: 한 단계 뒤로 이동\n\n- **Send to Back**: 맨 뒤로 이동",
            "[[image:edit-lesson-image-properties/06.png|이미지 복제 버튼]]\n\n**Duplicate**를 클릭하면 이미지 객체가 동일한 속성으로 복제됩니다. 복제된 객체는 원본 위에 겹쳐 생성될 수 있으므로 위치를 확인하세요.\n\n[[image:edit-lesson-image-properties/07.png|이미지 삭제 버튼]]\n\n**Delete**를 클릭하면 선택한 이미지 객체가 삭제됩니다."
      ],
      "edit-lesson-webviewer": [
            "[[image:edit-lesson-webviewer/01.png|Web Viewer Activity 추가 화면]]\n\nEdit Lesson에서 **+ Manual** → **Embed** 카테고리 → **Web Viewer**를 선택하면 Activity가 추가됩니다.\n\nActivity가 추가되면 슬라이드 중앙에 **Add web link** 안내 문구가 표시되고, 우측 패널에 Web link 입력 영역이 나타납니다.",
            "[[image:edit-lesson-webviewer/02.png|Web link 입력 완료 화면]]\n\n우측 패널의 **Web link** 입력 필드에 표시할 웹 페이지 URL을 입력합니다.\n\n- 올바른 URL을 입력하면 슬라이드에 링크가 표시되고 패널에 **Well Done!** 확인 메시지가 나타납니다.\n\n[[image:edit-lesson-webviewer/11.png|Web link 입력 오류 상태]]\n\nURL 형식이 올바르지 않거나 링크가 비어 있으면 입력 필드에 경고 상태가 표시됩니다. 이 경우 학생 화면에 정상 링크가 표시되지 않을 수 있으므로 URL을 다시 확인합니다.\n\n> **This content cannot be embedded. The attached link will be provided.** 문구가 표시되는 경우, 해당 웹 페이지를 슬라이드 안에 직접 임베드할 수 없고 링크 버튼 형태로 제공됩니다.",
            "[[image:edit-lesson-webviewer/07.png|Web Viewer Background Color 설정 화면]]\n\n우측 패널 상단의 **Background Color** 영역에서 Web Viewer 슬라이드의 배경 색상을 변경할 수 있습니다. 컬러 피커 또는 HEX 코드를 직접 입력하여 설정합니다.",
            "[[image:edit-lesson-webviewer/03.png|Web Viewer Preview 화면]]\n\n**Preview**에서 확인하면 학생이 보는 **Audience Screen**에는 입력한 URL이 링크 버튼 형태로 표시됩니다. 학생이 버튼을 클릭하면 해당 웹 페이지로 이동할 수 있습니다.\n\n[[image:edit-lesson-webviewer/04.png|Web Viewer 모바일 Preview 화면]]\n\n**View Mobile** 토글을 켜면 모바일 기기에서 학생에게 표시되는 화면을 미리 확인할 수 있습니다."
      ],
      "edit-lesson-youtube": [
            "[[image:edit-lesson-youtube/01.png|Youtube Activity 추가 화면]]\n\nEdit Lesson에서 **+ Manual** → **Embed** 카테고리 → **Youtube**를 선택하면 Activity가 추가됩니다.",
            "[[image:edit-lesson-youtube/02.png|Youtube Link 입력 완료 화면]]\n\nYoutube Activity가 추가되면 슬라이드 중앙에 유튜브 아이콘과 함께 **Add Youtube link** 안내 문구가 표시됩니다. 우측 패널의 **Youtube Link** 입력 필드에 삽입할 YouTube 영상 URL을 입력합니다.\n\n- 올바른 YouTube URL을 입력하면 슬라이드에 영상 썸네일, 제목, 재생 버튼이 표시되고 패널에 확인 상태가 표시됩니다.\n\n[[image:edit-lesson-youtube/03.png|Youtube Link 입력 필요 상태]]\n\n링크가 비어 있거나 올바르지 않으면 **Please enter the link** 안내가 표시됩니다. 이 경우 먼저 YouTube URL을 다시 입력해야 합니다.",
            "Teaching 화면에서 슬라이드를 진행하면 삽입된 YouTube 영상이 표시됩니다. 재생 버튼을 클릭하면 영상이 바로 재생됩니다.\n\n슬라이드 좌측 하단의 링크 아이콘을 클릭하면 YouTube 원본 페이지로 이동할 수 있습니다.",
            "우측 패널 상단의 **Background Color** 영역에서 슬라이드 배경 색상을 변경할 수 있습니다."
      ],
      "edit-lesson-document": [
            "[[image:edit-lesson-document/01.png|Document Activity 추가 화면]]\n\nEdit Lesson에서 **+ Manual** → **Embed** 카테고리 → **Document**를 선택하면 Activity가 추가됩니다.\n\nDocument Activity가 추가되면 슬라이드 중앙에 **Add Document** 안내 문구가 표시되고, 우측 패널에 파일 업로드 영역이 나타납니다.",
            "[[image:edit-lesson-document/02.png|Upload Documents 팝업]]\n\n우측 패널의 **Upload file** 버튼을 클릭하면 **Upload Documents** 팝업이 열립니다.\n\n- 지원 형식: **pdf, doc, docx, pptx, ppt**\n\n- 파일 제한: 1개, 최대 **500MB**",
            "[[image:edit-lesson-document/03.png|로컬 파일 선택 화면]]\n\n파일을 가져오는 방법은 두 가지입니다.\n\n### 방법 1. From File (로컬 파일)\n\n**From File** 탭에서 파일 업로드 영역을 클릭하거나, 파일을 드래그 앤 드롭합니다. OS 파일 선택 창이 열리면 업로드할 문서를 선택합니다.\n\n### 방법 2. Google Drive\n\nGoogle Drive에 연결된 파일을 선택해 문서를 가져올 수 있습니다.\n\n> 업로드된 파일은 자동으로 Activity로 변환됩니다.",
            "[[image:edit-lesson-document/04.png|문서 페이지 미리보기 화면]]\n\n파일 업로드가 완료되면 문서의 페이지 미리보기 화면이 나타납니다.\n\n- 각 페이지 썸네일을 클릭하여 가져올 페이지를 개별 선택합니다.\n\n- **Select All Pages** 체크박스를 선택하면 모든 페이지가 한 번에 선택됩니다.\n\n[[image:edit-lesson-document/05.png|Import Pages 버튼 활성화 화면]]\n\n선택한 페이지 수가 **Import N Pages** 버튼에 표시됩니다. 버튼을 클릭하면 가져오기가 완료됩니다.",
            "[[image:edit-lesson-document/06.png|가져오기 완료 후 Edit Lesson 화면]]\n\n선택한 문서 페이지가 슬라이드 배경 이미지로 자동 변환되어 Edit Lesson에 추가됩니다. 우측 패널은 **Background Image** 설정으로 전환되며, 배경 이미지를 교체하거나 배경 색상을 추가로 조정할 수 있습니다.\n\n페이지 수만큼 슬라이드가 생성됩니다."
      ],
      "edit-lesson-sound": [
            "[[image:edit-lesson-sound/01.png|Audio 업로드 영역]]\n\n슬라이드에 사운드를 추가하려면 먼저 해당 슬라이드를 선택합니다. 슬라이드를 선택하면 오른쪽 패널에 **Background Color** 설정과 함께 **Audio** 섹션이 표시됩니다.\n\n**Audio** 섹션에는 다음 정보가 함께 표시됩니다.\n\n- **1 limit, 50MB**: 슬라이드당 오디오 파일 1개, 최대 50MB까지 업로드 가능합니다.\n\n- 지원 형식은 **mp3**입니다.\n\n[[image:edit-lesson-sound/04.png|mp3 파일 선택 화면]]\n\n**Upload file** 버튼을 클릭하면 로컬 파일 탐색기가 열립니다. 원하는 mp3 파일을 선택한 뒤 업로드합니다.\n\n> 슬라이드 1개에 오디오 파일은 1개만 첨부할 수 있습니다. 기존 파일이 있는 경우 새 파일로 교체됩니다.",
            "[[image:edit-lesson-sound/02.png|오디오 플레이어 표시 화면]]\n\n업로드가 완료되면 슬라이드 중앙에 오디오 플레이어가 표시됩니다. 플레이어에는 다음 컨트롤이 포함되어 있습니다.\n\n- **재생 / 일시정지** 버튼\n\n- **음소거** 버튼\n\n- **재생 시간** 표시\n\n- **진행 바**\n\n[[image:edit-lesson-sound/05.png|업로드된 오디오 설정 화면]]\n\n오른쪽 패널의 **Audio** 섹션에는 업로드된 파일명이 표시됩니다.",
            "슬라이드 위에 표시된 오디오 플레이어를 클릭하여 선택하면 플레이어 위에 삭제 아이콘이 나타납니다. 아이콘을 클릭하면 해당 슬라이드의 오디오가 제거됩니다.\n\n오른쪽 패널 **Audio** 섹션의 파일 삭제 버튼을 통해서도 동일하게 삭제할 수 있습니다."
      ],
      "edit-lesson-quiz-true-false": [
            "[[image:edit-lesson-quiz-true-false/06.png|Create Manually에서 True or False 선택]]\n\n**+ Manual** 버튼을 클릭하면 **Create Manually** 팝업이 열립니다. 좌측 카테고리에서 **Quiz**를 선택한 뒤 **True or False**를 클릭하면 슬라이드에 Activity가 추가됩니다.\n\n> 💡 Quiz 카테고리에는 True or False 외에도 Multiple Choice / Short Answer / Fill in the Blank / Matching / Open-Ended / Sequencing / Sorting 유형이 있습니다.\n\n[[image:edit-lesson-quiz-true-false/09.png|True or False Activity가 추가된 Edit Lesson 화면]]\n\nActivity가 추가된 슬라이드는 다음 세 가지 입력 영역으로 구성됩니다.\n\n- **Title** 영역: 문제의 핵심 질문 또는 제목을 입력합니다.\n\n- **Description** 영역: 문제에 대한 부가 설명을 입력합니다.\n\n- **Add Image** 영역: 문제와 관련된 이미지를 첨부합니다. 1개, 최대 50MB까지 업로드 가능합니다.\n\n슬라이드 하단에는 **True** 버튼(파란색 원 아이콘)과 **False** 버튼(빨간색 X 아이콘)이 고정으로 표시됩니다.\n\n[[image:edit-lesson-quiz-true-false/07.png|True or False 우측 설정 패널]]\n\n### 설정 옵션 (우측 패널)\n\n슬라이드를 선택하면 우측 패널에서 아래 항목을 설정할 수 있습니다.\n\n**Common Setting**\n\n- **3 Second's Countdown**: 토글을 켜면 문제 표시 전 3초 카운트다운이 실행됩니다.\n\n**Result form**\n\n결과 화면에 표시할 응답 집계 차트 형태를 선택합니다.\n\n- **Bar Chart**: 막대 그래프로 True / False 응답 수를 표시합니다.\n\n- **Bubble**: 버블 형태로 응답 분포를 시각화합니다.\n\n- **Half and Half**: 화면을 반반으로 나눠 True / False 비율을 비교합니다.\n\n**Time Limit**\n\n- 토글을 켜면 학생 응답 제한 시간(초)을 설정할 수 있습니다. 최대 300초까지 입력 가능합니다.\n\n> ⚠️ **Time Limit** 토글을 켠 뒤 시간을 **0**으로 두면 **\"Please set the time.\"** 경고가 표시됩니다. 반드시 1 이상의 값을 입력해야 정상 동작합니다.",
            "[[image:edit-lesson-quiz-true-false/10.png|Teaching 화면에서 True or False 시작하기]]\n\n수업을 시작하면 교사 화면에 문제가 표시되고, 우측 하단에 **Let's Begin** 버튼이 나타납니다. 화면 좌상단에는 학생 접속용 **Access Code**가 표시됩니다.\n\n**Let's Begin**을 클릭하면 학생들이 답변을 제출할 수 있는 상태가 됩니다. 학생이 접속하면 우측 하단의 참여자 수가 실시간으로 올라가며, 버튼이 **Finish Up**으로 바뀝니다.\n\n학생들이 응답을 제출하면 교사 화면 하단에 응답 수가 반영됩니다. **Finish Up**을 클릭하면 응답을 마감하고 **View Result** 버튼이 나타납니다.\n\n[[image:edit-lesson-quiz-true-false/16.png|True or False 응답 결과 Bar Chart]]\n\n**View Result**를 클릭하면 결과 화면으로 전환됩니다. Edit Lesson에서 설정한 **Result form** 형태(Bar Chart 등)로 **Correct / Wrong** 응답 수가 집계되어 표시됩니다.\n\n> 💡 교사는 **Instructor View** 버튼을 클릭하여 학생 응답 현황을 더 상세하게 확인할 수 있습니다.",
            "[[image:edit-lesson-quiz-true-false/17.png|학생 화면의 True or False 문항]]\n\n학생 화면에는 문제 번호(예: **Q1 of 7**), 질문 텍스트, 이미지(설정 시)가 표시되고, 하단에 **True**와 **False** 버튼이 나타납니다.\n\n[[image:edit-lesson-quiz-true-false/18.png|학생이 답변을 선택한 화면]]\n\n학생이 **True** 또는 **False** 버튼을 탭하면 선택한 버튼에 파란 테두리가 표시되고, 우측의 **Submit** 버튼이 활성화(파란색)됩니다. **Submit**을 누르면 답변이 제출되며, 버튼이 다시 비활성 상태로 바뀌어 중복 제출이 방지됩니다.\n\n[[image:edit-lesson-quiz-true-false/15.png|정답 공개 후 학생 피드백 화면]]\n\n교사가 결과를 공개하면 학생 화면에 **Correct** 또는 **Wrong** 피드백과 함께 **\"The correct answer is True / False\"** 메시지가 표시됩니다."
      ],
      "edit-lesson-quiz-multiple-choice": [
            "**+ Manual** 버튼 클릭 후 **Create Manually** 팝업에서 **Quiz → Multiple Choice**를 선택하면 슬라이드에 Activity가 추가됩니다.\n\n[[image:edit-lesson-quiz-multiple-choice/02.png|Multiple Choice Text-Based 편집 화면]]\n\n슬라이드는 다음 영역으로 구성됩니다.\n\n- **Title** 영역: 질문 제목을 입력합니다. 슬라이드 상단에 크게 표시됩니다.\n\n- **보기 입력 영역**: 각 보기 항목을 입력합니다. 정답으로 지정할 항목을 클릭하면 파란 테두리로 표시되어 정답으로 설정됩니다.\n\n- **+ 버튼**: 보기 항목을 추가합니다.\n\n[[image:edit-lesson-quiz-multiple-choice/04.png|정답 보기 선택 상태]]\n\n정답으로 지정할 보기를 클릭하면 해당 항목이 선택 상태로 표시됩니다. 학생이 제출한 답변은 이 정답 설정을 기준으로 Correct / Wrong으로 판정됩니다.\n\n[[image:edit-lesson-quiz-multiple-choice/05.png|Multiple Choice Image-Based 편집 화면]]\n\n### Layout Type - 보기 표시 방식 선택\n\n우측 패널의 **Layout Type**에서 보기를 표시하는 방식을 선택할 수 있습니다.\n\n- **Text-Based**: 보기를 텍스트 목록으로 표시합니다. 각 항목에 직접 텍스트를 입력하며, 화면 우측에 세로로 나열됩니다.\n\n- **Image-Based**: 보기를 이미지 썸네일로 표시합니다. 각 보기에 이미지를 업로드하면 슬라이드 하단에 이미지 카드 형태로 표시됩니다.\n\n### 설정 옵션 (우측 패널)\n\n**Common Setting**\n\n- **3 Second's Countdown**: 토글을 켜면 문제 표시 전 3초 카운트다운이 실행됩니다.\n\n**Result form**\n\n결과 화면에 표시할 집계 차트 형태를 선택합니다.\n\n- **Bar Chart**: 각 보기별 응답 수를 막대 그래프로 표시합니다.\n\n- **Bubble**: 응답 분포를 버블 형태로 시각화합니다.\n\n- **Lane Chart**: 레인 형태로 응답 분포를 표시합니다.\n\n**Time Limit**\n\n- 토글을 켜면 학생 응답 제한 시간(초)을 설정할 수 있습니다. 최대 300초까지 입력 가능합니다.",
            "[[image:edit-lesson-quiz-multiple-choice/06.png|Image-Based Multiple Choice 수업 시작 화면]]\n\n수업을 시작하면 교사 화면에 문제와 보기가 표시됩니다. 좌상단에 **Access Code**가 표시되어 학생들이 접속할 수 있습니다.\n\n- **Image-Based** 레이아웃의 경우, 이미지 카드 형태의 보기가 슬라이드 하단에 가로로 나열됩니다.\n\n[[image:edit-lesson-quiz-multiple-choice/09.png|Text-Based Multiple Choice 수업 시작 화면]]\n\n- **Text-Based** 레이아웃의 경우, 보기가 텍스트 목록으로 화면 우측에 표시됩니다.\n\n우측 하단 **Let's Begin**을 클릭하면 학생 응답이 시작됩니다. 학생이 접속하면 참여자 수가 실시간으로 증가하며 버튼이 **Finish Up**으로 바뀝니다.\n\n**Finish Up**을 클릭해 응답을 마감하면 **View Result** 버튼이 나타납니다.\n\n[[image:edit-lesson-quiz-multiple-choice/17.png|Multiple Choice 응답 결과 Bar Chart]]\n\n**View Result**를 클릭하면 설정한 **Result form** 형태로 각 보기별 응답 수가 집계된 결과 차트가 표시됩니다. 이미지 기반 결과 화면에는 이미지 썸네일이 차트 하단에 표시되고, 텍스트 기반 결과 화면에는 보기 이름(예: K2, EVEREST, BLANC, HANRA)이 표시됩니다.\n\n**See Answer** 버튼을 클릭하면 정답을 학생 화면에 공개합니다.\n\n> 💡 **Instructor View** 버튼을 클릭하면 학생별 응답 현황을 더 상세하게 확인할 수 있습니다.",
            "[[image:edit-lesson-quiz-multiple-choice/12.png|학생 화면의 Image-Based Multiple Choice 문항]]\n\n학생 화면에는 질문 텍스트, 이미지(설정 시), 보기 항목이 표시됩니다.\n\n- **Image-Based** 레이아웃: 이미지 카드 형태의 보기가 하단에 나열됩니다. 원하는 이미지를 탭하면 파란 테두리로 선택 표시가 됩니다.\n\n- **Text-Based** 레이아웃: 텍스트 보기 목록이 표시되며, 원하는 항목을 탭하면 체크 표시와 함께 선택됩니다.\n\n[[image:edit-lesson-quiz-multiple-choice/13.png|학생이 보기를 선택한 화면]]\n\n보기를 선택하면 **Submit** 버튼이 활성화(파란색)됩니다. **Submit**을 누르면 답변이 제출되고 버튼이 비활성 상태로 바뀌어 중복 제출이 방지됩니다.\n\n[[image:edit-lesson-quiz-multiple-choice/01.png|정답 공개 후 학생 피드백 화면]]\n\n교사가 정답을 공개하면 학생 화면에 **Correct** 또는 **Wrong** 피드백과 함께 **\"The correct answer is\"** 메시지가 표시됩니다."
      ],
      "edit-lesson-quiz-short-answer": [
            "[[image:edit-lesson-quiz-short-answer/01.png|Short Answer 편집 화면]]\n\n**+ Manual** 버튼 클릭 후 **Create Manually** 팝업에서 **Quiz → Short Answer**를 선택하면 슬라이드에 Activity가 추가됩니다.\n\n슬라이드는 다음 영역으로 구성됩니다.\n\n- **Title** 영역: 질문을 입력합니다. 슬라이드 상단에 크게 표시됩니다.\n\n- **이미지 영역**: 문제와 관련된 이미지를 첨부할 수 있습니다.\n\n- **정답 입력 영역**: 교사가 허용할 정답 텍스트를 입력합니다.\n\n[[image:edit-lesson-quiz-short-answer/02.png|허용 정답을 여러 개 등록한 화면]]\n\n**+** 버튼으로 정답을 추가하면 동의어나 유사 표현도 모두 정답으로 인정됩니다. 예를 들어 `Mantle`, `the mantle`, `Earth's mantle`처럼 같은 의미의 답안을 함께 등록할 수 있습니다.\n\n슬라이드 하단에는 **Write your Answer** 플레이스홀더가 표시되어 학생 입력 영역임을 나타냅니다.\n\n### 설정 옵션 (우측 패널)\n\n**Common Setting**\n\n- **3 Second's Countdown**: 토글을 켜면 문제 표시 전 3초 카운트다운이 실행됩니다.\n\n**Result form**\n\n결과 화면 표시 형태를 선택합니다.\n\n- **Card**: 학생들의 답변이 카드 형태로 화면에 표시됩니다.\n\n- **Speech Bubble**: 말풍선 형태로 답변을 표시합니다.\n\n- **Half and Half**: 화면을 반분하여 결과를 표시합니다.",
            "[[image:edit-lesson-quiz-short-answer/03.png|Short Answer 수업 시작 화면]]\n\n수업 화면에는 질문과 이미지, 그리고 **\"Write the correct answer.\"** 안내 말풍선이 표시됩니다. 좌상단의 **Access Code**로 학생들이 접속할 수 있습니다.\n\n**Let's Begin**을 클릭하면 학생 응답이 시작됩니다. 학생이 접속하면 참여자 수가 늘어나고 버튼이 **Finish Up**으로 바뀝니다.\n\n[[image:edit-lesson-quiz-short-answer/09.png|Submitted / Not Submitted 패널]]\n\n**Instructor View**를 클릭하면 오버레이 패널이 열리며 **Submitted / Not Submitted** 목록으로 학생별 제출 현황을 확인할 수 있습니다. 패널 상단의 **Show Correct/Incorrect** 토글을 켜면 각 학생의 정오 여부도 함께 표시됩니다.\n\n[[image:edit-lesson-quiz-short-answer/10.png|Short Answer 제출 결과 화면]]\n\n**Finish Up**으로 응답을 마감하면 결과 화면으로 전환됩니다. 설정한 **Result form** 형태(Card 등)로 학생들이 제출한 답변이 표시되고, 응답한 학생 수도 함께 확인할 수 있습니다. **See Answer** 버튼을 클릭하면 교사가 등록한 정답을 학생 화면에 공개합니다.",
            "[[image:edit-lesson-quiz-short-answer/17.png|Short Answer 학생 대기 화면]]\n\n교사가 수업을 시작하기 전에는 학생 화면에 **\"Please wait until your teacher starts the activity.\"** 대기 메시지가 표시됩니다.\n\n[[image:edit-lesson-quiz-short-answer/06.png|학생이 Short Answer 답변을 입력한 화면]]\n\n교사가 **Let's Begin**을 클릭하면 답변 입력 화면이 나타납니다. 학생은 텍스트 필드에 직접 답변을 입력한 뒤 **Submit**을 눌러 제출합니다.\n\n[[image:edit-lesson-quiz-short-answer/19.png|Short Answer 정답 공개 화면]]\n\n교사가 **See Answer**로 정답을 공개하면 학생 화면에 **Correct** 또는 **Wrong** 피드백과 함께 교사가 등록한 모든 허용 정답 목록이 표시됩니다."
      ],
      "edit-lesson-quiz-fill-blank": [
            "[[image:edit-lesson-quiz-fill-blank/03.png|Fill in the Blank 직접 입력 화면]]\n\n**+ Manual** 버튼 클릭 후 **Create Manually** 팝업에서 **Quiz → Fill in the Blank**를 선택하면 Activity가 추가됩니다.\n\n슬라이드는 다음 영역으로 구성됩니다.\n\n- **Title** 영역: 문제 제목을 입력합니다. 예: `What word goes in the blank?`\n\n- 입력 예시: `About 70% of the Earth's surface is covered by [water]`\n\n[[image:edit-lesson-quiz-fill-blank/04.png|대괄호 입력 후 빈칸으로 변환된 화면]]\n\n슬라이드 미리보기에서 대괄호로 감싼 단어는 **?????** 타일로 자동 변환되어 표시됩니다.\n\n> 💡 입력란 상단에 **\"Wrap the words that you want to mark with [ ].\"** 안내 문구가 표시됩니다. 빈칸으로 만들 단어 양쪽에 `[`와 `]`를 붙여 입력하세요.\n\n### 설정 옵션 (우측 패널)\n\n**Common Setting**\n\n- **3 Second's Countdown**: 토글을 켜면 문제 표시 전 3초 카운트다운이 실행됩니다.\n\n**Result form**\n\n- **Bar Chart**: Correct / Wrong 응답 수를 막대 그래프로 표시합니다.\n\n- **Bubble**: 정답/오답 비율을 버블 형태로 시각화합니다.\n\n- **Half and Half**: 화면을 반분하여 Correct / Wrong 수를 비교합니다.\n\n**Time Limit**\n\n- 토글을 켜면 학생 응답 제한 시간(초)을 설정할 수 있습니다.",
            "[[image:edit-lesson-quiz-fill-blank/07.png|Fill in the Blank 수업 시작 화면]]\n\n수업 화면 상단에 문제 제목이 파란색으로 크게 표시되고, 중앙에 빈칸이 포함된 문장이 **?????** 타일 형태로 표시됩니다. 하단에는 **\"Write the correct answer.\"** 안내 말풍선이 보입니다.\n\n**Let's Begin**을 클릭하면 학생 응답이 시작되고, 학생 참여 후 버튼이 **Finish Up**으로 바뀝니다.\n\n[[image:edit-lesson-quiz-fill-blank/06.png|Fill in the Blank 결과 Bar Chart]]\n\n응답 마감 후 **View Result**를 클릭하면 설정한 Result form으로 **Correct / Wrong** 집계 결과가 표시됩니다.\n\n[[image:edit-lesson-quiz-fill-blank/09.png|Fill in the Blank 정답 공개 화면]]\n\n**See Answer** 버튼으로 정답을 공개합니다.",
            "[[image:edit-lesson-quiz-fill-blank/11.png|학생 화면의 Fill in the Blank 문항]]\n\n학생 화면에는 문제 제목과 빈칸이 포함된 문장이 **?????** 타일로 표시됩니다.\n\n[[image:edit-lesson-quiz-fill-blank/12.png|학생이 답변을 입력한 화면]]\n\n하단 입력 필드(**Write your Answer / Enter Answer**)에 답을 직접 입력하면 **Submit** 버튼이 활성화됩니다. **Submit**을 눌러 제출합니다.\n\n[[image:edit-lesson-quiz-fill-blank/14.png|Fill in the Blank 학생 정답 피드백 화면]]\n\n교사가 **See Answer**로 정답을 공개하면 학생 화면에 **Correct** 또는 **Wrong** 피드백과 함께 **\"The correct answer is [정답]\"** 메시지가 표시됩니다."
      ],
      "edit-lesson-quiz-matching": [
            "[[image:edit-lesson-quiz-matching/01.png|Matching 편집 화면]]\n\n**+ Manual** 버튼 클릭 후 **Create Manually** 팝업에서 **Quiz → Matching**을 선택하면 Activity가 추가됩니다.\n\n슬라이드는 좌측 항목(1, 2, 3, 4…)과 우측 항목(A, B, C, D…)을 연결선으로 이어주는 구조로 구성됩니다.\n\n### Layout Type\n\n우측 패널의 **Layout Type**에서 항목 표시 방식을 선택합니다.\n\n- **Text-Based**: 좌우 항목을 텍스트로 입력합니다. 수업 중 학생이 텍스트 항목 사이를 선으로 연결합니다.\n\n- **Image-Based**: 좌우 항목에 이미지를 업로드합니다. 수업 중 이미지 카드 사이를 선으로 연결합니다.\n\nEdit Lesson 미리보기에서 정답 연결선이 교차하는 형태로 표시되어 매칭 구조를 확인할 수 있습니다.\n\n### 설정 옵션 (우측 패널)\n\n**Common Setting**\n\n- **3 Second's Countdown**: 토글을 켜면 문제 표시 전 3초 카운트다운이 실행됩니다.\n\n**Result form**\n\n- **Bar Chart**: 정답/오답 수를 막대 그래프로 집계합니다.",
            "[[image:edit-lesson-quiz-matching/02.png|Text-Based Matching 수업 시작 화면]]\n\n수업 화면에는 문제 제목과 좌우 항목이 표시됩니다.\n\n- **Text-Based**: 좌측에 번호(1~4)가 붙은 텍스트 항목, 우측에 알파벳(A~D)이 붙은 설명 항목이 표시됩니다.\n\n[[image:edit-lesson-quiz-matching/07.png|Image-Based Matching 수업 시작 화면]]\n\n- **Image-Based**: 좌측에 번호가 붙은 이미지 카드, 우측에 알파벳이 붙은 이미지 카드가 표시됩니다.\n\n**Let's Begin**을 클릭하면 학생 응답이 시작됩니다.\n\n[[image:edit-lesson-quiz-matching/10.png|Matching 제출 현황 패널]]\n\n**Instructor View**를 클릭하면 **Submitted / Not Submitted** 패널이 열리며, **Show Correct/Incorrect** 토글을 켜면 각 학생의 정오 여부를 컬러로 확인할 수 있습니다.\n\n[[image:edit-lesson-quiz-matching/12.png|Image-Based Matching 결과 화면]]\n\n응답 마감 후 결과 화면에서는 학생들의 매칭 현황이 표시되며, **See Answer** 버튼으로 정답 연결선을 공개합니다.",
            "[[image:edit-lesson-quiz-matching/13.png|학생이 Text-Based Matching을 연결한 화면]]\n\n학생 화면에는 좌우 항목과 각 항목 옆 연결 포인트(원형 버튼)가 표시됩니다. 학생은 좌측 항목의 포인트를 탭한 뒤 우측 항목의 포인트로 드래그하여 연결선을 그립니다. 각 항목은 색상으로 구분됩니다.\n\n[[image:edit-lesson-quiz-matching/16.png|학생이 Image-Based Matching을 연결한 화면]]\n\n모든 항목을 연결하면 하단의 **Submit** 버튼을 눌러 제출합니다.\n\n[[image:edit-lesson-quiz-matching/18.png|Matching 정답 공개 화면]]\n\n교사가 **See Answer**로 정답을 공개하면 학생 화면에 **Correct** 또는 **Wrong** 피드백과 함께 정답 연결선이 표시됩니다.\n\n- **Image-Based** 정답 화면: 올바르게 매칭된 이미지 쌍이 테두리와 함께 표시됩니다.\n\n- **Text-Based** 정답 화면: 정답 연결선이 색상으로 표시되어 올바른 매칭을 확인할 수 있습니다."
      ],
      "edit-lesson-quiz-open-ended": [
            "[[image:edit-lesson-quiz-open-ended/01.png|Open-Ended 편집 화면]]\n\n**+ Manual** 버튼 클릭 후 **Create Manually** 팝업에서 **Quiz → Open-Ended**를 선택하면 Activity가 추가됩니다.\n\n슬라이드 중앙에는 질문 제목과 부제, 그리고 학생이 답변을 입력할 텍스트 박스가 표시됩니다. 미리보기에서는 샘플 답변이 텍스트 박스에 표시됩니다.\n\n### 설정 옵션 (우측 패널)\n\n**Background Color**\n\n- 색상 피커에서 슬라이드 배경색을 자유롭게 변경합니다. Hex 코드를 직접 입력할 수도 있습니다.\n\n**Common Setting**\n\n- **1 Second's Countdown**: 토글을 켜면 문제 표시 전 1초 카운트다운이 실행됩니다.\n\n**Time Limit**\n\n- 토글을 켜면 답변 제출 제한 시간을 설정할 수 있습니다. 꺼진 상태에서는 시간 제한 없이 진행됩니다.",
            "[[image:edit-lesson-quiz-open-ended/02.png|Open-Ended 수업 시작 화면]]\n\n수업 화면에는 질문 제목, 부제, 그리고 중앙에 관련 이미지가 표시됩니다. 하단에 **Write the correct answer.** 버튼이 나타나며, 교사는 이 버튼을 눌러 모범 답안을 미리 입력해 둘 수 있습니다.\n\n**Let's Begin**을 클릭하면 학생 응답이 시작됩니다. 학생들이 답변을 제출하는 동안 우측 상단의 **Instructor View**를 클릭하면 제출 현황(Submitted / Not Submitted)을 확인할 수 있습니다.\n\n[[image:edit-lesson-quiz-open-ended/04.png|Open-Ended 모범 답안 공개 화면]]\n\n응답 수집이 완료되면 **Finish Up**을 클릭합니다. 그러면 교사가 사전에 입력한 모범 답안이 **The correct answer is** 형태로 화면에 공개됩니다. 이후 **View Result** 버튼을 눌러 학생 응답 결과 화면으로 이동합니다.",
            "[[image:edit-lesson-quiz-open-ended/05.png|학생 화면의 Open-Ended 입력 전 상태]]\n\n학생 화면에는 질문 제목, 부제, 관련 이미지가 표시되고, 좌측에 **Enter Answer** 입력 박스와 우측에 **Write your Answer** 레이블과 **Submit** 버튼이 나타납니다.\n\n[[image:edit-lesson-quiz-open-ended/06.png|학생이 Open-Ended 답변을 입력한 화면]]\n\n학생이 텍스트 박스를 탭하여 자신의 답변을 자유롭게 입력합니다. 입력이 완료되면 **Submit** 버튼이 활성화(파란색)되어 제출할 수 있습니다.\n\n[[image:edit-lesson-quiz-open-ended/08.png|Open-Ended 제출 완료 화면]]\n\n제출 후에는 **Your answer is** 메시지와 함께 본인이 작성한 답변이 화면에 표시되며, 캐릭터 애니메이션으로 제출 완료를 안내합니다."
      ],
      "edit-lesson-quiz-sequencing": [
            "[[image:edit-lesson-quiz-sequencing/01.png|Sequencing Image-Based 편집 화면]]\n\n**+ Manual** 버튼 클릭 후 **Create Manually** 팝업에서 **Quiz → Sequencing**을 선택하면 Activity가 추가됩니다.\n\n### Layout Type\n\n우측 패널의 **Layout Type**에서 항목 표시 방식을 선택합니다.\n\n- **Image-Based**: 각 항목에 이미지를 업로드합니다. 슬라이드에 번호가 매겨진 순서 슬롯(1→2→3…)과 이미지 카드가 표시됩니다.\n\n[[image:edit-lesson-quiz-sequencing/02.png|Sequencing Text-Based 편집 화면]]\n\n- **Text-Based**: 순서에 맞게 배열할 텍스트 항목을 입력합니다. 학생 화면에서는 텍스트 항목을 드래그하여 순서 슬롯에 배치합니다.\n\n### 설정 옵션 (우측 패널)\n\n**Common Setting**\n\n- **3 Second's Countdown**: 토글을 켜면 문제 표시 전 3초 카운트다운이 실행됩니다.\n\n**Result form**\n\n- **Bar Chart**: Correct / Wrong 응답 수를 막대 그래프로 표시합니다.\n\n**Time Limit**\n\n- 토글을 켜면 학생 응답 제한 시간(초)을 설정할 수 있습니다.",
            "[[image:edit-lesson-quiz-sequencing/11.png|Image-Based Sequencing 수업 시작 화면]]\n\n### Image-Based\n\n수업 화면 상단에는 번호가 매겨진 빈 슬롯(1→2→3→4→5)이 표시되고, 하단에는 섞인 이미지 카드들이 나열됩니다.\n\n**Let's Begin**을 클릭하면 학생 응답이 시작됩니다. **Instructor View**를 클릭하면 **Submitted / Not Submitted** 패널이 열립니다. **Show Correct/Incorrect** 토글을 끈 상태에서는 제출 여부만, 켠 상태에서는 정오 여부까지 확인할 수 있습니다.\n\n[[image:edit-lesson-quiz-sequencing/17.png|Image-Based Sequencing 결과 Bar Chart]]\n\n응답을 마감하면 **View Result** 버튼으로 결과 화면을 확인합니다. 결과 화면에서는 Correct / Wrong 수가 그래프로 표시됩니다.\n\n[[image:edit-lesson-quiz-sequencing/19.png|Text-Based Sequencing 수업 시작 화면]]\n\n### Text-Based\n\nText-Based 레이아웃에서는 좌측에 순서 슬롯, 우측에 텍스트 항목 목록이 표시됩니다. 학생은 텍스트 항목을 올바른 순서로 배치해야 합니다.\n\n[[image:edit-lesson-quiz-sequencing/22.png|Text-Based Sequencing 정답 공개 화면]]\n\n**See Answer** 버튼을 클릭하면 올바른 순서가 공개됩니다.",
            "[[image:edit-lesson-quiz-sequencing/24.png|학생 화면의 Image-Based Sequencing 문항]]\n\n### Image-Based\n\n상단에 번호 슬롯(1→2→3…), 하단에 섞인 이미지 카드가 표시됩니다. 우측 하단의 안내 문구 **Drag & drop options to the deck in order**에 따라, 하단 카드를 드래그하여 상단 슬롯에 차례로 배치합니다.\n\n[[image:edit-lesson-quiz-sequencing/26.png|Image-Based Sequencing 제출 가능 상태]]\n\n모든 슬롯이 채워지면 **Submit** 버튼이 활성화(파란색)됩니다.\n\n[[image:edit-lesson-quiz-sequencing/23.png|Image-Based Sequencing 정답 피드백 화면]]\n\n교사가 정답을 공개하면 학생 화면에 Correct / Wrong 피드백과 함께 올바른 순서가 표시됩니다.\n\n[[image:edit-lesson-quiz-sequencing/29.png|학생 화면의 Text-Based Sequencing 문항]]\n\n### Text-Based\n\n화면 좌측에 번호 슬롯, 우측에 텍스트 항목 목록이 표시됩니다. 학생은 항목을 드래그해 왼쪽 슬롯에 순서대로 배치합니다.\n\n[[image:edit-lesson-quiz-sequencing/33.png|Text-Based Sequencing 제출 가능 상태]]\n\n모든 항목이 배치되면 **Submit** 버튼이 활성화됩니다.\n\n[[image:edit-lesson-quiz-sequencing/38.png|Text-Based Sequencing 정답 피드백 화면]]\n\n정답 공개 후에는 올바른 텍스트 순서가 표시되어 학생이 자신의 배열과 비교할 수 있습니다."
      ],
      "edit-lesson-quiz-sorting": [
            "[[image:edit-lesson-quiz-sorting/01.png|Sorting Image-Based 편집 화면]]\n\n**+ Manual** 버튼 클릭 후 **Create Manually** 팝업에서 **Quiz → Sorting**을 선택하면 Activity가 추가됩니다.\n\n슬라이드 상단에는 그룹 박스(Group A, Group B…)가 배치되고, 하단에는 분류할 항목들이 나열됩니다.\n\n[[image:edit-lesson-quiz-sorting/05.png|Image-Based Sorting 정답 배치 화면]]\n\nImage-Based에서는 이미지를 각 그룹에 드래그하여 정답 분류를 구성합니다. 학생은 수업 중 같은 방식으로 이미지를 그룹에 배치합니다.\n\n[[image:edit-lesson-quiz-sorting/08.png|Sorting Text-Based 편집 화면]]\n\n### Layout Type\n\n우측 패널의 **Layout Type**에서 항목 표시 방식을 선택합니다.\n\n- **Image-Based**: 이미지를 그룹에 드래그하여 분류합니다.\n\n- **Text-Based**: 텍스트 항목을 그룹에 드래그하여 분류합니다.\n\n### 설정 옵션 (우측 패널)\n\n**Common Setting**\n\n- **3 Second's Countdown**: 토글을 켜면 문제 표시 전 3초 카운트다운이 실행됩니다.\n\n**Result form**\n\n- **Bar Chart**: Correct / Wrong 응답 수를 막대 그래프로 표시합니다.",
            "[[image:edit-lesson-quiz-sorting/09.png|Image-Based Sorting 수업 시작 화면]]\n\n### Image-Based\n\n수업 화면 상단에는 그룹 박스(Animal, Plant 등)가 표시되고, 하단에는 분류할 이미지 카드들이 나열됩니다. 각 박스 안에 **Sort options by drag & drop** 안내 문구가 표시됩니다.\n\n**Let's Begin**을 클릭하면 학생 응답이 시작됩니다. **Instructor View**를 클릭하면 **Submitted / Not Submitted** 패널로 제출 현황을 확인할 수 있습니다.\n\n[[image:edit-lesson-quiz-sorting/16.png|Image-Based Sorting 결과 Bar Chart]]\n\n응답을 마감하면 **View Result** 버튼으로 결과 화면을 확인합니다. 결과 화면에서는 Correct / Wrong 응답 수가 그래프로 표시됩니다.\n\n[[image:edit-lesson-quiz-sorting/17.png|Text-Based Sorting 수업 시작 화면]]\n\n### Text-Based\n\nText-Based 레이아웃에서는 좌측에 그룹 박스, 우측에 텍스트 항목 목록이 표시됩니다.\n\n[[image:edit-lesson-quiz-sorting/19.png|Text-Based Sorting 정답 공개 화면]]\n\n**See Answer** 버튼을 클릭하면 각 그룹에 들어가야 하는 정답 항목이 공개됩니다.",
            "[[image:edit-lesson-quiz-sorting/21.png|학생 화면의 Image-Based Sorting 문항]]\n\n### Image-Based\n\n화면 상단에 그룹 박스(Animal, Plant 등), 하단에 섞인 이미지 카드가 표시됩니다. 우측 하단의 **Choose your answer** 안내에 따라, 하단 이미지를 드래그하여 해당 그룹 박스에 배치합니다.\n\n[[image:edit-lesson-quiz-sorting/24.png|Image-Based Sorting 제출 가능 상태]]\n\n모든 이미지를 그룹 박스에 배치하면 **Submit** 버튼이 활성화(파란색)됩니다.\n\n[[image:edit-lesson-quiz-sorting/26.png|Image-Based Sorting 정답 피드백 화면]]\n\n정답 공개 후에는 올바른 그룹 분류가 표시됩니다.\n\n[[image:edit-lesson-quiz-sorting/27.png|학생 화면의 Text-Based Sorting 문항]]\n\n### Text-Based\n\n화면 좌측에 그룹 박스, 우측에 텍스트 항목 목록이 표시됩니다. 학생은 항목을 드래그하여 알맞은 그룹에 배치합니다.\n\n[[image:edit-lesson-quiz-sorting/28.png|Text-Based Sorting 제출 가능 상태]]\n\n모든 항목을 분류하면 **Submit** 버튼이 활성화됩니다.\n\n[[image:edit-lesson-quiz-sorting/30.png|Text-Based Sorting 정답 피드백 화면]]\n\n교사가 정답을 공개하면 학생 화면에 Correct / Wrong 피드백과 함께 올바른 텍스트 분류가 표시됩니다."
      ],
      "edit-lesson-discussion-agree-disagree": [
            "[[image:edit-lesson-discussion-agree-disagree/03.png|Agree / Disagree 편집 화면]]\n\n**Agree / Disagree** 활동을 추가하면 학생이 주제에 대해 찬성 또는 반대 의견을 선택하고, 선택 이유를 작성할 수 있는 화면이 생성됩니다.\n\n**화면 구성:**\n\n- 질문 제목과 설명 문구를 입력합니다.\n\n- 관련 이미지를 추가하여 학생이 주제를 이해하기 쉽게 구성할 수 있습니다.\n\n- 학생 화면에는 **Agree**와 **Disagree** 두 선택지가 표시됩니다.\n\n**오른쪽 패널 설정 항목:**\n\n- **Background Color**: 활동 화면의 배경 색상을 선택합니다.\n\n- **3 Second's Countdown**: 활동 시작 전 3초 카운트다운 표시 여부를 설정합니다.\n\n- **Write comments after voting**: 학생이 선택 후 의견을 작성할 수 있도록 합니다.\n\n- **Bar Chart / Bubble / Lane Chart**: 결과 화면 표시 방식을 선택합니다.\n\n> ⚠️ 단순 찬반 확인이 아니라 토론 자료로 활용하려면 **Write comments after voting**을 켜두는 것이 좋습니다.",
            "[[image:edit-lesson-discussion-agree-disagree/04.png|Agree / Disagree 수업 시작 화면]]\n\n수업 화면에서 **Agree / Disagree** 슬라이드로 이동하면 질문, 설명, 이미지, 찬성/반대 버튼이 표시됩니다. 우측 하단의 **Let's Begin** 버튼을 클릭하여 학생 참여를 시작합니다.\n\n학생들이 의견을 제출하면 **Finish Up**으로 활동을 종료하고, 이후 **View Result** 버튼으로 결과 화면을 확인합니다.\n\n[[image:edit-lesson-discussion-agree-disagree/09.png|Agree / Disagree 결과 Bar Chart]]\n\n결과 화면에서는 Agree / Disagree 응답 수가 선택한 Result form에 맞춰 표시됩니다.\n\n[[image:edit-lesson-discussion-agree-disagree/10.png|Agree / Disagree 의견 카드 화면]]\n\n**See Opinion** 버튼을 클릭하면 학생들이 작성한 의견을 카드 형태로 확인할 수 있습니다. 상단의 **Agree / Disagree** 필터를 클릭하면 선택한 의견만 모아서 볼 수 있습니다.",
            "[[image:edit-lesson-discussion-agree-disagree/12.png|학생 화면의 Agree / Disagree 문항]]\n\n학생 화면에는 질문, 설명, 이미지, 그리고 **Agree / Disagree** 버튼이 표시됩니다.\n\n[[image:edit-lesson-discussion-agree-disagree/13.png|학생이 Agree를 선택한 화면]]\n\n학생이 **Agree** 또는 **Disagree**를 선택하면 선택한 버튼에 파란 테두리가 표시되고, **Write Opinion** 버튼이 활성화됩니다.\n\n[[image:edit-lesson-discussion-agree-disagree/15.png|학생이 의견을 작성하는 화면]]\n\n**Write Opinion** 버튼을 클릭하면 선택한 입장이 크게 표시되고, 하단 입력창에 의견을 작성할 수 있습니다. 의견 작성 후 **Submit**을 클릭해 제출합니다.\n\n[[image:edit-lesson-discussion-agree-disagree/22.png|Agree 의견 제출 완료 화면]]\n\n제출 후에는 **Your opinion is** 문구와 함께 학생이 선택한 입장과 작성한 의견이 표시됩니다."
      ],
      "edit-lesson-discussion-opinion-scale": [
            "**Opinion Scale**은 학생이 하나의 문장이나 질문에 대해 동의 정도를 단계별로 선택하고 의견을 작성하는 Discussion Activity입니다.\n\n학생 화면에는 **Strongly Agree / Agree / Neutral / Disagree / Strongly Disagree** 5단계 스케일이 표시됩니다. 정답/오답이 없는 활동이므로, 학생 개개인의 의견과 근거를 이끌어내는 데 적합합니다.",
            "[[image:edit-lesson-discussion-opinion-scale/01.png|Opinion Scale 편집 화면]]\n\n**화면 구성:**\n\n- 질문 제목과 설명 문구를 입력합니다.\n\n- 관련 이미지를 추가할 수 있습니다.\n\n- 학생 화면에는 5단계 스케일이 표시됩니다.\n\n**오른쪽 패널 설정 항목:**\n\n- **Background Color**: 활동 화면의 배경 색상을 선택합니다.\n\n- **3 Second's Countdown**: 활동 시작 전 카운트다운 표시 여부를 설정합니다.\n\n- **Write comments after voting**: 학생이 선택 후 의견을 작성할 수 있도록 합니다.\n\n- **Bar Chart / Bubble / Lane Chart**: 결과 표시 방식을 선택합니다.",
            "[[image:edit-lesson-discussion-opinion-scale/03.png|Opinion Scale 수업 시작 화면]]\n\n수업 화면에서 **Opinion Scale** 슬라이드로 이동하면 질문, 설명, 이미지, 5단계 스케일이 표시됩니다. 우측 하단의 **Let's Begin** 버튼을 클릭하여 학생 참여를 시작합니다.\n\n학생들이 응답을 제출하면 **Finish Up**으로 활동을 종료하고, **View Result** 버튼으로 결과 화면을 확인합니다.\n\n[[image:edit-lesson-discussion-opinion-scale/08.png|Opinion Scale 결과 Bar Chart]]\n\n결과 화면에서는 5개 선택지별 응답 수가 그래프로 표시됩니다.\n\n[[image:edit-lesson-discussion-opinion-scale/10.png|Opinion Scale 의견 카드 화면]]\n\n**See Opinion** 버튼을 클릭하면 학생 의견을 카드 형태로 확인할 수 있습니다. 상단 필터를 사용해 특정 선택지의 의견만 모아볼 수 있습니다.",
            "[[image:edit-lesson-discussion-opinion-scale/16.png|학생 화면의 Opinion Scale 문항]]\n\n학생 화면에는 질문, 설명, 이미지, 5단계 스케일이 표시됩니다.\n\n[[image:edit-lesson-discussion-opinion-scale/17.png|학생이 Strongly Agree를 선택한 화면]]\n\n학생은 스케일 위의 원하는 위치를 선택합니다. 선택한 위치가 체크 표시로 강조되고 **Write Opinion** 버튼이 활성화됩니다.\n\n[[image:edit-lesson-discussion-opinion-scale/23.png|Opinion Scale 의견 작성 화면]]\n\n**Write Opinion** 버튼을 클릭하면 선택한 포지션이 큰 원형 버블로 표시되고, 하단 입력창에 의견을 작성할 수 있습니다.\n\n[[image:edit-lesson-discussion-opinion-scale/30.png|Opinion Scale 제출 완료 화면]]\n\n의견 제출 후에는 **Your opinion is** 문구와 함께 선택한 단계와 작성한 의견이 표시됩니다."
      ],
      "edit-lesson-discussion-traffic-light": [
            "**Traffic Light**는 학생이 초록, 노랑, 빨강 신호등 색상으로 자신의 의견을 빠르게 표현하는 Discussion Activity입니다.\n\n색상은 각각 🟢 **Agree**, 🟡 **Neutral**, 🔴 **Disagree**를 의미합니다. 빠른 입장 확인과 짧은 의견 수집이 필요한 토론 수업에 적합합니다.",
            "[[image:edit-lesson-discussion-traffic-light/01.png|Traffic Light 편집 화면]]\n\n**화면 구성:**\n\n- 🟢 **Agree**: 동의함\n\n- 🟡 **Neutral**: 잘 모르겠음 / 중립\n\n- 🔴 **Disagree**: 반대함\n\n- 색상 의미를 설명하는 부제 문구가 함께 표시됩니다.\n\n**오른쪽 패널 설정 항목:**\n\n- **Background Color**: 활동 화면의 배경 색상을 선택합니다.\n\n- **3 Second's Countdown**: 활동 시작 전 카운트다운 표시 여부를 설정합니다.\n\n- **Write comments after voting**: 학생이 색상을 선택한 후 이유를 작성할 수 있도록 합니다.\n\n- **Bar Chart / Bubble / Lane Chart**: 결과 표시 방식을 선택합니다.",
            "[[image:edit-lesson-discussion-traffic-light/03.png|Traffic Light 수업 시작 화면]]\n\n수업 화면에서 **Traffic Light** 슬라이드로 이동하면 질문과 신호등 3개 버튼이 표시됩니다. 우측 하단의 **Let's Begin** 버튼을 클릭하여 학생 참여를 시작합니다.\n\n학생들이 의견을 제출하면 **Finish Up**으로 활동을 종료하고, **View Result** 버튼으로 결과 화면을 확인합니다.\n\n[[image:edit-lesson-discussion-traffic-light/07.png|Traffic Light 결과 Bar Chart]]\n\n결과 화면에서는 Agree / Neutral / Disagree 응답 분포가 그래프로 표시됩니다.\n\n[[image:edit-lesson-discussion-traffic-light/08.png|Traffic Light 의견 카드 화면]]\n\n**See Opinion** 버튼을 클릭하면 각 색상을 선택한 학생들의 의견을 카드 형태로 확인할 수 있습니다. 상단 필터를 사용해 원하는 카테고리만 볼 수 있습니다.",
            "[[image:edit-lesson-discussion-traffic-light/15.png|학생 화면의 Traffic Light 문항]]\n\n학생 화면에는 질문, 이미지, 세 가지 신호등 버튼(**Agree / Neutral / Disagree**)이 표시됩니다.\n\n[[image:edit-lesson-discussion-traffic-light/16.png|학생이 Agree를 선택한 화면]]\n\n학생이 색상을 선택하면 선택한 버튼 주위에 파란색 테두리가 생기고 **Write Opinion** 버튼이 활성화됩니다.\n\n[[image:edit-lesson-discussion-traffic-light/19.png|Traffic Light 의견 작성 화면]]\n\n**Write Opinion** 버튼을 클릭하면 선택한 색상이 큰 원형 버블로 표시되고, 하단 입력창에 의견을 작성할 수 있습니다.\n\n[[image:edit-lesson-discussion-traffic-light/20.png|Traffic Light 의견 제출 후 화면]]\n\n의견을 제출하면 버튼이 비활성화되어 중복 제출을 방지합니다."
      ],
      "edit-lesson-discussion-vote": [
            "**Vote**는 학생들이 여러 선택지 중 하나에 투표하고, 필요하면 선택 이유를 작성하는 Discussion Activity입니다.\n\n이미지 기반(Image-Based)과 텍스트 기반(Text-Based) 두 가지 레이아웃을 지원합니다. 정답/오답이 없는 활동이므로 학생들의 선호, 선택 이유, 의견 차이를 확인하는 데 적합합니다.",
            "[[image:edit-lesson-discussion-vote/01.png|Vote Text-Based 편집 화면]]\n\nText-Based는 선택지를 텍스트 목록으로 표시합니다.\n\n[[image:edit-lesson-discussion-vote/02.png|Vote Image-Based 편집 화면]]\n\nImage-Based는 각 선택지에 이미지를 첨부하여 카드 형태로 표시합니다.\n\n**화면 구성:**\n\n- 각 선택지 오른쪽의 **×** 버튼을 클릭하여 선택지를 삭제할 수 있습니다.\n\n- 하단의 **+** 버튼을 클릭하면 새 선택지를 추가할 수 있습니다.\n\n**오른쪽 패널 설정 항목:**\n\n- **Background Color**: 활동 화면의 배경 색상을 선택합니다.\n\n- **3 Second's Countdown**: 활동 시작 전 카운트다운 표시 여부를 설정합니다.\n\n- **Write comments after voting**: 학생이 선택 후 의견을 작성할 수 있도록 합니다.\n\n- **Bar Chart / Bubble / Lane Chart**: 결과 표시 방식을 선택합니다.\n\n- **Time Limit**: 활동 제한 시간을 설정합니다.\n\n> ⚠️ 이미지 선택지가 중요한 주제라면 **Image-Based** 레이아웃을 사용하면 학생들이 더 직관적으로 선택할 수 있습니다.",
            "[[image:edit-lesson-discussion-vote/10.png|Image-Based Vote 수업 시작 화면]]\n\n### Image-Based\n\n수업 화면에서 **Vote** 슬라이드로 이동하면 질문과 이미지 선택지 카드들이 표시됩니다. 우측 하단의 **Let's Begin** 버튼을 클릭하여 투표를 시작합니다.\n\n[[image:edit-lesson-discussion-vote/13.png|Image-Based Vote 결과 Bar Chart]]\n\n응답을 마감하면 **View Result** 버튼으로 선택지별 득표 수를 확인합니다.\n\n[[image:edit-lesson-discussion-vote/14.png|Image-Based Vote 의견 카드 화면]]\n\n**See Opinion** 버튼을 클릭하면 선택지별로 학생 의견을 카드 형태로 확인할 수 있습니다.\n\n[[image:edit-lesson-discussion-vote/19.png|Text-Based Vote 수업 시작 화면]]\n\n### Text-Based\n\nText-Based 레이아웃에서는 이미지 대신 텍스트 목록 형태의 선택지가 표시됩니다.\n\n[[image:edit-lesson-discussion-vote/21.png|Text-Based Vote 결과 Bar Chart]]\n\n결과 화면에서는 각 텍스트 선택지별 득표 수가 그래프로 표시됩니다.",
            "[[image:edit-lesson-discussion-vote/26.png|학생 화면의 Image-Based Vote 문항]]\n\n### Image-Based\n\n학생 화면에는 질문, 관련 이미지, 그리고 선택지 이미지가 하단에 표시됩니다. 원하는 선택지를 클릭하면 파란색 테두리로 강조되고 **Write Opinion** 버튼이 활성화됩니다.\n\n[[image:edit-lesson-discussion-vote/27.png|Image-Based Vote 의견 작성 화면]]\n\n**Write Opinion** 버튼을 클릭하면 선택한 이미지가 중앙에 크게 표시되고, 하단 입력창에 선택 이유를 작성할 수 있습니다.\n\n[[image:edit-lesson-discussion-vote/31.png|Image-Based Vote 제출 완료 화면]]\n\n의견을 제출하면 **Your opinion is** 문구와 함께 선택한 이미지와 작성한 의견이 표시됩니다.\n\n[[image:edit-lesson-discussion-vote/33.png|학생 화면의 Text-Based Vote 문항]]\n\n### Text-Based\n\n텍스트 선택지 목록에서 원하는 항목을 선택하면 체크 표시와 함께 **Write Opinion** 버튼이 활성화됩니다.\n\n[[image:edit-lesson-discussion-vote/35.png|Text-Based Vote 의견 작성 화면]]\n\n선택한 항목명이 화면 중앙에 크게 표시되고, 하단 입력창에 이유를 작성할 수 있습니다.\n\n[[image:edit-lesson-discussion-vote/37.png|Text-Based Vote 제출 완료 화면]]\n\n제출 후에는 선택한 텍스트 항목과 작성한 의견이 결과 확인 화면에 표시됩니다."
      ],
      "edit-lesson-idea-board-brainstorming": [
            "**Brainstorming**은 하나의 질문을 던지고 학생들이 각자의 의견을 자유롭게 적어 모으는 Idea Board Activity입니다.\n\n정답·오답을 가리는 것이 아니라 다양한 생각을 한곳에 모으고, 모인 의견을 **Word Cloud / Classification / Mind Map** 형태로 정리해 한눈에 볼 수 있는 것이 특징입니다.",
            "[[image:idea-board-brainstorming/01.png|Create Manually 창에서 Brainstorming 선택]]\n\n수업 편집 화면에서 슬라이드를 추가할 때 **Create Manually** 창의 왼쪽 메뉴에서 **Idea Board**를 선택합니다. **Idea Board** 안에는 **Brainstorming**, **Whiteboard**, **Ideas** 활동이 있으며, 그중 **Brainstorming**을 클릭해 슬라이드를 추가합니다.\n\n- **Brainstorming**: 질문에 대한 의견을 자유롭게 모으는 활동입니다.\n- **Whiteboard**: 자유롭게 그리고 쓰는 화이트보드 활동입니다.\n- **Ideas**: 아이디어를 정리하는 활동입니다.\n\n[[image:idea-board-brainstorming/02.png|Brainstorming 질문 입력 영역]]\n\n슬라이드 중앙의 **Enter Question** 영역을 클릭해 학생들에게 던질 질문을 입력합니다. 텍스트를 선택하면 서식 도구 모음이 나타나며, 글꼴, 글자 크기, 정렬, **B / I / U**, 글자 색상, 삭제를 지정할 수 있습니다.\n\n예시 질문: **What can we do to protect the Earth?**\n\n[[image:idea-board-brainstorming/03.png|Brainstorming 질문과 오른쪽 설정 패널]]\n\n화면 오른쪽 패널에서 활동의 동작 방식을 설정합니다.\n\n- **Background Color**: 슬라이드 배경 색상을 선택합니다.\n- **Classify Opinion Result**: 켜면 모인 의견을 AI가 자동으로 정리합니다.\n- **Word Cloud**: 자주 나온 단어를 크기로 강조한 단어 구름 형태입니다.\n- **Classification**: 의견을 주제별 카테고리로 분류합니다.\n- **Mind Map**: 질문을 중심으로 의견을 가지치기 형태로 연결합니다.\n- **Response Visibility**: **Teacher Only** 또는 **Teacher & Students** 중 학생 의견 공개 범위를 정합니다.\n- **Response Limit**: **One Time** 또는 **Unlimited** 중 학생 1명의 제출 횟수를 정합니다.\n- **Nickname Shown**: 켜면 의견에 작성자 닉네임이 함께 표시됩니다.\n- **Time Limit**: 켜면 활동에 제한 시간을 둘 수 있습니다.\n\n> ⚠️ **Classify Opinion Result**는 AI를 사용하므로 크레딧이 차감됩니다.",
            "[[image:idea-board-brainstorming/04.png|Brainstorming 수업 시작 화면]]\n\n수업을 시작하면 학생들이 입장할 수 있는 **Access Code**와 질문이 화면에 표시됩니다. 우측 상단에는 **Instructor View**와 **End Lesson** 버튼이 있고, 우측 하단에서 현재 접속한 학생 수를 확인할 수 있습니다. 준비가 되면 **Let's Begin**을 클릭해 의견 수집을 시작합니다.\n\n[[image:idea-board-brainstorming/05.png|Post-it 형태의 학생 의견 카드]]\n\n활동이 시작되면 학생들이 의견을 제출합니다. **Post-it** 보기에서는 제출된 의견이 메모지 카드로 표시됩니다. 아직 제출하지 않은 학생은 물음표 카드로 표시되고, 제출이 완료되면 카드에 작성자 이름과 의견이 채워집니다.\n\n[[image:idea-board-brainstorming/06.png|Live Wordcloud 보기]]\n\n**Live Wordcloud** 보기에서는 학생들이 입력하는 단어가 실시간으로 단어 구름에 반영됩니다. 자주 등장하는 단어일수록 크게 표시됩니다. 좌측 하단의 **Show Response** 토글로 학생 의견의 노출 여부를 조절할 수 있습니다.\n\n[[image:idea-board-brainstorming/07.png|Result form 선택 창]]\n\n수집을 끝내려면 우측 하단의 **Finish Up**을 클릭합니다. 이후 **View Result**로 모인 의견을 정리된 형태로 확인할 수 있습니다. **View Result** 옆의 형식 버튼을 클릭하면 **Result form** 창이 열리고, 원하는 형식을 고른 뒤 **Change**로 전환합니다.\n\n[[image:idea-board-brainstorming/08.png|Classification 결과 화면]]\n\n**Classification**은 의견을 주제별 카테고리로 자동 분류합니다. 분류가 진행되는 동안 **Generating BrainStorming Results..** 안내가 표시되고, 완료되면 카테고리별 의견 개수가 나타납니다. 카테고리를 클릭하면 해당 의견 카드를 작성자 이름과 함께 모아 볼 수 있습니다.\n\n[[image:idea-board-brainstorming/09.png|Mind Map 결과 화면]]\n\n**Mind Map**은 질문을 중심 노드로 두고, 주제와 세부 항목을 가지 형태로 연결해 보여줍니다. 각 노드의 **+ / -**로 가지를 펼치거나 접고, 좌측 하단의 **- / + / 100%** 컨트롤로 확대·축소 및 이동할 수 있습니다.",
            "[[image:idea-board-brainstorming/10.png|학생 화면의 Brainstorming 대기 상태]]\n\n선생님이 활동을 시작하기 전까지 학생 화면에는 **Please wait until your teacher starts the activity.** 안내가 표시됩니다.\n\n[[image:idea-board-brainstorming/11.png|학생 의견 입력 및 Submit 버튼]]\n\n선생님이 활동을 시작하면 질문이 표시되고, 하단의 **Write your opinion** 입력칸에 자신의 의견을 작성합니다. 입력 후 **Submit**을 클릭해 제출합니다.\n\n입력칸이 비어 있을 때 **Submit** 버튼은 비활성 상태이며, 내용을 입력하면 파란색으로 활성화됩니다. **Response Limit**이 **Unlimited**인 경우 여러 번 제출할 수 있고, **One Time**인 경우 1회만 제출할 수 있습니다."
      ],
      "edit-lesson-idea-board-whiteboard": [
            "**Whiteboard**는 선생님이 미리 준비한 보드에 학생들이 직접 펜으로 그리거나 쓰면서 참여하는 Idea Board Activity입니다.\n\n글자 따라쓰기, 그림 그리기, 음표 그리기처럼 손으로 직접 표현하는 활동에 적합하며, 선생님은 모든 학생의 보드를 실시간으로 모니터링하고 특정 학생의 작업을 전체에게 공유할 수 있습니다.",
            "[[image:idea-board-whiteboard/01.png|Whiteboard 편집 화면과 English Note 스타일]]\n\n수업 편집 화면에서 **Create Manually** 창의 왼쪽 메뉴 **Idea Board**에서 **Whiteboard**를 선택해 슬라이드를 추가합니다. 슬라이드 상단의 제목 영역에 학생들에게 줄 안내 문구를 입력합니다.\n\n예시 문구: **Let's trace the word 'English'!**\n\n이 문구는 학생 화면과 선생님 화면 상단에 동일하게 표시됩니다.\n\n[[image:idea-board-whiteboard/02.png|Blank 스타일의 Whiteboard 화면]]\n\n화면 오른쪽 패널에서 보드의 모양을 설정합니다.\n\n- **Background Color**: 슬라이드 배경 색상을 선택합니다.\n- **Artboard Style**: 학생들이 그리게 될 아트보드의 바탕 형태를 선택합니다.\n- **Blank**: 아무 선이 없는 빈 화면입니다.\n- **Lined**: 가로 줄이 그어진 노트 형태입니다.\n- **Grid**: 정사각형 격자 형태입니다.\n- **Dotted**: 점 격자 형태입니다.\n- **English Note**: 영어 쓰기용 4선 노트 형태입니다.\n- **Musical Staff**: 음표를 그릴 수 있는 오선지 형태입니다.\n- **Time Limit**: 켜면 활동에 제한 시간을 둘 수 있습니다.\n\n[[image:idea-board-whiteboard/03.png|Musical Staff 스타일의 Whiteboard 화면]]\n\n마우스를 올리면 각 스타일 이름이 표시됩니다. 글자 따라쓰기에는 **English Note**, 음표 그리기에는 **Musical Staff**처럼 활동 목적에 맞는 아트보드 스타일을 선택합니다.",
            "[[image:idea-board-whiteboard/04.png|Whiteboard 수업 진행 화면과 도구 모음]]\n\n수업을 시작하면 상단에 입장용 **Access Code**와 안내 문구가 표시되고, 가운데 큰 보드가 나타납니다. 우측 상단에는 **Instructor View**와 **End Lesson**이 있습니다. 화면 하단에는 그리기 도구 모음이 있습니다.\n\n- 펜 / 마커 / 지우개: 그리기 도구를 전환합니다.\n- 색상 팔레트: 검정, 빨강, 주황, 노랑, 초록, 흰색, 파랑, 하늘색, 보라, 분홍 등 색을 선택합니다.\n- 선 두께: 가는 선, 보통, 굵은 선을 선택합니다.\n- 스탬프: 보드에 스티커를 추가합니다.\n- 손 도구: 보드 화면을 잡아 이동합니다.\n- **- / 100% / +**: 보드를 확대·축소합니다.\n\n[[image:idea-board-whiteboard/05.png|선생님이 보드에 그리는 화면]]\n\n상단 가운데의 **Sharing Screen** 영역에서 선생님이 보드에 그리는 내용을 실시간으로 보여줄 수 있습니다. 선생님이 시범으로 그린 뒤 **Send**를 클릭하면 현재 보드 내용이 학생들에게 전달됩니다.\n\n[[image:idea-board-whiteboard/06.png|Monitoring 화면에서 학생 보드 확인]]\n\n**Monitoring** 화면에서는 접속한 모든 학생의 보드를 한 화면의 그리드로 모아 실시간으로 확인합니다. 학생 수가 많으면 상단의 **‹ / ›**와 페이지 표시로 넘겨 볼 수 있습니다.\n\n[[image:idea-board-whiteboard/07.png|학생 카드 메뉴의 Hide와 Send to All]]\n\n학생 카드를 클릭하면 메뉴가 나타납니다.\n\n- **Show**: 해당 학생의 작업을 표시합니다.\n- **Hide**: 해당 학생의 작업을 가립니다.\n- **Send to All**: 해당 학생의 작업을 모든 학생 보드로 전송해 공유합니다.\n- **Redraw**: 학생들에게 다시 그리도록 보드를 초기화하거나 재요청합니다.\n\n> 💡 **Send to All**로 한 학생의 그림을 모든 보드에 전송하면, 학생들의 화면에 동일한 내용이 함께 표시됩니다.",
            "[[image:idea-board-whiteboard/08.png|학생 화면의 Whiteboard 대기 상태]]\n\n선생님이 화면을 공유하기 전이나 시범을 보이는 동안 학생 화면에는 **Look at what the teacher is drawing on the screen!** 안내가 표시됩니다.\n\n[[image:idea-board-whiteboard/09.png|학생이 Whiteboard에 그리는 화면]]\n\n학생에게 그리기 차례가 오면 선생님이 설정한 형태의 보드가 나타납니다. 학생은 화면 하단의 도구 모음으로 펜, 마커, 지우개, 색상, 선 두께, 스탬프, 손 도구, 확대·축소를 사용해 그림을 그립니다.\n\n[[image:idea-board-whiteboard/10.png|Whiteboard 제출 완료 안내]]\n\n작업을 마치면 오른쪽 아래 **Submit**을 클릭해 제출합니다. 제출이 완료되면 **Your drawing has been submitted!** 안내 창이 뜨고, **Confirm**을 클릭해 확인합니다. 제출된 그림은 작성자 이름과 함께 선생님의 **Monitoring** 화면에 표시됩니다."
      ]
});
// END GENERATED LUMITEACH BODIES

Object.assign(articleBodies, {
  "cat-explore": [
        "내 소속 자료 활용하기는 소속 안에서 공유된 Lesson을 찾아보는 화면과 내 Lesson을 공개하는 Creator Page 흐름으로 구성됩니다.",
        "### Step 1. 소속 자료를 확인합니다\n\n**Explore** 탭에서 소속에 공유된 Lesson 목록을 확인합니다. 화면에는 검색창, **Subject** 필터, **Grade** 필터, 정렬 드롭다운, Lesson 카드 목록이 표시됩니다.\n\n- **내 소속 자료 보기**: 검색어와 필터로 소속에 공유된 Lesson을 확인하는 방법을 봅니다.\n- **Creator Page 관리하기**: 내 Lesson을 공개하고 공개된 Lesson을 관리하는 방법을 확인합니다.",
        "> ⚠️ 주의\n> 소속 자료로 공개되는 Lesson은 다른 교사가 볼 수 있는 자료입니다. 공개 전에 화면에 표시되는 **Title**, **Grade**, **Subject**, 저작권 확인 문구를 확인합니다."
  ],
  "explore-browse": [
        "Explore에서는 내 소속에 공유된 Lesson을 검색하고, 필터와 정렬 조건으로 목록을 좁힌 뒤 Lesson preview에서 내용을 확인합니다.",
        "[[image:explore-browse/01.png|Explore 기본 화면]]\n\n### Step 1. Explore 화면을 확인합니다\n\n상단 메뉴에서 **Explore**가 선택된 상태입니다. 화면 상단에는 문구 **A secure space where teachers can share classroom resources. Start sharing your materials today!**가 표시됩니다.\n\n화면에는 다음 항목이 보입니다.\n\n- **Search**: 소속에 공유된 Lesson을 검색하는 입력창입니다.\n- **MY creator Page**: 내 Creator Page로 이동하는 버튼입니다.\n- **Subject**: 과목 필터입니다. **All**, **Arts**, **ELA**, **Foreign Language**, **Literature**, **Math**, **Music**, **P.E.**, **Science**, **Social Studies**, **Spanish** 항목이 보입니다.\n- **Grade**: 학년 필터입니다. **All**, **Grade 1** 항목이 보입니다.\n- **Latest**: 목록 정렬 드롭다운입니다.\n- **45 results found**: 현재 표시되는 검색 결과 수입니다.\n\n> ⚠️ 주의\n> 화면에 보이는 필터 항목을 기준으로만 조건을 선택합니다. 이미지에 보이지 않는 필터 항목은 이 문서에서 설명하지 않습니다.",
        "[[image:explore-browse/02.png|검색어로 소속 Lesson을 찾은 화면]]\n\n### Step 2. 검색어로 Lesson을 찾습니다\n\n**Search** 입력창에 검색어를 입력하면 소속에 공유된 Lesson 목록이 줄어듭니다. 예시 화면에서는 **demand**가 입력되어 있고, 결과 수가 **3 results found**로 표시됩니다.\n\n검색 결과 카드에는 Lesson 썸네일, 제목, 학년·과목 정보, 작성자 정보가 함께 표시됩니다.\n\n- 예시 검색어: **demand**\n- 예시 결과 수: **3 results found**",
        "[[image:explore-browse/03.png|정렬 옵션을 연 화면]]\n\n### Step 3. 정렬 기준을 선택합니다\n\n목록 우측의 정렬 드롭다운을 열면 정렬 옵션이 표시됩니다.\n\n- **Latest**: 최신순으로 표시합니다.\n- **Most viewed**: 조회 수 기준으로 표시합니다.\n- **Most saved**: 저장 수 기준으로 표시합니다.\n\n정렬 옵션을 선택하면 소속 Lesson 목록의 표시 순서가 변경됩니다.",
        "[[image:explore-browse/04.png|Lesson preview 화면]]\n\n### Step 4. Lesson preview를 확인합니다\n\nLesson 카드를 선택하면 **Lesson preview** 팝업이 열립니다. 팝업에는 Lesson 썸네일, Lesson 제목, 작성자, 설명, 슬라이드 미리보기 영역이 표시됩니다.\n\n하단에는 **Report**, **Like**가 있고, 우측 하단에는 **Use Lesson** 버튼이 표시됩니다.\n\n- **Report**: 신고 사유를 선택하는 팝업을 엽니다.\n- **Like**: Lesson에 좋아요를 표시합니다.\n- **Use Lesson**: 해당 Lesson을 사용합니다.\n\n> ⚠️ 주의\n> **Use Lesson**을 선택하기 전에 Lesson preview에 표시된 제목, 설명, 미리보기 화면을 확인합니다."
  ],
  "explore-creator-page": [
        "Creator Page에서는 My Storage에 있는 Lesson을 선택해 내 소속 자료로 공개하고, 공개된 Lesson을 수정하거나 삭제할 수 있습니다.",
        "[[image:explore-creator-page/01.png|Creator Page 기본 화면]]\n\n### Step 1. Creator Page를 확인합니다\n\n**MY creator Page**로 이동하면 Creator Page가 열립니다. 화면에는 프로필 영역과 **Published Lessons** 목록이 표시됩니다.\n\n좌측 프로필 영역에는 다음 항목이 보입니다.\n\n- **Total Lessons**\n- **Total Remix**\n- **Total Like**\n- **+ Publish Lesson**\n- **Edit**\n- 공개 페이지 URL과 복사 아이콘\n\n**Published Lessons** 영역이 비어 있으면 **Share your first lesson** 문구와 **Publish Lesson** 버튼이 표시됩니다.",
        "[[image:explore-creator-page/02.png|My Storage에서 공개할 Lesson을 고르는 화면]]\n\n### Step 2. 공개할 Lesson을 선택합니다\n\n**+ Publish Lesson**을 선택하면 **+ Publish Lesson** 팝업이 열립니다. 팝업 상단에는 **My Storage**가 표시되고, 좌측에는 저장소 트리와 **Favorites** 항목이 보입니다.\n\n상단에는 **Search** 입력창이 있고, 목록 영역에는 **All**, **Lessons** 탭이 표시됩니다.\n\n[[image:explore-creator-page/03.png|Lesson 선택 후 Next 버튼이 활성화된 화면]]\n\n공개할 Lesson을 선택하면 Lesson 카드에 선택 표시가 생기고 **Next** 버튼이 활성화됩니다.\n\n- **All**: 전체 항목을 확인합니다.\n- **Lessons**: Lesson 항목만 확인합니다.\n- **Next**: 선택한 Lesson의 공개 정보 입력 단계로 이동합니다.",
        "[[image:explore-creator-page/04.png|Required information 입력 화면]]\n\n### Step 3. Required information을 입력합니다\n\n다음 화면에는 **Required information** 영역이 표시됩니다. 화면에 보이는 필수 항목은 다음과 같습니다.\n\n- **Title**\n- **Grade**\n- **Subject**\n\n필수 항목이 비어 있으면 **Publish** 버튼이 비활성화되어 있습니다.",
        "[[image:explore-creator-page/05.png|Optional 정보와 태그를 입력한 화면]]\n\n### Step 4. Optional 정보를 입력하고 Publish합니다\n\n**Optional** 영역에는 **Thumbnail**, **Lesson Description**, **Tags** 항목이 표시됩니다. 화면 하단에는 저작권 확인 체크박스가 있습니다.\n\n화면에 보이는 저작권 확인 문구는 **I confirm that this content does not infringe any copyright and that I accept full responsibility for any related legal issues.** 입니다.\n\n체크박스를 선택하면 **Publish** 버튼을 사용할 수 있습니다.\n\n- **Thumbnail**: 공개 목록에 표시할 썸네일을 설정합니다.\n- **Lesson Description**: Lesson 설명을 입력합니다.\n- **Tags**: 태그를 추가합니다.\n- **Publish**: Lesson을 공개합니다.\n\n> ⚠️ 주의\n> 저작권 확인 체크박스는 화면에 표시되는 문구를 확인한 뒤 선택합니다.",
        "[[image:explore-creator-page/06.png|공개 완료 후 Published Lessons에 표시된 Lesson]]\n\n### Step 5. 공개된 Lesson을 확인합니다\n\n공개가 완료되면 **Published Lessons** 목록에 Lesson 카드가 표시됩니다. 카드에는 썸네일, Lesson 제목, 학년·과목 정보, 작성자 정보가 보입니다.\n\n목록 우측에는 정렬 드롭다운 **Latest**가 표시됩니다.",
        "[[image:explore-creator-page/07.png|공개 Lesson 카드의 Edit/Delete 메뉴]]\n\n### Step 6. 공개된 Lesson을 관리합니다\n\n공개된 Lesson 카드의 메뉴를 열면 **Edit**, **Delete** 항목이 표시됩니다.\n\n- **Edit**: 공개 Lesson 정보를 수정합니다.\n- **Delete**: Explore에서 Lesson 공개를 해제합니다.\n\n[[image:explore-creator-page/08.png|공개 취소 확인 팝업]]\n\n**Delete**를 선택하면 확인 팝업이 표시됩니다. 팝업 문구는 **This lesson will be unpublished from the Explore menu. However, copies already duplicated by other teachers will not be affected.** 입니다.\n\n- **Cancel**: 삭제를 취소합니다.\n- **Delete**: Explore 메뉴에서 공개를 해제합니다.\n\n> ⚠️ 주의\n> **Delete**는 Explore 공개를 해제하는 동작입니다. 팝업에 표시된 문구처럼 이미 다른 교사가 복제한 사본에는 영향을 주지 않습니다."
  ]
});

Object.assign(articleBodies, {
  'cat-faq': [
      "**Q. LumiTeach를 처음 쓰는데 어디서부터 시작하나요?**\n\nGet Started Guide를 따라 가세요. 계정 설정 → 첫 수업 만들기 → 수업 진행까지 순서대로 안내합니다. Step 1–3만 따라 해도 첫 수업을 진행할 수 있습니다.\n\n**Q. 프로필과 소개(Bio)는 어디서 바꾸나요?**\n\nSetting에서 이름·소개 등 기본 정보를 수정합니다. 자세한 내용은 Setting 가이드를 참고하세요.\n\n**Q. 제가 쓴 소개글은 어디에 표시되나요?**\n\nSetting의 Bio는 다른 사용자가 보는 크리에이터 페이지(Explore)에 함께 표시됩니다. Edit에서 수정한 Bio가 그대로 반영됩니다.",
      "**Q. 수업(Lesson)에 활동을 어떻게 추가하나요?**\n\n편집 화면 왼쪽의 + Manual(직접 골라 추가) 또는 AI Make(AI 자동 생성)을 사용합니다. + Manual을 누르면 Create Manually 창에서 카테고리별로 활동을 고를 수 있습니다.\n\n**Q. 어떤 활동 종류가 있나요?**\n\nGeneral(기본 슬라이드), Embed(외부 콘텐츠), Quiz(정답이 있는 문제), Discussion(토론·투표), Idea Board(Brainstorming·Whiteboard·Ideas), Games가 있습니다.\n\n**Q. AI Make는 무엇인가요?**\n\nAI의 도움을 받아 슬라이드를 자동으로 만들어 주는 기능입니다. 직접 만들기(+ Manual)와 함께 슬라이드 추가 방법으로 제공됩니다.\n\n**Q. 학생에게 보이기 전에 미리 확인할 수 있나요?**\n\n있습니다. 상단의 Preview로 학생 화면을 미리 볼 수 있습니다.\n\n**Q. Self Study는 무엇인가요?**\n\n만든 Lesson을 학생이 스스로 학습하도록 배포하는 방식입니다. 편집 화면 상단에서 선택할 수 있습니다.\n\n**Q. 이미 만든 활동을 다시 쓸 수 있나요?**\n\nMy Storage에 저장된 활동을 불러와 재사용할 수 있습니다. Create Manually 창의 My Storage 탭에서도 접근할 수 있습니다.",
      "**Q. 수업은 어떻게 시작하나요?**\n\n편집 화면 오른쪽 위의 Start Teaching을 누르고 진행 모드를 선택합니다.\n\n**Q. Interaction과 Presentation 모드는 어떻게 다른가요?**\n\nInteraction은 학생과 실시간으로 상호작용하는 수업 모드이고, Presentation은 인터넷 연결 없이 발표 형식으로 진행하는 오프라인 모드입니다.\n\n**Q. 학생은 수업에 어떻게 입장하나요?**\n\n수업이 시작되면 화면에 Access Code가 표시됩니다. 학생은 자신의 기기에서 이 코드를 입력해 입장합니다.\n\n**Q. 수업 중에 타이머나 모둠 편성 같은 도구를 쓰려면?**\n\nTool Kit을 사용하세요. 타이머, 룰렛, 모둠 편성 등 Normal·Timer·Competition·Draw·Math Tools 카테고리의 도구를 제공합니다.\n\n**Q. 학생 질문이나 진행 상황은 어디서 확인하나요?**\n\nInstructor View(진행자 보기)에서 슬라이드 미리보기, 타이머, 학생 질문(Live Q&A) 등을 한눈에 확인할 수 있습니다.\n\n**Q. 수업을 끝내려면 어떻게 하나요?**\n\n우측 상단의 End Lesson을 누릅니다.",
      "**Q. 학생 화면에 \"Please wait...\"만 보여요.**\n\n아직 선생님이 활동을 시작하지 않은 상태입니다. \"Please wait until your teacher starts the activity.\"는 대기 화면이며, 선생님이 활동을 시작하면 자동으로 넘어갑니다.\n\n**Q. 학생은 답을 어떻게 제출하나요?**\n\n입력칸에 답을 쓴 뒤 Submit 버튼을 누릅니다. 입력이 비어 있으면 버튼이 비활성(회색)이며, 내용을 적으면 활성화됩니다.\n\n**Q. 학생이 의견을 여러 번 낼 수 있나요?**\n\n활동 설정의 Response Limit으로 결정됩니다. One Time은 1회, Unlimited는 횟수 제한 없이 제출할 수 있습니다.\n\n**Q. 학생 닉네임을 표시하거나 숨길 수 있나요?**\n\n활동 설정의 Nickname Shown을 켜면 응답에 작성자 닉네임이 함께 표시됩니다.",
      "**Q. 학생 응답 결과는 어떻게 보나요?**\n\n활동을 마친 뒤 View Result(결과 보기)로 학생들의 응답을 정리해 확인합니다.\n\n**Q. 결과를 단어 구름이나 마인드맵으로 볼 수 있나요?**\n\n네. 활동 설정의 Classify Opinion Result를 켜면 Word Cloud / Classification / Mind Map 중에서 결과 형태를 고를 수 있습니다.\n\n**Q. 결과 자동 정리에 AI 크레딧이 차감되나요?**\n\n네. Classify Opinion Result(Word Cloud·Classification·Mind Map)는 AI를 사용하므로 크레딧이 차감됩니다(\"AI credits will be deducted\").",
      "**Q. 학생들이 직접 그림을 그리게 하려면?**\n\nIdea Board → Whiteboard 활동을 사용하세요. Artboard Style에서 빈 화면·모눈·영어 4선 노트·오선지 등 바탕을 고를 수 있습니다.\n\n**Q. 한 학생의 작업을 전체 학생에게 보여주려면?**\n\nWhiteboard의 Monitoring 화면에서 해당 학생 카드를 누른 뒤 Send to All을 선택하면 모든 학생 보드로 전송됩니다.\n\n**Q. 모든 학생의 작업을 한 번에 보려면?**\n\nWhiteboard의 Monitoring 화면에서 접속한 모든 학생의 보드를 그리드로 모아 실시간으로 확인할 수 있습니다. 제출을 마친 학생은 카드가 Complete로 표시됩니다.",
      "**Q. 각 기능의 더 자세한 사용법은 어디서 보나요?**\n\n아래 가이드를 참고하세요.\n\n- Get Started Guide — 처음 시작하는 선생님을 위한 전체 흐름 안내\n- Edit Lesson — 활동 종류별 상세 설정(General·Embed·Quiz·Discussion·Idea Board·Games)\n- Tool Kit — 수업 중 도구(Normal·Timer·Competition·Draw·Math Tools)\n- Curriculum / Explore / My Storage / Setting — 관리 및 설정"
  ]
});



// BEGIN CLASS BODY PATCH
Object.assign(articleBodies, {
  "cat-class": [
    "**Class**는 수업·과제 결과를 한눈에 파악하고 학급과 학생을 관리하는 공간입니다. 상단 메뉴 **Class**에는 세 개의 탭이 있으며, 각각 다음 역할을 합니다.\n\n- **Teaching Report**: 실시간 수업(**Teaching**)의 참여·정답률·활동 현황을 종합적으로 보여줍니다.\n- **Assignment Report**: 과제로 낸 과제/평가의 학생별 참여와 결과를 확인합니다.\n- **Class Management**: 학급을 만들고 학생별 개인 로그인 정보(**Student Code**·QR)를 발급·관리합니다.",
    "각 탭의 자세한 사용법은 아래 하위 페이지에서 확인합니다. 수업 결과를 확인하려면 **Teaching Report**, 과제 결과를 확인하려면 **Assignment Report**, 학급과 학생 명단을 관리하려면 **Class Management**를 사용하세요."
  ],
  "class-teaching-report": [
    "**Teaching Report**는 실시간으로 진행한 수업(**Teaching**)의 참여도·정답률·완료률과 학생별 활동 현황을 종합적으로 보여주는 리포트입니다(\"Provides a comprehensive view of lesson participation, accuracy rate, and student activity overview\").\n\n[[image:class-teaching-report/01.png|Teaching Report 기본 화면]]",
    "상단 메뉴 **Class → Teaching Report** 탭에서 확인합니다. 상단 필터로 원하는 수업을 찾을 수 있습니다.\n\n- **Type**: 수업 유형으로 필터링합니다.\n- **Date**: 날짜로 필터링합니다.\n- **검색창**(\"Enter a search term\"): 수업명으로 검색합니다.",
    "화면 왼쪽에는 진행한 수업 세션이 카드로 나열됩니다. 각 카드는 진행 모드(예: **Interaction**), 수업명(예: Planet Earth Quiz), 일시, 세션 유형(예: Guest Session, Service group)을 보여줍니다. 카드 우측 **⋮** 메뉴에서 **Delete**로 삭제할 수 있습니다.\n\n선택한 수업의 핵심 지표는 상단에 표시됩니다.\n\n- **Participation**: 참여 학생 수(예: 10)\n- **Avg. Accuracy Rate**: 평균 정답률(퀴즈가 없으면 \"No Quiz\"로 표시)\n- **Avg. Completion Rate**: 평균 완료률(예: 90%, \"0.9/1 Activities\")",
    "[[image:class-teaching-report/04.png|학생 분포 차트]]\n\n정답률(**Accuracy Rate**)과 완료률(**Completion Rate**)을 두 축으로 한 분포 차트로 학생들의 상태를 한눈에 파악합니다. 차트는 네 사분면으로 나뉘며, 전체가 양호하면 \"All students are on track!\"가 표시됩니다.\n\n- **Good**: Accuracy Rate ≥ 50% 그리고 Completion Rate ≥ 50% (초록 — Good Student)\n- **At Risk**: 두 지표 중 하나가 50% 미만 (노랑 — At Risk Student)\n- **Need Attention**: 두 지표 모두 50% 미만 (빨강 — Need Attention Student)\n\n사분면 라벨은 **Low Accuracy, High Completion / Good / Need Attention / High Accuracy, Low Completion**으로 표시됩니다.",
    "[[image:class-teaching-report/02.png|Student Activity Performance 표]]\n\n학생별 참여 현황은 **Student Activity Performance** 표로 정리됩니다.\n\n- 컬럼: **Name**, **Total Activity**(총 활동 수), **Participation**(참여 여부 — Joined), **Accuracy Rate**, **Completion Rate**\n- 우측 돋보기(🔍)로 학생 상세를 보고, **⋮** 메뉴로 삭제할 수 있습니다.\n\n[[image:class-teaching-report/06.png|Join Time 정렬 옵션]]\n\n정렬 드롭다운으로 **Join Time**(입장 시간) / **Nickname** 정렬을 전환합니다.",
    "[[image:class-teaching-report/07.png|학생 상세 화면]]\n\n학생을 선택하면 개별 상세 화면이 열립니다. 상단에 해당 학생의 **Accuracy Rate**, **Completion Rate**, **Join Time**이 표시됩니다.\n\n아래 표에는 문항별로 **No**, **Activity Type**(예: General/Image, Board/Whiteboard, Board/Brainstorming, Discussion/Vote, Quiz/Multiple Choice 등), **Submitted Answer**(제출 답), **Result**(정·오답 또는 Skipped), **Q&A**가 표시됩니다. 참여하지 않은 활동은 **Skipped**로 표시됩니다."
  ],
  "class-assignment-report": [
    "**Assignment Report**는 과제로 배포한 과제/평가에 대해 학생별 참여와 결과를 확인하는 리포트입니다(\"View student participation and results for each assignment.\"). 실시간 수업이 아닌, 기한을 정해 내준 비동기 과제의 결과를 다룹니다.\n\n[[image:class-assignment-report/03.png|Assignment Report 기본 화면]]",
    "상단 메뉴 **Class → Assignment Report** 탭에서 확인합니다. 상단 필터로 과제를 찾을 수 있습니다.\n\n- **Sort**: 정렬 기준을 선택합니다(예: Latest).\n- **Status**: 과제 상태를 선택합니다(예: All).\n- **Type**: 과제 유형을 선택합니다(예: All).\n- **Date**: 날짜 조건을 선택합니다(예: All).\n- 검색창으로 과제를 검색합니다.",
    "화면 왼쪽에는 배포한 과제 카드가 나열됩니다. 각 카드는 유형 배지(예: **Individual**, **Assessment**), 과제명, 상태(예: ongoing), 배포일과 마감일, 세션 유형(예: Guest Session), 참여 학생 수(예: 5 Students)를 보여줍니다.",
    "[[image:class-assignment-report/05.png|과제별 정답률 분포]]\n\n선택한 과제의 결과는 오른쪽에 표시됩니다.\n\n- **Average Accuracy**: 평균 정답률(예: 73%, \"26 Quiz\")과 점수 분포 차트를 보여줍니다. 평균선(예: \"avg 73%\")과 함께 학생 분포가 표시됩니다.\n- 범례: **On Track (≥50%)**, **At-risk (<50%)**, Class avg, avg ±10%, Score Distribution\n- **Submission Rate**: 제출한 학생 수\n\n> ⚠️ **Open-Ended**(서술형) 문항은 정답률 산정에서 제외됩니다(\"Open-Ended questions are excluded from accuracy scoring.\").\n\n> 점수 분포(**Score Distribution**)는 **5명 이상**이 제출했을 때 제공됩니다.",
    "[[image:class-assignment-report/06.png|학생 목록 정렬 옵션]]\n\n**Student Activity Performance** 표에서는 학생별 과제 수행 현황을 확인합니다.\n\n- 컬럼: **Name**, **Total Activity**, **Participation**(Participated), **Accuracy Rate**, **Completion Rate**\n- 우측 돋보기(🔍)로 학생 상세를 보고, **⋮** 메뉴로 삭제합니다.\n- 정렬 드롭다운: **Nickname** / **Submission Time**",
    "[[image:class-assignment-report/01.png|Share Assignment 창]]\n\n과제를 학생에게 공유할 때는 **Share Assignment** 창을 사용합니다. 과제명과 **Due Date**, 응시 **URL**(예: `https://dev.lumiteach.ai/student?code=5566`), **Copy Link**, **QR Code**, **Access Code**(예: 5566)를 제공합니다.",
    "[[image:class-assignment-report/09.png|학생별 제출 상세 기록]]\n\n학생을 선택하면 개별 응답 내역이 나타납니다. 상단에 **Accuracy Rate**(예: 73% 19/26), **Completion Rate**(예: 81% 38/43), **Submitted Time**이 표시됩니다.\n\n표 컬럼은 **No**, **Activity Type**(General · Discussion · Quiz(Multiple Choice/True or False/Short Answer/Fill in the Blank/Matching/Sorting/Open-Ended) 등), **Submitted Answer**, **Result**(Correct/Wrong/-), **Status**(Submitted / Not Submitted / -)로 구성됩니다.\n\n**Open-Ended**(서술형) 문항은 자동 채점 대상이 아니므로, Result에서 **Correct / Wrong**를 수동으로 지정할 수 있습니다."
  ],
  "class-management": [
    "**Class Management**는 학급(**Class**)을 만들고, 학생별 개인 로그인 정보(**Student Code**·QR)를 발급·관리하는 곳입니다(\"Manage classes and assign individual login credentials to students.\"). 학급을 만들어 학생을 등록해 두면, 과제를 클래스 단위로 배포하고 리포트로 추적할 수 있습니다.\n\n[[image:class-management/01.png|Class Management 기본 화면]]",
    "상단 메뉴 **Class → Class Management** 탭에서 확인합니다. 상단 필터로 학급을 찾을 수 있습니다.\n\n- **Year**: 연도(All / 2025 / 2026 / 2027 / 2028)\n- **Grade**: 학년(All / Common / Grade 1–12)\n- **School**: 학교명으로 검색\n\n아직 만든 학급이 없으면 \"No Class Created Yet.\" 안내와 함께 **New Class** 버튼이 표시됩니다.",
    "[[image:class-management/04.png|Create Class 필수 정보 입력]]\n\n**New Class**를 누르면 **Create Class** 창이 열립니다.\n\n### Required information (필수)\n\n- **Class Code**: 자동 생성됩니다(\"Auto-generated\").\n- **Year**: 연도를 선택합니다(예: 2026).\n- **Grade**: 학년을 선택합니다(Common, Grade 1–12).\n- **Class Name**: 학급 이름을 입력합니다(최대 30자).\n\n[[image:class-management/05.png|Create Class 선택 정보 입력]]\n\n### Optional (선택)\n\n- **School**: 학교명을 입력합니다(최대 50자).\n\n[[image:class-management/06.png|Class 생성 가능 상태]]\n\n필수 항목을 채우면 **Create** 버튼이 활성화되어 학급이 생성됩니다.",
    "[[image:class-management/07.png|학급 카드와 학생 목록]]\n\n생성된 학급은 왼쪽에 카드로 표시되며, 연도(예: 2026), 학급명(예: Lumi Class), 학교(예: Lumiteach Elementary School), 학년·학생 수(예: Grade 5 (10 Student)), 학급 코드(예: 5ZCWNB)를 보여줍니다.\n\n- 카드 우측 **⋮** 메뉴: **Edit Class Info**(학급 정보 수정) / **Delete**(삭제)\n- 왼쪽 상단 정렬 드롭다운: **Recently Created** / **Recently Used**\n\n[[image:class-management/24.png|Class 카드 더보기 메뉴]]\n\n[[image:class-management/25.png|Class 정렬 옵션]]",
    "[[image:class-management/10.png|학생 목록 화면]]\n\n오른쪽에는 선택한 학급의 학생 목록이 표시됩니다.\n\n- 정렬 드롭다운(**Nickname** / **Number**)과 검색창(\"Search by nickname or number\")으로 원하는 학생을 찾습니다.\n- 우측 아이콘으로 인쇄·다운로드·삭제를 할 수 있습니다.\n- 아직 학생이 없으면 \"No students registered yet. Please add students.\"가 표시됩니다.\n- 각 학생 행에는 **Student Code**가 점(••••)으로 가려져 있으며, 눈(👁) 아이콘을 누르면 코드(예: 7662)가 드러납니다. QR 아이콘으로 개인 QR을 보고, 휴지통 아이콘으로 삭제합니다.",
    "[[image:class-management/08.png|Bulk Add 학생 추가 방식 선택]]\n\n**Manage Students** 버튼을 누르면 학생 목록 편집 모드(**Student List Edit mode**)로 전환됩니다.\n\n- **Add Student**: 행을 하나씩 추가해 **Name**과 **Student Code**를 입력합니다. Student Code는 비워두면 자동 생성되며(\"e.g. 1234 (Auto)\"), 직접 입력할 수도 있습니다.\n- **Bulk Add**: 여러 명을 한 번에 추가합니다.\n  - **Import from Past Lesson**: 이전 수업에서 학생을 불러옵니다.\n  - **Upload Excel/CSV**: 엑셀/CSV 파일로 업로드합니다.\n  - **Download Excel Template**: 업로드용 엑셀 템플릿을 다운로드합니다.\n\n입력을 마치면 **Save**로 저장하고, **Manage Students End**로 편집을 종료합니다. 저장 후 각 학생에게 고유 Student Code(예: Ethan 7662)가 부여됩니다.",
    "[[image:class-management/13.png|Personal QR Code 팝업]]\n\n학생 행의 QR 아이콘을 누르면 **Personal QR Code** 창이 열립니다. QR 코드와 함께 다음 정보가 표시됩니다.\n\n- **Grade**(학년 정보)\n- **Class**(예: Grade 5, Lumi Class)\n- **Class Code**(예: 5ZCWNB)\n- **Student No.**(예: 1)\n- **Student Code**(예: 7662)\n- **Name**(예: Ethan)\n- **Student Home**(예: `https://dev.lumiteach.ai/student`)\n\n**Print**로 인쇄해 학생에게 나눠줄 수 있습니다. 학생은 이 QR 또는 Student Code로 접속해 수업·과제에 참여합니다.",
    "[[image:class-management/26.png|Year 필터]]\n\n[[image:class-management/27.png|Grade 필터]]\n\nYear와 Grade 필터를 사용하면 특정 학년도와 학년의 Class만 좁혀서 볼 수 있습니다."
  ]
});
// END CLASS BODY PATCH

// BEGIN ASSESSMENT ZIP BODY PATCH
Object.assign(articleBodies, {
  "group-assessment-run": [
    "Assessment는 **Curriculum**에서 제공되는 평가지를 학생에게 배정하고, 학생이 자신의 기기에서 정해진 기한 안에 풀어 제출하는 **과제형(비동기) 평가** 기능입니다. 수업 중 실시간으로 진행하는 Quiz Activity와 달리, 교사가 평가지를 배정하면 학생이 링크·QR·Access Code로 접속해 응시하고, 제출 후 자동 채점과 리뷰까지 이어집니다.\n\n이 문서는 **① 평가지 찾기 → ② 배정(Assign) → ③ 공유 → ④ 학생 응시 → ⑤ 결과·리뷰** 순서로 설명합니다.",
    "[[image:assessment/01.png|Curriculum의 Assessment 탭]]\n\n상단 메뉴에서 **Curriculum**으로 이동한 뒤, 커리큘럼(예: **NGSS – Next Generation Science Standards**) 화면에서 **Assessment** 탭을 선택합니다. 상단에는 **Lesson / Assessment** 두 개의 탭이 있습니다.\n\n왼쪽 **Curriculum Tree**에서 학교급(**Elementary School / Middle School**)과 학년(**Grade K – Grade 5** 등), 영역(**PS · LS · ESS · ETS** 등)을 선택해 평가지 목록을 걸러봅니다. 상단 드롭다운으로 학년(예: grade All)을 변경할 수 있습니다.\n\n[[image:assessment/02.png|Assessment 카드 목록]]\n\n**Assessment** 탭에는 성취기준(예: \"Forces and Interactions: Pushes and Pulls\")별로 평가지 카드가 나열됩니다. 각 카드는 제목, 문항 수(예: \"13 item(s)\"), 문제 유형(**Multiple Choice**, **Short Answer**, **True or False**, **fill in the blank** 등), 과목(예: Science)을 보여줍니다. **Change Curriculum** 버튼으로 다른 커리큘럼으로 전환할 수 있습니다.",
    "[[image:assessment/03.png|Assessment Assign 창]]\n\n평가지 카드를 클릭하면 배정 창이 열립니다. 왼쪽에서는 문제 미리보기, 오른쪽에서는 배정 설정을 합니다.\n\n왼쪽 미리보기 영역에서는 모바일 / 데스크톱 보기를 전환하며 학생에게 어떻게 보일지 확인합니다. **‹ / ›** 버튼으로 문항을 넘겨볼 수 있습니다.\n\n[[image:assessment/04.png|Assessment 미리보기 데스크톱 보기]]\n\n오른쪽 설정 영역에서는 제목, 교육과정 정보, 제출 기한, 문제 섞기, 배포 범위를 설정합니다.",
    "[[image:assessment/07.png|Assessment 제목 수정]]\n\n제목 옆 연필 아이콘을 누르면 제목을 편집할 수 있으며, **Cancel / Save**로 취소하거나 저장합니다.\n\n[[image:assessment/06.png|Curriculum Details 펼침]]\n\n**Curriculum Details**를 펼치면 이 평가지가 연결된 교육과정 정보를 확인할 수 있습니다. **School Level**(예: Elementary School), **Grade**(예: Grade K), **Domain**(예: PS), **Cluster**(예: Forces and Interactions: Pushes and Pulls), **Standard**(예: K-PS2-1, K-PS2-2 등)을 포함합니다.\n\n**Due Date**에서는 제출 기한을 날짜와 시간(예: 06/26/2026, 11:00 PM)으로 지정합니다. **Shuffle Questions**를 켜면 학생마다 문제 순서가 무작위로 제공됩니다(\"Each student will receive the questions in a different random order.\").",
    "[[image:assessment/05.png|Assigned to 옵션]]\n\n**Assigned to**에서 배포 범위를 선택합니다.\n\n- **Public Link (Guest Access)**: 링크를 가진 누구나 접근할 수 있는 공개 배포입니다.\n- **Class Only (Private Access)**: 클래스 명단의 학생에게만 배포되며, 개인 QR 코드 또는 고유 Access Code로 접속합니다(\"Distributed only to students on the class list...\").\n\n설정을 마치면 오른쪽 아래 **Assign** 버튼을 눌러 배정을 완료합니다.",
    "[[image:assessment/08.png|Share Assessment 창]]\n\n배정이 완료되면 **Share Assessment** 창이 열리며, 아래 방법으로 학생에게 전달합니다.\n\n- 평가지 제목과 **Due Date**가 표시됩니다.\n- **URL**: 응시 링크(예: `https://dev.lumiteach.ai/student?code=6326`)가 제공됩니다. **Copy Link**로 복사합니다.\n- **QR Code**: QR 코드로 공유할 수 있습니다.\n- **Access Code**: 학생이 입력해 입장하는 코드(예: 6326)입니다.",
    "[[image:assessment/09.png|학생 Assessment 입장 화면]]\n\n학생이 링크·코드로 접속하면 **Nickname**(예: Lumi), **Assessment** 제목과 문항 수(예: 13 item(s)), 첫 문제 미리보기, 제출 기한(예: \"Until 2026.06.26. 11:00 PM\")이 표시됩니다. **Start** 버튼을 눌러 응시를 시작합니다.\n\n[[image:assessment/10.png|객관식 문항 화면]]\n\n문제 풀이 화면에서는 왼쪽에 문제 번호와 문제가, 오른쪽에 답변 입력 영역이 나타납니다. 하단의 **N/13** 표시와 **‹ / ›**로 문항을 이동합니다.\n\n- 객관식(**Multiple Choice**): \"Choose your answer\"에서 보기를 선택합니다.\n- 단답형(**Short Answer**): \"Write your Answer\" 입력칸에 직접 답을 작성합니다.\n\n[[image:assessment/12.png|단답형 문항 화면]]\n\n문제를 풀고 **Submit**으로 제출합니다. **True or False**, **fill in the blank** 등 다양한 유형이 포함될 수 있습니다.",
    "[[image:assessment/15.png|Assessment 제출 완료 화면]]\n\n모든 문항을 제출하면 \"Your submission has been completed.\" 안내와 함께 결과가 요약됩니다. 상단에 **Correct**(정답) / **Wrong**(오답) / **Not Submitted**(미제출) 개수가 표시되고, **Results** 그리드에 문항 번호(1–13)별로 ✓(정답) / ✕(오답) 표시가 나타납니다.\n\n**View Detailed Review**로 상세 리뷰를 보거나, **Go to Home**으로 홈으로 이동합니다.",
    "[[image:assessment/13.png|Review Mode 오답 화면]]\n\n**View Detailed Review**를 누르면 문항별 리뷰 화면(**Review Mode**)으로 이동합니다. 각 문항 상단에 문제 번호와 **Correct / Wrong** 배지가 표시되고, 학생이 선택한 답이 강조됩니다. 오른쪽 결과 카드에 \"The correct answer is\"와 함께 정답이 표시됩니다.\n\n[[image:assessment/14.png|Review Mode 정답 화면]]\n\n오답이면 주황색 **Wrong**, 정답이면 초록색 **Correct!**로 표시됩니다. 하단의 **‹ N/13 ›**로 문항을 이동하거나 **Back to Results**로 결과 요약 화면으로 돌아갑니다."
  ],
  "assessment-create": [
    "[[image:assessment/01.png|Curriculum의 Assessment 탭]]\n\n상단 메뉴에서 **Curriculum**으로 이동한 뒤 **Assessment** 탭을 선택합니다. 왼쪽 **Curriculum Tree**에서 학교급, 학년, 영역을 선택하면 조건에 맞는 Assessment 카드가 표시됩니다.",
    "[[image:assessment/02.png|Assessment 카드 목록]]\n\nAssessment 카드는 제목, 문항 수, 문제 유형, 과목 정보를 함께 보여줍니다. 배정하려는 평가지 카드를 클릭하면 Assign 창이 열립니다."
  ],
  "assessment-questions": [
    "[[image:assessment/03.png|Assessment Assign 창]]\n\nAssessment 카드를 클릭하면 배정 창이 열립니다. 왼쪽에서는 모바일/데스크톱 미리보기를 확인하고, 오른쪽에서는 제목, Due Date, Shuffle Questions, Assigned to를 설정합니다.",
    "[[image:assessment/06.png|Curriculum Details 펼침]]\n\n**Curriculum Details**를 펼쳐 School Level, Grade, Domain, Cluster, Standard 정보를 확인합니다.\n\n[[image:assessment/05.png|Assigned to 옵션]]\n\n**Public Link (Guest Access)** 또는 **Class Only (Private Access)** 중 배포 범위를 선택한 뒤 **Assign**을 클릭합니다."
  ],
  "assessment-distribute": [
    "[[image:assessment/08.png|Share Assessment 창]]\n\n배정이 완료되면 **Share Assessment** 창이 열립니다. 학생에게 URL, Copy Link, QR Code, Access Code를 공유합니다.",
    "[[image:assessment/09.png|학생 Assessment 입장 화면]]\n\n학생은 링크 또는 Access Code로 접속한 뒤 Nickname을 입력하고 **Start**를 눌러 응시를 시작합니다.\n\n[[image:assessment/10.png|객관식 문항 화면]]\n\n객관식 문항은 보기 중 답을 선택하고, 단답형 문항은 입력칸에 직접 답을 작성한 뒤 **Submit**으로 제출합니다."
  ],
  "assessment-results": [
    "[[image:assessment/15.png|Assessment 제출 완료 화면]]\n\n제출이 완료되면 Correct, Wrong, Not Submitted 개수와 문항별 결과 그리드가 표시됩니다. **View Detailed Review**를 눌러 상세 리뷰로 이동합니다.",
    "[[image:assessment/13.png|Review Mode 오답 화면]]\n\nReview Mode에서는 학생이 선택한 답과 정답을 문항별로 확인합니다. 오답이면 **Wrong**, 정답이면 **Correct!**로 표시됩니다.\n\n[[image:assessment/14.png|Review Mode 정답 화면]]\n\n하단의 **‹ N/13 ›**로 문항을 이동하거나 **Back to Results**로 결과 요약 화면으로 돌아갑니다."
  ]
});
// END ASSESSMENT ZIP BODY PATCH

// BEGIN ASSESSMENT SOURCE BODY CORRECTION
Object.assign(articleBodies, {
  "group-assessment-run": [
    "[[image:assessment/01.png|Curriculum의 Assessment 탭]]\n\n상단 메뉴에서 **Curriculum**으로 이동한 뒤, 커리큘럼(예: **NGSS – Next Generation Science Standards**) 화면에서 **Assessment** 탭을 선택합니다. 상단에는 **Lesson / Assessment** 두 개의 탭이 있습니다.\n\n왼쪽 **Curriculum Tree**에서 학교급(**Elementary School / Middle School**)과 학년(**Grade K – Grade 5** 등), 영역(**PS · LS · ESS · ETS** 등)을 선택해 평가지 목록을 걸러봅니다. 상단 드롭다운으로 학년(예: grade All)을 변경할 수 있습니다.\n\n[[image:assessment/02.png|Assessment 카드 목록]]\n\n**Assessment** 탭에는 성취기준(예: \"Forces and Interactions: Pushes and Pulls\")별로 평가지 카드가 나열됩니다. 각 카드는 제목, 문항 수(예: \"13 item(s)\"), 문제 유형(**Multiple Choice**, **Short Answer**, **True or False**, **fill in the blank** 등), 과목(예: Science)을 보여줍니다.\n\n**Change Curriculum** 버튼으로 다른 커리큘럼으로 전환할 수 있습니다.",
    "[[image:assessment/03.png|Assessment 배정 창]]\n\n평가지 카드를 클릭하면 배정 창이 열립니다. 왼쪽에서는 문제 미리보기, 오른쪽에서는 배정 설정을 합니다.\n\n왼쪽 미리보기 영역에서 모바일 / 데스크톱 보기를 전환하며 학생에게 어떻게 보일지 확인합니다. **‹ / ›** 버튼으로 문항을 넘겨볼 수 있습니다.\n\n[[image:assessment/04.png|문제 미리보기 화면]]\n\n오른쪽 설정 영역에서는 제목, 교육과정 정보, 제출 기한, 문제 섞기, 배포 범위를 설정합니다.\n\n[[image:assessment/07.png|제목 수정 상태]]\n\n제목 옆 연필 아이콘을 누르면 제목을 편집할 수 있으며, **Cancel / Save**로 취소하거나 저장합니다.\n\n[[image:assessment/06.png|Curriculum Details 펼침]]\n\n**Curriculum Details**를 펼쳐 이 평가지가 연결된 교육과정 정보를 확인합니다. **School Level**(예: Elementary School), **Grade**(예: Grade K), **Domain**(예: PS), **Cluster**(예: Forces and Interactions: Pushes and Pulls), **Standard**(예: K-PS2-1, K-PS2-2 등)을 포함합니다.\n\n**Due Date**에서는 제출 기한을 날짜와 시간(예: 06/26/2026, 11:00 PM)으로 지정합니다. **Shuffle Questions**를 켜면 학생마다 문제 순서가 무작위로 제공됩니다(\"Each student will receive the questions in a different random order.\").\n\n[[image:assessment/05.png|Assigned to 옵션]]\n\n**Assigned to**에서 배포 범위를 선택합니다.\n\n- **Public Link (Guest Access)**: 링크를 가진 누구나 접근할 수 있는 공개 배포입니다.\n- **Class Only (Private Access)**: 클래스 명단의 학생에게만 배포되며, 개인 QR 코드 또는 고유 Access Code로 접속합니다(\"Distributed only to students on the class list...\").\n\n설정을 마치면 오른쪽 아래 **Assign** 버튼을 눌러 배정을 완료합니다.",
    "[[image:assessment/08.png|Share Assessment 창]]\n\n배정이 완료되면 **Share Assessment** 창이 열리며, 아래 방법으로 학생에게 전달합니다.\n\n- 평가지 제목과 **Due Date**가 표시됩니다.\n- **URL**: 응시 링크(예: `https://dev.lumiteach.ai/student?code=6326`)가 제공됩니다. **Copy Link**로 복사합니다.\n- **QR Code**: QR 코드로 공유할 수 있습니다.\n- **Access Code**: 학생이 입력해 입장하는 코드(예: 6326)입니다.",
    "[[image:assessment/09.png|학생 입장 화면]]\n\n학생이 링크·코드로 접속하면 **Nickname**(예: Lumi), **Assessment** 제목과 문항 수(예: 13 item(s)), 첫 문제 미리보기, 그리고 제출 기한(예: \"Until 2026.06.26. 11:00 PM\")이 표시됩니다. **Start** 버튼을 눌러 응시를 시작합니다.\n\n[[image:assessment/10.png|객관식 문항 화면]]\n\n문제 풀이 화면에서는 왼쪽에 문제 번호와 문제가, 오른쪽에 답변 입력 영역이 나타납니다. 하단의 **N/13** 표시와 **‹ / ›**로 문항을 이동합니다.\n\n- 객관식(**Multiple Choice**): \"Choose your answer\"에서 보기를 선택합니다. 예: \"Steam is an example of a___\" → gas / food / solid / liquid\n- 단답형(**Short Answer**): \"Write your Answer\" 입력칸에 직접 답을 작성합니다. 예: \"Rain falls from___.\" → Cloud\n\n[[image:assessment/12.png|단답형 문항 화면]]\n\n문제를 풀고 **Submit**으로 제출합니다. **True or False**, **fill in the blank** 등 다양한 유형이 포함될 수 있습니다.",
    "[[image:assessment/15.png|제출 완료 화면]]\n\n모든 문항을 제출하면 \"Your submission has been completed.\" 안내와 함께 결과가 요약됩니다.\n\n상단에 **Correct**(정답) / **Wrong**(오답) / **Not Submitted**(미제출) 개수가 표시됩니다. **Results** 그리드에 문항 번호(1–13)별로 ✓(정답) / ✕(오답) 표시가 나타납니다.\n\n**View Detailed Review**로 상세 리뷰를 보거나, **Go to Home**으로 홈으로 이동합니다.\n\n[[image:assessment/13.png|Review Mode 오답 화면]]\n\n**View Detailed Review**를 누르면 문항별 리뷰 화면(**Review Mode**)으로 이동합니다. 각 문항 상단에 문제 번호와 **Correct / Wrong** 배지가 표시되고, 학생이 선택한 답이 강조됩니다. 오른쪽 결과 카드에 \"The correct answer is\"와 함께 정답이 표시됩니다.\n\n[[image:assessment/14.png|Review Mode 정답 화면]]\n\n오답이면 주황색 **Wrong**, 정답이면 초록색 **Correct!**로 표시됩니다. 하단의 **‹ N/13 ›**로 문항을 이동하거나 **Back to Results**로 결과 요약 화면으로 돌아갑니다."
  ]
});
// END ASSESSMENT SOURCE BODY CORRECTION

const categories = manualTree.map((category) => ({
  title: category.title,
  description: category.description,
  firstKey: category.key,
  count: category.children.reduce((sum, child) => sum + child.articles.length + 1, 1)
}));

const articleCallouts = {};
const articleMedia = {};
const articleInfoCards = {};
const manualImages = {};
const hubDescriptions = {
  'edit-lesson-create': 'Home 화면과 Teaching 중 상황에서 새 Lesson을 만드는 흐름을 확인합니다. 빈 Edit Lesson 화면에서 첫 Activity를 시작하는 방법까지 이어집니다.',
  'edit-lesson-rename': 'Edit Lesson 화면과 My Storage에서 Lesson 이름을 수정하는 방법을 확인합니다. Untitled Lesson을 수업 내용을 알아보기 쉬운 이름으로 바꾸는 과정입니다.',
  'edit-lesson-add-activity': '+ Manual과 AI Make를 구분해 Activity를 추가하는 방법을 확인합니다. Activity 유형을 선택하고 추가 후 편집 화면으로 이어지는 흐름을 다룹니다.',
  'edit-lesson-load-storage': 'My Storage에 저장된 다른 Lesson이나 Activity를 현재 Lesson 또는 수업 중 화면으로 불러오는 방법을 확인합니다.',
  'edit-lesson-ai-make': '파일 업로드 또는 Google Drive 자료를 바탕으로 AI가 Activity를 생성하는 전체 과정을 확인합니다. 페이지 선택, 생성 옵션, 크레딧 안내까지 포함합니다.',
  'edit-lesson-interaction': '학생이 실시간으로 참여하는 Interaction 수업을 시작하는 방법을 확인합니다. 참여 범위, Class 지정, Access Code 화면을 함께 다룹니다.',
  'edit-lesson-presentation': '학생 응답 없이 Lesson을 발표 화면으로 진행하는 Presentation 모드를 확인합니다. 오프라인 발표 수업에 필요한 화면 구성을 안내합니다.',
  'edit-lesson-undo-redo': 'Edit Lesson에서 작업을 되돌리거나 다시 실행하는 Undo / Redo 버튼 위치와 사용 시 참고사항을 확인합니다.',
  'edit-lesson-preview': '수업 시작 전 교사 화면과 학생 화면을 미리 확인하는 Preview 기능을 안내합니다. 모바일 화면 확인까지 함께 다룹니다.',
  'edit-lesson-background-color': 'Activity 슬라이드의 배경 색상을 변경하는 방법을 확인합니다. 컬러 피커, HEX 코드, 스포이드 적용 흐름을 다룹니다.'
};

const hubVisuals = {
  'group-intro-service': { icon: 'LT', bg: 'linear-gradient(135deg, #eaf1ff, #f6f9ff)', color: '#204cff', size: '30px' },
  'group-intro-basics': { icon: 'ABC', bg: 'linear-gradient(135deg, #fff4df, #f6f9ff)', color: '#244c7d', size: '24px' },
  'setting-open': { icon: '☰', bg: 'linear-gradient(135deg, #eaf1ff, #f7f7f6)', color: '#233a78' },
  'setting-profile': { icon: 'ID', bg: 'linear-gradient(135deg, #eaf7f0, #eaf1ff)', color: '#0f7f78', size: '30px' },
  'setting-language': { icon: '文', bg: 'linear-gradient(135deg, #fff1df, #f6f9ff)', color: '#204cff' },
  'setting-curriculum': { icon: 'K-12', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#233a78', size: '24px' },
  'setting-ai-credit': { icon: 'AI', bg: 'linear-gradient(135deg, #ffb15f, #4f78ff 55%, #5aa2ff)', color: '#fff', size: '30px' },
  'group-edit-lesson': { icon: '✎', bg: 'linear-gradient(135deg, #e8f4ff, #dff7ef)', color: '#0f7f78' },
  'group-lesson-material-edit': { icon: 'Aa', bg: 'linear-gradient(135deg, #fff1d8, #f6f9ff)', color: '#204cff', size: '32px' },
  'group-lesson-embed': { icon: '<>', bg: 'linear-gradient(135deg, #e6f0ff, #fff7df)', color: '#2563e9', size: '30px' },
  'group-lesson-quiz-activity': { icon: '?', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#233a78' },
  'group-lesson-discussion-activity': { icon: '…', bg: 'linear-gradient(135deg, #fff0df, #ffe6ef)', color: '#d85f4f' },
  'group-lesson-idea-board-activity': { icon: 'IB', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#204cff', size: '30px' },
  'group-edit-lesson-self-study': { icon: 'SS', bg: 'linear-gradient(135deg, #eaf1ff, #f6f9ff)', color: '#204cff', size: '30px' },
  'group-assessment-run': { icon: 'A+', bg: 'linear-gradient(135deg, #fff1df, #f7efe6)', color: '#d85f4f', size: '30px' },
  'group-teaching-mode': { icon: '▶', bg: 'linear-gradient(135deg, #fff0df, #ffe6ef)', color: '#d85f4f' },
  'group-reports-results': { icon: 'Σ', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#0f7f78' },
  'edit-lesson-create': { icon: '+', bg: 'linear-gradient(135deg, #e8f4ff, #dff7ef)', color: '#0f7f78' },
  'edit-lesson-rename': { icon: 'Aa', bg: 'linear-gradient(135deg, #fff1d8, #f6f9ff)', color: '#204cff', size: '32px' },
  'edit-lesson-add-activity': { icon: '▦', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#233a78' },
  'edit-lesson-load-storage': { icon: '⇣', bg: 'linear-gradient(135deg, #e6f0ff, #fff7df)', color: '#2563e9' },
  'edit-lesson-ai-make': { icon: 'AI', bg: 'linear-gradient(135deg, #ffb15f, #4f78ff 55%, #5aa2ff)', color: '#fff', size: '30px' },
  'edit-lesson-interaction': { icon: '↔', bg: 'linear-gradient(135deg, #e2ebff, #f6f9ff)', color: '#204cff' },
  'edit-lesson-presentation': { icon: '▶', bg: 'linear-gradient(135deg, #fff0df, #ffe6ef)', color: '#d85f4f' },
  'edit-lesson-undo-redo': { icon: '↶', bg: 'linear-gradient(135deg, #eaf1ff, #f6f9ff)', color: '#204cff' },
  'edit-lesson-preview': { icon: '◉', bg: 'linear-gradient(135deg, #eaf1ff, #f6f9ff)', color: '#1f2740' },
  'edit-lesson-background-color': { icon: '●', bg: 'linear-gradient(135deg, #fff1df, #f7efe6)', color: '#f0a13d' },
  'edit-lesson-background-image': { icon: '▧', bg: 'linear-gradient(135deg, #e6f0ff, #f6f9ff)', color: '#2563e9' },
  'edit-lesson-activity-common-setting': { icon: '⚙', bg: 'linear-gradient(135deg, #f7f7f6, #eaf1ff)', color: '#233a78' },
  'edit-lesson-self-study-individual': { icon: 'I', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#0f7f78' },
  'edit-lesson-self-study-challenge': { icon: 'C', bg: 'linear-gradient(135deg, #fff1df, #ffe6ef)', color: '#d85f4f' },
  'edit-lesson-self-study-flash-card': { icon: 'FC', bg: 'linear-gradient(135deg, #f6f9ff, #eaf1ff)', color: '#204cff', size: '30px' },
  'edit-lesson-text-properties': { icon: 'T', bg: 'linear-gradient(135deg, #fff1d8, #f6f9ff)', color: '#204cff' },
  'edit-lesson-rewrite': { icon: 'R', bg: 'linear-gradient(135deg, #e2ebff, #f6f9ff)', color: '#204cff' },
  'edit-lesson-add-text-object': { icon: 'T+', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#0f7f78', size: '30px' },
  'edit-lesson-add-shape': { icon: '□', bg: 'linear-gradient(135deg, #f7f7f6, #eaf1ff)', color: '#204cff' },
  'edit-lesson-upload-image': { icon: '↑', bg: 'linear-gradient(135deg, #e6f0ff, #fff7df)', color: '#2563e9' },
  'edit-lesson-image-properties': { icon: '▧', bg: 'linear-gradient(135deg, #fff1df, #f7efe6)', color: '#d85f4f' },
  'edit-lesson-webviewer': { icon: 'WEB', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#0f7f78', size: '23px' },
  
  'edit-lesson-document': { icon: 'DOC', bg: 'linear-gradient(135deg, #eaf1ff, #f7f7f6)', color: '#233a78', size: '23px' },
  'edit-lesson-sound': { icon: '♪', bg: 'linear-gradient(135deg, #f6f9ff, #eaf1ff)', color: '#204cff' },
  'edit-lesson-quiz-true-false': { icon: 'T/F', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#0f7f78', size: '26px' },
  'edit-lesson-quiz-multiple-choice': { icon: 'MC', bg: 'linear-gradient(135deg, #eaf1ff, #f7f7f6)', color: '#233a78', size: '30px' },
  'edit-lesson-quiz-short-answer': { icon: 'SA', bg: 'linear-gradient(135deg, #fff1d8, #f6f9ff)', color: '#204cff', size: '30px' },
  'edit-lesson-quiz-fill-blank': { icon: '_', bg: 'linear-gradient(135deg, #e6f0ff, #fff7df)', color: '#2563e9' },
  'edit-lesson-quiz-matching': { icon: '↔', bg: 'linear-gradient(135deg, #e2ebff, #f6f9ff)', color: '#204cff' },
  'edit-lesson-quiz-open-ended': { icon: 'OE', bg: 'linear-gradient(135deg, #fff0df, #ffe6ef)', color: '#d85f4f', size: '30px' },
  'edit-lesson-quiz-sequencing': { icon: '1→', bg: 'linear-gradient(135deg, #eaf1ff, #f6f9ff)', color: '#204cff', size: '30px' },
  'edit-lesson-quiz-sorting': { icon: '⇅', bg: 'linear-gradient(135deg, #f7f7f6, #eaf1ff)', color: '#233a78' },
  'edit-lesson-discussion-agree-disagree': { icon: 'A/D', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#0f7f78', size: '26px' },
  'edit-lesson-discussion-opinion-scale': { icon: '1-5', bg: 'linear-gradient(135deg, #fff1df, #f7efe6)', color: '#d85f4f', size: '26px' },
  'edit-lesson-discussion-traffic-light': { icon: 'TL', bg: 'linear-gradient(135deg, #fff7df, #e9fff6)', color: '#0f7f78', size: '30px' },
  'edit-lesson-discussion-vote': { icon: 'V', bg: 'linear-gradient(135deg, #f6f9ff, #eaf1ff)', color: '#204cff' },
  'assessment-create': { icon: 'A+', bg: 'linear-gradient(135deg, #fff1df, #f7efe6)', color: '#d85f4f', size: '30px' },
  'assessment-questions': { icon: 'Q', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#233a78' },
  'assessment-distribute': { icon: '↗', bg: 'linear-gradient(135deg, #e6f0ff, #fff7df)', color: '#2563e9' },
  'assessment-results': { icon: '✓', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#0f7f78' }
};

const hubCovers = {
  'cat-start': { icon: '⚙', bg: 'linear-gradient(135deg, #eaf1ff, #f7f7f6)', color: '#233a78' },
  'setting-open': { icon: '☰', bg: 'linear-gradient(135deg, #eaf1ff, #f7f7f6)', color: '#233a78' },
  'setting-profile': { icon: 'ID', bg: 'linear-gradient(135deg, #eaf7f0, #eaf1ff)', color: '#0f7f78', size: '46px' },
  'setting-language': { icon: '文', bg: 'linear-gradient(135deg, #fff1df, #f6f9ff)', color: '#204cff' },
  'setting-curriculum': { icon: 'K-12', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#233a78', size: '40px' },
  'setting-ai-credit': { icon: 'AI', bg: 'linear-gradient(135deg, #ffb15f, #4f78ff 55%, #5aa2ff)', color: '#fff', size: '46px' },
  'cat-lesson': { icon: '✎', bg: 'linear-gradient(135deg, #e8f4ff, #dff7ef)', color: '#0f7f78' },
  'group-edit-lesson': { icon: '✎', bg: 'linear-gradient(135deg, #e8f4ff, #dff7ef)', color: '#0f7f78' },
  'group-lesson-material-edit': { icon: 'Aa', bg: 'linear-gradient(135deg, #fff1d8, #f6f9ff)', color: '#204cff', size: '48px' },
  'group-lesson-embed': { icon: '<>', bg: 'linear-gradient(135deg, #e6f0ff, #fff7df)', color: '#2563e9', size: '46px' },
  'group-lesson-quiz-activity': { icon: '?', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#233a78' },
  'group-lesson-discussion-activity': { icon: '…', bg: 'linear-gradient(135deg, #fff0df, #ffe6ef)', color: '#d85f4f' }
};

// BEGIN TOOL KIT VISUAL PATCH
Object.assign(hubVisuals, {
      "cat-toolkit": {
            "icon": "TK",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "30px"
      },
      "group-toolkit-normal": {
            "icon": "⭐",
            "bg": "linear-gradient(135deg, #eaf1ff, #fff7df)",
            "color": "#204cff"
      },
      "group-toolkit-timer": {
            "icon": "⏱",
            "bg": "linear-gradient(135deg, #e6f0ff, #f6f9ff)",
            "color": "#2563e9"
      },
      "group-toolkit-competition": {
            "icon": "🏆",
            "bg": "linear-gradient(135deg, #fff1df, #ffe6ef)",
            "color": "#d85f4f"
      },
      "group-toolkit-draw": {
            "icon": "🎴",
            "bg": "linear-gradient(135deg, #eaf1ff, #e9fff6)",
            "color": "#0f7f78"
      },
      "group-toolkit-math-tools": {
            "icon": "📐",
            "bg": "linear-gradient(135deg, #f7f7f6, #eaf1ff)",
            "color": "#233a78"
      },
      "toolkit-wheel": {
            "icon": "◌",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "34px"
      },
      "toolkit-dice": {
            "icon": "⚂",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "34px"
      },
      "toolkit-bell": {
            "icon": "🔔",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "28px"
      },
      "toolkit-sound-monitor": {
            "icon": "dB",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "28px"
      },
      "toolkit-clock": {
            "icon": "🕒",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "28px"
      },
      "toolkit-annotate": {
            "icon": "Aa",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "28px"
      },
      "toolkit-share-web-link": {
            "icon": "🔗",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "28px"
      },
      "toolkit-quick-quiz": {
            "icon": "Q",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "34px"
      },
      "toolkit-quick-poll": {
            "icon": "P",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "34px"
      },
      "toolkit-digital-timer": {
            "icon": "00",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "28px"
      },
      "toolkit-hourglass": {
            "icon": "⌛",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "34px"
      },
      "toolkit-pie-timer": {
            "icon": "◔",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "34px"
      },
      "toolkit-first-to-buzz": {
            "icon": "⚡",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "34px"
      },
      "toolkit-presentation-lottery": {
            "icon": "🎫",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "28px"
      },
      "toolkit-card-draw": {
            "icon": "🂠",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "28px"
      },
      "toolkit-lucky-ladder": {
            "icon": "⇄",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "34px"
      },
      "toolkit-group-maker": {
            "icon": "👥",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "28px"
      },
      "toolkit-ruler": {
            "icon": "▭",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "34px"
      },
      "toolkit-triangle": {
            "icon": "△",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "34px"
      },
      "toolkit-protractor": {
            "icon": "∠",
            "bg": "linear-gradient(135deg, #eaf1ff, #f6f9ff)",
            "color": "#204cff",
            "size": "34px"
      }
});

Object.assign(hubVisuals, {
  'explore-browse': { icon: '⌕', bg: 'linear-gradient(135deg, #eaf1ff, #f6f9ff)', color: '#204cff', size: '42px' },
  'explore-creator-page': { icon: 'CP', bg: 'linear-gradient(135deg, #e8f4ff, #dff7ef)', color: '#0f7f78', size: '34px' }
});

Object.assign(hubVisuals, {
  'cat-storage': { icon: 'MS', bg: 'linear-gradient(135deg, #eaf1ff, #f6f9ff)', color: '#204cff', size: '30px' },
  'storage-overview': { icon: 'MS', bg: 'linear-gradient(135deg, #eaf1ff, #f6f9ff)', color: '#204cff', size: '30px' },
  'storage-folder': { icon: '⌕', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#0f7f78', size: '42px' },
  'storage-move': { icon: '▦', bg: 'linear-gradient(135deg, #e6f0ff, #fff7df)', color: '#2563e9', size: '36px' },
  'storage-trash': { icon: '⋯', bg: 'linear-gradient(135deg, #f7f7f6, #eaf1ff)', color: '#233a78', size: '42px' }
});

Object.assign(hubCovers, {
  'cat-explore': { icon: 'EX', bg: 'linear-gradient(135deg, #eaf1ff, #f6f9ff)', color: '#204cff', size: '50px' },
  'cat-toolkit': { icon: 'TK', bg: 'linear-gradient(135deg, #eaf1ff, #f6f9ff)', color: '#204cff', size: '50px' },
  'group-toolkit-normal': { icon: '⭐', bg: 'linear-gradient(135deg, #eaf1ff, #fff7df)', color: '#204cff', size: '44px' },
  'group-toolkit-timer': { icon: '⏱', bg: 'linear-gradient(135deg, #e6f0ff, #f6f9ff)', color: '#2563e9', size: '44px' },
  'group-toolkit-competition': { icon: '🏆', bg: 'linear-gradient(135deg, #fff1df, #ffe6ef)', color: '#d85f4f', size: '44px' },
  'group-toolkit-draw': { icon: '🎴', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#0f7f78', size: '44px' },
  'group-toolkit-math-tools': { icon: '📐', bg: 'linear-gradient(135deg, #f7f7f6, #eaf1ff)', color: '#233a78', size: '44px' }
});

Object.assign(hubCovers, {
  'cat-storage': { icon: 'MS', bg: 'linear-gradient(135deg, #eaf1ff, #f6f9ff)', color: '#204cff', size: '50px' },
  'storage-overview': { icon: 'MS', bg: 'linear-gradient(135deg, #eaf1ff, #f6f9ff)', color: '#204cff', size: '50px' },
  'storage-folder': { icon: '⌕', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#0f7f78', size: '64px' },
  'storage-move': { icon: '▦', bg: 'linear-gradient(135deg, #e6f0ff, #fff7df)', color: '#2563e9', size: '56px' },
  'storage-trash': { icon: '⋯', bg: 'linear-gradient(135deg, #f7f7f6, #eaf1ff)', color: '#233a78', size: '64px' }
});

Object.assign(hubVisuals, {
  'cat-faq': { icon: '?', bg: 'linear-gradient(135deg, #eaf1ff, #f6f9ff)', color: '#204cff', size: '54px' }
});

Object.assign(hubCovers, {
  'cat-faq': { icon: '?', bg: 'linear-gradient(135deg, #eaf1ff, #f6f9ff)', color: '#204cff', size: '72px' }
});

// END TOOL KIT VISUAL PATCH


// BEGIN CLASS VISUAL PATCH
Object.assign(hubDescriptions, {
  'cat-class': 'Class별 수업·과제 리포트와 학생 명단 관리 흐름을 확인합니다.',
  'class-teaching-report': '실시간 수업 참여율, 정확도, 완료율과 학생별 Activity 기록을 확인합니다.',
  'class-assignment-report': '과제 제출률, 평균 정확도, 학생별 제출 상세 결과를 확인합니다.',
  'class-management': 'Class를 생성하고 학생 명단, QR Code, Class 정보 수정과 필터를 관리합니다.'
});

Object.assign(hubVisuals, {
  'cat-class': { icon: 'CL', bg: 'linear-gradient(135deg, #eaf1ff, #f6f9ff)', color: '#204cff', size: '34px' },
  'class-teaching-report': { icon: 'TR', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#0f7f78', size: '34px' },
  'class-assignment-report': { icon: 'AR', bg: 'linear-gradient(135deg, #e6f0ff, #f6f9ff)', color: '#204cff', size: '34px' },
  'class-management': { icon: 'CM', bg: 'linear-gradient(135deg, #f7f7f6, #eaf1ff)', color: '#233a78', size: '34px' }
});

Object.assign(hubCovers, {
  'cat-class': { icon: 'CL', bg: 'linear-gradient(135deg, #eaf1ff, #f6f9ff)', color: '#204cff', size: '54px' },
  'class-teaching-report': { icon: 'TR', bg: 'linear-gradient(135deg, #eaf1ff, #e9fff6)', color: '#0f7f78', size: '54px' },
  'class-assignment-report': { icon: 'AR', bg: 'linear-gradient(135deg, #e6f0ff, #f6f9ff)', color: '#204cff', size: '54px' },
  'class-management': { icon: 'CM', bg: 'linear-gradient(135deg, #f7f7f6, #eaf1ff)', color: '#233a78', size: '54px' }
});
// END CLASS VISUAL PATCH

// BEGIN ASSESSMENT ZIP VISUAL PATCH
Object.assign(hubDescriptions, {
  'group-assessment-run': 'Curriculum에서 제공되는 Assessment를 찾아 Assign하고, Share Assessment와 학생 응시, 결과 리뷰까지 확인합니다.',
  'assessment-create': 'Curriculum의 Assessment 탭과 Curriculum Tree에서 배정할 평가지 카드를 찾습니다.',
  'assessment-questions': 'Assign 창에서 미리보기, Curriculum Details, Due Date, Shuffle Questions, Assigned to를 설정합니다.',
  'assessment-distribute': 'Share Assessment 창에서 URL, QR Code, Access Code를 공유하고 학생 응시 화면을 확인합니다.',
  'assessment-results': '제출 완료 화면과 Review Mode에서 Correct/Wrong 결과와 정답 리뷰를 확인합니다.'
});
// END ASSESSMENT ZIP VISUAL PATCH
