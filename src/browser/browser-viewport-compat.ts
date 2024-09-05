// https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser
export function browserViewportCompat() {
  // height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  // height: calc(var(--vh, 1vh) * 100);

  // UnoCSS: h-[calc(var(--vh,1vh)*100)]
  const update = () => {
    const vh = window.innerHeight * 0.01;
    const vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  };
  update();
  window.addEventListener('resize', update);
}
