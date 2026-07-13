enum AppLocale { ko, en }

class NavStrings {
  final String newPost, logout, login, signup;
  const NavStrings({
    required this.newPost,
    required this.logout,
    required this.login,
    required this.signup,
  });
}

class LoginStrings {
  final String title, confirmSent, email, password, submit, noAccount, signupLink;
  const LoginStrings({
    required this.title,
    required this.confirmSent,
    required this.email,
    required this.password,
    required this.submit,
    required this.noAccount,
    required this.signupLink,
  });
}

class SignupStrings {
  final String title, email, password, submit, haveAccount, loginLink;
  const SignupStrings({
    required this.title,
    required this.email,
    required this.password,
    required this.submit,
    required this.haveAccount,
    required this.loginLink,
  });
}

class NewPostStrings {
  final String title, placeholder, submit, lengthError;
  const NewPostStrings({
    required this.title,
    required this.placeholder,
    required this.submit,
    required this.lengthError,
  });
}

class FeedStrings {
  final String loadError, empty;
  const FeedStrings({required this.loadError, required this.empty});
}

class ProfileStrings {
  final String followers, following, empty;
  const ProfileStrings({
    required this.followers,
    required this.following,
    required this.empty,
  });
}

class FollowStrings {
  final String follow, following;
  const FollowStrings({required this.follow, required this.following});
}

class TimeStrings {
  final String justNow, minute, hour, day, month, year;
  const TimeStrings({
    required this.justNow,
    required this.minute,
    required this.hour,
    required this.day,
    required this.month,
    required this.year,
  });
}

class Dictionary {
  final String brand, tagline;
  final NavStrings nav;
  final LoginStrings login;
  final SignupStrings signup;
  final NewPostStrings newPost;
  final FeedStrings feed;
  final ProfileStrings profile;
  final FollowStrings follow;
  final TimeStrings time;

  const Dictionary({
    required this.brand,
    required this.tagline,
    required this.nav,
    required this.login,
    required this.signup,
    required this.newPost,
    required this.feed,
    required this.profile,
    required this.follow,
    required this.time,
  });
}

const _ko = Dictionary(
  brand: '소셜 플로우',
  tagline: 'Supabase 기반 Threads 클론',
  nav: NavStrings(newPost: '새 글', logout: '로그아웃', login: '로그인', signup: '가입하기'),
  login: LoginStrings(
    title: '로그인',
    confirmSent: '가입 확인 이메일을 보냈어요. 메일함을 확인해주세요.',
    email: '이메일',
    password: '비밀번호',
    submit: '로그인',
    noAccount: '계정이 없으신가요?',
    signupLink: '가입하기',
  ),
  signup: SignupStrings(
    title: '계정 만들기',
    email: '이메일',
    password: '비밀번호 (6자 이상)',
    submit: '가입하기',
    haveAccount: '이미 계정이 있으신가요?',
    loginLink: '로그인',
  ),
  newPost: NewPostStrings(
    title: '새 글 작성',
    placeholder: '무슨 일이 있었나요?',
    submit: '게시',
    lengthError: '1~500자로 작성해주세요',
  ),
  feed: FeedStrings(loadError: '피드를 불러오지 못했어요', empty: '아직 게시물이 없어요. 첫 글을 남겨보세요!'),
  profile: ProfileStrings(followers: '팔로워', following: '팔로잉', empty: '아직 게시물이 없어요.'),
  follow: FollowStrings(follow: '팔로우', following: '팔로잉'),
  time: TimeStrings(
    justNow: '방금 전',
    minute: '분 전',
    hour: '시간 전',
    day: '일 전',
    month: '개월 전',
    year: '년 전',
  ),
);

const _en = Dictionary(
  brand: 'Social Flow',
  tagline: 'A Threads clone powered by Supabase',
  nav: NavStrings(newPost: 'New post', logout: 'Log out', login: 'Log in', signup: 'Sign up'),
  login: LoginStrings(
    title: 'Log in',
    confirmSent: 'We sent a confirmation email — please check your inbox.',
    email: 'Email',
    password: 'Password',
    submit: 'Log in',
    noAccount: "Don't have an account?",
    signupLink: 'Sign up',
  ),
  signup: SignupStrings(
    title: 'Create your account',
    email: 'Email',
    password: 'Password (min. 6 characters)',
    submit: 'Sign up',
    haveAccount: 'Already have an account?',
    loginLink: 'Log in',
  ),
  newPost: NewPostStrings(
    title: 'New post',
    placeholder: "What's happening?",
    submit: 'Post',
    lengthError: 'Please write between 1 and 500 characters',
  ),
  feed: FeedStrings(
    loadError: "Couldn't load the feed",
    empty: 'No posts yet. Be the first to share something!',
  ),
  profile: ProfileStrings(followers: 'Followers', following: 'Following', empty: 'No posts yet.'),
  follow: FollowStrings(follow: 'Follow', following: 'Following'),
  time: TimeStrings(
    justNow: 'just now',
    minute: 'm ago',
    hour: 'h ago',
    day: 'd ago',
    month: 'mo ago',
    year: 'y ago',
  ),
);

Dictionary getDictionary(AppLocale locale) => locale == AppLocale.ko ? _ko : _en;

String timeAgo(AppLocale locale, DateTime date) {
  final t = getDictionary(locale).time;
  final seconds = DateTime.now().toUtc().difference(date.toUtc()).inSeconds;

  final table = <MapEntry<int, String Function(TimeStrings)>>[
    MapEntry(31536000, (t) => t.year),
    MapEntry(2592000, (t) => t.month),
    MapEntry(86400, (t) => t.day),
    MapEntry(3600, (t) => t.hour),
    MapEntry(60, (t) => t.minute),
  ];

  for (final entry in table) {
    final value = seconds ~/ entry.key;
    if (value >= 1) return '$value${entry.value(t)}';
  }

  return t.justNow;
}
