// Generates docs/social-flow-orientation.pptx — an onboarding deck explaining
// this repo's structure to a new contributor. Run with `npm run build:ppt`.
const pptxgen = require("pptxgenjs");

const COLORS = {
  bg: "17181A",
  fg: "F2F2F0",
  accent: "5B8DEF",
  muted: "98999D",
  surface: "202124",
};

const pptx = new pptxgen();
pptx.defineLayout({ name: "WIDE", width: 13.33, height: 7.5 });
pptx.layout = "WIDE";

// Document metadata — shows up as the file's title/subject in
// PowerPoint/Keynote/Google Slides' "File info" panel.
pptx.title = "소셜 플로우 오리엔테이션";
pptx.subject = "소셜 플로우(Social Flow) 신규 합류자 온보딩 자료";
pptx.author = "Social Flow";
pptx.company = "Social Flow";

function baseSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.bg };
  slide.addText("소셜 플로우 오리엔테이션", {
    x: 0.6,
    y: 7.12,
    w: 8,
    h: 0.3,
    fontSize: 10,
    color: COLORS.muted,
    fontFace: "Arial",
  });
  return slide;
}

function titleBar(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.6,
    y: 0.4,
    w: 12.1,
    h: 0.9,
    fontSize: 30,
    bold: true,
    color: COLORS.fg,
    fontFace: "Arial",
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6,
      y: 1.1,
      w: 12.1,
      h: 0.5,
      fontSize: 16,
      color: COLORS.muted,
      fontFace: "Arial",
    });
  }
  slide.addShape(pptx.ShapeType.line, {
    x: 0.6,
    y: 1.65,
    w: 12.1,
    h: 0,
    line: { color: COLORS.surface, width: 1.5 },
  });
}

function bullets(slide, items, opts = {}) {
  slide.addText(
    items.map((text) => ({ text, options: { bullet: true, breakLine: true } })),
    {
      x: opts.x ?? 0.6,
      y: opts.y ?? 2.0,
      w: opts.w ?? 12.1,
      h: opts.h ?? 5.0,
      fontSize: opts.fontSize ?? 18,
      color: COLORS.fg,
      fontFace: "Arial",
      lineSpacingMultiple: 1.35,
      valign: "top",
    },
  );
}

// One glossary term per slide: big heading, plain-language definition,
// optional everyday analogy, and a clickable link to the official site.
function glossaryPage(term, def, linkUrl, opts = {}) {
  const slide = baseSlide();

  slide.addText(opts.kicker ?? "용어 설명", {
    x: 0.6,
    y: 0.5,
    w: 12.1,
    h: 0.5,
    fontSize: 14,
    color: COLORS.muted,
    fontFace: "Arial",
  });

  slide.addText(term, {
    x: 0.6,
    y: 0.95,
    w: 12.1,
    h: 1.1,
    fontSize: 40,
    bold: true,
    color: COLORS.fg,
    fontFace: "Arial",
  });

  slide.addShape(pptx.ShapeType.line, {
    x: 0.6,
    y: 2.15,
    w: 12.1,
    h: 0,
    line: { color: COLORS.surface, width: 1.5 },
  });

  slide.addText(def, {
    x: 0.6,
    y: 2.5,
    w: 12.1,
    h: 3.4,
    fontSize: 22,
    color: COLORS.fg,
    fontFace: "Arial",
    lineSpacingMultiple: 1.4,
    valign: "top",
  });

  if (opts.analogy) {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.6,
      y: 5.1,
      w: 12.1,
      h: 0.9,
      fill: { color: COLORS.surface },
      line: { color: COLORS.surface },
      rectRadius: 0.08,
    });
    slide.addText(`쉽게 말하면: ${opts.analogy}`, {
      x: 0.9,
      y: 5.1,
      w: 11.5,
      h: 0.9,
      fontSize: 15,
      italic: true,
      color: COLORS.muted,
      fontFace: "Arial",
      valign: "middle",
    });
  }

  slide.addText(
    [
      { text: "자세히 보기: ", options: { color: COLORS.muted } },
      {
        text: linkUrl,
        options: { color: COLORS.accent, underline: true, hyperlink: { url: linkUrl } },
      },
    ],
    {
      x: 0.6,
      y: 6.45,
      w: 12.1,
      h: 0.4,
      fontSize: 15,
      fontFace: "Arial",
    },
  );

  return slide;
}

