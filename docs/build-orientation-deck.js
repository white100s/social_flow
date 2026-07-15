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

// A labeled box for simple concept diagrams (architecture / data model / flow).
function diagramBox(slide, x, y, w, h, text, opts = {}) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    fill: { color: opts.fill ?? COLORS.surface },
    line: { color: opts.line ?? COLORS.accent, width: opts.lineWidth ?? 1.25 },
    rectRadius: 0.08,
  });
  slide.addText(text, {
    x,
    y,
    w,
    h,
    fontSize: opts.fontSize ?? 14,
    bold: opts.bold ?? false,
    color: opts.color ?? COLORS.fg,
    fontFace: "Arial",
    align: "center",
    valign: "middle",
    lineSpacingMultiple: 1.2,
  });
}

// A straight connector with an arrowhead, for linking diagramBox()es.
// Arrow points from (x,y) to (x+w,y+h) unless opts.reverse flips it.
function arrow(slide, x, y, w, h, opts = {}) {
  slide.addShape(pptx.ShapeType.line, {
    x,
    y,
    w,
    h,
    line: {
      color: opts.color ?? COLORS.muted,
      width: opts.width ?? 1.5,
      beginArrowType: opts.reverse ? "triangle" : "none",
      endArrowType: opts.reverse ? "none" : "triangle",
    },
  });
  if (opts.label) {
    slide.addText(opts.label, {
      x: x - (opts.labelW ?? 1.6) / 2 + (opts.labelDx ?? w / 2),
      y: y - (opts.labelH ?? 0.3) / 2 + (opts.labelDy ?? h / 2),
      w: opts.labelW ?? 1.6,
      h: opts.labelH ?? 0.3,
      fontSize: opts.labelFontSize ?? 11,
      color: COLORS.muted,
      fontFace: "Arial",
      align: "center",
      valign: "middle",
    });
  }
}

