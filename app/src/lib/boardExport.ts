// 白板导出：把板面 DOM 序列化成 SVG <foreignObject> 再画进 canvas → JPEG。
// 线上用的是自研的 DOM→canvas 渲染（`bs` + `fs`：toBlob 质量 .92、文件名 `${title}-page{N}.jpg`），
// 这里用浏览器原生的等价路径实现同一份产物；同源图片内联成 data URL，跨域图片跳过（避免画布被污染）。
const JPEG_QUALITY = 0.92

/** 逐节点把计算样式写成内联 style：foreignObject 里没有页面的样式表，只能自己带过去 */
function inlineComputedStyles(source: Element, clone: Element): void {
  const sources = [source, ...Array.from(source.querySelectorAll('*'))]
  const clones = [clone, ...Array.from(clone.querySelectorAll('*'))]
  for (let i = 0; i < sources.length; i += 1) {
    const target = clones[i] as HTMLElement | undefined
    if (!target || !target.style) continue
    const computed = window.getComputedStyle(sources[i])
    let css = ''
    for (const property of computed) {
      const value = computed.getPropertyValue(property)
      if (value) css += `${property}:${value};`
    }
    target.setAttribute('style', css)
  }
}

/** 画不进 SVG 的节点（脚本 / 视频 / 内嵌页面）换成一句占位，别让整张图失败 */
function replaceUnrenderable(root: Element): void {
  for (const bad of Array.from(root.querySelectorAll('iframe, video, canvas, script, noscript'))) {
    const placeholder = document.createElement('div')
    placeholder.setAttribute('style', 'padding:8px 10px;border:1px dashed #d4d4d8;border-radius:8px;color:#71717a;font-size:12px;font-family:sans-serif')
    placeholder.textContent = bad.tagName.toLowerCase() === 'iframe' || bad.tagName.toLowerCase() === 'video' ? '［互动内容，导出为图片时不渲染］' : ''
    if (placeholder.textContent) bad.replaceWith(placeholder)
    else bad.remove()
  }
}

async function inlineImages(root: Element): Promise<void> {
  const images = Array.from(root.querySelectorAll('img'))
  await Promise.all(images.map(async (img) => {
    const src = img.getAttribute('src') ?? ''
    if (!src || src.startsWith('data:')) return
    if (!src.startsWith('/') && !src.startsWith(window.location.origin)) { img.remove(); return }
    try {
      const blob = await (await fetch(img.src)).blob()
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result))
        reader.onerror = () => reject(new Error('read failed'))
        reader.readAsDataURL(blob)
      })
      img.setAttribute('src', dataUrl)
    } catch { img.remove() }
  }))
}

/** 把一块板书节点导出成 JPEG；返回 null 表示这张板面截不出来（调用方要如实告诉用户） */
export async function boardNodeToJpeg(node: HTMLElement, fileName: string): Promise<{ ok: true; bytes: number } | { ok: false; reason: string }> {
  const rect = node.getBoundingClientRect()
  const width = Math.ceil(node.offsetWidth || rect.width)
  const height = Math.ceil(node.offsetHeight || rect.height)
  if (!width || !height) return { ok: false, reason: '板面尺寸为 0' }
  const clone = node.cloneNode(true) as HTMLElement
  clone.style.transform = 'none'
  clone.style.margin = '0'
  clone.style.width = `${width}px`
  replaceUnrenderable(clone)
  await inlineImages(clone)
  inlineComputedStyles(node, clone)
  const markup = new XMLSerializer().serializeToString(clone)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`
    + `<foreignObject x="0" y="0" width="${width}" height="${height}">`
    + `<div xmlns="http://www.w3.org/1999/xhtml">${markup}</div>`
    + '</foreignObject></svg>'
  const image = new Image()
  const loaded = new Promise<boolean>((resolve) => {
    image.onload = () => resolve(true)
    image.onerror = () => resolve(false)
  })
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  if (!(await loaded)) return { ok: false, reason: '板面无法序列化为图片' }
  const scale = 2
  const canvas = document.createElement('canvas')
  canvas.width = width * scale
  canvas.height = height * scale
  const ctx = canvas.getContext('2d')
  if (!ctx) return { ok: false, reason: '拿不到画布上下文' }
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.scale(scale, scale)
  ctx.drawImage(image, 0, 0, width, height)
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY))
  if (!blob || blob.size < 1024) return { ok: false, reason: '画出来的图是空的' }
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
  return { ok: true, bytes: blob.size }
}
