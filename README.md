# 소셜 플로우 (Social Flow) — Next.js 16 + Supabase Threads 클론

[![저장소 QR 코드](docs/repo-qr.png)](https://github.com/white100s/social_flow)

QR을 스캔하거나 [github.com/white100s/social_flow](https://github.com/white100s/social_flow)에서 바로 확인하세요.

## 이 프로젝트는?

이 저장소는 Threads(스레드)를 벤치마킹한 소셜 서비스 "소셜 플로우"를 처음부터 끝까지 직접
만들어보는 실습형 커리큘럼 자료입니다. Claude Code 같은 AI 코딩 에이전트와 대화하며
기획→백엔드→기능 고도화→배포까지 실제 서비스가 만들어지는 전 과정을 따라갑니다.

오리엔테이션(무료 맛보기) 자료는 `docs/social-flow-orientation.pptx`에 있습니다 —
용어 설명부터 이 저장소의 구조, Claude Code로 직접 실습하는 법까지 담겨 있습니다
(생성 스크립트: `docs/build-orientation-deck.js`, `npm run build:ppt`로 재생성).

### 강의 목표

- **AI와 협업하는 개발 방식 체득** — Claude Code / AI 에이전트에게 자연어로 요청해서 코드를
  만들고 고치는 워크플로에 익숙해지기
- **풀스택 개발 한 바퀴 완주** — 프론트엔드(Next.js, Flutter)부터 백엔드(Supabase: DB, 인증,
  권한 관리)까지 서비스 하나를 끝까지 만들어보기
- **협업·배포 실무 감각** — Git/GitHub으로 코드 버전 관리하고, Vercel로 실제 서비스를 배포해
  운영해보기
- **직접 확장하기** — 정해진 정답을 베끼는 게 아니라, 내 아이디어에 맞게 UI/UX와 기능을
  바꿔보며 "내 서비스"로 만들어보기

### 커리큘럼

| 구분 | 제목 | 내용 |
| --- | --- | --- |
| 오리엔테이션 (무료) | Claude Code & AI 에이전트 기초 | Claude Code와 AI 에이전트 기초, Next.js·Flutter·Supabase 개념, GitHub 사용법을 가볍게 실습해보는 맛보기 단계입니다. 뉴스/SNS 등 간단한 오픈소스를 활용해 부담 없이 첫 미니 서비스를 만들어보며, AI와 협업하는 개발 방식에 익숙해집니다. |
| 1주차 | 프로젝트 시작 | 오리엔테이션보다 한 단계 무거운, 본격적인 내 서비스 제작을 시작합니다. 커머스 또는 플랫폼 오픈소스를 기반으로 프로젝트 구조를 이해하고 UI/UX를 내 아이디어에 맞게 수정하며, GitHub 협업과 Claude Agent를 활용한 개발 워크플로를 익힙니다. |
| 2주차 | 백엔드 구축 | Supabase를 활용한 데이터베이스 및 회원가입·로그인을 구현합니다. CRUD, API 연동 등 서비스 핵심 기능을 개발하고 데이터 구조 설계와 권한 관리(RLS)를 적용합니다. |
| 3주차 | 기능 고도화 | AI 기능(MCP, 외부 API)을 연동하고 Flutter 앱 또는 Next.js 웹 기능을 확장합니다. 코드 리팩터링과 기본 보안, 성능 개선을 진행합니다. |
| 4주차 | 배포 및 완성 | Vercel 배포 및 운영 환경을 설정합니다. 프로젝트를 최종 점검하고 코드 리뷰를 진행한 뒤, 완성된 서비스를 발표하고 향후 확장 방향을 제시합니다. |

이 저장소(소셜 플로우)는 오리엔테이션 단계에서 다루는 예시 결과물이자, 1~4주차에서
각자의 프로젝트를 만들 때 참고할 수 있는 실제 동작하는 레퍼런스 구현입니다.

## 스택

- Next.js 16 (App Router, Turbopack)
- Supabase (Postgres + Auth, `@supabase/ssr`)
- Tailwind CSS 4

## 시작하기

1. Supabase 프로젝트 URL/anon key를 `.env.local`에 채워넣기 (Supabase 대시보드 → Settings → API):

   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```

2. `supabase/schema.sql`을 Supabase SQL Editor에서 실행해 테이블/RLS 정책/트리거를 생성.

3. 개발 서버 실행 (기본 포트 3721):

   ```bash
   pnpm dev
   ```

   http://localhost:3721 에서 확인.

## 구조

- `src/lib/supabase/client.ts` — 브라우저용 Supabase 클라이언트
- `src/lib/supabase/server.ts` — 서버 컴포넌트/서버 액션용 Supabase 클라이언트
- `src/proxy.ts` + `src/lib/supabase/middleware.ts` — 모든 요청마다 세션 갱신, `/new`·`/settings` 보호
- `src/app/login`, `src/app/signup` — 이메일/비밀번호 인증 (Server Actions)
- `src/app/auth/callback` — 이메일 확인/OAuth 콜백
- `src/app/page.tsx` — 피드
- `src/app/new` — 글쓰기
- `src/app/profile/[username]` — 프로필, 팔로우
- `supabase/schema.sql` — DB 스키마 (profiles, posts, likes, follows) + RLS
- `admin/` — 관리자 웹 앱 (포트 3722)
- `flutter_app/` — Flutter 클라이언트 (macOS/Windows/Android/iOS/Web)
- `docs/` — 오리엔테이션 PPT(`npm run build:ppt`)와 저장소 QR 코드(`npm run build:qr`) 생성 스크립트
- `src/lib/i18n/` — 한국어/영어 사전, `locale` 쿠키 기반 언어 감지
- `src/lib/theme.ts` — 다크/라이트 `theme` 쿠키 기반 감지
- `src/app/actions/preferences.ts` — 언어/테마 전환 Server Actions (헤더의 EN·KO, ☀️·🌙 버튼)

## 언어 / 테마

- 헤더 우측 버튼으로 한국어 ↔ 영어, 다크 ↔ 라이트 전환 가능. 선택값은 쿠키(`locale`, `theme`)에 1년간 저장.
- 기본값은 한국어 + 다크 모드. 다크 모드는 순검정 대신 부드러운 차콜(`#17181a`) 배경 사용.
- 모바일에서는 헤더의 "새 글" 링크 대신 우측 하단 플로팅 버튼(+)으로 글쓰기 접근.

## 참고

- `src/lib/supabase/types.ts`는 손으로 작성한 타입입니다. 실제 프로젝트에 연결한 뒤에는
  `supabase gen types typescript --project-id <id> > src/lib/supabase/types.ts` 로 교체하는 걸 추천합니다.
- 회원가입 시 `username`은 영문 소문자/숫자/밑줄 3~20자여야 하며, `handle_new_user` 트리거가 `auth.users` insert 시 `profiles` row를 자동 생성합니다.
- 이메일 확인(Confirm email)을 켜둔 프로젝트라면 가입 후 로그인 전에 메일 확인이 필요합니다. Supabase 대시보드 → Authentication → URL Configuration에 `http://localhost:3721/auth/callback`을 Redirect URL로 추가하세요.
