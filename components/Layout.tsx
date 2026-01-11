import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col font-mono selection:bg-high-yellow selection:text-black">
      {/* Sticky Top Bar / Marquee */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b-2 border-black h-[50px] flex items-center">
        <div className="w-[60px] h-full border-r-2 border-black flex items-center justify-center bg-high-yellow cursor-pointer hover:invert transition-all" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
        
        <div className="flex-1 marquee-container flex items-center overflow-hidden h-full">
            <div className="marquee-content font-sans text-2xl font-bold tracking-tighter uppercase whitespace-nowrap">
              TANDANG SANGAR /// EXPERIMENTAL MEDIA /// SOLO - JOGJA - WORLDWIDE /// RAW AESTHETICS /// TANDANG SANGAR /// LISTEN TO THE NOISE /// 
              TANDANG SANGAR /// EXPERIMENTAL MEDIA /// SOLO - JOGJA - WORLDWIDE /// RAW AESTHETICS /// TANDANG SANGAR /// LISTEN TO THE NOISE ///
            </div>
        </div>

        <div className="hidden md:flex px-4 border-l-2 border-black h-full items-center font-bold text-xs">
          {new Date().toLocaleDateString('en-GB').toUpperCase()}
        </div>
      </header>

      {/* Navigation Overlay */}
      {isMenuOpen && (
        <nav className="fixed top-[50px] left-0 w-full md:w-[300px] bg-black text-white z-40 border-r-2 border-b-2 border-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
          <ul className="space-y-4 text-2xl font-sans uppercase tracking-widest">
            <li><Link to="/" onClick={toggleMenu} className="hover:text-high-yellow hover:underline decoration-4 underline-offset-4">Home</Link></li>
            <li><Link to="/archive" onClick={toggleMenu} className="hover:text-high-yellow hover:underline decoration-4 underline-offset-4">Archive</Link></li>
            <li><Link to="/studio" onClick={toggleMenu} className="hover:text-high-yellow hover:underline decoration-4 underline-offset-4">Studio (Admin)</Link></li>
          </ul>
        </nav>
      )}

      {/* Main Content Area - With small gap */}
      <main className="flex-1 pt-[50px] mx-2 md:mx-4 border-x-2 border-black bg-white min-h-[150vh]">
        <Outlet />
      </main>

      {/* Massive Footer - Aligned with Main */}
      <footer className="mx-2 md:mx-4 border-x-2 border-b-2 border-t-2 border-black bg-black text-white overflow-hidden relative" style={{ height: '50vh' }}>
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