// One curriculum stage per slide (orientation + weeks 1-4): badge/kicker,
// stage title, and a plain-language description of what happens that week.
function curriculumPage(kicker, title, body, opts = {}) {
  const slide = baseSlide();

  slide.addText(kicker, {
    x: 0.6,
    y: 0.6,
    w: 9,
    h: 0.5,
    fontSize: 14,
    bold: true,
    color: COLORS.accent,
    fontFace: "Arial",
    charSpacing: 1,
  });

  if (opts.badge) {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 10.5,
      y: 0.55,
      w: 2.2,
      h: 0.5,
      fill: { color: COLORS.accent },
      line: { color: COLORS.accent },
      rectRadius: 0.25,
    });
    slide.addText(opts.badge, {
      x: 10.5,
      y: 0.55,
      w: 2.2,
      h: 0.5,
      fontSize: 14,
      bold: true,
      color: COLORS.bg,
      fontFace: "Arial",
      align: "center",
      valign: "middle",
    });
  }

  slide.addText(title, {
    x: 0.6,
    y: 1.15,
    w: 12.1,
    h: 1.0,
    fontSize: 36,
    bold: true,
    color: COLORS.fg,
    fontFace: "Arial",
  });

  slide.addShape(pptx.ShapeType.line, {
    x: 0.6,
    y: 2.2,
    w: 12.1,
    h: 0,
    line: { color: COLORS.surface, width: 1.5 },
  });

  slide.addText(body, {
    x: 0.6,
    y: 2.6,
    w: 12.1,
    h: 3.8,
    fontSize: 20,
    color: COLORS.fg,
    fontFace: "Arial",
    lineSpacingMultiple: 1.45,
    valign: "top",
  });

  return slide;
}

function codeBlock(slide, lines, opts = {}) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: opts.x ?? 0.6,
    y: opts.y ?? 2.0,
    w: opts.w ?? 12.1,
    h: opts.h ?? 4.6,
    fill: { color: COLORS.surface },
    line: { color: COLORS.surface },
    rectRadius: 0.08,
  });
  slide.addText(lines.join("\n"), {
    x: (opts.x ?? 0.6) + 0.3,
    y: (opts.y ?? 2.0) + 0.25,
    w: (opts.w ?? 12.1) - 0.6,
    h: (opts.h ?? 4.6) - 0.5,
    fontSize: opts.fontSize ?? 15,
    color: COLORS.fg,
    fontFace: "Menlo",
    valign: "top",
  });
}

// 1. Title
{
  const slide = baseSlide();
  slide.addText("오리엔테이션 자료", {
    x: 0.8,
    y: 2.1,
    w: 11.7,
    h: 0.5,
    fontSize: 16,
    bold: true,
    color: COLORS.accent,
    fontFace: "Arial",
    charSpacing: 2,
  });
  slide.addText("소셜 플로우 오리엔테이션", {
    x: 0.8,
    y: 2.6,
    w: 11.7,
    h: 1.2,
    fontSize: 44,
    bold: true,
    color: COLORS.fg,
    fontFace: "Arial",
  });
  slide.addText("Social Flow — Threads 클론 프로젝트 신규 합류자를 위한 온보딩 자료", {
    x: 0.8,
    y: 3.7,
    w: 11.7,
    h: 0.7,
    fontSize: 18,
    color: COLORS.muted,
    fontFace: "Arial",
  });
  slide.addText("Next.js 16 + Supabase + Flutter · 모노리포", {
    x: 0.8,
    y: 4.3,
    w: 11.7,
    h: 0.5,
    fontSize: 16,
    color: COLORS.muted,
    fontFace: "Arial",
  });
}

