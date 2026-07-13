import { cookies } from "next/headers";

export type Theme = "dark" | "light";

const COOKIE_NAME = "theme";
const DEFAULT_THEME: Theme = "dark";

export async function getTheme(): Promise<Theme> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  return value === "light" ? "light" : DEFAULT_THEME;
}

export { COOKIE_NAME as THEME_COOKIE_NAME };
