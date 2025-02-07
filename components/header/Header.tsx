'use client'

import { useState } from "react";
import SideNav from "../nav/SideNav";

export default function Header() {
  const [sideNavBgClassName, setSideNavBgClassName] = useState('w-0');
  const [sideNavClassName, setSideNavClassName] = useState('right-[-200px]');

  const handle = {
    showSideNav: (isShow:boolean) => {
        if (isShow) {
            setSideNavBgClassName('w-full');
            setSideNavClassName('right-0');
        } else {
            setSideNavBgClassName('w-0');
            setSideNavClassName('right-[-200px]');
        }
    }

  }
    return (
      <>
        <header
          className="w-full h-[50px] flex justify-between items-center fixed top-0 right-0 z-10 pt-2 pb-2 p-4 border-b-[1px] border-[#b8b8b8]"
        >
          <div className="h-full">
            <img 
              className="w-full h-full"
              src="/TS_LOGO.png" 
            />
          </div>
          <div
            onClick={handle.showSideNav.bind(null, true)}
          >
              {/* <svg height="1.2em" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
              </svg> */}
              <svg 
                className="w-[24px] h-[24px]" 
                viewBox="0 0 24 24" stroke="currentColor" focusable="false"
              >
                <g transform="translate(12,12)">
                  <path d="M-9 -5 L9 -5" fill="none" stroke-width="2"></path>
                  <path d="M-9 0 L9 0" fill="none" stroke-width="2"></path>
                  <path d="M-9 5 L9 5" fill="none" stroke-width="2"></path>
                </g>
              </svg>
          </div>
        </header>

        <SideNav
          sideNavBgClassName={sideNavBgClassName}
          sideNavClassName={sideNavClassName}
          showSideNav={handle.showSideNav.bind(null, false)}
        />
      </>
    );
  }
  