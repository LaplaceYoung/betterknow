import React from 'react'

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}

export function HkLogo({ size = 28, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <rect x="5" y="4" width="5.5" height="28" rx="2.75" fill="currentColor" />
      <path d="M10.5 4.5H19.5C23.6421 4.5 27 7.85786 27 12C27 16.1421 23.6421 19.5 19.5 19.5H10.5V4.5Z" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
      <path d="M10.5 16.5H21C25.4183 16.5 29 20.0817 29 24.5C29 28.9183 25.4183 32.5 21 32.5H10.5V16.5Z" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.22" />
      <path d="M19.5 9L20.3 11.2L22.5 12L20.3 12.8L19.5 15L18.7 12.8L16.5 12L18.7 11.2L19.5 9Z" fill="currentColor" />
      <circle cx="21" cy="24.5" r="2.2" fill="currentColor" />
    </svg>
  )
}
export const BkLogo = HkLogo

export function HkSparkle({ size = 14, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" />
    </svg>
  )
}

// 概念讲解 (Telescope)
export function HkConceptIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M12.0283 13.6077L16.5004 20.1667M9.97244 13.6077L5.50037 20.1667M12.8337 12.1001C12.8337 13.1126 12.0129 13.9334 11.0004 13.9334C9.98785 13.9334 9.16704 13.1126 9.16704 12.1001C9.16704 11.0875 9.98785 10.2667 11.0004 10.2667C12.0129 10.2667 12.8337 11.0875 12.8337 12.1001ZM15.7198 4.15464L4.91757 7.0491C4.66962 7.11554 4.54565 7.14876 4.46388 7.22238C4.39195 7.28715 4.34237 7.37302 4.32225 7.4677C4.29937 7.57533 4.33259 7.6993 4.39902 7.94725L5.20568 10.9577C5.27211 11.2057 5.30533 11.3296 5.37896 11.4114C5.44372 11.4833 5.5296 11.5329 5.62427 11.553C5.73191 11.5759 5.85588 11.5427 6.10382 11.4763L16.9061 8.5818L15.7198 4.15464ZM19.9767 8.70803C18.9849 8.97378 18.4891 9.10665 18.0585 9.01514C17.6798 8.93464 17.3363 8.73633 17.0773 8.44861C16.7828 8.12152 16.6499 7.62563 16.3841 6.63385L16.2418 6.10259C15.976 5.11082 15.8432 4.61493 15.9347 4.1844C16.0152 3.8057 16.2135 3.4622 16.5012 3.20314C16.8283 2.90863 17.3242 2.77575 18.316 2.51001C18.5639 2.44357 18.6879 2.41035 18.7955 2.43323C18.8902 2.45335 18.9761 2.50293 19.0408 2.57486C19.1145 2.65664 19.1477 2.78061 19.2141 3.02855L20.4953 7.80988C20.5617 8.05783 20.5949 8.1818 20.572 8.28943C20.5519 8.38411 20.5023 8.46998 20.4304 8.53475C20.3486 8.60838 20.2247 8.6416 19.9767 8.70803ZM3.21028 11.3026L4.44988 10.9704C4.69782 10.904 4.8218 10.8708 4.90357 10.7971C4.9755 10.7324 5.02508 10.6465 5.0452 10.5518C5.06808 10.4442 5.03486 10.3202 4.96842 10.0723L4.63627 8.83268C4.56984 8.58474 4.53662 8.46076 4.46299 8.37899C4.39823 8.30706 4.31235 8.25748 4.21768 8.23736C4.11004 8.21448 3.98607 8.2477 3.73813 8.31413L2.49852 8.64629C2.25058 8.71272 2.12661 8.74594 2.04483 8.81957C1.9729 8.88433 1.92332 8.97021 1.9032 9.06488C1.88032 9.17252 1.91354 9.29649 1.97998 9.54443L2.31213 10.784C2.37857 11.032 2.41178 11.156 2.48541 11.2377C2.55018 11.3097 2.63605 11.3592 2.73073 11.3794C2.83836 11.4022 2.96233 11.369 3.21028 11.3026Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 个性化学习资料生成 (Briefcase / Binder)
export function HkMaterialsIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M18.3333 11.9167V16.3167C18.3333 17.3434 18.3333 17.8568 18.1335 18.249C17.9577 18.5939 17.6773 18.8744 17.3323 19.0502C16.9401 19.25 16.4268 19.25 15.4 19.25H6.6C5.57324 19.25 5.05986 19.25 4.66768 19.0502C4.32272 18.8744 4.04226 18.5939 3.86649 18.249C3.66667 17.8568 3.66667 17.3434 3.66667 16.3167V11.9167M8.25 9.16667H13.75M8.5119 12.8333H13.4881C15.4428 12.8333 16.4202 12.8333 17.1742 12.4702C17.9226 12.1098 18.5265 11.506 18.8869 10.7576C19.25 10.0036 19.25 9.02618 19.25 7.07143C19.25 5.60536 19.25 4.87233 18.9777 4.30682C18.7074 3.74552 18.2545 3.29264 17.6932 3.02234C17.1277 2.75 16.3946 2.75 14.9286 2.75H7.07143C5.60536 2.75 4.87233 2.75 4.30682 3.02234C3.74552 3.29264 3.29264 3.74552 3.02234 4.30682C2.75 4.87233 2.75 5.60536 2.75 7.07143C2.75 9.02618 2.75 10.0036 3.11311 10.7576C3.47352 11.506 4.07736 12.1098 4.82576 12.4702C5.57977 12.8333 6.55715 12.8333 8.5119 12.8333Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 长文件消化 (Document with checklist)
export function HkLongFilesIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M20 12.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32225 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M14 11H8M10 15H8M16 7H8M14.5 19L16.5 21L21 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 问题求解 (Venn/Intersection)
export function HkSolveProblemIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M9.16665 13.3234C10.2974 12.6699 11.7025 12.6699 12.8332 13.3234M1.83331 13.7499L2.47634 7.31961C2.50072 7.07581 2.51291 6.95391 2.53161 6.84933C2.75202 5.61635 3.77775 4.68808 5.02654 4.59145C5.13246 4.58325 5.25497 4.58325 5.49998 4.58325M20.1666 13.7499L19.5236 7.31961C19.4992 7.07581 19.487 6.95391 19.4684 6.84933C19.2479 5.61635 18.2222 4.68808 16.9734 4.59145C16.8675 4.58325 16.745 4.58325 16.5 4.58325M8.09271 11.1572C9.52463 12.5891 9.52463 14.9107 8.09271 16.3426C6.66079 17.7746 4.33918 17.7746 2.90725 16.3426C1.47533 14.9107 1.47533 12.5891 2.90725 11.1572C4.33917 9.72527 6.66078 9.72527 8.09271 11.1572ZM19.0927 11.1572C20.5246 12.5891 20.5246 14.9107 19.0927 16.3426C17.6608 17.7746 15.3392 17.7746 13.9073 16.3426C12.4753 14.9107 12.4753 12.5891 13.9073 11.1572C15.3392 9.72527 17.6608 9.72527 19.0927 11.1572Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 可视化 (Notebook / Chart flow)
export function HkVisualIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M6.41665 1.83325V5.49992M6.41665 14.6666V18.3333M15.5833 3.66659V7.33325M15.5833 16.4999V20.1666M1.83331 5.49992H11M1.83331 14.6666H11M11 7.33325H20.1666M11 16.4999H20.1666M11 18.3333V3.29992C11 2.78654 11 2.52985 10.9001 2.33376C10.8122 2.16128 10.672 2.02105 10.4995 1.93316C10.3034 1.83325 10.0467 1.83325 9.53331 1.83325H6.23331C4.69317 1.83325 3.9231 1.83325 3.33484 2.13298C2.81739 2.39664 2.3967 2.81733 2.13305 3.33478C1.83331 3.92304 1.83331 4.69311 1.83331 6.23325V13.9333C1.83331 15.4734 1.83331 16.2435 2.13305 16.8317C2.3967 17.3492 2.81739 17.7699 3.33484 18.0335C3.9231 18.3333 4.69317 18.3333 6.23331 18.3333H11ZM11 3.66659H15.7666C17.3068 3.66659 18.0769 3.66659 18.6651 3.96632C19.1826 4.22997 19.6033 4.65067 19.8669 5.16811C20.1666 5.75637 20.1666 6.52644 20.1666 8.06659V15.7666C20.1666 17.3067 20.1666 18.0768 19.8669 18.6651C19.6033 19.1825 19.1826 19.6032 18.6651 19.8669C18.0769 20.1666 17.3068 20.1666 15.7666 20.1666H12.4666C11.9533 20.1666 11.6966 20.1666 11.5005 20.0667C11.328 19.9788 11.1878 19.8386 11.0999 19.6661C11 19.47 11 19.2133 11 18.6999V3.66659Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 侧边栏：首页 (Home)
export function HkHomeIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M240,208H224V136l2.34,2.34A8,8,0,0,0,237.66,127L139.31,28.68a16,16,0,0,0-22.62,0L18.34,127a8,8,0,0,0,11.32,11.31L32,136v72H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM48,120l80-80,80,80v88H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48Zm96,88H112V160h32Z" />
    </svg>
  )
}

