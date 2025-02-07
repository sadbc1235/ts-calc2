import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav(props:any) {
    const path = usePathname();

    const {sideNavBgClassName, sideNavClassName, showSideNav} = props;

    return (
        <aside
          className={"h-full fixed top-0 right-0 z-10 transition-all duration-300 ease-in-out " + sideNavBgClassName}
        > 
            <div
                className={"absolute top-0 right-0 h-full bg-[#000] opacity-[.6] transition-all duration-300 ease-in-out " + sideNavBgClassName}
                onClick={showSideNav}
            ></div>
            <nav 
                className={"absolute top-0 right-0 w-[200px] h-full bg-[#fff] z-10  transition-all duration-300 ease-in-out "+sideNavClassName}
            >
                <svg 
                    className="w-[24px] h-[24px] absolute top-3 right-3 z-10" 
                    viewBox="0 0 24 24" stroke="currentColor" focusable="false" style={{transform: 'rotate(90deg)'}}
                    onClick={showSideNav}
                >
                    <g transform="translate(12,12)">
                        <path d="M-9 -5 L9 -5" fill="none" stroke-width="2" style={{transform: 'rotate(45deg) translate(0, 5px)'}}></path>
                        <path d="M-9 0 L9 0" fill="none" stroke-width="2" style={{opacity: 0}}></path>
                        <path d="M-9 5 L9 5" fill="none" stroke-width="2" style={{transform: 'rotate(135deg) translate(0, -5px)'}}></path>
                    </g>
                </svg>
                <ul
                    className="mt-[50px] p-3 grid grid-cols-1 gap-5"
                >
                    <li 
                        className={"text-base border-b-[1px] " + (path == "/" ? 'text-[#000] border-[#000]' : 'text-[#bdbdbd] border-[#b8b8b8]')}
                        onClick={showSideNav}
                    >
                        <Link href='/'>HOME</Link>
                    </li>
                    <li 
                        className={"text-base border-b-[1px] " + (path == "/report" ? 'text-[#000] border-[#000]' : 'text-[#bdbdbd] border-[#b8b8b8]')}
                        onClick={showSideNav}
                    >
                        <Link href='/report'>REPORT</Link>
                    </li>
                    <li 
                        className={"text-base border-b-[1px] " + (path == "/add" ? 'text-[#000] border-[#000]' : 'text-[#bdbdbd] border-[#b8b8b8]')}
                        onClick={showSideNav}
                    >
                        <Link href='/add'>ADD</Link>
                    </li>
                </ul>
            </nav>

            
        </aside>
    );
  }