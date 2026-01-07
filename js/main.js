gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 500);
});

gsap.ticker.lagSmoothing(0);

// const getDynamicY = () => {
//   if (window.innerWidth < 768) {
//     return window.innerHeight * -0.4; // Mobilde %40
//   } else if (window.innerWidth < 1280) {
//     return window.innerHeight * -0.9; // Tablet/ küçük ekranlar %90
//   } else {
//     return window.innerHeight * -1.5; // Desktop'ta %150
//   }
// };

window.addEventListener("load", () => {
  const letters = document.querySelectorAll(".word");
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".letter-animation",
      start: "top top",
      end: "+=250%",
      scrub: 5,
      markers: true,
      pin: true,
      pinSpacing: true
    }
  });

  letters.forEach((char) => {
    const randomX = (Math.random() - 0.5) * window.innerWidth;
    const randomY = (Math.random() - 0.5) * window.innerHeight;

    tl.from(char, {
      x: randomX,
      y: randomY,
      opacity: 0,
      rotation: Math.random() * 100,
      scale: 2,
      ease: "none",
    }, 0);
  });

  tl.to(".collected-words", {
    yPercent: -230,
    opacity: 0,
    scale: 0.95,
    duration: 1.5,
    ease: "power4.inOut",
    force3D: true,
  }, "-=0.25");

  const transition = document.createElement('div');
  transition.classList.add('transition');
  document.body.appendChild(transition);
});

const imagePieces = document.querySelectorAll(".image-piece");
const imageTl = gsap.timeline(
  {
    scrollTrigger: {
      trigger: ".scroll-space",
      start: "top bottom",
      end: "bottom 40%",
      scrub: 10,
      markers: true
    }
  });

imagePieces.forEach((piece, index) => {
  const randomX = (Math.random() - 0.5) * window.innerWidth * 0.3;
  const randomY = -3500 + (Math.random() - 0.5) * 1000;
  const randomRotation = (Math.random() - 0.5) * 45;
  imageTl.from(piece,
    {
      x: randomX,
      y: randomY,
      opacity: 0,
      rotation: randomRotation,
      scale: 0.5 + Math.random() * 0.5, ease: "none"
    }, index * 0.05);
});


gsap.fromTo(".otel-image-wrapper", {
  opacity: 0,
  scale: 1.2
}, {
  scrollTrigger: {
    trigger: ".scroll-space",
    start: "top bottom",
    end: "bottom bottom",
    scrub: 3,
    markers: true
  },
  opacity: 1,
  scale: 1,
  y: -950
});
