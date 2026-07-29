import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !ctaRef.current) return;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
        );
      },
    });
    return () => st.kill();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const dist = Math.sqrt(distX * distX + distY * distY);
    if (dist < 100) {
      const strength = (100 - dist) / 100;
      setMagnetPos({ x: distX * strength * 0.3, y: distY * strength * 0.3 });
    } else {
      setMagnetPos({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setMagnetPos({ x: 0, y: 0 });
  };

  return (
    <section ref={sectionRef} id="contact" className="w-full bg-white">
      {/* CTA Area */}
      <div ref={ctaRef} className="section-padding pb-20 opacity-0">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-serif text-[40px] sm:text-[64px] md:text-[96px] font-normal leading-[1.0] tracking-[-1px] text-fashion-black mb-4">
            WORK WITH HOUSE OF ZURI
          </h2>
          <p className="font-sans text-lg text-fashion-muted mb-8">
            Available for brand collaborations, womenswear commissions, and creative partnerships.
          </p>

          <div className="flex flex-col items-center gap-3 mb-10">
            <a
              href="mailto:house.of.zuri26@gmail.com"
              className="font-mono text-base text-fashion-indigo hover:underline inline-flex items-center gap-2"
            >
              house.of.zuri26@gmail.com
              <ArrowUpRight size={14} />
            </a>
            <p className="font-sans text-sm text-fashion-muted">
              Nairobi, Kenya · Available Worldwide
            </p>
          </div>

          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="inline-block"
          >
            <a
              ref={btnRef}
              href="mailto:house.of.zuri26@gmail.com"
              className="inline-block font-sans text-sm tracking-[1px] uppercase px-12 py-5 bg-fashion-black text-white hover:bg-fashion-indigo transition-colors duration-300"
              style={{
                transform: `translate(${magnetPos.x}px, ${magnetPos.y}px)`,
                transition: 'transform 0.15s ease-out, background-color 0.3s ease',
              }}
            >
              SEND INQUIRY
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div ref={footerRef} className="border-t border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-serif text-2xl text-fashion-black hover:text-fashion-indigo transition-colors"
            >
              HOUSE OF ZURI
            </a>

            {/* Links */}
            <nav className="flex gap-8">
              {['Home', 'Collections', 'About', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const id = link === 'Home' ? '#hero' : link === 'Collections' ? '#works' : link === 'About' ? '#atelier' : '#contact';
                    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="font-sans text-sm text-fashion-muted hover:text-fashion-black transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Social */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fashion-muted hover:text-fashion-indigo transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fashion-muted hover:text-fashion-indigo transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:house.of.zuri26@gmail.com"
                className="text-fashion-muted hover:text-fashion-indigo transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-gray-100 text-center">
            <p className="font-mono text-[11px] text-fashion-muted">
              &copy; 2025 House of Zuri. All rights reserved. · Built with React 19 + Vite · Runs entirely offline
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