// ---------------------------------------------------------------------------
// Curriculum roadmap — where this orientation sits in the full course
// ---------------------------------------------------------------------------
const CURRICULUM = [
  {
    kicker: "오리엔테이션",
    badge: "무료",
    title: "맛보기 강의 · Claude Code & AI 에이전트 기초",
    body: "Claude Code와 AI 에이전트 기초, Next.js·Flutter·Supabase 개념, GitHub 사용법을 익히고 뉴스/SNS 등 오픈소스를 활용해 첫 번째 서비스를 만들어봅니다. AI와 협업하는 개발 방식을 익힙니다.",
  },
  {
    kicker: "1주차",
    title: "프로젝트 시작",
    body: "커머스 또는 플랫폼 오픈소스를 기반으로 내 서비스 제작을 시작합니다. 프로젝트 구조를 이해하고 UI/UX를 내 아이디어에 맞게 수정하며, GitHub 협업과 Claude Agent를 활용한 개발 워크플로를 익힙니다.",
  },
  {
    kicker: "2주차",
    title: "백엔드 구축",
    body: "Supabase를 활용한 데이터베이스 및 회원가입·로그인을 구현합니다. CRUD, API 연동 등 서비스 핵심 기능을 개발하고 데이터 구조 설계와 권한 관리(RLS)를 적용합니다.",
  },
  {
    kicker: "3주차",
    title: "기능 고도화",
    body: "AI 기능(MCP, 외부 API)을 연동하고 Flutter 앱 또는 Next.js 웹 기능을 확장합니다. 코드 리팩터링과 기본 보안, 성능 개선을 진행합니다.",
  },
  {
    kicker: "4주차",
    title: "배포 및 완성",
    body: "Vercel 배포 및 운영 환경을 설정합니다. 프로젝트를 최종 점검하고 코드 리뷰를 진행한 뒤, 완성된 서비스를 발표하고 향후 확장 방향을 제시합니다.",
  },
];

// Roadmap overview — all five stages at a glance
{
  const slide = baseSlide();
  titleBar(slide, "커리큘럼 로드맵", "이 오리엔테이션은 전체 과정 중 어디에 있을까요?");

  const rowH = 0.92;
  CURRICULUM.forEach((stage, i) => {
    const y = 2.0 + i * rowH;
    const isCurrent = i === 0;

    if (isCurrent) {
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.6,
        y,
        w: 12.1,
        h: rowH - 0.12,
        fill: { color: COLORS.surface },
        line: { color: COLORS.accent, width: 1 },
        rectRadius: 0.08,
      });
    }

    slide.addText(
      [
        {
          text: stage.kicker + (isCurrent ? "  ← 지금 여기" : ""),
          options: { bold: true, color: isCurrent ? COLORS.accent : COLORS.fg },
        },
        { text: `   ${stage.title}`, options: { color: COLORS.muted } },
      ],
      {
        x: 0.9,
        y,
        w: 11.5,
        h: rowH - 0.12,
        fontSize: 16,
        fontFace: "Arial",
        valign: "middle",
      },
    );
  });
}

CURRICULUM.forEach((stage) => {
  curriculumPage(stage.kicker, stage.title, stage.body, { badge: stage.badge });
});

