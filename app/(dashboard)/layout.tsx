import { UserButton } from "@clerk/nextjs"
import Link from "next/link"


const DashboardLayout = ({children}) => {
  const links = [
    {label: 'home', href: '/' },  
    {label: 'journal', href: '/journal'}, 
    {label: 'history', href: '/history'}, 
  ]
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10"> 
        <Link href="/journal"> Entheogen</Link>  
        <ul>
          { links.map(link => (
            <li key={link.label}>
              <Link key={link.label} href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="ml-[200px]">
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton></UserButton>
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout