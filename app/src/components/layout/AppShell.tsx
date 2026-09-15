import { Outlet } from 'react-router'
import { Sidebar } from './Sidebar'
import { TopChrome } from './TopChrome'

// App shell：240px 侧栏 + 主区（--app-bg）。响应页/白板页可通过 noChrome 隐藏顶部 chrome。
export function AppShell({ noChrome = false }: { noChrome?: boolean }) {
  return (
    <div className="flex min-h-screen" style={{ background: 'var(--app-bg)' }}>
      <Sidebar />
      <main className="flex-1 min-w-0 flex flex-col" style={{ height: '100vh', overflow: 'hidden' }}>
        {!noChrome && <TopChrome />}
        <div className="flex-1 min-h-0 overflow-y-auto hk-scroll">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