// ---------------------------------------------------------------------------
// Glossary data — term, plain-language definition, optional analogy, and a
// reference link. The full one-term-per-slide pages live near the end of the
// deck; a compact index of just the terms appears right up front.
// ---------------------------------------------------------------------------
const GLOSSARY = [
  {
    term: "AI (인공지능)",
    def: "사람처럼 글을 이해하고, 판단하고, 새로운 결과물을 만들어내도록 만든 컴퓨터 기술 전반을 가리키는 말이에요.",
    analogy: "요즘은 이런 AI를 메모·정리·아이디어 확장을 돕는 '제2의 뇌'처럼 활용하기도 해요",
    link: "https://www.ibm.com/topics/artificial-intelligence",
  },
  {
    term: "LLM (거대 언어 모델)",
    def: "엄청나게 많은 글을 학습해서 사람처럼 자연스러운 문장을 이해하고 만들어내는 AI 모델이에요. Claude, ChatGPT, Gemini가 모두 이 LLM을 기반으로 만들어졌어요.",
    analogy: "책을 어마어마하게 많이 읽은 사람에게 아무 주제나 물어보면 답해주는 것과 비슷함",
    link: "https://www.ibm.com/topics/large-language-models",
  },
  {
    term: "Claude",
    def: "Anthropic이 만든 LLM(AI 모델)이자 그 모델을 쓸 수 있는 서비스 이름이에요. 이 프로젝트에서 쓰는 Claude Code도 이 Claude를 터미널 안에서 쓸 수 있게 만든 도구예요.",
    link: "https://claude.ai",
  },
  {
    term: "ChatGPT",
    def: "OpenAI가 만든 대표적인 AI 챗봇 서비스예요. GPT라는 LLM을 기반으로 대화하듯 질문에 답하거나 글을 써줘요.",
    link: "https://chatgpt.com",
  },
  {
    term: "Gemini",
    def: "구글이 만든 LLM이자 AI 서비스 이름이에요. 구글 검색, 안드로이드 등 구글 제품 곳곳에 연동되어 있어요.",
    link: "https://gemini.google.com",
  },
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
    term: "라우팅 (Routing)",
    def: "웹사이트 주소(URL 경로)에 따라 어떤 화면을 보여줄지 정하는 것이에요. 예를 들어 '/login'으로 가면 로그인 화면이, '/profile/철수'로 가면 철수님 프로필 화면이 나오는 식이에요.",
    link: "https://nextjs.org/docs/app/building-your-application/routing",
  },
  {
    term: "React",
    def: "메타(페이스북)가 만든 라이브러리로, 화면을 작은 조각(컴포넌트)으로 나눠서 레고처럼 조립할 수 있게 해줘요. Next.js는 이 React 위에 만들어졌어요.",
    link: "https://react.dev",
  },
  {
    term: "Next.js",
    def: "React 기반으로 웹사이트를 쉽게 만들 수 있게 도와주는 프레임워크예요. 이 프로젝트의 웹 앱과 관리자 앱이 Next.js로 만들어졌어요.",
    link: "https://nextjs.org",
  },
  {
    term: "서버 컴포넌트 / 클라이언트 컴포넌트",
    def: "Next.js에서 화면 조각(컴포넌트)을 만드는 두 가지 방식이에요. 서버 컴포넌트는 서버가 미리 완성해서 보내주는 화면(더 빠르고 검색엔진에도 잘 보임), 클라이언트 컴포넌트는 브라우저에서 직접 동작하는 화면(버튼 클릭 같은 상호작용이 필요할 때)이에요.",
    link: "https://nextjs.org/docs/app/building-your-application/rendering/server-components",
  },
  {
    term: "미들웨어 (Middleware) / 프록시",
    def: "요청이 실제 화면에 도착하기 전에 한 번 거쳐 가는 중간 단계예요. 로그인했는지 확인하고, 안 됐으면 로그인 페이지로 돌려보내는 것 같은 일을 여기서 해요.",
    link: "https://nextjs.org/docs/app/building-your-application/routing/middleware",
  },
  {
    term: "포트 (Port)",
    def: "한 대의 컴퓨터 안에서 여러 서버(프로그램)를 구분하기 위한 번호예요. localhost:3721은 '내 컴퓨터의 3721번 문으로 들어가기'와 같은 뜻이에요.",
    link: "https://www.cloudflare.com/learning/network-layer/what-is-a-computer-port/",
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

// Table of contents
{
  const slide = baseSlide();
  titleBar(slide, "목차", "이 오리엔테이션은 이런 순서로 진행돼요");

  const toc = [
    "1. 용어 요약 — 앞으로 나올 용어를 미리 한눈에",
    "2. Claude Code 시작하기 — 계정 만들기 · 설치 · 초기 설정",
    "3. 커리큘럼 로드맵 — 오리엔테이션부터 1~4주차까지",
    "4. 프로젝트 살펴보기 — 아키텍처 · 데이터 모델 · 인증 흐름 · 웹/Flutter/관리자 앱",
    "5. 직접 해보기 — Claude Code 데모, Supabase 가입, Clone 받아서 실행하기",
    "6. FAQ — Supabase·Vercel 말고 실무에서는 어떻게 하는지",
    "7. 용어 자세히 보기 — 용어 요약에 나온 용어들의 상세 설명",
    "8. 별첨 — 기초를 처음부터 다지고 싶을 때 추천 자료",
  ];
  bullets(slide, toc, { fontSize: 18 });
}

// Glossary index — every term at a glance, right up front. Full one-term-per
// -slide explanations are near the end of the deck (see GLOSSARY.forEach below).
{
  const slide = baseSlide();
  titleBar(slide, "용어 요약", "앞으로 나올 용어들을 미리 한눈에 — 자세한 설명은 뒤쪽에 있어요");

  const terms = GLOSSARY.map((g) => g.term);
  const half = Math.ceil(terms.length / 2);

  bullets(slide, terms.slice(0, half), { x: 0.6, y: 2.0, w: 5.8, fontSize: 18 });
  bullets(slide, terms.slice(half), { x: 6.9, y: 2.0, w: 5.8, fontSize: 18 });
}

// ---------------------------------------------------------------------------
// Setup — Claude 계정 만들기 + Claude Code 설치 (맨 앞에 배치: 이후 모든 실습이
// Claude Code가 설치되어 있다는 전제로 진행되기 때문)
// ---------------------------------------------------------------------------

// Claude 계정 만들기
{
  const slide = baseSlide();
  titleBar(slide, "가장 먼저: Claude 계정 만들기", "Claude Code를 쓰려면 계정이 필요해요");
  bullets(slide, [
    "Claude = Anthropic에서 만든 AI 모델/서비스. Claude Code = 그 Claude를 터미널 안에서 쓸 수 있게 해주는 도구",
    "https://claude.ai 에서 이메일로 무료 가입 가능",
    "가입한 계정으로 Claude Code를 실행하면 브라우저 로그인 창이 뜨고, 로그인하면 바로 사용 가능",
    "회사/팀에서 API 키나 Anthropic Console 계정을 따로 준다면 그걸로 로그인해도 됨",
  ]);
}

// Claude Code 설치하기
{
  const slide = baseSlide();
  titleBar(slide, "Claude Code 설치하기", "터미널(Terminal / PowerShell)에서 한 번만 하면 끝");
  codeBlock(slide, [
    "# 준비물: Node.js 18 이상 (https://nodejs.org 에서 설치)",
    "node -v",
    "",
    "# 설치 (macOS / Windows / Linux 공통)",
    "npm install -g @anthropic-ai/claude-code",
    "",
    "# macOS / Linux는 아래 방법으로도 설치 가능",
    "curl -fsSL https://claude.ai/install.sh | bash",
    "",
    "# 설치 확인",
    "claude --version",
    "",
    "# 실행 (프로젝트 폴더 안에서)",
    "cd 내-프로젝트-폴더",
    "claude",
    "  → 처음 실행하면 브라우저가 열리고 Claude 계정으로 로그인하라고 안내함",
  ]);
}

// Claude Code 초기 설정
{
  const slide = baseSlide();
  titleBar(slide, "Claude Code 초기 설정", "설치 후 딱 한 번만 확인하면 되는 것들");
  bullets(slide, [
    "최초 실행 시 '이 폴더를 신뢰할까요?' 확인이 뜸 — 내가 작업할 프로젝트 폴더가 맞으면 허용",
    "기본은 파일 수정·명령어 실행마다 승인을 물어봄 — 매번 Enter로 승인하거나, 익숙해지면 자동 승인 모드로 바꿀 수 있음(신뢰하는 프로젝트에서만 권장)",
    "자주 쓰는 명령어: /help(도움말), /clear(대화 새로 시작), /model(모델 변경), 종료는 Ctrl+C 두 번",
    "CLAUDE.md 파일을 프로젝트 루트에 두면 Claude Code가 실행할 때마다 자동으로 읽음 — 코딩 규칙, 주의사항 등 '이 프로젝트 설명서'를 적어두는 곳",
    "전역 설정은 ~/.claude/ 폴더에 저장됨 — 로그인 정보, 개인 설정이 여기 보관됨",
  ]);
}

// ---------------------------------------------------------------------------
// Curriculum roadmap — where this orientation sits in the full course
// ---------------------------------------------------------------------------
const CURRICULUM = [
  {
    kicker: "오리엔테이션",
    badge: "무료",
    title: "맛보기 강의 · Claude Code & AI 에이전트 기초",
    body: "Claude Code와 AI 에이전트 기초, Next.js·Flutter·Supabase 개념, GitHub 사용법을 가볍게 실습해보는 맛보기 단계입니다. 뉴스/SNS 등 간단한 오픈소스를 활용해 부담 없이 첫 미니 서비스를 만들어보며, AI와 협업하는 개발 방식에 익숙해집니다.",
  },
  {
    kicker: "1주차",
    title: "프로젝트 시작",
    body: "오리엔테이션보다 한 단계 무거운, 본격적인 내 서비스 제작을 시작합니다. 커머스 또는 플랫폼 오픈소스를 기반으로 프로젝트 구조를 이해하고 UI/UX를 내 아이디어에 맞게 수정하며, GitHub 협업과 Claude Agent를 활용한 개발 워크플로를 익힙니다.",
    detail: [
      "베이스가 될 커머스 또는 플랫폼 오픈소스 프로젝트 선정 — 내가 만들고 싶은 서비스와 가장 가까운 것 고르기",
      "로컬 개발 환경 세팅 및 프로젝트 폴더 구조 파악 (어떤 파일이 어떤 화면을 만드는지 지도 그리기)",
      "UI/UX를 내 아이디어에 맞게 수정하는 실습 — 색상/레이아웃/문구부터 바꿔보며 감 잡기",
      "GitHub 저장소 생성, 커밋·브랜치·PR 등 협업 워크플로 익히기",
      "Claude Code에게 자연어로 기능 수정을 요청하고 결과를 검토하는 습관 만들기",
    ],
  },
  {
    kicker: "2주차",
    title: "백엔드 구축",
    body: "Supabase를 활용한 데이터베이스 및 회원가입·로그인을 구현합니다. CRUD, API 연동 등 서비스 핵심 기능을 개발하고 데이터 구조 설계와 권한 관리(RLS)를 적용합니다.",
    detail: [
      "Supabase 프로젝트 생성 및 서비스에 맞는 테이블 스키마 직접 설계",
      "회원가입/로그인 구현 — 이메일 인증, 세션 유지, 로그아웃까지 인증 흐름 전체",
      "게시글/댓글 등 핵심 데이터의 CRUD(생성·조회·수정·삭제) 기능을 프론트엔드와 연동",
      "Row Level Security(RLS) 정책 작성 — '내 데이터는 나만 수정 가능'을 DB 레벨에서 강제하기",
      "PostgREST 기반 자동 생성 API 활용법과 기본적인 API 설계 원칙 이해",
    ],
  },
  {
    kicker: "3주차",
    title: "기능 고도화",
    body: "AI 기능(MCP, 외부 API)을 연동하고 Flutter 앱 또는 Next.js 웹 기능을 확장합니다. 코드 리팩터링과 기본 보안, 성능 개선을 진행합니다.",
    detail: [
      "AI 기능 연동 실습 — MCP나 외부 API를 붙여 추천/요약/챗봇 같은 부가 기능 추가",
      "Flutter 앱 또는 Next.js 웹 중 하나를 선택해 기능을 심화 확장",
      "코드 리팩터링 — 중복 제거, 컴포넌트/함수 구조 정리로 유지보수하기 쉬운 코드 만들기",
      "기본 보안 점검 — 입력값 검증, 인증 체크 누락 여부, 환경변수(비밀키) 관리 점검",
      "성능 개선 — 이미지 최적화, DB 쿼리 최적화, 기본적인 캐싱 개념 적용",
    ],
  },
  {
    kicker: "4주차",
    title: "배포 및 완성",
    body: "Vercel 배포 및 운영 환경을 설정합니다. 프로젝트를 최종 점검하고 코드 리뷰를 진행한 뒤, 완성된 서비스를 발표하고 향후 확장 방향을 제시합니다.",
    detail: [
      "Vercel에 배포하고 환경변수·도메인 연결 등 운영 환경 설정하기",
      "에러 모니터링, 로그 확인 등 배포 후 서비스가 잘 도는지 점검하는 방법",
      "최종 코드 리뷰 및 QA — 팀원과 서로의 코드를 검토하며 놓친 버그 찾기",
      "완성된 서비스를 시연하며 무엇을, 왜 그렇게 만들었는지 발표하기",
      "실무에서는 이후 서비스 규모가 커지면 AWS/온프레미스 등으로 인프라를 옮기기도 함 (FAQ 참고)",
    ],
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

  if (stage.detail) {
    const slide = baseSlide();
    titleBar(slide, `${stage.kicker} 세부 내용`, stage.title);
    bullets(slide, stage.detail, { fontSize: 17 });
  }
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

// Architecture diagram — three clients, one shared Supabase backend
{
  const slide = baseSlide();
  titleBar(slide, "아키텍처 한눈에 보기", "클라이언트 3개가 같은 Supabase 프로젝트를 공유해요");

  const clients = [
    { label: "웹\n(Next.js 16)", y: 2.2 },
    { label: "Flutter 앱\n(macOS/Win/Android/iOS/Web)", y: 3.7 },
    { label: "관리자 앱\n(Next.js)", y: 5.2 },
  ];
  const boxH = 1.1;
  const clientX = 0.8;
  const clientW = 3.6;
  const backendX = 8.8;

  clients.forEach(({ label, y }) => {
    diagramBox(slide, clientX, y, clientW, boxH, label, { fontSize: 15 });
    arrow(slide, clientX + clientW, y + boxH / 2, backendX - (clientX + clientW), 0);
  });

  diagramBox(
    slide,
    backendX,
    2.2,
    3.6,
    4.1,
    "Supabase\n\nPostgres DB\nAuth (로그인)\nRLS (권한 규칙)",
    { fontSize: 16, bold: true, fill: COLORS.surface, line: COLORS.accent, lineWidth: 1.5 },
  );
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

// Data model diagram — how the four tables reference each other
{
  const slide = baseSlide();
  titleBar(slide, "데이터 모델 관계도", "화살표는 '누구를 참조하는지'를 가리켜요");

  diagramBox(slide, 4.9, 2.1, 3.5, 0.9, "profiles\n(사용자)", {
    fontSize: 16,
    bold: true,
    fill: COLORS.surface,
    line: COLORS.accent,
    lineWidth: 1.5,
  });

  const children = [
    { label: "posts\n(게시글)", x: 0.8, fk: "author_id" },
    { label: "likes\n(좋아요)", x: 4.9, fk: "user_id" },
    { label: "follows\n(팔로우)", x: 9.0, fk: "follower_id /\nfollowing_id" },
  ];
  const childY = 4.6;
  const childW = 3.5;
  const childH = 0.9;

  const profilesBottomY = 2.1 + 0.9;
  children.forEach(({ label, x, fk }) => {
    diagramBox(slide, x, childY, childW, childH, label, { fontSize: 15 });
    arrow(
      slide,
      x + childW / 2,
      profilesBottomY,
      0,
      childY - profilesBottomY,
      { reverse: true, label: fk, labelFontSize: 11 },
    );
  });

  slide.addText(
    "posts는 자기 자신도 참조해요 (reply_to_id → posts.id) — 답글 기능에 대비한 컬럼",
    {
      x: 0.8,
      y: 6.1,
      w: 11.5,
      h: 0.5,
      fontSize: 14,
      italic: true,
      color: COLORS.muted,
      fontFace: "Arial",
    },
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

// Auth flow diagram — left-to-right step sequence
{
  const slide = baseSlide();
  titleBar(slide, "인증 흐름 도식", "회원가입 한 번으로 여기까지 자동으로 이어져요");

  const steps = [
    "회원가입\n(이메일 + 비밀번호)",
    "auth.users\ninsert",
    "handle_new_user\n트리거 실행",
    "profiles row\n자동 생성",
    "이메일 확인 후\n로그인 가능",
  ];
  const stepW = 2.15;
  const gap = 0.2;
  const y = 3.3;
  const stepH = 1.3;
  const startX = 0.6;

  steps.forEach((label, i) => {
    const x = startX + i * (stepW + gap);
    diagramBox(slide, x, y, stepW, stepH, label, { fontSize: 13 });
    if (i < steps.length - 1) {
      arrow(slide, x + stepW, y + stepH / 2, gap, 0);
    }
  });
}

// Web app
{
  const slide = baseSlide();
  titleBar(slide, "웹 앱 (Next.js 16)", "화면 대부분은 서버가 미리 완성해서 보내줌");
  bullets(
    slide,
    [
      "화면 대부분이 '서버 컴포넌트'예요 — 브라우저가 아니라 서버에서 Supabase 데이터를 미리 가져와 완성된 화면으로 보내줘요 (그래서 더 빠르고, 검색엔진에도 잘 보여요)",
      "좋아요·팔로우·글쓰기·로그인처럼 '뭔가를 바꾸는' 동작은 'Server Action'이라는 방식으로 처리해요 — 버튼을 누르면 서버 쪽 함수가 바로 실행돼요 (API를 따로 안 만들어도 됨)",
      "모든 요청은 먼저 프록시(proxy, 예전 이름은 middleware)를 한 번 거쳐가요 — 여기서 로그인 상태를 확인하고, 안 됐으면 로그인 페이지로 돌려보내요",
      "Supabase에 접속하는 코드는 브라우저용/서버용으로 나뉘어 있어요 — 브라우저에서 접속하는 방법과 서버에서 접속하는 방법이 조금 다르기 때문이에요",
      "로컬에서는 3721번 포트로 개발 서버를 띄워요 — pnpm dev 명령어 한 줄이면 끝",
    ],
    { fontSize: 16 },
  );
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

// Supabase가 왜 필요할까
{
  const slide = baseSlide();
  titleBar(slide, "Supabase가 왜 필요할까?", "이 프로젝트를 실행하려면 '내 백엔드'가 있어야 해요");
  bullets(slide, [
    "회원가입/로그인, 게시글·좋아요·팔로우 저장 — 이 모든 걸 처리할 데이터베이스와 서버가 필요함",
    "그걸 직접 만들려면 서버 코드, 로그인 보안, DB 설계까지 다 손으로 짜야 함",
    "Supabase를 쓰면 '내 프로젝트' 하나만 만들면 DB + 회원가입/로그인 + API가 바로 준비됨",
    "이 저장소는 특정 계정에 종속되지 않음 — 각자 자기 Supabase 프로젝트를 만들어서 URL/키만 바꿔 끼우면 나만의 서비스가 됨",
    "그래서 clone 받은 뒤 가장 먼저 할 일은: 내 Supabase 프로젝트 만들기",
  ]);
}

// Supabase 회원가입 및 프로젝트 만들기
{
  const slide = baseSlide();
  titleBar(slide, "Supabase 회원가입 & 프로젝트 만들기", "5분이면 끝나요");
  codeBlock(slide, [
    "1. https://supabase.com 접속 → Start your project",
    "2. GitHub 계정으로 로그인 (또는 이메일로 가입)",
    "3. New Project 클릭",
    "   - 프로젝트 이름 입력 (예: social-flow)",
    "   - DB 비밀번호 설정 (따로 잘 저장해두기)",
    "   - 가까운 Region 선택 후 Create new project",
    "4. 1~2분 기다리면 프로젝트 생성 완료",
    "5. 왼쪽 메뉴 Settings → API 로 이동",
    "   - Project URL, anon public key 복사",
    "6. 이 두 값을 .env.local 에 붙여넣기",
    "   NEXT_PUBLIC_SUPABASE_URL=...",
    "   NEXT_PUBLIC_SUPABASE_ANON_KEY=...",
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

// ---------------------------------------------------------------------------
// FAQ — this course uses Supabase/Vercel for speed of learning; real
// companies use a much wider range of infrastructure depending on scale,
// budget, and security requirements.
// ---------------------------------------------------------------------------

// FAQ divider
{
  const slide = baseSlide();
  slide.addText("FAQ", {
    x: 0.8,
    y: 2.8,
    w: 11.7,
    h: 1.0,
    fontSize: 40,
    bold: true,
    color: COLORS.fg,
    fontFace: "Arial",
  });
  slide.addText("자주 묻는 질문", {
    x: 0.8,
    y: 3.7,
    w: 11.7,
    h: 0.6,
    fontSize: 20,
    color: COLORS.accent,
    fontFace: "Arial",
  });
}

// FAQ: Supabase 대신 실무에서는?
{
  const slide = baseSlide();
  titleBar(
    slide,
    "Q. Supabase 말고 실무에서는 어떻게 백엔드를 만드나요?",
    "회사 규모와 요구사항에 따라 선택지가 훨씬 다양해요",
  );
  bullets(slide, [
    "관리형 서비스(BaaS)를 계속 쓰는 경우 — Supabase, Firebase 등을 실제 서비스에도 그대로 사용",
    "AWS 조합으로 직접 구성 — RDS(Postgres/MySQL) + Cognito(로그인) + API Gateway/Lambda로 API를 직접 만듦",
    "온프레미스(On-premise) — 회사 자체 데이터센터나 서버에 Postgres/MySQL을 직접 설치해 운영 (금융·공공기관처럼 데이터를 외부 클라우드에 둘 수 없는 경우 흔함)",
    "직접 구성은 서버 보안 패치, 백업, 장애 대응까지 팀이 책임져야 해서 운영 부담이 커지는 대신, 세밀한 제어와 비용 최적화가 가능해짐",
    "이 오리엔테이션은 그 복잡한 인프라 결정을 잠시 미뤄두고 핵심 개념(DB·인증·API)에 먼저 집중하려고 Supabase를 선택한 것",
  ], { fontSize: 16 });
}

// FAQ: Vercel 대신 실무에서는?
{
  const slide = baseSlide();
  titleBar(
    slide,
    "Q. Vercel 말고 실무에서는 어떻게 배포하나요?",
    "Next.js를 Vercel 밖에서 돌리는 것도 흔한 일이에요",
  );
  bullets(slide, [
    "AWS — Amplify(Vercel과 비슷한 자동 배포), 또는 EC2/ECS/Fargate에 직접 Docker 컨테이너로 배포",
    "다른 클라우드 — GCP(Cloud Run), Azure(App Service) 등 회사가 이미 쓰고 있는 클라우드에 맞춰 선택",
    "온프레미스 / 사내 서버 — Docker + Kubernetes로 회사 자체 서버 안에서 직접 운영 (외부 인터넷 연결이 제한된 사내망 서비스 등)",
    "Next.js 앱 자체는 'node 서버로 실행 가능한 프로그램'이라 어디에 올리든 근본 원리는 같음 — Vercel은 그 배포 과정을 대신 자동화해주는 것뿐",
    "그래서 이 오리엔테이션에서 배우는 개념(라우팅, 서버 컴포넌트, 환경변수)은 나중에 AWS/온프레미스로 옮겨도 그대로 통함",
  ], { fontSize: 16 });
}

// ---------------------------------------------------------------------------
// Glossary — one term per slide, plain-language definition + reference link.
// Placed near the back of the deck; the compact index is right after the title.
// ---------------------------------------------------------------------------
GLOSSARY.forEach(({ term, def, analogy, link }) => {
  glossaryPage(term, def, link, { analogy });
});

// ---------------------------------------------------------------------------
// Appendix — where to go to build up fundamentals from scratch
// ---------------------------------------------------------------------------

// Appendix divider
{
  const slide = baseSlide();
  slide.addText("별첨", {
    x: 0.8,
    y: 2.8,
    w: 11.7,
    h: 1.0,
    fontSize: 40,
    bold: true,
    color: COLORS.fg,
    fontFace: "Arial",
  });
  slide.addText("기초 개념을 처음부터 제대로 쌓고 싶다면", {
    x: 0.8,
    y: 3.7,
    w: 11.7,
    h: 0.6,
    fontSize: 20,
    color: COLORS.accent,
    fontFace: "Arial",
  });
}

// Recommended sites
{
  const slide = baseSlide();
  titleBar(slide, "추천 사이트", "무료로 기초부터 다질 수 있는 곳들");
  bullets(
    slide,
    [
      "MDN Web Docs (developer.mozilla.org) — HTML/CSS/JS, 웹 표준 문서의 정석",
      "생활코딩 (opentutorials.org) — 한국어로 프로그래밍·Git·DB 기초를 처음부터",
      "freeCodeCamp (freecodecamp.org) — 무료 커리큘럼 + 실습 위주 웹 개발 기초",
      "roadmap.sh — 프론트엔드/백엔드/풀스택 등 분야별 학습 로드맵 지도",
      "Next.js Learn (nextjs.org/learn) — Next.js 공식 인터랙티브 튜토리얼",
      "Supabase Docs (supabase.com/docs) — Auth/DB/RLS 등 공식 가이드 + 예제",
      "Flutter 공식 Codelabs (docs.flutter.dev/codelabs) — 손으로 따라 하는 Flutter 튜토리얼",
    ],
    { fontSize: 17 },
  );
}

// Recommended books
{
  const slide = baseSlide();
  titleBar(slide, "추천 책", "개념을 깊이 있게 잡고 싶을 때");
  bullets(
    slide,
    [
      "『클린 코드』 Robert C. Martin — 좋은 코드/나쁜 코드를 가르는 기준 세우기",
      "『모던 자바스크립트 Deep Dive』 이웅모 — 자바스크립트 문법의 원리를 제대로",
      "『Learning React』 Alex Banks & Eve Porcello (O'Reilly) — 리액트 개념을 기초부터",
      "『혼자 공부하는 컴퓨터 구조+운영체제』 강민철 — 코드 너머의 컴퓨터 동작 원리",
      "『Designing Data-Intensive Applications』 Martin Kleppmann — 데이터베이스/백엔드를 깊게 (중급 이상)",
    ],
    { fontSize: 18 },
  );
}

const outPath = require("path").join(__dirname, "social-flow-orientation.pptx");
pptx.writeFile({ fileName: outPath }).then(() => {
  console.log("Wrote", outPath);
});
