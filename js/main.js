
gsap.to(".intro-text", { text: "GRAND BUDAPEST HOTEL", ease: "power2.inOut", opacity: 1, duration: 4, repeat: 2, yoyo: true });


gsap.set(".effect", { autoAlpha: 1 })
let tl = gsap.timeline()
  .from("h1", { scale: 0.01, duration: 4.5, ease: "power4.inOut" }, "+=3")
  .to(".blendImage, .bg", { scale: 1, duration: 5.5 }, "+=3.5")
  .to(".dark", { opacity: 0, duration: 2 }, "-=0.75")

