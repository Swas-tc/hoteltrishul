import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight, Mail, MapPin, Menu, Phone, X } from 'lucide-react';

type GalleryItem = {
  category: 'Rooms' | 'Baths' | 'Celebrations';
  eyebrow: string;
  title: string;
  quote: string;
  image: string;
  alt: string;
};

const galleryItems: GalleryItem[] = [
  {
    category: 'Rooms',
    eyebrow: '01 / Rest easy',
    title: 'The soft landing',
    quote: 'A warm, quiet room that makes the city feel a world away.',
    image: '/b1.png',
    alt: 'Warm hotel room with white bedding',
  },
  {
    category: 'Rooms',
    eyebrow: '02 / Rest easy',
    title: 'A place to settle',
    quote: 'Soft light, warm tones, and a bed that invites you to stay.',
    image: '/b3.png',
    alt: 'Cozy hotel room with clean bedding and warm light',
  },
  {
    category: 'Baths',
    eyebrow: '03 / Take your time',
    title: 'A little ritual',
    quote: 'The kind of bathroom where you naturally slow down.',
    image: '/w1.png',
    alt: 'Modern hotel bathroom with gold fixtures',
  },
  {
    category: 'Baths',
    eyebrow: '04 / Take your time',
    title: 'Fresh perspective',
    quote: 'Thoughtful details for the start and end of every day.',
    image: '/w2.png',
    alt: 'Elegant sink besides bathroom',
  },
  {
    category: 'Celebrations',
    eyebrow: '05 / Gather here',
    title: 'Make it memorable',
    quote: '“The perfect setting for our family celebration. Every detail felt cared for.”',
    image: '/h1.png',
    alt: 'Elegant banquet hall with round tables',
  },
  {
    category: 'Celebrations',
    eyebrow: '06 / Gather here',
    title: 'Your kind of occasion',
    quote: '“Beautiful, generous, and effortless. Our guests are still talking about it.”',
    image: '/h2.png',
    alt: 'Luxurious ballroom arranged for an evening event',
  },
];

const categories: GalleryItem['category'][] = ['Rooms', 'Baths', 'Celebrations'];
const mapUrl = 'https://maps.app.goo.gl/XNfk6Bk6tQHEiJvw9';

