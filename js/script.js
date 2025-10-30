const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");

// create a backdrop to dim content when menu is open (mobile)
let backdrop = document.querySelector('.nav-backdrop');
if (!backdrop) {
  backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  document.body.appendChild(backdrop);
}

function openMenu() {
  navLinks.classList.add('active');
  menuIcon.setAttribute('aria-expanded', 'true');
  backdrop.classList.add('active');
}

function closeMenu() {
  navLinks.classList.remove('active');
  menuIcon.setAttribute('aria-expanded', 'false');
  backdrop.classList.remove('active');
}

menuIcon.addEventListener('click', (e) => {
  const expanded = menuIcon.getAttribute('aria-expanded') === 'true';
  if (expanded) closeMenu();
  else openMenu();
});

// Close when clicking on a link
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') closeMenu();
});

// Close when clicking the backdrop
backdrop.addEventListener('click', closeMenu);

// Close or reset state on resize to avoid menu sticking when switching to desktop
let resizeTimeout = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // if desktop layout (over 600px), ensure menu is visible and aria reflects that
    if (window.innerWidth > 600) {
      navLinks.classList.remove('active');
      backdrop.classList.remove('active');
      menuIcon.setAttribute('aria-expanded', 'false');
    } else {
      // on small screens keep it closed by default
      navLinks.classList.remove('active');
      backdrop.classList.remove('active');
      menuIcon.setAttribute('aria-expanded', 'false');
    }
  }, 120);
});

// Populate footer year dynamically
const footerYearEl = document.getElementById('footer-year');
if (footerYearEl) {
  footerYearEl.textContent = new Date().getFullYear();
}
