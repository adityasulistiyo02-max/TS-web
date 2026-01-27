import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-mono selection:bg-high-yellow selection:text-black">
      {/* Fixed Header with Standard Nav */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b-2 border-black h-[60px] flex items-center justify-between px-4 md:px-6">
        <Link to="/" className="font-sans text-3xl font-black tracking-tighter uppercase hover:text-gray-600 transition-colors">
          TANDANG SANGAR
        </Link>

        <nav className="flex items-center gap-2 md:gap-4 overflow-x-auto no-scrollbar">
          <Link 
            to="/" 
            className="whitespace-nowrap px-3 py-1 border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-all font-bold text-sm md:text-base uppercase"
          >
            Home
          </Link>
           <Link 
            to="/archive?category=Music" 
            className="whitespace-nowrap px-3 py-1 border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-all font-bold text-sm md:text-base uppercase"
          >
            Music
          </Link>
           <Link 
            to="/archive?category=Visual" 
            className="whitespace-nowrap px-3 py-1 border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-all font-bold text-sm md:text-base uppercase"
          >
            Visual
          </Link>
           <Link 
            to="/archive?category=Event" 
            className="whitespace-nowrap px-3 py-1 border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-all font-bold text-sm md:text-base uppercase"
          >
            Event
          </Link>
          <Link 
            to="/archive" 
            className="whitespace-nowrap px-3 py-1 border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-all font-bold text-sm md:text-base uppercase"
          >
            Archive
          </Link>
          <Link 
            to="/studio" 
            className="whitespace-nowrap px-3 py-1 border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-all font-bold text-sm md:text-base uppercase hidden md:block"
          >
            Studio
          </Link>
          {/* Mobile only icon for studio */}
           <Link 
            to="/studio" 
            className="whitespace-nowrap px-3 py-1 border-2 border-black bg-black text-white hover:bg-high-yellow hover:text-black transition-all font-bold text-sm uppercase md:hidden"
          >
            +
          </Link>
        </nav>
      </header>

      {/* Main Content Area - With small gap */}
      <main className="flex-1 pt-[60px] mx-2 md:mx-4 border-x-2 border-black bg-white min-h-[150vh] flex flex-col">
        <Outlet />
      </main>

      {/* Massive Footer - Full Width (No Gap) */}
      <footer className="w-full border-t-2 border-black bg-black text-white overflow-hidden relative" style={{ height: '50vh' }}>
        <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-8">
          <div className="flex justify-between font-mono text-sm md:text-base border-b border-white/30 pb-4">
             <span>EST. 2024</span>
             <span>CONTACT@TANDANG.SANGAR</span>
             <span className="hidden md:inline">SCROLL UP TO REVOLT</span>
          </div>
          
          <h1 className="font-sans font-black text-[13vw] leading-[0.85] tracking-tighter text-center md:text-left break-words mt-auto select-none pointer-events-none text-transparent stroke-white" style={{ WebkitTextStroke: '2px white' }}>
            TANDANG<br/>SANGAR
          </h1>
        </div>
      </footer>
    </div>
  );
};

export default Layout;