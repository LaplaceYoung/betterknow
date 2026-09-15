import assert from "node:assert/strict";
import test from "node:test";
import { AUTH, passwordChecks, validateSignup, needsOnboarding } from "../src/domain/auth.mjs";
import { guestSession, loadStore } from "../src/server/store.mjs";
import { ONBOARD, onboardingState } from "../src/domain/onboarding.mjs";

test("leftover signup rules require name, email, mixed password, and confirm", () => {
  const miss = validateSignup({ username: "", email: "a@b.c", password: "ChalkBoard9", confirmPassword: "ChalkBoard9" });
  assert.equal(miss.ok, false);
  assert.equal(miss.error, AUTH.name);
  const weak = validateSignup({ username: "Ada", email: "ada@anyknow.test", password: "short", confirmPassword: "short" });
  assert.equal(weak.ok, false);
  assert.equal(weak.error, AUTH.passwordReqLength);
  const noUpper = validateSignup({ username: "Ada", email: "ada@anyknow.test", password: "chalkboard9", confirmPassword: "chalkboard9" });
  assert.equal(noUpper.ok, false);
  assert.equal(noUpper.error, AUTH.passwordReqUpper);
  const mismatch = validateSignup({ username: "Ada", email: "ada@anyknow.test", password: "ChalkBoard9", confirmPassword: "ChalkBoard8" });
  assert.equal(mismatch.ok, false);
  assert.equal(mismatch.error, AUTH.passwordsDoNotMatch);
  const ok = validateSignup({ username: "Ada", email: "ada@anyknow.test", password: "ChalkBoard9", confirmPassword: "ChalkBoard9" });
  assert.equal(ok.ok, true);
  assert.deepEqual(passwordChecks("ChalkBoard9"), { length: true, lower: true, upper: true, digit: true });
});

test("new leftover accounts need onboarding until complete or skip", () => {
  assert.equal(needsOnboarding({ onboarding: { complete: false } }), true);
  assert.equal(needsOnboarding({ onboarding: { complete: true } }), false);
  assert.equal(needsOnboarding({ email: "old@anyknow.test" }), false);
});

test("onboarding leftover paints language discovery and role without Orbie", () => {
  const welcome = onboardingState({ step: "welcome", name: "Ada" });
  assert.match(welcome.greeting, /Ada/);
  assert.doesNotMatch(JSON.stringify(welcome), /Orbie|Hyperknow/i);
  assert.equal(ONBOARD.welcomeTitle, "欢迎使用 simo know");
  assert.equal(ONBOARD.acquisitionTitle, "你是从哪里了解到 simo know 的？");
  assert.equal(ONBOARD.skip, "跳过引导");
  assert.equal(ONBOARD.finishCta, "开始吧！");
  assert.equal(ONBOARD.step1Title, "以下哪个选项最能描述您当前的身份？");
  const role = onboardingState({ step: "role", role: "college" });
  assert.equal(role.canContinue, true);
  assert.ok(role.roles.some((r) => r.id === "selfLearner"));
  const blocked = onboardingState({ step: "discovery" });
  assert.equal(blocked.canContinue, false);
});

test("guest session is BYOK-open without signup", () => {
  const { token, user } = guestSession(loadStore());
  assert.equal(user.guest, true);
  assert.equal(user.userId, "guest");
  assert.match(token, /^tok_/);
});
