export type Locale = "ko" | "en";

export const locales: Locale[] = ["ko", "en"];

export type Dictionary = {
  brand: string;
  tagline: string;
  nav: {
    newPost: string;
    logout: string;
    login: string;
    signup: string;
  };
  login: {
    title: string;
    confirmSent: string;
    email: string;
    password: string;
    submit: string;
    noAccount: string;
    signupLink: string;
  };
  signup: {
    title: string;
    email: string;
    password: string;
    submit: string;
    haveAccount: string;
    loginLink: string;
  };
  newPost: {
    title: string;
    placeholder: string;
    submit: string;
    lengthError: string;
  };
  feed: {
    loadError: string;
    empty: string;
  };
  profile: {
    followers: string;
    following: string;
    empty: string;
  };
  follow: {
    follow: string;
    following: string;
  };
  time: {
    justNow: string;
    minute: string;
    hour: string;
    day: string;
    month: string;
    year: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  ko: {
    brand: "소셜 플로우",
    tagline: "Supabase 기반 Threads 클론",
    nav: {
      newPost: "새 글",
      logout: "로그아웃",
      login: "로그인",
      signup: "가입하기",
    },
    login: {
      title: "로그인",
      confirmSent: "가입 확인 이메일을 보냈어요. 메일함을 확인해주세요.",
      email: "이메일",
      password: "비밀번호",
      submit: "로그인",
      noAccount: "계정이 없으신가요?",
      signupLink: "가입하기",
    },
    signup: {
      title: "계정 만들기",
      email: "이메일",
      password: "비밀번호 (6자 이상)",
      submit: "가입하기",
      haveAccount: "이미 계정이 있으신가요?",
      loginLink: "로그인",
    },
    newPost: {
      title: "새 글 작성",
      placeholder: "무슨 일이 있었나요?",
      submit: "게시",
      lengthError: "1~500자로 작성해주세요",
    },
    feed: {
      loadError: "피드를 불러오지 못했어요",
      empty: "아직 게시물이 없어요. 첫 글을 남겨보세요!",
    },
    profile: {
      followers: "팔로워",
      following: "팔로잉",
      empty: "아직 게시물이 없어요.",
    },
    follow: {
      follow: "팔로우",
      following: "팔로잉",
    },
    time: {
      justNow: "방금 전",
      minute: "분 전",
      hour: "시간 전",
      day: "일 전",
      month: "개월 전",
      year: "년 전",
    },
  },
  en: {
    brand: "Social Flow",
    tagline: "A Threads clone powered by Supabase",
    nav: {
      newPost: "New post",
      logout: "Log out",
      login: "Log in",
      signup: "Sign up",
    },
    login: {
      title: "Log in",
      confirmSent: "We sent a confirmation email — please check your inbox.",
      email: "Email",
      password: "Password",
      submit: "Log in",
      noAccount: "Don't have an account?",
      signupLink: "Sign up",
    },
    signup: {
      title: "Create your account",
      email: "Email",
      password: "Password (min. 6 characters)",
      submit: "Sign up",
      haveAccount: "Already have an account?",
      loginLink: "Log in",
    },
    newPost: {
      title: "New post",
      placeholder: "What's happening?",
      submit: "Post",
      lengthError: "Please write between 1 and 500 characters",
    },
    feed: {
      loadError: "Couldn't load the feed",
      empty: "No posts yet. Be the first to share something!",
    },
    profile: {
      followers: "Followers",
      following: "Following",
      empty: "No posts yet.",
    },
    follow: {
      follow: "Follow",
      following: "Following",
    },
    time: {
      justNow: "just now",
      minute: "m ago",
      hour: "h ago",
      day: "d ago",
      month: "mo ago",
      year: "y ago",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
