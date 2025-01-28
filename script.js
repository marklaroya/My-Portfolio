function toggleMenu(){
    const menu =   document.querySelector(".menu-links");
    const icon =   document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// for Project Section //
const style = document.createElement('style');
style.textContent = `
    .project-slider {
        scroll-behavior: smooth; /* Smooth scrolling for the slider */
    }
`;
document.head.append(style);

const projectSlider = document.querySelector('.project-slider');
let loading = false; // Flag to prevent multiple loads
let isScrolling = false; // Variable to track scrolling state
let debounceTimeout; // Variable for debounce timing

// Event listener for mouse wheel scroll
projectSlider.addEventListener('wheel', (event) => {
    event.preventDefault(); // Prevent default scroll behavior
    const speedMultiplier = 3;  // Adjust this multiplier as necessary
    const scrollAmount = event.deltaY * speedMultiplier;

    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            projectSlider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth' // Smooth scroll effect
            });
            isScrolling = false;
        });
        isScrolling = true;
    }
}, { passive: false }); // Use passive: false to allow preventDefault

// Event listener for scroll to load more projects (with debounce)
projectSlider.addEventListener('scroll', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        if (projectSlider.scrollLeft + projectSlider.clientWidth >= projectSlider.scrollWidth - 100 && !loading) {
            loading = true; // Prevent multiple loads
            loadMoreProjects(); // Call function to load more projects
        }
    }, 100); // Adjust timing as needed
});

// Function to simulate loading more projects (for demonstration)
function loadMoreProjects() {
    console.log('Loading more projects...');
    
    // Simulate an async operation (like fetching data)
    setTimeout(() => {
        loading = false; // Reset loading flag after loading is complete
        console.log('More projects loaded!');
        // Here, you would typically append new projects to the slider.
    }, 1000); // Simulate a loading delay of 2 seconds
}


// for project sectiion description
function toggleDescription(clickedCard) {
    // Get all project cards
    const allCards = document.querySelectorAll('.project-card');

    // Check if the clicked card is already active
    const isActive = clickedCard.classList.contains('active');

    // Hide all descriptions
    allCards.forEach(card => {
        const description = card.querySelector('.project-description');
        card.classList.remove('active'); // Remove active state
        description.style.opacity = '0'; // Hide description smoothly
        description.style.visibility = 'hidden'; // Prevent interaction
    });

    // If the clicked card was not active, show its description
    if (!isActive) {
        const clickedDescription = clickedCard.querySelector('.project-description');
        clickedCard.classList.add('active'); // Add active state
        clickedDescription.style.opacity = '1'; // Show clicked description smoothly
        clickedDescription.style.visibility = 'visible'; // Allow interaction
    }
}

let isTouchPadScrolling = false;

document.addEventListener('touchstart', () => {
  isTouchPadScrolling = true;
});

document.addEventListener('touchend', () => {
  isTouchPadScrolling = false;
});

projectSlider.addEventListener('touchmove', (event) => {
  if (!isTouchPadScrolling) {
    event.preventDefault();
    const speedMultiplier = 3;
    const scrollAmount = event.changedTouches[0].clientY * speedMultiplier;

    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        projectSlider.scrollBy({
          left: scrollAmount, // Change 'top' to 'left' for horizontal scrolling
          behavior: 'smooth'
        });
        isScrolling = false;
      });
      isScrolling = true;
    }
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function scrollProjects(direction) {
    const projectWindow = document.querySelector('.project-window');
    const scrollAmount = direction * 300; // Adjust scroll amount as needed
    projectWindow.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}