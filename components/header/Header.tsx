'use client'

export default function Header() {
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
          <div>
              <svg height="1.2em" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
              </svg>
          </div>
        </header>
      </>
    );
  }
  