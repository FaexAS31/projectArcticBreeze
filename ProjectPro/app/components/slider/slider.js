import { loadComponent } from '../../js/providers/components.js';

export function init() {
    
    loadComponent({parent:'slider', url:'components/slider'});
    
    console.log('Slider component loaded');

    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    document.querySelector('.next').addEventListener('click', () => {
        changeSlide(1);
    });

    document.querySelector('.prev').addEventListener('click', () => {
        changeSlide(-1);
    });

    function changeSlide(direction) {
        currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
        updateSlidePosition();
    }

    function updateSlidePosition() {
        const slidesContainer = document.querySelector('.slides');
        const offset = -currentIndex * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
    }

    // Initialize the first slide position
    updateSlidePosition();
}
