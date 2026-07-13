# Threads Clone (Next.js 16 + Supabase)

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

3. 개발 서버 실행:

   ```bash
   pnpm dev
   ```

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

## 참고

- `src/lib/supabase/types.ts`는 손으로 작성한 타입입니다. 실제 프로젝트에 연결한 뒤에는
  `supabase gen types typescript --project-id <id> > src/lib/supabase/types.ts` 로 교체하는 걸 추천합니다.
- 회원가입 시 `username`은 영문 소문자/숫자/밑줄 3~20자여야 하며, `handle_new_user` 트리거가 `auth.users` insert 시 `profiles` row를 자동 생성합니다.
- 이메일 확인(Confirm email)을 켜둔 프로젝트라면 가입 후 로그인 전에 메일 확인이 필요합니다. Supabase 대시보드 → Authentication → URL Configuration에 `http://localhost:3000/auth/callback`을 Redirect URL로 추가하세요.