// ---------------------------------------------------------------------------
// Glossary — one term per slide, plain-language definition + reference link
// ---------------------------------------------------------------------------
const GLOSSARY = [
  {
    term: "Git",
    def: "코드를 수정할 때마다 그 변경 이력을 저장해두는 도구예요. 언제 무엇이 바뀌었는지 기록되고, 문제가 생기면 예전 버전으로 되돌릴 수 있어요.",
    analogy: "문서 작업할 때 쓰는 '버전별로 저장하기'를 훨씬 정교하게 만든 것",
    link: "https://git-scm.com",
  },
  {
    term: "GitHub",
    def: "Git으로 관리하는 코드를 인터넷에 올려두고, 여러 사람이 같이 보고 수정할 수 있게 해주는 웹사이트예요.",
    analogy: "코드를 위한 구글 드라이브 + 협업 도구",
    link: "https://github.com",
  },
  {
    term: "저장소 (Repository)",
    def: "프로젝트의 코드와 변경 이력이 전부 들어있는 폴더예요. 흔히 '레포(repo)'라고 줄여 불러요.",
    link: "https://docs.github.com/en/repositories",
  },
  {
    term: "모노리포 (Monorepo)",
    def: "여러 개의 앱이나 서비스를 하나의 저장소 안에 같이 담아두는 방식이에요. 이 프로젝트는 웹 앱, 관리자 앱, Flutter 앱을 전부 한 저장소에 같이 두고 있어요.",
    link: "https://github.com/white100s/social_flow",
  },
  {
    term: "프론트엔드 (Frontend)",
    def: "사용자가 직접 보고 클릭하는 화면 부분이에요. 웹사이트의 디자인, 버튼, 글자 등이 여기 해당돼요.",
    link: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web",
  },
  {
    term: "백엔드 (Backend)",
    def: "화면 뒤에서 데이터를 저장하고 처리하는 부분이에요. 로그인 확인, 게시글 저장 같은 일이 여기서 일어나요.",
    link: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps",
  },
  {
    term: "API",
    def: "프론트엔드가 백엔드에게 데이터를 요청하고 받을 때 쓰는, 서로 약속된 통신 방법이에요.",
    link: "https://developer.mozilla.org/en-US/docs/Web/API",
  },
  {
    term: "Next.js",
    def: "리액트(React) 기반으로 웹사이트를 쉽게 만들 수 있게 도와주는 프레임워크예요. 이 프로젝트의 웹 앱과 관리자 앱이 Next.js로 만들어졌어요.",
    link: "https://nextjs.org",
  },
  {
    term: "Vercel",
    def: "Next.js를 만든 회사이고, Next.js로 만든 웹사이트를 인터넷에 올려서 서비스할 수 있게 해주는 배포 플랫폼이에요.",
    link: "https://vercel.com",
  },
  {
    term: "Supabase",
    def: "데이터베이스, 회원가입/로그인, API를 한 번에 제공해주는 서비스예요. 직접 서버를 만들지 않아도 백엔드를 빠르게 갖출 수 있어요. 이 프로젝트의 실제 데이터베이스이자 로그인 시스템이에요.",
    link: "https://supabase.com",
  },
  {
    term: "RLS (Row Level Security)",
    def: "데이터베이스 안에서 '누가 어떤 데이터를 보고 고칠 수 있는지'를 강제하는 보안 규칙이에요. 예: '내 글은 나만 지울 수 있다'를 DB가 직접 강제함.",
    link: "https://supabase.com/docs/guides/database/postgres/row-level-security",
  },
  {
    term: "Flutter",
    def: "구글이 만든 도구로, 코드 하나로 아이폰, 안드로이드, 맥, 윈도우용 앱을 동시에 만들 수 있게 해줘요.",
    link: "https://flutter.dev",
  },
  {
    term: "npm",
    def: "자바스크립트 프로젝트에 필요한 외부 코드(라이브러리)를 설치하고 관리해주는 가장 기본적인 도구예요.",
    link: "https://www.npmjs.com",
  },
  {
    term: "pnpm",
    def: "npm과 같은 역할을 하지만 더 빠르고 디스크 공간을 아껴주는 패키지 매니저예요. 이 프로젝트는 pnpm을 사용해요.",
    link: "https://pnpm.io",
  },
  {
    term: "Claude Code",
    def: "터미널에서 자연어로 대화하면서 코드를 대신 읽고, 쓰고, 실행까지 해주는 AI 코딩 도구예요. 이 프로젝트도 전부 Claude Code와 대화하면서 만들어졌어요.",
    link: "https://claude.com/claude-code",
  },
];

GLOSSARY.forEach(({ term, def, analogy, link }) => {
  glossaryPage(term, def, link, { analogy });
});

// Overview
{
  const slide = baseSlide();
  titleBar(slide, "프로젝트 개요", "무엇을, 왜 만들고 있는가");
  bullets(slide, [
    "Threads(스레드)를 벤치마킹한 소셜 앱 — 짧은 글 피드, 좋아요, 팔로우",
    "백엔드는 Supabase 하나로 통일: Postgres + Auth + RLS + (추후) Storage/Realtime",
    "클라이언트는 세 개: 웹(Next.js 16), 네이티브 앱(Flutter), 관리자 웹(Next.js)",
    "Flutter는 macOS/Windows/Android/iOS/Web까지 한 코드베이스로 커버",
    "리포지토리 하나 안에서 각 앱을 폴더로 분리하는 모노리포 구조",
  ]);
}

// Data model
{
  const slide = baseSlide();
  titleBar(slide, "데이터 모델", "supabase/schema.sql");
  codeBlock(
    slide,
    [
      "profiles   id(uuid, = auth.users.id) · username(unique) · display_name",
      "           avatar_url · bio · is_admin · is_banned",
      "",
      "posts      id · author_id → profiles.id · content · reply_to_id(nullable)",
      "",
      "likes      post_id → posts.id · user_id → profiles.id  (복합 PK)",
      "",
      "follows    follower_id → profiles.id · following_id → profiles.id",
      "           (복합 PK, follower ≠ following 체크 제약)",
    ],
    { fontSize: 17 },
  );
}

