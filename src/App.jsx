import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [label, setLabel] = useState("");
  const [devHeader, setDevHeader] = useState("");
  const [designHeader, setDesignHeader] = useState("");
  const [description, setDescription] = useState("");
  const [isLoaded, setIsLoaded] = useState(false); 
  const [isTextLoaded, setIsTextLoaded] = useState(false);
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isClosing, setIsClosing] = useState(false); 
  const [activeSection, setActiveSection] = useState('home');
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0, opacity: 0 });
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filterPillStyle, setFilterPillStyle] = useState({ width: 0, left: 0, opacity: 0 });
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedGraphic, setSelectedGraphic] = useState(null);
  const [graphicIndex, setGraphicIndex] = useState(0);
  const [isGraphicFullscreen, setIsGraphicFullscreen] = useState(false);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [isLoaderExiting, setIsLoaderExiting] = useState(false);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
  
  const menuRef = useRef(null);
  const scrollRef = useRef(null);
  const navLinksRef = useRef(null);
  const filterLinksRef = useRef(null);
  const videoRef = useRef(null);
  const progressTrackRef = useRef(null);
  const graphicImageRef = useRef(null);
  const graphicTouchStartX = useRef(0);
  const hasTypedLabel = useRef(false);
  const hasTypedDesc = useRef(false);
  const hasTypedDev = useRef(false);
  const hasTypedDesign = useRef(false);

  const labelText = " UI/UX • FRONTEND • EDITING";
  const devHeaderText = " Web Development";
  const designHeaderText = " Designing and Editing";
  const descText = "I transform ideas into simple and beautiful digital products. Specializing in HTML, CSS, JS, React, Figma, Alight motion, Photoshop, Illustrator and After effects.";

  const skills = {
    development: [
      { name: "HTML", icon: "fa-brands fa-html5", percent: "80%" },
      { name: "CSS", icon: "fa-brands fa-css3-alt", percent: "70%" },
      { name: "JavaScript", icon: "fa-brands fa-js", percent: "65%" },
      { name: "ReactJS", icon: "fa-brands fa-react", percent: "51%" },
      { name: "Tailwind", isTailwindSvg: true, percent: "35%" }
    ],
    design: [
      { name: "Figma", icon: "fa-brands fa-figma", percent: "60%" },
      { name: "Photoshop", isPs: true, percent: "55%" }, 
      { 
        name: "Illustrator", 
        isAi: true, 
        percent: "52%" 
      },
      { name: "After Effects", isAe: true, percent: "40%" },
      { name: "Alight Motion", img: "/am.png", percent: "70%" }
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

  const graphicDesigns = [
    { id: 1, img: '/inflated.png', title: 'Inflated Life', desc: 'A 3D vector illustration featuring an inflated chrome aesthetic, fully crafted in Adobe Illustrator.', psd: 'https://drive.google.com/file/d/1kiVGP5MlRlmIeIcwO5i5m0lzE72uwd4w/view?usp=drive_link' },
    { id: 2, img: '/music.png', title: 'Art of Music', desc: ' Serif Brutalist music poster in Adobe Photoshop, combining inverse effects, noise textures, and sharp typography.', psd: 'https://drive.google.com/file/d/1FmVUpAiL42iPRjXwPqF0k8G4hHEoWj1g/view?usp=drive_link' },
    { id: 3, img: '/circle.png', title: 'Traces of Circles', desc: 'Graphic designing with circle, base designed in Figma, finished with high-quality textures and color grading in Adobe Photoshop.', psd: 'https://drive.google.com/file/d/1RJFMbiRjz0Fh8wvKYbSjzTcKh8rShhrp/view?usp=drive_link' },
    { id: 4, img: '/punk.png', title: 'Punk Era', desc: 'Punk-inspired digital poster, featuring high-grain textures and a clean design hierarchy, crafted in Adobe Photoshop.', psd: 'https://drive.google.com/file/d/19Q8eR9eiuFzcneMQ_RB-biLytsrcdCeP/view?usp=sharing' },
  ];

  const graphicHighlightWords = ['Adobe Illustrator', 'Figma', 'Adobe Photoshop'];
  const renderHighlightedDesc = (text) => {
    const pattern = new RegExp(`(${graphicHighlightWords.join('|')})`, 'g');
    return text.split(pattern).map((part, i) =>
      graphicHighlightWords.includes(part)
        ? <span key={i} className="graphic-highlight">{part}</span>
        : part
    );
  };

  const handleCloseModal = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    setIsClosing(true);
    setTimeout(() => {
      setSelectedCert(null);
      setSelectedVideo(null);
      setSelectedGraphic(null);
      setIsClosing(false);
      setIsVideoPlaying(false);
      setShowReplay(false);
      setVideoProgress(0);
      setIsVideoHovered(false);
      setIsVideoFullscreen(false);
    }, 300);
  };

  const toggleGraphicFullscreen = () => {
    const el = graphicImageRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleGraphicTouchStart = (e) => {
    graphicTouchStartX.current = e.touches[0].clientX;
  };

  const handleGraphicTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - graphicTouchStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        setGraphicIndex(i => (i + 1) % graphicDesigns.length);
      } else {
        setGraphicIndex(i => (i - 1 + graphicDesigns.length) % graphicDesigns.length);
      }
    }
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
        setShowReplay(false);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    setShowReplay(true);
    setVideoProgress(100);
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setVideoProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const replayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsVideoPlaying(true);
      setShowReplay(false);
      setVideoProgress(0);
    }
  };

  useEffect(() => {
    if (selectedVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    setVideoProgress(0);
  }, [selectedVideo]);

  const seekFromClientX = (clientX) => {
    const track = progressTrackRef.current;
    if (!track || !videoRef.current || !videoRef.current.duration) return;
    const rect = track.getBoundingClientRect();
    let ratio = (clientX - rect.left) / rect.width;
    ratio = Math.min(1, Math.max(0, ratio));
    videoRef.current.currentTime = ratio * videoRef.current.duration;
    setVideoProgress(ratio * 100);
  };

  const handleProgressPointerDown = (e) => {
    e.stopPropagation();
    setIsDraggingProgress(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    seekFromClientX(clientX);
  };

  useEffect(() => {
    if (!isDraggingProgress) return;
    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      seekFromClientX(clientX);
    };
    const handleUp = () => setIsDraggingProgress(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDraggingProgress]);

  const goToCert = (idx) => {
    const track = scrollRef.current;
    if (!track) return;
    const card = track.querySelector('.learning-card');
    if (!card) return;
    const cardWidth = card.offsetWidth + 20;
    track.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    setCurrentCertIndex(idx);
  };

  if (window.history.scrollRestoration) {
  window.history.scrollRestoration = 'manual';
}

useEffect(() => {
  const isLocked = isLoaderVisible || selectedCert || selectedVideo || selectedGraphic;

  if (isLocked) {
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${sw}px`);
    document.body.classList.add('lock-scroll');
  } else {
    document.body.classList.remove('lock-scroll');
  }

  return () => document.body.classList.remove('lock-scroll');
}, [isLoaderVisible, selectedCert, selectedVideo, selectedGraphic]);


  const scrollToSection = (e, id, blockPosition = 'start') => {
    if (e) e.preventDefault();
    setIsMenuOpen(false);
    
    if (id === 'top' || id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: blockPosition,
      });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 2; 
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setLoadingProgress(100);
        
        setTimeout(() => {
          setIsLoaderExiting(true);
          
          setTimeout(() => {
            setIsTextLoaded(true);
          }, 500);
          
          setTimeout(() => {
            setIsPhotoLoaded(true);
          }, 700);

          setTimeout(() => {
            setIsLoaded(true);
            setIsLoaderVisible(false);
          }, 2400); 
        }, 400); 
      } else {
        setLoadingProgress(progress);
      }
    }, 80);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isTextLoaded) return;

    let labelInterval, descInterval;

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

    if (!hasTypedLabel.current) {
      hasTypedLabel.current = true;
      labelInterval = typeString(labelText, setLabel);
    }
    if (!hasTypedDesc.current) {
      hasTypedDesc.current = true;
      descInterval = typeString(descText, setDescription, 25);
    }

    return () => {
      if (labelInterval) clearInterval(labelInterval);
      if (descInterval) clearInterval(descInterval);
    };
  }, [isTextLoaded]);

  useEffect(() => {
    graphicDesigns.forEach((design) => {
      const img = new Image();
      img.src = design.img;
    });

    const updatePill = () => {
        const activeLink = navLinksRef.current?.querySelector(`a[data-section="${activeSection}"]`);
        if (activeLink) {
          setPillStyle({
            width: activeLink.offsetWidth,
            left: activeLink.offsetLeft,
            opacity: 1
          });
        }
    };

    const timer = setTimeout(updatePill, 50);
    return () => clearTimeout(timer);
  }, [activeSection]);

  useEffect(() => {
    const updateFilterPill = () => {
      const activeLink = filterLinksRef.current?.querySelector(`button[data-filter="${activeFilter}"]`);
      if (activeLink) {
        setFilterPillStyle({
          width: activeLink.offsetWidth,
          left: activeLink.offsetLeft,
          opacity: 1
        });
      }
    };
    const timer = setTimeout(updateFilterPill, 50);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  useEffect(() => {
    const handleFsChange = () => setIsGraphicFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

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

    let devInterval, designInterval;

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
          revealObserver.unobserve(entry.target);
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

      if (window.innerWidth <= 768) {
        const triggerPoint = windowHeight / 2;
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section.element) {
            const rect = section.element.getBoundingClientRect();
            if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
              setActiveSection(section.id);
              break;
            }
          }
        }
      } 
      else {
        const scrollPosition = window.scrollY + 150;
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
      if (devInterval) clearInterval(devInterval);
      if (designInterval) clearInterval(designInterval);
      revealElements.forEach(el => revealObserver.unobserve(el));
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("scroll", handleBackToTop);
      document.removeEventListener("mousedown", handleClickOutside);
      if (track) track.removeEventListener('scroll', handleScrollTracking);
    };
  }, []);

  const projects = [
    {
      id: 'graphic',
      category: 'design',
      label: 'Graphic Designing',
      title: 'Poster Designs',
      desc: 'A collection of graphic design and illustration posters created using Figma, Photoshop, and Illustrator.',
      stack: ['PHOTOSHOP', 'ILLUSTRATOR', 'FIGMA'],
      btns: [
        { label: 'View Designs', isGraphic: true },
        { href: 'https://drive.google.com/file/d/1Nq-9nsgXUV0fuGxJGwbEd6OA9YtETuTi/view?usp=drive_link', label: 'View PSD/AI File', external: true }
      ],
      img: '/gra.png',
      imgAlt: 'Graphics'
    },
    {
      id: 'ulcmp4',
      category: 'webapp',
      label: 'Web Application',
      title: 'ULCMP4',
      desc: 'Universal Link Convertor , A clean, ad-free experience to convert social media links to high quality MP4/MP3.',
      stack: ['REACT', 'TAILWIND', 'FFMPEG'],
      btns: [
        { href: 'https://ulcmp4.onrender.com/', label: 'Launch ULCMP4', external: true },
        { href: 'https://github.com/dakshsharma99ds/ULCMP4', label: 'Source Code', external: true }
      ],
      img: '/ulc.png',
      imgAlt: 'ulc',
    },
    {
      id: 'wlinks',
      category: 'webapp',
      label: 'Web Application',
      title: 'WLinks',
      desc: 'A centralized link resource platform designed for ease of access, efficiency and speed.',
      stack: ['REACT', 'FIGMA', 'JS'],
      btns: [
        { href: 'https://wlinks.vercel.app/', label: 'Launch Wlinks', external: true },
        { href: 'https://github.com/dakshsharma99ds/WLinks', label: 'Source Code', external: true }
      ],
      img: '/wlink.png',
      imgAlt: 'Wlinks',
    },
    {
      id: 'brba',
      category: 'editing',
      label: 'Motion/Editing',
      title: 'Recreated Intro',
      desc: 'Recreation of iconic Breaking Bad intro with custom name from scratch using Alight Motion.',
      stack: ['ALIGHT MOTION', 'AFFINITY'],
      btns: [
        { label: 'View Intro', isVideo: true, videoUrl: '/brba.mp4' },
        { href: 'https://drive.google.com/file/d/1nv2oyJPQy3YWdTlABHCeDrdCcV4nTK0-/view?usp=drive_link', label: 'View Assets', external: true }
      ],
      img: '/brba.png',
      imgAlt: 'brba',
    },
    {
      id: 'daksh',
      category: 'editing',
      label: 'Motion/Editing',
      title: 'Recreated Intro',
      desc: 'Recreation of Michael movie title animation from scratch to demonstrate Path Trimming and Texture overlay in After Effects.',
      stack: ['AFTER EFFECTS'],
      btns: [
        { label: 'View Intro', isVideo: true, videoUrl: '/Daksh-intro.mp4' },
        { href: 'https://drive.google.com/file/d/1oDM7oegCmEvSjPpUJ74BaTHLbAz7HK5B/view?usp=sharing', label: 'View AEP File', external: true }
      ],
      img: '/Daksh.png',
      imgAlt: 'Daksh',
    },
    {
      id: 'outlast',
      category: 'editing',
      label: 'Motion/Editing',
      title: 'Recreated Game Menu',
      desc: 'Recreation of Outlast game menu animation using Alight Motion and Affinity to demonstrate Masking, Lighting and Object overlay.',
      stack: ['ALIGHT MOTION', 'AFFINITY'],
      btns: [
        { label: 'View Intro', isVideo: true, videoUrl: '/Outlast-intro.mp4' },
        { href: 'https://drive.google.com/file/d/1SmYHw8QYuaHHjBGSChldXmdIUe-2B9nc/view?usp=drive_link', label: 'View Assets', external: true }
      ],
      img: '/out.png',
      imgAlt: 'outlast',
    },
    {
      id: 'portfolio',
      category: 'webapp',
      label: 'Personal Building',
      title: 'Portfolio',
      desc: 'A high-performance personal portfolio featuring smooth animations, neon aesthetics, and a responsive design.',
      stack: ['REACT', 'CSS3', 'FIGMA'],
      btns: [
        { href: '#top', label: 'Launch Demo', isScrollTop: true },
        { href: 'https://github.com/dakshsharma99ds/Daksh-Sharma-Portfolio', label: 'Source Code', external: true }
      ],
      img: '/port.png',
      imgAlt: 'Portfolio',
    }
  ];

  const firstVisibleIndex = projects.findIndex(p => activeFilter === 'all' || p.category === activeFilter);

  return (
    <div className="portfolio-container" id="top">
      {isLoaderVisible && (
        <div className={`loader-overlay ${isLoaderExiting ? 'exiting' : ''}`}>
          <div className="loader-stripes">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className={`stripe ${isLoaderExiting ? 'animate-up' : ''}`} 
                style={{ transitionDelay: `${i * 0.05}s` }}
              ></div>
            ))}
          </div>
          
          <div 
            className={`loader-content ${isLoaderExiting ? 'fade-out' : ''}`}
            style={{ backgroundColor: `color-mix(in srgb, var(--bg) ${100 - (1 - Math.pow(1 - loadingProgress / 100, 3)) * 35}%, color-mix(in srgb, var(--accent) 55%, black 45%) ${(1 - Math.pow(1 - loadingProgress / 100, 3)) * 35}%)` }}
          >
            <div className="loader-logo-container">
              <img src="/logo.svg" alt="Logo" className="loader-logo-base" />
              <img 
                src="/logo.svg" 
                alt="Logo Fill" 
                className="loader-logo-fill" 
                style={{ clipPath: `inset(${100 - loadingProgress}% 0 0 0)` }} 
              />
            </div>
            <div className="loader-percentage">{loadingProgress}%</div>
          </div>
        </div>
      )}

      <div className="aurora-left"></div>
      <div className="aurora-right"></div>
      {selectedCert && (
        <div className={`modal-overlay ${isClosing ? 'modal-fade-out' : ''}`} onClick={handleCloseModal}>
          <div className={`modal-content ${isClosing ? 'modal-zoom-out' : ''}`} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>&times;</button>
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
      {selectedVideo && (
        <div className={`modal-overlay ${isClosing ? 'modal-fade-out' : ''}`} onClick={handleCloseModal}>
          <div className={`modal-content video-modal-content ${isClosing ? 'modal-zoom-out' : ''}`} onClick={e => e.stopPropagation()}>
            {!isVideoFullscreen && <button className="modal-close" onClick={handleCloseModal}>&times;</button>}
            <div
                className={`modal-video-container ${isVideoFullscreen ? 'mobile-fs-active' : ''}`}
                onClick={toggleVideo}
                onMouseEnter={() => setIsVideoHovered(true)}
                onMouseLeave={() => setIsVideoHovered(false)}
            >
                <video 
                    ref={videoRef}
                    src={selectedVideo.url} 
                    onEnded={handleVideoEnd}
                    onTimeUpdate={handleVideoTimeUpdate}
                    playsInline
                    preload="metadata"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                 />
                 
                {!isVideoFullscreen && (
                    <button className="video-fs-btn" onClick={(e) => { e.stopPropagation(); setIsVideoFullscreen(true); }}>
                        <i className="fa-solid fa-expand"></i>
                    </button>
                )}
                {isVideoFullscreen && (
                    <button className="video-fs-back-btn" onClick={(e) => { e.stopPropagation(); setIsVideoFullscreen(false); }}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                )}

                <div
                    className={`video-progress-bar ${(isVideoHovered || !isVideoPlaying || isDraggingProgress) ? 'visible' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className="video-progress-track"
                        ref={progressTrackRef}
                        onMouseDown={handleProgressPointerDown}
                        onTouchStart={handleProgressPointerDown}
                    >
                        <div className="video-progress-fill" style={{ width: `${videoProgress}%` }}></div>
                        <div
                            className="video-progress-dot"
                            style={{ left: `${videoProgress}%` }}
                            onMouseDown={handleProgressPointerDown}
                            onTouchStart={handleProgressPointerDown}
                        ></div>
                    </div>
                </div>
                <div className={`video-play-btn hoverable ${isVideoPlaying ? 'fade-out' : ''} ${showReplay ? 'hidden' : ''}`}>
                    <i className={isVideoPlaying ? "fa-solid fa-pause" : "fa-solid fa-play"}></i>
                </div>
                {showReplay && (
                    <div className="video-play-btn replay-btn" onClick={(e) => { e.stopPropagation(); replayVideo(); }}>
                        <i className="fa-solid fa-rotate-right"></i>
                    </div>
                )}
            </div>
          </div>
        </div>
      )}
      {selectedGraphic && (
        <div className={`modal-overlay ${isClosing ? 'modal-fade-out' : ''}`} onClick={handleCloseModal}>
          <div className={`modal-content graphic-modal-content ${isClosing ? 'modal-zoom-out' : ''}`} onClick={e => e.stopPropagation()}>
            <div className="graphic-toolbar">
              <button type="button" className="graphic-icon-btn graphic-close-btn hoverable" onClick={handleCloseModal}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div className="graphic-icon-btn hoverable">
                <i className="fa-solid fa-circle-info"></i>
                <span className="graphic-tooltip graphic-tooltip-info">
                  <strong>{graphicDesigns[graphicIndex].title}</strong>
                  <p>{renderHighlightedDesc(graphicDesigns[graphicIndex].desc)}</p>
                </span>
              </div>
              <a href={graphicDesigns[graphicIndex].psd} target="_blank" rel="noreferrer" className="graphic-icon-btn hoverable">
                <i className="fa-solid fa-download"></i>
                <span className="graphic-tooltip graphic-tooltip-label">Download PSD File</span>
              </a>
              <button type="button" className="graphic-icon-btn hoverable" onClick={toggleGraphicFullscreen}>
                <i className={`fa-solid ${isGraphicFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
                <span className="graphic-tooltip graphic-tooltip-label">{isGraphicFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
              </button>
            </div>
            <div className="graphic-stage" ref={graphicImageRef}>
              {isGraphicFullscreen && (
                <button
                  type="button"
                  className="graphic-icon-btn graphic-close-btn hoverable graphic-fs-close"
                  onClick={(e) => { e.stopPropagation(); toggleGraphicFullscreen(); }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
              <button
                type="button"
                className="graphic-icon-btn hoverable graphic-nav-btn graphic-nav-prev"
                onClick={(e) => { e.stopPropagation(); setGraphicIndex(i => (i - 1 + graphicDesigns.length) % graphicDesigns.length); }}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                type="button"
                className="graphic-icon-btn hoverable graphic-nav-btn graphic-nav-next"
                onClick={(e) => { e.stopPropagation(); setGraphicIndex(i => (i + 1) % graphicDesigns.length); }}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
              <div
                className="modal-image-container graphic-image-container"
                onTouchStart={handleGraphicTouchStart}
                onTouchEnd={handleGraphicTouchEnd}
              >
                <img src={graphicDesigns[graphicIndex].img} alt={graphicDesigns[graphicIndex].title} />
              </div>
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
        <div 
          className={`mobile-only mobile-nav-brand ${activeSection === 'home' ? 'active-brand' : ''}`}
          onClick={(e) => scrollToSection(e, 'home', 'start')}
          style={{cursor: 'pointer'}}
        >
            About me
        </div>

        <div className="nav-links desktop-only" ref={navLinksRef}>
          <div className="nav-active-pill" style={{
            width: `${pillStyle.width}px`,
            left: `${pillStyle.left}px`,
            opacity: pillStyle.opacity
          }}></div>
          <a href="#home" data-section="home" onClick={(e) => scrollToSection(e, 'home')} className={activeSection === 'home' ? 'active' : ''}>About Me</a>
          <a href="#skills" data-section="skills" onClick={(e) => scrollToSection(e, 'skills')} className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
          <a href="#work" data-section="work" onClick={(e) => scrollToSection(e, 'work')} className={activeSection === 'work' ? 'active' : ''}>Projects</a>
          <a href="#learning" data-section="learning" onClick={(e) => scrollToSection(e, 'learning')} className={activeSection === 'learning' ? 'active' : ''}>Certifications</a>
          <a href="#contact" data-section="contact" onClick={(e) => scrollToSection(e, 'contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
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
          <div className={`label-container ${isTextLoaded ? 'hero-reveal-up' : 'hero-hidden-state'}`} style={{ animationDelay: '0.1s' }}>{label}<span className="typing"></span></div>
          <h2 className={`name-gradient ${isTextLoaded ? 'hero-reveal-up' : 'hero-hidden-state'}`} style={{ animationDelay: '0.2s' }}>DAKSH SHARMA</h2>
          <h1 className={`${isTextLoaded ? 'hero-reveal-up' : 'hero-hidden-state'}`} style={{ animationDelay: '0.3s' }}>
            <span>Always <span style={{color: 'var(--accent)'}}>Learning</span></span>
            <span><span style={{color: 'var(--accent)'}}>and</span> <span style={{color: 'var(--accent)'}}>Developing.</span></span>
          </h1>
          <p className={`hero-desc ${isTextLoaded ? 'hero-reveal-up' : 'hero-hidden-state'}`} style={{ animationDelay: '0.4s' }}>{description}</p>
          <div className={`hero-btns ${isTextLoaded ? 'hero-reveal-up' : 'hero-hidden-state'}`} style={{ animationDelay: '0.5s' }}>
            <a href="#work" className="btn btn-primary" onClick={(e) => scrollToSection(e, 'work', 'start')}>View My Work</a>
            <a href="/resume.pdf" className="btn-resume" download>
                <span className="resume-icon"><i className="fa-solid fa-download"></i></span>
                <span className="resume-text">My Resume</span>
            </a>
          </div>
        </div>
        <div className="photo-container">
          <div className="floating-container">
            <div className={`profile-box ${isPhotoLoaded ? 'hero-reveal-up' : 'hero-hidden-state'}`} style={{ animationDelay: '0.3s' }}>
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
              <div className="skill-item" key={idx} style={{ '--delay': idx + 1 }}>
                <div className="skill-circle">
                  {skill.isTailwindSvg ? (
                    <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" style={{ color: 'var(--accent)', display: 'block', WebkitUserSelect: 'none', userSelect: 'none' }}>
                      <path d="M12 6.036c-2.4 0-4.38 1.284-5.4 3.852 1.2-1.284 2.58-1.716 4.14-1.284.888.246 1.523.894 2.224 1.61.115.116.23.235.348.35C14.46 11.855 15.86 13.5 19.2 13.5c2.4 0 4.38-1.284 5.4-3.852-1.2 1.284-2.58 1.716-4.14 1.284-.888-.246-1.523-.894-2.224-1.61-.115-.116-.23-.235-.348-.35C16.74 7.68 15.34 6.036 12 6.036zM6 13.5c-2.4 0-4.38 1.284-5.4 3.852 1.2-1.284 2.58-1.716 4.14-1.284.889.246 1.523.894 2.225 1.61.115.116.23.235.347.35 1.151 1.181 2.551 2.822 5.888 2.822 2.4 0 4.38-1.284 5.4-3.852-1.2 1.284-2.58 1.716-4.14 1.284-.889-.246-1.523-.894-2.225-1.61-.114-.116-.23-.235-.347-.35C10.74 15.144 9.34 13.5 6 13.5z"/>
                    </svg>
                  ) : skill.img ? (
                    <img src={skill.img} alt={skill.name} style={{ WebkitUserSelect: 'none', userSelect: 'none' }} />
                  ) : (
                    <i className={skill.icon}></i>
                  )}
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
              <div className="skill-item" key={idx} style={{ '--delay': idx + 1 }}>
                <div className="skill-circle">
                  {skill.isPs ? (
                    <span style={{ fontSize: '1.6rem', fontWeight: '800', fontFamily: 'sans-serif', lineHeight: '1', color: 'var(--accent)', WebkitUserSelect: 'none', userSelect: 'none' }}>
                      Ps
                    </span>
                  ) : skill.isAe ? (
                    <span style={{ fontSize: '1.6rem', fontWeight: '800', fontFamily: 'sans-serif', lineHeight: '1', color: 'var(--accent)', WebkitUserSelect: 'none', userSelect: 'none' }}>
                      Ae
                    </span>
                  ) : skill.isAi ? (
                    <span style={{ fontSize: '1.6rem', fontWeight: '800', fontFamily: 'sans-serif', lineHeight: '1', color: 'var(--accent)', WebkitUserSelect: 'none', userSelect: 'none' }}>
                      Ai
                    </span>
                  ) : skill.img ? (
                    <img src={skill.img} alt={skill.name} style={{ WebkitUserSelect: 'none', userSelect: 'none' }} />
                  ) : (
                    <i className={skill.icon}></i>
                  )}
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

        <div className="project-filter-nav" ref={filterLinksRef}>
          <div className="filter-active-pill" style={{
            width: `${filterPillStyle.width}px`,
            left: `${filterPillStyle.left}px`,
            opacity: filterPillStyle.opacity
          }}></div>
          {[
            { key: 'all', label: 'All' },
            { key: 'webapp', label: 'Web App' },
            { key: 'editing', label: 'Editing' },
            { key: 'design', label: 'Design' }
          ].map(f => (
            <button
              key={f.key}
              data-filter={f.key}
              className={activeFilter === f.key ? 'active' : ''}
              onClick={() => {
                setActiveFilter(f.key);
                setIsFiltering(true);
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {projects.map((p, i) => {
          const isVisible = activeFilter === 'all' || p.category === activeFilter;
          return (
            <div 
              className={`project-card ${isVisible ? 'reveal-visible' : ''} ${isFiltering && isVisible ? 'reload-swipe' : ''}`} 
              key={isFiltering ? `${p.id}-${activeFilter}` : p.id} 
              style={{ marginTop: i === firstVisibleIndex ? '0' : '40px', display: isVisible ? 'grid' : 'none' }}
            >
              <div className="project-content">
                <small style={{color: 'var(--accent)'}}>{p.label}</small>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="tech-stack">
                  {p.stack.map(s => <small key={s}>{s}</small>)}
                </div>
                <div className="project-btns">
                  {p.btns.map((btn, bi) =>
                    btn.isVideo ? (
                      <button key={bi} onClick={() => setSelectedVideo({ url: btn.videoUrl })} className="btn btn-outline">
                        {btn.label}
                      </button>
                    ) : btn.isGraphic ? (
                      <button key={bi} onClick={() => { setGraphicIndex(0); setSelectedGraphic(true); }} className="btn btn-outline">
                        {btn.label}
                      </button>
                    ) : btn.isScrollTop ? (
                      <a key={bi} href={btn.href} onClick={(e) => scrollToSection(e, 'top', 'start')} className="btn btn-outline">{btn.label}</a>
                    ) : (
                      <a key={bi} href={btn.href} target={btn.external ? '_blank' : undefined} rel={btn.external ? 'noreferrer' : undefined} className="btn btn-outline">{btn.label}</a>
                    )
                  )}
                </div>
              </div>
              <div className="project-image">
                <div className="wlinks-img-box"><img src={p.img} alt={p.imgAlt} /></div>
              </div>
            </div>
          );
        })}
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
                <div key={idx} className={`dot ${currentCertIndex === idx ? 'active' : ''}`} onClick={() => goToCert(idx)}></div>
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
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dakshsharma999ds@gmail.com" target="_blank" rel="noreferrer">dakshsharma999ds@gmail.com</a>
            </div>
            <div className="contact-item">
              <h4>WhatsApp / Call</h4>
              <a href="tel:8368919353">+91 8368919353</a>
            </div>
            <div className="contact-item">
              <h4>Digital Presence</h4>
              <div style={{marginTop: '10px', display: 'flex', gap: '25px'}}>
                <a href="https://github.com/dakshsharma99ds" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i> GitHub</a>
                <a href="https://www.linkedin.com/in/dakshsharma2939?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app/" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
                <a href="https://www.instagram.com/dakshsharma1249/?hl=en" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i> Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
