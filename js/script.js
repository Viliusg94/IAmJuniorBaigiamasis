document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.sidebar a');

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

    // Form submission handling
    const catForm = document.getElementById('catForm');
    catForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addCat();
        catForm.reset(); // Reset form values
    });

    // Toggle sidebar for mobile
    const navbarToggler = document.querySelector('.navbar-toggler');
    navbarToggler.addEventListener('click', toggleSidebar);
});

let currentSlide = 0;

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

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Modal functionality
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

// Function to add a new cat
function addCat() {
    const catName = document.getElementById('catName').value;
    const catDescription = document.getElementById('catDescription').value;
    const catImage = document.getElementById('catImage').files[0];

    if (catImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newSection = document.createElement('section');
            newSection.innerHTML = `
                <h2>${catName}</h2>
                <p>${catDescription}</p>
                <img src="${e.target.result}" alt="${catName}" width="200" height="200">
            `;
            document.querySelector('main').insertBefore(newSection, document.getElementById('catForm'));
            console.log('New cat added:', catName, catDescription);
        };
        reader.readAsDataURL(catImage);
    } else {
        console.log('No image selected');
    }
}

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}