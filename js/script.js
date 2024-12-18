document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.top-nav a');

    // smooth slide paspaudus ant nuorodos
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('header').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    showSlide(currentSlide);

    // Formos pateikimas
    const catForm = document.getElementById('catForm');
    if (catForm) {
        catForm.addEventListener('submit', (event) => {
            event.preventDefault();
            addCat();
        });
    }

    // Failo įkelimas
    const catImageInput = document.getElementById('kaciukoNuotrauka');
    const fileNameDisplay = document.getElementById('fileName');
    if (catImageInput) {
        catImageInput.addEventListener('change', (event) => {
            const fileName = event.target.files[0] ? event.target.files[0].name : 'Nepasirinkta nuotrauka';
            fileNameDisplay.textContent = fileName;
        });
    }

    // Meniu perjungimas mobiliesiems įrenginiams
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            document.querySelector('.top-nav').classList.toggle('active');
        });
    }
});

let currentSlide = 0;

// Rodo skaidrę pagal indeksą
function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

// Rodo kitą skaidrę
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Rodo ankstesnę skaidrę
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Modal lango funkcionalumas
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');

document.querySelectorAll('.carousel-item img').forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
    });
});

function closeModal() {
    modal.style.display = 'none';
}

// Naujo kačiuko pridėjimas
function addCat() {
    const kaciukoVardas = document.getElementById('kaciukoVardas').value;
    const kaciukoAprasymas = document.getElementById('kaciukoAprasymas').value;
    const kontaktinisNumeris = document.getElementById('kontaktinisNumeris').value;
    const miestas = document.getElementById('miestas').value;
    const kaciukoNuotraukaInput = document.getElementById('kaciukoNuotrauka');
    const kaciukoNuotrauka = kaciukoNuotraukaInput.files[0];

    // Telefono numerio validacija
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!phoneRegex.test(kontaktinisNumeris)) {
        alert('Netinkamai įvestas telefono numeris.');
        return;
    }

    // Nuotraukos validacija
    if (!kaciukoNuotrauka) {
        alert('Nuotrauka nepridėta. Prašome pridėti nuotrauką');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const newSection = document.createElement('div'); // sukuriamas naujo kačiuko div'as
        newSection.innerHTML = `
            <h3>${kaciukoVardas}</h3>
            <p>${kaciukoAprasymas}</p>
            <p>Kontaktinis numeris: ${kontaktinisNumeris}</p>
            <p>Miestas: ${miestas}</p>
            <img src="${e.target.result}" alt="${kaciukoVardas}" width="200" height="200" class="clickable-image">
        `;
        const ieskoSection = document.getElementById('iesko');
        if (ieskoSection) {
            ieskoSection.appendChild(newSection);
        }
    };
    reader.readAsDataURL(kaciukoNuotrauka);

    // nuresetina formą
    const catForm = document.getElementById('catForm');
    if (catForm) {
        catForm.reset();
        document.getElementById('fileName').textContent = 'Nepasirinkta nuotrauka'; // Jei nėra įkelto failo, defaultinis rodymas
    }
}