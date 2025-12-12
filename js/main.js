gsap.to(".intro-text", { text: "WES ANDERSON", ease: "power4.in", opacity: 1, duration: 4.5, repeat: 1, yoyo: true });
gsap.to(".intro-text", { text: "GRAND", ease: "power2.inOut", opacity: 1, duration: 1.5 }, "-=0.5");
gsap.to(".intro-text", { text: "BUDAPEST", ease: "power2.inOut", opacity: 1, duration: 1.5 }, "+=0.5");
gsap.to(".intro-text", { text: "HOTEL", ease: "power2.inOut", opacity: 1, duration: 1.5 }, "+=0.5");



gsap.set(".effect", { autoAlpha: 1 })
let tl = gsap.timeline()
  .from("h1", { scale: 0.2, duration: 4.5, ease: "power4.inOut" }, "+=3")
  .to(".blendImage, .bg", { scale: 1, duration: 5.5 }, "+=3")
  .to(".dark", { opacity: 0, duration: 2 }, "-=0.75")

