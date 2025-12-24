// main.js
// Lenis Smooth Scroll Kurulumu
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


gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const letters = document.querySelectorAll(".word");

  // Timeline oluşturuyoruz
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".letter-animation",
      start: "top top", // Animasyon ne zaman başlasın
      end: "+=250%",    // Ne kadar scroll boyunca sürsün
      scrub: 2.5,         // Kaydırma hızına duyarlı olsun (0.5 - 1 idealdir)
      pin: true,        // Ekranı sabitle
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
  // 2. AŞAMA: ÇIKIŞ ANIMASYONU (Güncellenmiş)
  tl.to(".collected-words", {
    yPercent: -30,      // Piksel yerine yüzde kullanımı titremeyi keser
    opacity: 0,
    scale: 0.95,        // Çok hafif küçülme pürüzsüzlüğü artırır
    duration: 1.5,      // Biraz daha uzun süre daha akışkan görünür
    ease: "power4.inOut",       // Scrub ile en iyi 'none' veya 'power1.in' çalışır
    force3D: true,      // GPU kullanımını kesinleştirir
  }, "-=0.25");
});