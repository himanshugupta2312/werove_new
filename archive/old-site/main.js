// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

const termsLink = document.getElementById('termsLink');
const termsModal = document.getElementById('termsModal');
const modalClose = document.getElementById('modalClose');
const toggleModal = (open) => {
  termsModal.classList.toggle('active', open);
  document.body.classList.toggle('modal-open', open);
  termsModal.setAttribute('aria-hidden', String(!open));
};
termsLink?.addEventListener('click', (e) => {
  e.preventDefault();
  toggleModal(true);
});
modalClose?.addEventListener('click', () => toggleModal(false));
termsModal?.addEventListener('click', (e) => {
  if (e.target === termsModal) toggleModal(false);
});

const successModal = document.getElementById('successModal');
const successModalClose = document.getElementById('successModalClose');
const toggleSuccessModal = (open) => {
  successModal.classList.toggle('active', open);
  document.body.classList.toggle('modal-open', open);
  successModal.setAttribute('aria-hidden', String(!open));
};
successModalClose?.addEventListener('click', () => toggleSuccessModal(false));
successModal?.addEventListener('click', (e) => {
  if (e.target === successModal) toggleSuccessModal(false);
});

const destInfoModal = document.getElementById('destInfoModal');
const destInfoModalClose = document.getElementById('destInfoModalClose');
const destInfoModalTitle = document.getElementById('destInfoModalTitle');
const destInfoModalText = document.getElementById('destInfoModalText');
const destInfoList = document.getElementById('destInfoList');

const destinationDetails = {
  ranthambore: {
    title: 'Ranthambore National Park',
    description: 'Ranthambore is one of India’s premier tiger reserves, located in the Vindhya Hills of Rajasthan. The park is famous for its strong tiger population, historic fort ruins, and dry deciduous forest.',
    highlights: [
      'Best visited from October to June.',
      'Renowned for tiger sightings and the ruins of Ranthambore Fort.',
      'Also home to leopards, sloth bears, hyenas, and over 300 bird species.'
    ]
  },
  corbett: {
    title: 'Jim Corbett National Park',
    description: 'Established in 1936, Jim Corbett is India’s oldest national park, set in the foothills of the Himalayas. It is famed for its riverine forests, tall sal trees, and elephant corridors.',
    highlights: [
      'Best visited from November to June.',
      'Excellent for tiger, elephant, and birdwatching safaris.',
      'Home to iconic species such as Bengal tiger, Asian elephant, and swamp deer.'
    ]
  },
  kaziranga: {
    title: 'Kaziranga National Park',
    description: 'A UNESCO World Heritage site, Kaziranga protects the world’s largest population of the Indian one-horned rhinoceros. It features floodplain grasslands, wetlands, and dense riverine forests.',
    highlights: [
      'Best visited from November to April.',
      'Highest density of one-horned rhinos on earth.',
      'Also home to elephants, wild water buffalo, and over 430 bird species.'
    ]
  },
  pench: {
    title: 'Pench National Park',
    description: 'Pench lies along the Pench River in Maharashtra and Madhya Pradesh, and its forests inspired Rudyard Kipling’s Jungle Book. The park is prized for its open meadows and rich tiger population.',
    highlights: [
      'Best visited from October to June.',
      'Favoured for tiger safaris and the chance to spot wild dog and leopard.',
      'Known for mixed forest, grassland, and seasonal waterholes.'
    ]
  },
  sundarbans: {
    title: 'Sundarbans National Park',
    description: 'The Sundarbans is the world’s largest mangrove forest and a unique tidal delta on the Bay of Bengal. It is famous for the elusive Royal Bengal tiger and its network of waterways.',
    highlights: [
      'Best visited from November to March.',
      'Boat safaris explore creeks, mudflats, and mangrove islands.',
      'Also home to salt-water crocodiles, spotted deer, and rare birds.'
    ]
  }
};

const toggleDestInfo = (open) => {
  destInfoModal.classList.toggle('active', open);
  document.body.classList.toggle('modal-open', open);
  destInfoModal.setAttribute('aria-hidden', String(!open));
};

const openDestinationInfo = (key) => {
  const details = destinationDetails[key];
  if (!details) return;
  destInfoModalTitle.textContent = details.title;
  destInfoModalText.textContent = details.description;
  destInfoList.innerHTML = details.highlights.map(item => `<li>${item}</li>`).join('');
  toggleDestInfo(true);
};

destInfoModalClose?.addEventListener('click', () => toggleDestInfo(false));
destInfoModal?.querySelector('a[href="#contact"]')?.addEventListener('click', () => toggleDestInfo(false));
destInfoModal?.addEventListener('click', (e) => {
  if (e.target === destInfoModal) toggleDestInfo(false);
});

document.querySelectorAll('.dest-card').forEach(card => {
  card.addEventListener('click', () => {
    openDestinationInfo(card.dataset.destination);
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDestinationInfo(card.dataset.destination);
    }
  });
});

const tripInfoModal = document.getElementById('tripInfoModal');
const tripInfoModalClose = document.getElementById('tripInfoModalClose');
const tripInfoModalTitle = document.getElementById('tripInfoModalTitle');
const tripInfoModalNote = document.getElementById('tripInfoModalNote');
const tripInfoModalContent = document.getElementById('tripInfoModalContent');
const tripInquireBtn = document.getElementById('tripInquireBtn');

const toggleTripInfo = (open) => {
  tripInfoModal.classList.toggle('active', open);
  document.body.classList.toggle('modal-open', open);
  tripInfoModal.setAttribute('aria-hidden', String(!open));
};

const openTripInfo = (key) => {
  const details = tripDetails[key];
  if (!details) return;
  tripInfoModalTitle.textContent = details.title;
  tripInfoModalNote.textContent = details.note;
  tripInfoModalContent.innerHTML = details.itinerary.map(day => `<p>${day}</p>`).join('');
  toggleTripInfo(true);
};

tripInfoModalClose?.addEventListener('click', () => toggleTripInfo(false));
tripInquireBtn?.addEventListener('click', () => toggleTripInfo(false));
tripInfoModal?.addEventListener('click', (e) => {
  if (e.target === tripInfoModal) toggleTripInfo(false);
});

document.querySelectorAll('.trip-item').forEach(item => {
  item.addEventListener('click', () => {
    openTripInfo(item.dataset.trip);
  });
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openTripInfo(item.dataset.trip);
    }
  });
});

// EmailJS Configuration
emailjs.init('RPzf5IwdbqJqernDJ'); // Replace with your EmailJS public key

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const timeString = new Date().toLocaleString();
  const messageBody = `Email: ${this.email.value}\nTrips interested in: ${this.trips.value}\nPreferred dates: ${this.preferred_dates.value}\nGroup size: ${this.group_size.value}`;

  // Send email using EmailJS
  emailjs.send('service_52wldrq', 'template_iwuk3pp', {
    name: this.name.value,
    time: timeString,
    message: messageBody
  })
  .then(function(response) {
    toggleSuccessModal(true);
    contactForm.reset();
  }, function(error) {
    alert('Failed to send message. Please try again.');
    console.error('EmailJS error:', error);
  });
});
