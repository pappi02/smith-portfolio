import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'COLLECTIONS', href: '/work' },
  { label: 'ABOUT', href: '/experience' },
  { label: 'CONTACT', href: '/contact' },
];

export default function Navigation() {
  const [, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-xl"
      style={{ transition: 'background 0.3s ease' }}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 py-5">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-sans text-sm tracking-[2px] text-white uppercase font-medium hover:opacity-70 transition-opacity"
        >
          HOUSE OF ZURI
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-sans text-sm tracking-[1px] text-white uppercase relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            to="/contact"
            className="font-sans text-sm tracking-[1px] text-white uppercase border border-white/30 px-5 py-2.5 hover:bg-white/10 transition-all duration-300"
          >
            INQUIRE
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-60 bg-black/20 p-3 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="mx-auto mt-16 max-w-[360px] rounded-[2rem] border border-black/10 bg-white/90 p-4 shadow-2xl backdrop-blur-lg">
            <div className="flex items-center justify-between border-b border-black/10 px-2 py-4">
              <span className="text-sm uppercase tracking-[0.3em] text-black/80">Menu</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="rounded-full border border-black/10 bg-black/5 p-2 text-black transition hover:bg-black/10"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 px-2 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="w-full max-w-[240px] rounded-full border border-black/10 bg-white/80 px-5 py-3 text-center font-serif text-2xl text-black tracking-wide transition-all hover:bg-[#8C5E2B]/10 hover:text-[#8C5E2B]"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 w-full max-w-[240px] rounded-full border border-black/10 bg-black px-5 py-3 text-center font-sans text-base uppercase tracking-[1px] text-white transition hover:bg-[#8C5E2B]"
              >
                INQUIRE
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