// Auth flow
{
  const slide = baseSlide();
  titleBar(slide, "인증 흐름", "Supabase Auth + 자동 프로필 생성");
  bullets(slide, [
    "가입: 이메일 + 비밀번호만 입력 (아이디는 받지 않음)",
    "auth.users insert 시 handle_new_user 트리거가 profiles row를 자동 생성",
    "username이 없으면 user_<uuid앞8자리>, display_name은 이메일 앞부분으로 대체",
    "이메일 확인(confirm email)이 켜져 있어 인증 전엔 로그인 불가 → /login?confirm=1 안내",
    "모든 테이블에 RLS 적용: 읽기는 공개, 쓰기는 auth.uid()가 본인 것일 때만 허용",
  ]);
}

// Web app
{
  const slide = baseSlide();
  titleBar(slide, "웹 앱 (Next.js 16)", "App Router + Server Actions");
  bullets(slide, [
    "라우트 대부분이 Server Component — 서버에서 Supabase를 직접 쿼리",
    "쓰기 작업(좋아요, 팔로우, 글쓰기, 로그인/가입)은 전부 Server Actions (\"use server\")",
    "src/proxy.ts (Next 16의 middleware 후속 컨벤션)가 세션 갱신 + /new, /settings 보호",
    "src/lib/supabase/{client,server}.ts — 브라우저용 / 서버용 Supabase 클라이언트 분리",
    "포트 3721에서 개발 서버 실행 (pnpm dev)",
  ]);
}

// i18n & theme
{
  const slide = baseSlide();
  titleBar(slide, "다국어 & 테마", "쿠키 기반, 서버에서 렌더링");
  bullets(slide, [
    "한국어 / 영어 지원 — src/lib/i18n/dictionaries.ts 에 모든 문구 집중",
    "locale 쿠키로 서버 컴포넌트에서 바로 알맞은 언어 렌더링 (클라이언트 JS 불필요)",
    "다크 / 라이트 테마도 동일 패턴 — theme 쿠키 + data-theme 속성",
    "다크 모드는 순검정 대신 부드러운 차콜(#17181A) 사용",
    "Flutter 앱도 동일한 문구·색상 토큰을 그대로 이식 (lib/i18n, lib/theme)",
  ]);
}

// Flutter app
{
  const slide = baseSlide();
  titleBar(slide, "Flutter 앱", "동일 Supabase 프로젝트를 그대로 사용");
  codeBlock(slide, [
    "flutter_app/lib/",
    "├─ constants.dart        # Supabase URL / anon key",
    "├─ theme/                # AppColors, AppTheme (웹과 동일 팔레트)",
    "├─ i18n/                 # dictionaries.dart (웹과 동일 문구)",
    "├─ state/                # AppPreferences (locale/theme, SharedPreferences)",
    "├─ services/              # Repository (posts/likes/follows/profiles 쿼리)",
    "├─ models/                # Profile, Post",
    "├─ screens/               # Login, Signup, Feed, NewPost, Profile",
    "└─ widgets/               # PostCard, LikeButton, FollowButton",
  ]);
}

// Admin app
{
  const slide = baseSlide();
  titleBar(slide, "관리자 앱", "같은 Supabase 프로젝트, RLS로 권한 분리");
  bullets(slide, [
    "별도 Next.js 앱 (admin/) — 서비스 role 키 없이 anon 키 + RLS만으로 동작",
    "profiles.is_admin 컬럼 + is_admin() security definer 함수로 권한 판정",
    "관리자만 다른 사람의 프로필 수정(정지 처리) / 게시물 삭제 가능하도록 RLS 정책 추가",
    "is_banned=true인 계정은 새 글/좋아요/팔로우 작성이 RLS에서 자동 차단",
    "첫 관리자는 SQL로 직접 지정: update profiles set is_admin=true where id=…",
  ]);
}

// ---------------------------------------------------------------------------
// Hands-on section (deliberately placed near the end of the deck)
// ---------------------------------------------------------------------------

