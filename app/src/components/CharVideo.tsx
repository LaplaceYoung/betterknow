import { useState, type CSSProperties } from 'react'

// 线上 index bundle 的角色视频组件（逐字搬运）：
//   pb = 五个候选视频；hb = { mixBlendMode:'multiply', filter:'brightness(1.08)', background:'transparent' }
//   CharVideo: <video style={hb} poster={src 把 .mp4 换成 .webp} autoPlay loop muted playsInline><source src type=video/mp4 /></video>
//   RandomCharVideo: 挂载时从 pb 里随机挑一个（useState 惰性初始化，不随重渲染变化）
const CHAR_VIDEOS = [
  '/assets/img/pages/mainPages/animations/char-stars.mp4',
  '/assets/img/pages/mainPages/animations/char-floating.mp4',
  '/assets/img/pages/mainPages/animations/char-petting.mp4',
  '/assets/img/pages/mainPages/courses/reward.mp4',
  '/assets/img/pages/mainPages/whiteboard/running-w-background.mp4',
]

const CHAR_MEDIA_STYLE: CSSProperties = { mixBlendMode: 'multiply', filter: 'brightness(1.08)', background: 'transparent' }

export function CharVideo({ src, className }: { src: string; className?: string }) {
  return (
    <video className={className} style={CHAR_MEDIA_STYLE} poster={src.replace(/\.mp4$/, '.webp')} autoPlay loop muted playsInline>
      <source src={src} type="video/mp4" />
    </video>
  )
}

export function RandomCharVideo({ className }: { className?: string }) {
  const [src] = useState(() => CHAR_VIDEOS[Math.floor(Math.random() * CHAR_VIDEOS.length)])
  return <CharVideo src={src} className={className} />
}
