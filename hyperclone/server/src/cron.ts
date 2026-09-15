import { now, updateState, type AppState } from './store.js';

type CronState = AppState & {
  orbie_recommendations?: Record<string, Array<Record<string, unknown>>>;
  proactive_tasks?: Record<string, Array<Record<string, unknown>>>;
};

function lastInteraction(state: AppState, userId: string): number {
  const values = Object.values(state.conversations).filter((conversation) => conversation.user_id === userId).map((conversation) => Date.parse(conversation.updated_at)).filter(Number.isFinite);
  return values.length ? Math.max(...values) : 0;
}

export async function runCronTick(log: (message: string) => void = () => undefined): Promise<void> {
  const timestamp = now(); const current = Date.parse(timestamp); const resetBefore = current - 12 * 60 * 60 * 1000; const day = timestamp.slice(0, 10);
  const result = await updateState((state) => {
    const mutable = state as CronState; let reset = 0; let recommendations = 0; let tasks = 0;
    for (const user of Object.values(state.users)) {
      const lastReset = Date.parse(user.last_reset_at);
      if (user.credits < 999999) { user.credits = 999999; user.max_credits = 999999; user.last_reset_at = timestamp; reset += 1; }
    }
    if (process.env.HYPERCLONE_ORBIE === '1') {
      const recommendationByUser = mutable.orbie_recommendations ??= {};
      for (const user of Object.values(state.users)) {
        if (lastInteraction(state, user.id) > current - 24 * 60 * 60 * 1000) continue;
        const existing = recommendationByUser[user.id] ??= [];
        if (existing.some((item) => item.day === day)) continue;
        existing.push({ id: `orbie-${user.id}-${day}`, day, type: 'recommendation', title: 'Take a small next step', message: 'Review one recent idea and explain it in your own words.', created_at: timestamp, dismissed: false }); recommendations += 1;
      }
    }
    if (process.env.HYPERCLONE_PROACTIVE === '1') {
      const taskByUser = mutable.proactive_tasks ??= {};
      for (const user of Object.values(state.users)) {
        if (lastInteraction(state, user.id) > current - 24 * 60 * 60 * 1000) continue;
        const existing = taskByUser[user.id] ??= [];
        if (existing.some((item) => item.day === day)) continue;
        existing.push({ task_id: `proactive-${user.id}-${day}`, day, title: 'Review your learning progress', description: 'Spend a few minutes revisiting a recent course session.', status: 'pending', created_at: timestamp }); tasks += 1;
      }
    }
    return { reset, recommendations, tasks };
  });
  log(`cron tick: reset=${result.reset} orbie=${result.recommendations} proactive=${result.tasks}`);
}

export function startCronJobs(log: (message: string) => void = console.error): () => void {
  void runCronTick(log).catch((error: unknown) => log(`cron tick failed: ${error instanceof Error ? error.message : String(error)}`));
  const timer = setInterval(() => { void runCronTick(log).catch((error: unknown) => log(`cron tick failed: ${error instanceof Error ? error.message : String(error)}`)); }, 60_000);
  return () => clearInterval(timer);
}
