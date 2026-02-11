import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [label, setLabel] = useState("");
  const [devHeader, setDevHeader] = useState("");
  const [designHeader, setDesignHeader] = useState("");
  const [description, setDescription] = useState("");
  const [isLoaded, setIsLoaded] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  
  const menuRef = useRef(null);
  const scrollRef = useRef(null);
  const hasTypedLabel = useRef(false);
  const hasTypedDesc = useRef(false);
  const hasTypedDev = useRef(false);
  const hasTypedDesign = useRef(false);
  
  const labelText = " UI/UX • FRONTEND • REACT";
  const devHeaderText = " Development";
  const designHeaderText = " Design";
  const descText = "Hi, it's Daksh Sharma here. I transform complex ideas into simple, beautiful digital products. Specializing in HTML, CSS, JS, React, Figma, and Affinity.";

  const skills = {
    development: [
      { name: "HTML", icon: "fa-brands fa-html5", percent: "80%" },
      { name: "CSS", icon: "fa-brands fa-css3-alt", percent: "70%" },
      { name: "JS", icon: "fa-brands fa-js", percent: "65%" },
      { name: "ReactJS", icon: "fa-brands fa-react", percent: "51%" },
      { name: "C Lang", icon: "fa-solid fa-code", percent: "75%" }
    ],
    design: [
      { name: "Figma", icon: "fa-brands fa-figma", percent: "60%" },
      { name: "Affinity", img: "/aff.png", percent: "55%" }, 
      { name: "After Effects", img: "/ae.png", percent: "27%" },
      { name: "Alight Motion", img: "/am.png", percent: "67%" },
      { name: "UI/UX", img: "/uiux.png", percent: "60%" }
    ]
  };

  const certificates = [
    { id: 1, source: "Simplilearn", title: "Fundamentals of Data Structure in C", desc: "Learned core Data Structures in C, including pointers, memory management, Lists, Stacks and other algorithmic logic." },
    { id: 2, source: "CodeTantra", title: "Data File Structure in C", desc: "Learned data and file management in C with core Data Structures in C." },
    { id: 3, source: "Kreativan technologies", title: "Basic Full Stack Development", desc: "Gained a foundational understanding of both frontend and backend development." },
    { id: 4, source: "Simplilearn", title: "UI/UX Basics", desc: "Designed intuitive user interfaces using Figma and Adobe XD, focusing on wireframing, prototyping, and user-centric layouts." },
     { id: 5, source: "Webs Jyoti", title: "Basics of ReactJS", desc: "Explored the fundamentals of building dynamic UIs by leveraging React hooks, props, and virtual DOM concepts." },
    { id: 6, source: "NS3Edu", title: "Web Development Frontend", desc: "Learned to build responsive and interactive user interfaces using HTML, CSS, JS and React." }
  ];

  const scrollToSection = (e, id, blockPosition = 'start') => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      if (id === 'learning' || id === 'work') {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        element.scrollIntoView({
          behavior: 'smooth',
          block: blockPosition,
        });
      }
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const track = scrollRef.current;
    
    const handleScrollTracking = () => {
      if (track && window.innerWidth <= 768) {
        const scrollLeft = track.scrollLeft;
        const cardWidth = track.querySelector('.learning-card').offsetWidth + 20;
        const index = Math.round(scrollLeft / cardWidth);
        setCurrentCertIndex(index);
      }
    };

    if (track) {
      track.addEventListener('scroll', handleScrollTracking);
    }

    hasTypedLabel.current = false;
    hasTypedDesc.current = false;
    hasTypedDev.current = false;
    hasTypedDesign.current = false;

    setIsLoaded(true);

    const typeString = (str, setter, speed = 50) => {
      let i = 0;
      setter("");
      const interval = setInterval(() => {
        i++;
        setter(str.substring(0, i)); 
        if (i >= str.length) clearInterval(interval);
      }, speed);
      return interval;
    };

    let labelInterval, descInterval, devInterval, designInterval;

    const timeoutId = setTimeout(() => {
      if (!hasTypedLabel.current) {
        hasTypedLabel.current = true;
        labelInterval = typeString(labelText, setLabel);
      }
      if (!hasTypedDesc.current) {
        hasTypedDesc.current = true;
        descInterval = typeString(descText, setDescription, 25);
      }
    }, 100);

    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            if(entry.target.id === "dev-h" && !hasTypedDev.current) {
                hasTypedDev.current = true;
                devInterval = typeString(devHeaderText, setDevHeader);
            }
            if(entry.target.id === "design-h" && !hasTypedDesign.current) {
                hasTypedDesign.current = true;
                designInterval = typeString(designHeaderText, setDesignHeader);
            }
            skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const devH = document.getElementById('dev-h');
    const designH = document.getElementById('design-h');
    if(devH) skillObserver.observe(devH);
    if(designH) skillObserver.observe(designH);

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        } else {
          entry.target.classList.remove('reveal-visible');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.project-card, .skill-item');
    revealElements.forEach(el => revealObserver.observe(el));

    const handleManualScroll = () => {
      const sections = [
        { id: 'home', element: document.getElementById('home') },
        { id: 'skills', element: document.getElementById('skills') },
        { id: 'work', element: document.getElementById('work') },
        { id: 'learning', element: document.getElementById('learning') },
        { id: 'contact', element: document.getElementById('contact') }
      ];

      const scrollPosition = window.scrollY + 150;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (windowHeight + window.scrollY >= documentHeight - 50) {
        setActiveSection('contact');
        return;
      }

      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          
          if (scrollPosition >= sectionTop - 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    let scrollTimeout;
    const throttledScroll = () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(() => {
        handleManualScroll();
      });
    };

    window.addEventListener('scroll', throttledScroll);
    handleManualScroll();

    const handleBackToTop = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleBackToTop);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearTimeout(timeoutId);
      if (labelInterval) clearInterval(labelInterval);
      if (descInterval) clearInterval(descInterval);
      if (devInterval) clearInterval(devInterval);
      if (designInterval) clearInterval(designInterval);
      revealElements.forEach(el => revealObserver.unobserve(el));
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("scroll", handleBackToTop);
      document.removeEventListener("mousedown", handleClickOutside);
      if (track) track.removeEventListener('scroll', handleScrollTracking);
    };
  }, []);

  return (
    <div className="portfolio-container" id="top">
      {selectedCert && (
        <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCert(null)}>&times;</button>
            <div className="modal-image-container">
                <img src={`/cert${selectedCert.id}.png`} alt={selectedCert.title} />
            </div>
            <div className="modal-info">
                <h3>{selectedCert.title}</h3>
                <p>{selectedCert.source}</p>
            </div>
          </div>
        </div>
      )}

      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={(e) => scrollToSection(e, 'top', 'start')}
        aria-label="Back to top"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>

      <nav>
        <a 
          href="#top" 
          className={`logo nav-logo-link ${activeSection === 'home' ? 'active' : ''}`}
          onClick={(e) => scrollToSection(e, 'top', 'start')}
        >
          About Me
        </a>
        <div className="nav-links desktop-only">
          <a href="#skills" onClick={(e) => scrollToSection(e, 'skills', 'start')} className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
          <a href="#work" onClick={(e) => scrollToSection(e, 'work', 'start')} className={activeSection === 'work' ? 'active' : ''}>Projects</a>
          <a href="#learning" onClick={(e) => scrollToSection(e, 'learning', 'start')} className={activeSection === 'learning' ? 'active' : ''}>Certifications</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact', 'start')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
        </div>

        <div className="mobile-menu-container" ref={menuRef}>
          <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span><span></span><span></span>
          </button>
          <div className={`nav-bubble ${isMenuOpen ? 'show' : ''}`}>
            <a href="#skills" onClick={(e) => scrollToSection(e, 'skills', 'start')} className={activeSection === 'skills' ? 'active' : ''}><i className="fa-solid fa-bolt"></i> Skills</a>
            <a href="#work" onClick={(e) => scrollToSection(e, 'work', 'start')} className={activeSection === 'work' ? 'active' : ''}><i className="fa-solid fa-code"></i> Projects</a>
            <a href="#learning" onClick={(e) => scrollToSection(e, 'learning', 'start')} className={activeSection === 'learning' ? 'active' : ''}><i className="fa-solid fa-certificate"></i> Certifications</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact', 'start')} className={activeSection === 'contact' ? 'active' : ''}><i className="fa-solid fa-envelope"></i> Contact</a>
          </div>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-text">
          <div className="label-container">{label}<span className="typing"></span></div>
          <h2 className={`name-gradient ${isLoaded ? 'reload-swipe' : 'hidden-state'}`}>DAKSH SHARMA</h2>
          <h1 className={`${isLoaded ? 'reload-swipe' : 'hidden-state'}`}>
            <span>Always <span style={{color: 'var(--accent)'}}>Learning</span></span>
            <span><span style={{color: 'var(--accent)'}}>and</span> <span style={{color: 'var(--accent)'}}>Developing.</span></span>
          </h1>
          <p className="hero-desc">{description}</p>
          <div className={`hero-btns ${isLoaded ? 'reload-swipe' : 'hidden-state'}`}>
            <a href="#work" className="btn btn-primary" onClick={(e) => scrollToSection(e, 'work', 'start')}>View My Work</a>
            <a href="/resume.pdf" className="btn-resume" download>
                <span className="resume-icon"><i className="fa-solid fa-download"></i></span>
                <span className="resume-text">My Resume</span>
            </a>
          </div>
        </div>
        <div className="photo-container">
          <div className="floating-container">
            <div className={`profile-box ${isLoaded ? 'reload-pop' : 'hidden-state'}`}>
               <img src="/profile.png" alt="Daksh Sharma" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <h2 className="section-title">My Skills</h2>
        <div className="skill-category">
          <h4 id="dev-h" className="typing-header">{devHeader}<span className="typing"></span></h4>
          <div className="skills-grid">
            {skills.development.map((skill, idx) => (
              <div className="skill-item" key={idx}>
                <div className="skill-circle">
                  {skill.img ? <img src={skill.img} alt={skill.name} /> : <i className={skill.icon}></i>}
                </div>
                <span>{skill.name}</span>
                <span className="skill-percent">{skill.percent}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="skill-category" style={{marginTop: '80px'}}>
          <h4 id="design-h" className="typing-header">{designHeader}<span className="typing"></span></h4>
          <div className="skills-grid">
            {skills.design.map((skill, idx) => (
              <div className="skill-item" key={idx}>
                <div className="skill-circle">
                  {skill.img ? <img src={skill.img} alt={skill.name} /> : <i className={skill.icon}></i>}
                </div>
                <span>{skill.name}</span>
                <span className="skill-percent">{skill.percent}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="work">
        <h2 className="section-title">My Projects</h2>
        <div className="project-card">
          <div className="project-content">
            <small style={{color: 'var(--accent)'}}>Web Application</small>
            <h3>WLinks</h3>
            <p>A centralized link resource platform designed for ease of access, efficiency and speed.</p>
            <div className="tech-stack"><small>REACT</small><small>FIGMA</small><small>JS</small></div>
            <div className="project-btns">
                <a href="https://wlinks.vercel.app/" target="_blank" rel="noreferrer" className="btn btn-outline">Launch Wlinks</a>
                <a href="https://github.com/dakshsharma99ds/WLinks" target="_blank" rel="noreferrer" className="btn btn-outline">Source Code</a>
            </div>
          </div>
          <div className="project-image">
            <div className="wlinks-img-box"><img src="/ss.png" alt="Wlinks" /></div>
          </div>
        </div>

        <div className="project-card" style={{marginTop: '40px'}}>
          <div className="project-content">
            <small style={{color: 'var(--accent)'}}>Personal Branding</small>
            <h3>Portfolio</h3>
            <p>A high-performance personal portfolio featuring smooth animations, neon aesthetics, and a responsive design.</p>
            <div className="tech-stack"><small>REACT</small><small>CSS3</small><small>FIGMA</small></div>
            <div className="project-btns">
                <a href="#top" onClick={(e) => scrollToSection(e, 'top', 'start')} className="btn btn-outline">Launch Demo</a>
                <a href="https://github.com/dakshsharma99ds/Daksh-Sharma-Portfolio" target="_blank" rel="noreferrer" className="btn btn-outline">Source Code</a>
            </div>
          </div>
          <div className="project-image">
            <div className="wlinks-img-box"><img src="/port.png" alt="Portfolio" /></div>
          </div>
        </div>
      </div>

      <section id="learning">
        <div className="learning-header">
          <h2 className="section-title">My Certifications</h2>
        </div>
        <div className={`marquee-container ${selectedCert ? 'paused' : ''}`}>
          <div className="marquee-track" ref={scrollRef}>
            {certificates.map((cert, index) => (
              <div className="learning-card" key={`orig-${index}`} onClick={() => setSelectedCert(cert)}>
                <div className="cert-img-box"><img src={`/cert${cert.id}.png`} alt={cert.title} /></div>
                <div className="learning-info">
                  <h4>{cert.source}</h4>
                  <p>{cert.title}</p>
                  <small>{cert.desc}</small>
                </div>
              </div>
            ))}
            {certificates.map((cert, index) => (
              <div className="learning-card marquee-clone" key={`clone-${index}`} onClick={() => setSelectedCert(cert)}>
                <div className="cert-img-box"><img src={`/cert${cert.id}.png`} alt={cert.title} /></div>
                <div className="learning-info">
                  <h4>{cert.source}</h4>
                  <p>{cert.title}</p>
                  <small>{cert.desc}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dot-indicator phone-only-dots">
            {certificates.map((_, idx) => (
                <div key={idx} className={`dot ${currentCertIndex === idx ? 'active' : ''}`}></div>
            ))}
        </div>
      </section>

      <section id="contact">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Let's build something <br /> <span className="footer-highlight">exceptional.</span></h2>
            <p style={{color: 'var(--text-dim)', marginTop: '1rem'}}>I'm currently looking for new opportunities and collaborations.</p>
          </div>
          <div className="contact-details">
            <div className="contact-item">
              <h4>Email</h4>
              <a href="mailto:dakshsharma999ds@gmail.com">dakshsharma999ds@gmail.com</a>
            </div>
            <div className="contact-item">
              <h4>WhatsApp / Call</h4>
              <a href="tel:8368919353">+91 8368919353</a>
            </div>
            <div className="contact-item">
              <h4>Digital Presence</h4>
              <div style={{marginTop: '10px', display: 'flex', gap: '25px'}}>
                <a href="https://github.com/dakshsharma99ds" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i> GitHub</a>
                <a href="https://www.linkedin.com/in/dakshsharma2939/" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
