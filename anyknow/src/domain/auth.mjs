/** Leftover Hyperknow signup/signin contract (no Google, no referral, no trademarks). */

export const AUTH = Object.freeze({
  createAccount: "创建您的账户",
  createAccountSubtitle: "探索从这里起步。",
  signInSubtitle: "登录即刻，开启无尽探索。",
  email: "邮箱",
  password: "密码",
  name: "姓名",
  confirmPassword: "确认密码",
  alreadyHaveAccount: "已有账户？",
  needAccount: "需要账户？",
  signUpSuccessful: "注册成功！",
  loginSuccessful: "登录成功！",
  passwordsDoNotMatch: "密码不匹配",
  passwordReqLength: "至少 8 个字符",
  passwordReqLower: "至少一个小写字母",
  passwordReqUpper: "至少一个大写字母",
  passwordReqDigit: "至少一个数字",
  passwordRequirementsHint: "至少 8 位，需包含大写字母、小写字母与数字",
  termsAndPolicy: "继续即表示你同意使用条款，并可能收到学习相关更新。",
  forgotPassword: "忘记密码?",
  creatingAccount: "正在创建账户...",
  signingIn: "正在登录...",
  showPassword: "显示",
  hidePassword: "隐藏",
});

export function passwordChecks(password) {
  const value = String(password || "");
  return {
    length: value.length >= 8,
    lower: /[a-z]/.test(value),
    upper: /[A-Z]/.test(value),
    digit: /\d/.test(value),
  };
}

export function validateSignup({ username = "", email = "", password = "", confirmPassword = "" } = {}) {
  if (!String(username).trim()) return { ok: false, error: AUTH.name, checks: passwordChecks(password) };
  if (!String(email).includes("@")) return { ok: false, error: AUTH.email, checks: passwordChecks(password) };
  const checks = passwordChecks(password);
  if (!checks.length) return { ok: false, error: AUTH.passwordReqLength, checks };
  if (!checks.lower) return { ok: false, error: AUTH.passwordReqLower, checks };
  if (!checks.upper) return { ok: false, error: AUTH.passwordReqUpper, checks };
  if (!checks.digit) return { ok: false, error: AUTH.passwordReqDigit, checks };
  if (String(password) !== String(confirmPassword)) {
    return { ok: false, error: AUTH.passwordsDoNotMatch, checks };
  }
  return { ok: true, error: "", checks };
}

export function needsOnboarding(user) {
  return Boolean(user && user.onboarding && user.onboarding.complete === false);
}