function App() {
  const [activeCategory, setActiveCategory] = useState<GalleryItem['category']>('Rooms');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!activeImage) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeImage]);

  const filteredItems = galleryItems.filter((item) => item.category === activeCategory);

  const handleHeroMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 6,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * -4,
    });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <main className="site-shell">
      <header className={`island ${menuOpen ? 'island-open' : ''}`}>
        <a className="brand-mark" href="#top" aria-label="Hotel Trishul home">
          <img className="brand-logo" src="/logoht.png" alt="Hotel Trishul logo" />
          <span className="brand-name">Hotel Trishul</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#stay">Stay</a>
          <a href="#gallery">Spaces</a>
          <a href="#story">Our story</a>
          <a href="#contact">Find us</a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#stay" onClick={() => setMenuOpen(false)}>Stay</a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>Spaces</a>
            <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Find us</a>
          </nav>
        )}
      </header>

      <section className="hero" id="top" onMouseMove={handleHeroMove} onMouseLeave={resetTilt}>
        <div className="hero-image" style={{ transform: `scale(1.06) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }} />
        <div className="hero-vignette" />
        <div className="hero-copy">
          <p className="hero-kicker">Your destination for rest</p>
          <div className="hero-title-wrap">
            <h1>Hotel <em>Trishul</em></h1>
            <span className="title-line" />
          </div>
          <p className="hero-subtitle">A simple stay, made special.</p>
        </div>
        <a className="scroll-prompt" href="#stay"><span>Scroll to explore</span><ArrowDown size={18} /></a>
        <div className="hero-note"><span>25° 18' N</span><span>72° 38' E</span></div>
      </section>

      <section className="intro-section" id="stay">
        <div className="section-label"><span>01</span><span className="label-rule" /><span>The welcome</span></div>
        <div className="intro-layout">
          <div className="intro-heading"><p className="overline">A place to arrive</p><h2>Stay close.<br /><i>Feel at home.</i></h2></div>
          <div className="intro-body"><p>At Hotel Trishul, we believe a good stay is about the little things — a comfortable bed, a warm light, a friendly welcome, and a place that lets you settle in.</p><p>Right in the heart of the city, made for weekends away, family celebrations, and the days in between.</p><a className="text-link" href="#story">Discover our story <ArrowUpRight size={16} /></a></div>
        </div>
        <div className="feature-row">
          <div className="feature-card"><span>01</span><strong>Restful rooms</strong><small>Made for deep sleep</small></div>
          <div className="feature-card"><span>02</span><strong>Warm hosting</strong><small>Always with a smile</small></div>
          <div className="feature-card"><span>03</span><strong>Easy location</strong><small>Close to what matters</small></div>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="section-label light"><span>02</span><span className="label-rule" /><span>See the spaces</span></div>
        <div className="gallery-heading"><div><p className="overline">Made with care</p><h2>A room for<br /><i>every occasion.</i></h2></div><p className="gallery-blurb">From peaceful mornings to evenings worth gathering for, take a look around Hotel Trishul.</p></div>
        <div className="category-tabs" role="tablist" aria-label="Gallery categories">
          {categories.map((category, index) => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}><span>0{index + 1}</span>{category}</button>)}
        </div>
        <div className="gallery-grid">
          {filteredItems.map((item) => <button className="gallery-card" key={item.title} onClick={() => setActiveImage(item)}><div className="gallery-image-wrap"><img src={item.image} alt={item.alt} /><span className="view-button">View <ArrowUpRight size={15} /></span></div><div className="gallery-card-copy"><span>{item.eyebrow}</span><h3>{item.title}</h3><p>{item.quote}</p></div></button>)}
        </div>
      </section>

      <section className="story-section" id="story">
        <div className="story-image"><img src="bottom.png" alt="Warm city buildings at sunset" /></div>
        <div className="story-copy"><div className="section-label"><span>03</span><span className="label-rule" /><span>A little more</span></div><p className="overline">The Trishul way</p><h2>Good days<br /><i>start here.</i></h2><p>We are a small, welcoming hotel with a big heart. A place to pause, reconnect, and make the most of being somewhere new.</p><p>Come as you are. Leave feeling looked after.</p><div className="signature">Trishul <span>Family</span></div></div>
      </section>

      <footer id="contact"><div className="footer-brand"><img className="footer-logo" src="/logoht.png" alt="Hotel Trishul logo" /><h2>Hotel Trishul</h2><p>A simple stay, made special.</p></div><div className="footer-columns"><div className="address-card"><span className="footer-label"><MapPin size={13} /> Find us</span><p>Hotel Trishul<br />Tap below to open our location</p><a className="map-link" href={mapUrl} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={15} /></a></div><div><span className="footer-label"><Phone size={13} /> Call us</span><p><a className="contact-link" href="tel:+919504978999">Click to Call</a></p><span className="footer-label footer-label-spaced"><Mail size={13} /> Email us</span><p><a className="contact-link" href="mailto:trilochanandbrothers@gmail.com">trilochanandbrothers@gmail.com</a></p></div><div><span className="footer-label">Follow along</span><p><a className="contact-link" href="https://www.instagram.com/trilochan_multiprint/" target="_blank">Instagram</a><br /><a className="contact-link" href="https://www.facebook.com/c.k.raghuwansi" target="_blank">Facebook</a></p></div></div><div className="footer-bottom"><span>© 2026 Hotel Trishul</span><span>Made for good stays</span><a href="#top">Back to top <ArrowUp size={14} /></a></div></footer>

      {activeImage && <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeImage.title} onClick={() => setActiveImage(null)}><button className="lightbox-close" onClick={() => setActiveImage(null)} aria-label="Close image"><X size={22} /></button><div className="lightbox-content" onClick={(event) => event.stopPropagation()}><img src={activeImage.image} alt={activeImage.alt} /><div><span>{activeImage.eyebrow}</span><h2>{activeImage.title}</h2><p>{activeImage.quote}</p></div></div></div>}
    </main>
  );
}

export default App;
