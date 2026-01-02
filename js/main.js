// main.js
// Lenis Smooth Scroll Kurulumu
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2, // Scroll hızı (yüksek rakam daha yavaş/yumuşak)
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Yumuşama eğrisi
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
});

// Lenis ile GSAP ScrollTrigger'ı senkronize etme
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 500);
});

gsap.ticker.lagSmoothing(0);


window.addEventListener("load", () => {
  const letters = document.querySelectorAll(".word");
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".letter-animation",
      start: "top top", // Animasyon ne zaman başlasın
      end: "+=225%",    // Ne kadar scroll boyunca sürsün
      scrub: 1.5,         // Kaydırma hızına duyarlı olsun (0.5 - 1 idealdir)
      markers: true,
      pin: true
    }
  });

  // Her harf için başlangıç konumu belirle
  letters.forEach((char) => {
    const randomX = (Math.random() - 0.5) * window.innerWidth;
    const randomY = (Math.random() - 0.5) * window.innerHeight;

    tl.from(char, {
      x: randomX,
      y: randomY,
      opacity: 0,
      rotation: Math.random() * 100,
      scale: 2,
      ease: "none", // Scrub kullanırken 'power' yerine 'none' titremeyi azaltabilir
    }, 0);
  });

  // 2. AŞAMA: ÇIKIŞ ANIMASYONU
  tl.to(".collected-words", {
    yPercent: -230,
    opacity: 0,
    scale: 0.95,
    duration: 1.5,
    ease: "power4.inOut",
    force3D: true,
  }, "-=0.25");

  // Geçiş efekti ekleme
  const transition = document.createElement('div');
  transition.classList.add('transition');
  document.body.appendChild(transition);

  // ScrollTrigger'da yeni bir geçiş animasyonu ekleme
  // ScrollTrigger.create({
  //   trigger: ".scroll-space",
  //   start: "top top",
  //   end: "+=100%",
  //   onEnter: () => {
  //     gsap.to(transition, {
  //       duration: 0.5,
  //       opacity: 0,
  //       onComplete: () => {
  //         transition.remove();
  //       }
  //     });
  //   },
  //   onLeaveBack: () => {
  //     const newTransition = document.createElement('div');
  //     newTransition.classList.add('transition');
  //     document.body.appendChild(newTransition);
  //     gsap.to(newTransition, {
  //       duration: 0.5,
  //       opacity: 1,
  //     });
  //   },
  // });
});


const imagePieces = document.querySelectorAll(".image-piece");
const imageTl = gsap.timeline(
  {
    scrollTrigger:
    {
      trigger: ".scroll-space",
      start: "top bottom",
      end: "bottom top",
      scrub: 5.5,
      markers: true
    }
  });
imagePieces.forEach((piece, index) => {
  const randomX = (Math.random() - 0.5) * window.innerWidth * 0.8;
  const randomY = -3500 + (Math.random() - 0.5) * 500;
  const randomRotation = (Math.random() - 0.5) * 45; imageTl.from(piece, { x: randomX, y: randomY, opacity: 0, rotation: randomRotation, scale: 0.5 + Math.random() * 0.5, ease: "none" }, index * 0.05);
});
imageTl.to(".otel-image-wrapper", { opacity: 1, ease: "none" });


gsap.fromTo(".otel-image-wrapper", {
  opacity: 0,
  scale: 1.2
}, {
  scrollTrigger: {
    trigger: ".scroll-space",
    start: "top bottom",
    end: "bottom top",
    scrub: 4.5,
    markers: true
  },
  opacity: 1,
  scale: 1,
  y: -900
}
)