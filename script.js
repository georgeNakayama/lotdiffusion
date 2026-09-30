const button = document.querySelector('.copy-button');
const status = document.querySelector('.copy-status');
if (button && navigator.clipboard && window.isSecureContext) {
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(document.querySelector('#bibtex').textContent);
      button.textContent = 'Copied!';
      status.textContent = 'BibTeX copied to clipboard.';
      setTimeout(() => { button.textContent = 'Copy'; }, 2000);
    } catch {
      status.textContent = 'Copy unavailable. Select the citation text to copy it manually.';
    }
  });
}

const methodAnimation = document.querySelector('#method-animation');
if (methodAnimation) {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const staticSource = methodAnimation.getAttribute('src');
  const updateAnimation = () => {
    methodAnimation.src = motionPreference.matches ? staticSource : methodAnimation.dataset.animatedSrc;
  };
  updateAnimation();
  motionPreference.addEventListener('change', updateAnimation);
}
