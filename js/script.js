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


const map = L.map('map').setView([54, 15], 4); 
setTimeout(() => map.invalidateSize(), 100);



L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const selectedCountries = ['ALB','MNE','BIH','MKD','DEU','CHE','FRA','TUR'];


function style(feature) {
  const isSelected = selectedCountries.includes(feature.id); 
  return {
    fillColor: isSelected ? '#ab438f' : '#ffffff',
    weight: 1,
    color: '#000000',
    fillOpacity: 0.7
  };
}


fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, { style: style }).addTo(map);
  });
