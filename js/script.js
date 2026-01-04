document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
    initContactForm();
    setActiveNavLink();
});

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                alert('Thank you for your message! We will get back to you soon.');
                form.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize map
const map = L.map('map').setView([20, 0], 2); // world view

// Optional: base tiles for context
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// List of countries to color (ISO 3166-1 alpha-3 codes)
const selectedCountries = ['USA', 'FRA', 'BRA', 'IND']; // example

// Styling function
function style(feature) {
  const isSelected = selectedCountries.includes(feature.id); // 'id' in GeoJSON is ISO code
  return {
    fillColor: isSelected ? '#ab438f' : '#ffffff',
    weight: 1,
    color: '#000000',
    fillOpacity: 0.7
  };
}

// Load GeoJSON (world countries)
fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, { style: style }).addTo(map);
  });