// Claude Code 실행하기
{
  const slide = baseSlide();
  titleBar(slide, "Claude Code 실행하기", "터미널에서 대화하며 코드를 만드는 AI 도구");
  bullets(slide, [
    "설치: npm install -g @anthropic-ai/claude-code (또는 공식 설치 스크립트)",
    "프로젝트 폴더로 이동한 뒤 터미널에 claude 라고 치면 대화가 시작됨",
    "'로그인 페이지 만들어줘' 처럼 자연어로 요청하면 파일을 직접 읽고, 쓰고, 필요하면 명령어(빌드/테스트/git)까지 실행함",
    "사람이 코드를 복사·붙여넣기 하지 않아도 됨 — 결과물을 바로 프로젝트 안에 반영",
    "이 오리엔테이션 문서와 소셜 플로우 프로젝트 전체가 Claude Code와의 대화로 만들어졌음",
  ]);
}

// Claude Code 데모: 자기소개 페이지
{
  const slide = baseSlide();
  titleBar(slide, "Claude Code 데모", "제일 간단한 예시로 감 잡기: 자기소개 페이지");
  codeBlock(slide, [
    "내가 입력:",
    '  "html/css로 자기소개 웹페이지 하나 만들어줘.',
    '   이름, 사진, 한 줄 소개, 연락처가 들어가면 좋겠어."',
    "",
    "Claude Code가 하는 일:",
    "  1. index.html, style.css 파일을 새로 만듦",
    "  2. 이름/사진/소개/연락처 영역을 채워 넣음",
    "  3. 브라우저로 열어서 결과를 바로 확인할 수 있게 안내",
    "",
    "포인트: 복잡한 프로젝트(소셜 플로우)도 원리는 똑같음 —",
    "        '무엇을 만들고 싶은지'를 문장으로 여러 번 주고받는 것의 반복",
  ]);
}

// Clone 받아서 실행하기
{
  const slide = baseSlide();
  titleBar(slide, "이 프로젝트 Clone 받아서 실행하기", "");
  codeBlock(slide, [
    "git clone https://github.com/white100s/social_flow.git",
    "cd social_flow",
    "",
    "# 웹 (Next.js)",
    "pnpm install && pnpm dev        # http://localhost:3721",
    "",
    "# 관리자 앱",
    "cd admin && pnpm install && pnpm dev   # http://localhost:3722",
    "",
    "# Flutter",
    "cd flutter_app && flutter pub get && flutter run -d chrome",
    "",
    "# DB 스키마 적용 (최초 1회, 재실행해도 안전)",
    "Supabase 대시보드 → SQL Editor → supabase/schema.sql 실행",
  ]);
}

// 파일 구조 설명
{
  const slide = baseSlide();
  titleBar(slide, "파일 구조 설명", "모노리포 폴더 배치");
  codeBlock(slide, [
    "social_flows/",
    "├─ src/                 # Next.js 16 웹 앱 (App Router) · 포트 3721",
    "│   ├─ app/              # 라우트: /, /login, /signup, /new, /profile/[username]",
    "│   ├─ components/       # Header, PostCard, LikeButton, FollowButton …",
    "│   └─ lib/              # supabase 클라이언트, i18n 사전, theme",
    "├─ admin/                # 관리자 웹 앱 (Next.js) · 포트 3722",
    "│   └─ src/app/          # /login, /(대시보드), /users, /posts",
    "├─ supabase/",
    "│   └─ schema.sql        # 모든 테이블 + RLS + 관리자 정책, 하나의 파일로 통합",
    "├─ flutter_app/          # Flutter 클라이언트 (macOS/Windows/Android/iOS/Web)",
    "│   └─ lib/               # screens/, widgets/, services/, i18n/, theme/",
    "└─ docs/                 # 이 오리엔테이션 자료 생성 스크립트",
  ]);
}

// Next steps
{
  const slide = baseSlide();
  titleBar(slide, "다음 단계", "아직 안 된 것들");
  bullets(slide, [
    "답글(스레드) UI — posts.reply_to_id는 이미 스키마에 있음",
    "이미지 업로드 (Supabase Storage)",
    "실시간 피드 업데이트 (Supabase Realtime)",
    "신고/문의 처리 흐름을 관리자 앱에 추가",
    "Flutter macOS/iOS는 Xcode 전체 설치 후 빌드 검증 필요, Windows는 Windows 머신에서만",
  ]);
}

const outPath = require("path").join(__dirname, "social-flow-orientation.pptx");
pptx.writeFile({ fileName: outPath }).then(() => {
  console.log("Wrote", outPath);
});
