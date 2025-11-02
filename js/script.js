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

// Skills accordion functionality
document.addEventListener('DOMContentLoaded', () => {
  const skillToggles = document.querySelectorAll('.skill-toggle');
  const skillsList = document.querySelector('.skills-list');
  
  skillToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const skillItem = toggle.closest('.skill-item');
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      // Close all other skill items
      document.querySelectorAll('.skill-item').forEach(item => {
        if (item !== skillItem) {
          item.classList.remove('expanded');
          const otherToggle = item.querySelector('.skill-toggle');
          otherToggle.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current item
      if (isExpanded) {
        skillItem.classList.remove('expanded');
        toggle.setAttribute('aria-expanded', 'false');
        skillsList.classList.remove('has-expanded');
      } else {
        skillItem.classList.add('expanded');
        toggle.setAttribute('aria-expanded', 'true');
        skillsList.classList.add('has-expanded');
      }
    });
  });
});

// Handle skills section repositioning for mobile
function handleSkillsPosition() {
  const skillsSection = document.querySelector('.skills-section');
  const photoSlot = document.querySelector('.photo-slot');
  const bioSlot = document.querySelector('.bio-slot');
  const isMobile = window.innerWidth <= 1042;
  
  if (!skillsSection || !photoSlot || !bioSlot) return;
  
  if (isMobile) {
    // Move skills to bio-slot and add separator
    if (!bioSlot.contains(skillsSection)) {
      bioSlot.appendChild(skillsSection);
      skillsSection.classList.add('mobile-skills');
    }
  } else {
    // Move skills back to photo-slot and remove separator
    if (!photoSlot.contains(skillsSection)) {
      photoSlot.appendChild(skillsSection);
      skillsSection.classList.remove('mobile-skills');
    }
  }
}

// Run on load and resize
window.addEventListener('DOMContentLoaded', handleSkillsPosition);
window.addEventListener('resize', handleSkillsPosition);

