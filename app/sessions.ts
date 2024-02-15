import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  userId: string;
};
type SessionFlashData = {
  error: string;
};
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      // 👹
      secrets: ["s3cret1"],
      secure: true,
    },
  });
export { getSession, commitSession, destroySession };
