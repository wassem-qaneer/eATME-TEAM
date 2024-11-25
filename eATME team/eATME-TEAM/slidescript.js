const slider = document.querySelector('.slider');

// Prevent images from being dragged
slider.querySelectorAll('img').forEach((img) => {
  img.addEventListener('dragstart', (e) => e.preventDefault());
});

// Timer to automatically move to the next slide every 4 seconds
let autoSlideTimer = setInterval(() => moveToNextSlide(), 4000);

// Function to move to the next slide
function moveToNextSlide() {
  const slideWidth = slider.offsetWidth;
  const nextSlide = Math.round(slider.scrollLeft / slideWidth) + 1;

  // If we're at the last slide, go back to the first slide
  const totalSlides = slider.children.length;
  if (nextSlide >= totalSlides) {
    slider.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    slider.scrollTo({ left: nextSlide * slideWidth, behavior: 'smooth' });
  }
}

// Reset the timer when I click on <a> and prevent default anchor behavior(when it scrolls down)
const sliderNavLinks = document.querySelectorAll('.slider-nav a');
sliderNavLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default anchor link scrolling behavior

    clearInterval(autoSlideTimer); // Stop the timer
    autoSlideTimer = setInterval(() => moveToNextSlide(), 4000); // Restart the timer

    const targetSlideId = link.getAttribute('href').substring(1);
    const targetSlide = document.getElementById(targetSlideId);
    if (targetSlide) {
      // Move to the selected slide
      const targetSlideIndex = Array.from(slider.children).indexOf(targetSlide);
      slider.scrollTo({
        left: targetSlideIndex * slider.offsetWidth,
        behavior: 'smooth',
      });
    }
  });
});
