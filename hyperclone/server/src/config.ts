export interface ProviderSlot { apiKey: string; baseUrl: string; model: string; enabled?: boolean }

export interface ByokConfig {
  provider: 'kimi' | 'openai-compatible' | 'stub';
  apiKey: string;
  baseUrl: string;
  models: { director: string; content: string; quiz: string; tts?: string };
  providers?: { llm?: ProviderSlot; tts?: ProviderSlot; stt?: ProviderSlot; search?: ProviderSlot; image?: ProviderSlot };
}

const providerSlot = (env: NodeJS.ProcessEnv, name: 'TTS' | 'STT' | 'SEARCH' | 'IMAGE'): ProviderSlot | undefined => {
  const apiKey = env[`BYOK_${name}_API_KEY`]; const baseUrl = env[`BYOK_${name}_BASE_URL`]; const model = env[`BYOK_${name}_MODEL`];
  return apiKey || baseUrl || model ? { apiKey: apiKey ?? '', baseUrl: baseUrl ?? '', model: model ?? '' } : undefined;
};

export function loadConfig(env: NodeJS.ProcessEnv = process.env): ByokConfig {
  const requested = env.BYOK_PROVIDER;
  let provider: 'kimi' | 'openai-compatible' | 'stub' = requested === 'openai-compatible' ? requested : requested === 'stub' ? requested : 'kimi';
  let apiKey = '';
  let baseUrl = '';

  if (env.AIGW_API_KEY && env.AIGW_BASE_URL) {
    provider = 'openai-compatible';
    apiKey = env.AIGW_API_KEY;
    baseUrl = env.AIGW_BASE_URL;
  } else if (provider === 'openai-compatible') {
    apiKey = env.OPENAI_API_KEY ?? '';
    baseUrl = env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1';
  } else if (provider === 'kimi') {
    apiKey = env.KIMI_API_KEY ?? '';
    baseUrl = env.KIMI_BASE_URL ?? 'https://api.moonshot.cn/v1';
  }

  const finalProvider = !apiKey || provider === 'stub' ? 'stub' : provider;
  const providers = { tts: providerSlot(env, 'TTS'), stt: providerSlot(env, 'STT'), search: providerSlot(env, 'SEARCH'), image: providerSlot(env, 'IMAGE') };
  const configuredProviders = Object.values(providers).some(Boolean) ? providers : undefined;
  return {
    provider: finalProvider,
    apiKey,
    baseUrl: baseUrl || 'https://api.moonshot.cn/v1',
    models: {
      director: env.KIMI_DIRECTOR_MODEL ?? env.OPENAI_DIRECTOR_MODEL ?? 'kimi-k2-turbo-preview',
      content: env.KIMI_CONTENT_MODEL ?? env.OPENAI_CONTENT_MODEL ?? 'kimi-k2-turbo-preview',
      quiz: env.KIMI_QUIZ_MODEL ?? env.OPENAI_QUIZ_MODEL ?? 'kimi-k2-turbo-preview',
      tts: env.KIMI_TTS_MODEL ?? env.OPENAI_TTS_MODEL,
    },
    ...(configuredProviders ? { providers: configuredProviders } : {}),
  };
}

export const config = loadConfig();

export type UserByok = ByokConfig & { enabled?: boolean };

export function resolveByok(over?: UserByok): ByokConfig {
  if (!over || over.enabled === false) return config;
  const providers = over.providers || config.providers ? { ...config.providers, ...over.providers } : undefined;
  const llm = over.providers?.llm;
  const llmKey = llm?.apiKey || over.apiKey;
  const llmBase = llm?.baseUrl || over.baseUrl;
  if (!llmKey && !llmBase) return providers ? { ...config, providers } : config;
  const model = llm?.model || over.models?.director || config.models.director;
  return {
    provider: llm?.enabled === false ? 'stub' : llmBase ? 'openai-compatible' : over.provider ?? config.provider,
    apiKey: llmKey ?? config.apiKey,
    baseUrl: llmBase ?? config.baseUrl,
    models: { ...config.models, ...(over.models ?? {}), director: model, content: model, quiz: model },
    ...(providers ? { providers } : {}),
  };
}