// 侧边栏：课程 (Graduation cap)
export function HkCoursesIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z" />
    </svg>
  )
}

// 侧边栏：学习动态 (Calendar with check / events)
export function HkLearningFeedIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z" />
    </svg>
  )
}

// 侧边栏：历史 (Clock rewind)
export function HkHistoryIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z" />
    </svg>
  )
}

// 侧边栏：课程集市 (Store front)
export function HkStoreIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M3 9L4.4 3.4C4.6 2.6 5.3 2 6.1 2H17.9C18.7 2 19.4 2.6 19.6 3.4L21 9M3 9V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V9M3 9C3 10.7 4.3 12 6 12C7.7 12 9 10.7 9 9C9 10.7 10.3 12 12 12C13.7 12 15 10.7 15 9C15 10.7 16.3 12 18 12C19.7 12 21 10.7 21 9M10 22V16H14V22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 会话：白板课堂图标
export function HkBoardSessionIcon({ size = 14, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M1.5 1.5H12.5C12.7761 1.5 13 1.72386 13 2V9C13 9.27614 12.7761 9.5 12.5 9.5H1.5C1.22386 9.5 1 9.27614 1 9V2C1 1.72386 1.22386 1.5 1.5 1.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 9.5V12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 12.5H9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.25 6.75C4.25 4.75 5.25 4.75 6.25 6.25C7.25 7.75 9 6 10.75 3.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 知识库 / Drive 图标
export function HkDriveIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M4 4H10L12 6H20C21.1 6 22 6.9 22 8V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
