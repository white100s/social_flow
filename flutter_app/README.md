# 소셜 플로우 (Social Flow) — Flutter 클라이언트

Next.js 웹 앱과 같은 Supabase 프로젝트(`fedwtvphhiuilqjhdsts`)를 그대로 사용하는
네이티브 클라이언트입니다. macOS / Windows / Android / iOS / Web 타겟.

## 실행

```bash
flutter pub get
flutter run -d macos     # 또는 windows / android / ios / chrome
```

Supabase 접속 정보는 `lib/constants.dart`에 있습니다 (anon key는 RLS로 보호되는
공개 키라 커밋해도 안전합니다).

## 구조

- `lib/constants.dart` — Supabase URL / anon key
- `lib/theme/` — 웹과 동일한 라이트/다크 팔레트 (`AppColors`, `AppTheme`)
- `lib/i18n/` — 한국어/영어 사전 (`dictionaries.dart`), 웹의 `src/lib/i18n`과 동일 문구
- `lib/state/preferences.dart` — locale/theme 선택을 SharedPreferences에 저장
- `lib/models/` — `Profile`, `Post`
- `lib/services/repository.dart` — posts/likes/follows/profiles Supabase 쿼리
- `lib/screens/` — Login, Signup, Feed, NewPost, Profile
- `lib/widgets/` — AppHeader, PostCard, LikeButton, FollowButton

## 플랫폼별 참고

| 플랫폼 | 상태 | 비고 |
| --- | --- | --- |
| Android | ✅ `flutter build apk`로 빌드 확인 | Java 17 필요 (Java 25는 현재 Gradle과 비호환 — `flutter config --jdk-dir`로 지정) |
| Web | ✅ `flutter build web`로 빌드 확인 | Next.js 웹 앱과는 별개 (동일 백엔드, 다른 프론트엔드) |
| macOS | ⚠️ 코드는 준비됨, 이 머신엔 Xcode 미설치 | Xcode 전체 설치 + `sudo xcodebuild -runFirstLaunch`, CocoaPods 설치 후 `flutter build macos` |
| iOS | ⚠️ 코드는 준비됨, 이 머신엔 Xcode 미설치 | 위와 동일 + 실기기/시뮬레이터 필요 |
| Windows | ⚠️ 코드는 준비됨, 빌드는 Windows 머신에서만 가능 | Windows PC에서 `flutter build windows` |

## Supabase 스키마

이 앱은 웹 앱과 동일한 `supabase/schema.sql` (repo 루트)을 사용합니다. 별도 마이그레이션 불필요.
