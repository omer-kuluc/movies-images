
const tl = gsap.timeline();

tl.from(".orange", { xPercent: -100 })
  .from(".purple", { xPercent: 100 })
  .from(".blue", { yPercent: -100 })
  .from(".image", { yPercent: 300 });

ScrollTrigger.create({
  animation: tl,
  trigger: "#panel-container",
  start: "top top",
  end: "+=3000",
  scrub: true,
  pin: true,
  anticipatePin: 1
});

