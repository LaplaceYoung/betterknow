// 线上练习/考试里的音效调用：`const a = new Audio(path); a.volume = .6; a.play().catch(() => {})`
// 音频文件是从线上抓下来的，落在 /assets/img/sounds/（线上路径是 /sounds/*.mp3）。
const SFX_FILES = {
  correct: 'answer-correct',
  wrong: 'answer-wrong',
  click: 'button-click',
  reward: 'reward',
  complete: 'session-complete',
} as const

export type SfxName = keyof typeof SFX_FILES

export function playSfx(name: SfxName, volume = 0.6) {
  const audio = new Audio(`/assets/img/sounds/${SFX_FILES[name]}.mp3`)
  audio.volume = volume
  void audio.play().catch(() => {})
}
