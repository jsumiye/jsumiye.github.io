// Nebula Noir Portfolio JavaScript
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavigation();
  initScrollSpy();
  initSmoothScrolling();
  initIntersectionObserver();
  initStarfield();

  // Navigation functionality
  function initNavigation() {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navbar = document.getElementById("navbar");

    // Mobile menu toggle
    if (navToggle) {
      navToggle.addEventListener("click", function () {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
      });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Navbar elevation on scroll
    const onScroll = function () {
      navbar.classList.toggle("scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Highlight the nav link for the section currently in view
  function initScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link[data-section]");
    if (!sections.length || !navLinks.length) return;

    const setActive = function (id) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("data-section") === id
        );
      });
    };

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Smooth scrolling functionality
  function initSmoothScrolling() {
    const navLinks = document.querySelectorAll(".nav-link[data-section]");

    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetSection = this.getAttribute("data-section");
        const targetElement = document.getElementById(targetSection);

        if (targetElement) {
          const navbarHeight = document.getElementById("navbar").offsetHeight;
          const targetPosition = targetElement.offsetTop - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Intersection Observer for fade-in animations
  function initIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe elements for fade-in
    const fadeElements = document.querySelectorAll(
      ".about-content, .skills-category, .card"
    );
    fadeElements.forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });
  }

  // Enhanced starfield animation
  function initStarfield() {
    const starfield = document.getElementById("starfield");
    if (!starfield) return;

    // Create additional stars dynamically
    for (let i = 0; i < 50; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3}px;
                height: ${Math.random() * 3}px;
                background: ${
                  Math.random() > 0.5
                    ? "var(--light-sky-blue)"
                    : "var(--stellar-indigo)"
                };
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                border-radius: 50%;
                animation: twinkle ${
                  2 + Math.random() * 3
                }s ease-in-out infinite;
                opacity: ${0.3 + Math.random() * 0.7};
            `;
      starfield.appendChild(star);
    }

    // Add twinkle animation
    const style = document.createElement("style");
    style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
            }
        `;
    document.head.appendChild(style);
  }

  // Hover states for cards and interest items are handled entirely in CSS.

  initImageCarousels();
  initAccordions();

  // Image carousel functionality
  function initImageCarousels() {
    const carousels = document.querySelectorAll(".image-carousel");

    carousels.forEach((carousel) => {
      const images = carousel.querySelectorAll(".carousel-image");
      const prevBtn = carousel.querySelector(".carousel-btn.prev");
      const nextBtn = carousel.querySelector(".carousel-btn.next");
      let currentIndex = 0;

      function showImage(index) {
        images.forEach((img, i) => {
          img.classList.toggle("active", i === index);
        });
      }

      function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      }

      function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", prevImage);
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", nextImage);
      }

      // Auto-advance carousel (respects reduced-motion; pauses on hover)
      if (images.length > 1 && !prefersReducedMotion) {
        let timer = setInterval(nextImage, 5000);
        carousel.addEventListener("mouseenter", () => clearInterval(timer));
        carousel.addEventListener("mouseleave", () => {
          timer = setInterval(nextImage, 5000);
        });
      }
    });
  }

  // Accordion functionality for project details
  function initAccordions() {
    const toggles = document.querySelectorAll(".accordion-toggle");

    toggles.forEach((toggle) => {
      toggle.setAttribute("aria-expanded", "false");

      // Initialize accordion icon rotation
      const icon = toggle.querySelector(".accordion-icon");
      if (icon) {
        icon.style.transform = "rotate(0deg)";
      }

      toggle.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target");
        if (!targetId) return;

        const accordion = document.querySelector(targetId);
        if (!accordion) return;

        const willOpen = !accordion.classList.contains("open");
        accordion.classList.toggle("open", willOpen);
        this.setAttribute("aria-expanded", String(willOpen));

        // Rotate the accordion icon
        const icon = this.querySelector(".accordion-icon");
        if (icon) {
          icon.style.transform = willOpen ? "rotate(180deg)" : "rotate(0deg)";
        }
      });
    });
  }

  // Global scroll to section function
  window.scrollToSection = function (sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const navbarHeight = document.getElementById("navbar").offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  // Add loading animation
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");
  });

  // Add scroll progress indicator
  function initScrollProgress() {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--light-sky-blue), var(--stellar-indigo));
            z-index: 1001;
            transition: width 0.1s ease;
        `;
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", function () {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + "%";
    });
  }

  initScrollProgress();

  // Add cursor trail effect
  function initCursorTrail() {
    const cursor = document.createElement("div");
    cursor.className = "cursor-trail";
    cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--light-sky-blue), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.6;
            transition: all 0.1s ease;
        `;
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      cursor.style.left = cursorX - 10 + "px";
      cursor.style.top = cursorY - 10 + "px";

      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }

  // Uncomment to enable cursor trail (can be performance intensive)
  // initCursorTrail();

  // Add keyboard navigation
  function initKeyboardNavigation() {
    document.addEventListener("keydown", function (e) {
      // Don't hijack keys while typing or when modifier keys are held
      const tag = (e.target.tagName || "").toLowerCase();
      if (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        e.target.isContentEditable ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      ) {
        return;
      }

      const sections = ["hero", "about", "skills", "work", "projects"];
      const currentIndex = sections.indexOf(getCurrentSection());

      if (e.key === "ArrowDown" && currentIndex < sections.length - 1) {
        e.preventDefault();
        scrollToSection(sections[currentIndex + 1]);
      } else if (e.key === "ArrowUp" && currentIndex > 0) {
        e.preventDefault();
        scrollToSection(sections[currentIndex - 1]);
      }
    });
  }

  function getCurrentSection() {
    const sections = ["hero", "about", "skills", "work", "projects"];
    const scrollPosition = window.pageYOffset + 100;

    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i]);
      if (element && element.offsetTop <= scrollPosition) {
        return sections[i];
      }
    }
    return "hero";
  }

  initKeyboardNavigation();

  // Add performance optimizations
  function initPerformanceOptimizations() {
    // Throttle scroll events
    let ticking = false;

    function updateOnScroll() {
      // Update scroll-based animations here
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    }

    window.addEventListener("scroll", requestTick);

    // Debounce resize events
    let resizeTimeout;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        // Handle resize events here
      }, 250);
    });
  }

  initPerformanceOptimizations();

  // Add accessibility improvements
  function initAccessibility() {
    // Focus indicators are handled via CSS :focus-visible for cleaner UX.

    // Add skip to content link
    const skipLink = document.createElement("a");
    skipLink.href = "#hero";
    skipLink.textContent = "Skip to content";
    skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--deep-space-blue);
            color: var(--off-white);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
        `;
    skipLink.addEventListener("focus", function () {
      this.style.top = "6px";
    });
    skipLink.addEventListener("blur", function () {
      this.style.top = "-40px";
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  initAccessibility();

  if (!prefersReducedMotion) {
    initBowlingAnimation();
  }
});

// Bowling animation with physics (background easter egg)
function initBowlingAnimation() {
  const balls = document.querySelectorAll(".bowling-ball");
  const pins = document.querySelectorAll(".bowling-pin");

  const elements = {
    balls: [],
    pins: [],
  };

  balls.forEach((ball) => {
    elements.balls.push({
      element: ball,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: 12,
      spinning: 0,
      spinningSpeed: 1.2 + Math.random() * 0.8,
      targetPin: null,
      chasing: false,
      recentlyHitPins: [],
    });
  });

  pins.forEach((pin) => {
    elements.pins.push({
      element: pin,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: 8,
      spinning: Math.random() * 360,
      spinningSpeed: 0.1 + Math.random() * 0.2,
      fastSpinningSpeed: 2 + Math.random() * 3,
      knocked: false,
      knockTime: 0,
      escapeMode: false,
      escapeTime: 0,
      lastChasedBy: null,
      hitEdge: false,
      edgeHitTime: 0,
      collisionDirection: 0,
      rotationDirection: 1,
      spinStartTime: 0,
      isFastSpinning: false,
    });
  });

  function findClosestPin(ball) {
    let closestPin = null;
    let closestDistance = Infinity;

    elements.pins.forEach((pin) => {
      if (pin.escapeMode) return;
      if (ball.recentlyHitPins.includes(pin)) return;

      const dx = pin.x - ball.x;
      const dy = pin.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestPin = pin;
      }
    });

    return closestPin;
  }

  function isPinFarEnough(pin) {
    let minDistance = Infinity;

    elements.balls.forEach((ball) => {
      const dx = pin.x - ball.x;
      const dy = pin.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      minDistance = Math.min(minDistance, distance);
    });

    return minDistance > 200;
  }

  function animate() {
    updatePositions();
    checkCollisions();
    updateElements();
    requestAnimationFrame(animate);
  }

  function updatePositions() {
    elements.balls.forEach((ball) => {
      if (!ball.targetPin || ball.targetPin.escapeMode) {
        ball.targetPin = findClosestPin(ball);
        ball.chasing = ball.targetPin !== null;
      }

      if (ball.chasing && ball.targetPin && !ball.targetPin.escapeMode) {
        const dx = ball.targetPin.x - ball.x;
        const dy = ball.targetPin.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 15) {
          ball.vx = (dx / distance) * 0.4;
          ball.vy = (dy / distance) * 0.4;
        } else {
          ball.vx = 0;
          ball.vy = 0;
        }
      } else {
        ball.vx *= 0.95;
        ball.vy *= 0.95;
      }

      ball.x += ball.vx;
      ball.y += ball.vy;
      ball.spinning += ball.spinningSpeed;

      if (ball.x < -50) ball.x = window.innerWidth + 50;
      if (ball.x > window.innerWidth + 50) ball.x = -50;
      if (ball.y < -50) ball.y = window.innerHeight + 50;
      if (ball.y > window.innerHeight + 50) ball.y = -50;
    });

    elements.pins.forEach((pin, index) => {
      if (pin.knocked && !pin.hitEdge) {
        if (!pin.isFastSpinning) {
          pin.isFastSpinning = true;
          pin.spinStartTime = Date.now();
        }

        const timeSinceSpinStart = Date.now() - pin.spinStartTime;
        const spinDuration = 3000;

        if (timeSinceSpinStart < spinDuration) {
          pin.spinning += pin.fastSpinningSpeed * pin.rotationDirection;
        } else {
          pin.isFastSpinning = false;
          pin.spinning += pin.spinningSpeed;
        }
      } else {
        pin.spinning += pin.spinningSpeed;
        pin.isFastSpinning = false;
      }

      if (pin.escapeMode) {
        if (Math.random() < 0.02) {
          pin.vx += (Math.random() - 0.5) * 0.5;
          pin.vy += (Math.random() - 0.5) * 0.5;
        }

        pin.vx *= 0.995;
        pin.vy *= 0.995;

        if (isPinFarEnough(pin)) {
          pin.escapeMode = false;
          pin.knocked = false;
          pin.lastChasedBy = null;
          pin.hitEdge = false;
        }
      } else if (pin.knocked) {
        pin.escapeMode = true;
        pin.escapeTime = Date.now();

        const escapeSpeed = 1.2 + Math.random() * 0.8;
        pin.vx = Math.cos(pin.collisionDirection) * escapeSpeed;
        pin.vy = Math.sin(pin.collisionDirection) * escapeSpeed;
      } else {
        const time = Date.now() * 0.001;
        const noiseX = Math.sin(time * 0.5 + index * 0.7) * 0.1;
        const noiseY = Math.cos(time * 0.3 + index * 0.9) * 0.1;

        pin.vx += noiseX * 0.01;
        pin.vy += noiseY * 0.01;
        pin.vx *= 0.99;
        pin.vy *= 0.99;
      }

      pin.x += pin.vx;
      pin.y += pin.vy;

      const margin = 50;
      const maxX = window.innerWidth - margin;
      const maxY = window.innerHeight - margin;

      if (pin.x <= margin || pin.x >= maxX) {
        pin.vx = -pin.vx * 0.8;
        pin.x = Math.max(margin, Math.min(maxX, pin.x));
        pin.hitEdge = true;
        pin.edgeHitTime = Date.now();
      }

      if (pin.y <= margin || pin.y >= maxY) {
        pin.vy = -pin.vy * 0.8;
        pin.y = Math.max(margin, Math.min(maxY, pin.y));
        pin.hitEdge = true;
        pin.edgeHitTime = Date.now();
      }

      if (pin.hitEdge && Date.now() - pin.edgeHitTime > 1000) {
        pin.hitEdge = false;
      }
    });
  }

  function checkCollisions() {
    elements.balls.forEach((ball) => {
      elements.pins.forEach((pin) => {
        if (pin.escapeMode) return;

        const dx = ball.x - pin.x;
        const dy = ball.y - pin.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ball.radius + pin.radius) {
          pin.knocked = true;
          pin.knockTime = Date.now();
          pin.lastChasedBy = ball;
          pin.hitEdge = false;

          const ballDirection = Math.atan2(ball.vy, ball.vx);
          const randomVariation =
            (Math.random() - 0.5) * ((10 * Math.PI) / 180);
          pin.collisionDirection = ballDirection + randomVariation;
          pin.rotationDirection = Math.random() < 0.5 ? 1 : -1;

          ball.recentlyHitPins.push(pin);
          if (ball.recentlyHitPins.length > 3) {
            ball.recentlyHitPins.shift();
          }

          createCollisionEffect(pin.x, pin.y);

          ball.vx = (-dx / distance) * 1.5;
          ball.vy = (-dy / distance) * 1.5;
          ball.targetPin = null;
          ball.chasing = false;
        }
      });
    });
  }

  function createCollisionEffect(x, y) {
    const effect = document.createElement("div");
    effect.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 12px;
      height: 12px;
      background: radial-gradient(circle, #e53935, transparent);
      border-radius: 50%;
      pointer-events: none;
      z-index: -2;
      animation: collisionEffect 0.5s ease-out forwards;
    `;

    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 500);
  }

  function updateElements() {
    elements.balls.forEach((ball) => {
      ball.element.style.transform = `translate(${ball.x}px, ${ball.y}px) rotate(${ball.spinning}deg)`;
    });

    elements.pins.forEach((pin) => {
      if (pin.escapeMode) {
        const timeSinceEscape = Date.now() - pin.escapeTime;
        const wobble = Math.sin(timeSinceEscape * 0.005) * 3;
        pin.element.style.transform = `translate(${pin.x}px, ${pin.y}px) rotate(${
          pin.spinning + wobble
        }deg)`;
      } else {
        pin.element.style.transform = `translate(${pin.x}px, ${pin.y}px) rotate(${pin.spinning}deg)`;
      }
    });
  }

  function initializePositions() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    elements.balls.forEach((ball) => {
      ball.x = Math.random() * (screenWidth * 0.3) + screenWidth * 0.1;
      ball.y = Math.random() * (screenHeight * 0.3) + screenHeight * 0.1;
    });

    elements.pins.forEach((pin) => {
      let attempts = 0;
      do {
        pin.x = Math.random() * (screenWidth * 0.8) + screenWidth * 0.1;
        pin.y = Math.random() * (screenHeight * 0.8) + screenHeight * 0.1;
        attempts++;
      } while (
        attempts < 50 &&
        elements.balls.some((ball) => {
          const dx = pin.x - ball.x;
          const dy = pin.y - ball.y;
          return Math.sqrt(dx * dx + dy * dy) < 200;
        })
      );
    });
  }

  if (!document.getElementById("bowling-collision-style")) {
    const collisionStyle = document.createElement("style");
    collisionStyle.id = "bowling-collision-style";
    collisionStyle.textContent = `
      @keyframes collisionEffect {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
      }
    `;
    document.head.appendChild(collisionStyle);
  }

  initializePositions();
  animate();
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
