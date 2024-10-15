document.addEventListener('DOMContentLoaded', function() {
    const navbarContainer = document.querySelector('.navbar-container');
    const fadeWrapper = document.querySelector('.fade-wrapper-right');
    const fadeWrapperLeft = document.querySelector('.fade-wrapper-left');
    
    function updateFade() {
        const isScrollable = navbarContainer.scrollWidth > navbarContainer.clientWidth;
        const isScrolledToEnd = Math.abs(
            navbarContainer.scrollWidth - navbarContainer.clientWidth - navbarContainer.scrollLeft
        ) < 1;
        
        // Only show fade if the content is scrollable and we are not at the end
        if (isScrollable) {
            fadeWrapper.style.opacity = '1';
            fadeWrapper.style.right = `${-navbarContainer.scrollLeft}px`; // Move the fade with scroll

            fadeWrapperLeft.style.opacity = '1';
            fadeWrapperLeft.style.left = `${navbarContainer.scrollLeft}px`; // Move left fade with scroll

        } else {
            fadeWrapper.style.opacity = '0';
            fadeWrapperLeft.style.opacity = '0';
        }
        
        // Hide the fade when scrolled to the end
        if (isScrolledToEnd) {
            fadeWrapper.style.opacity = '0';
        }

        // Hide the left fade when scrolled to the start
        if (navbarContainer.scrollLeft <= 0) {
            fadeWrapperLeft.style.opacity = '0';
        }
    }
    
    navbarContainer.addEventListener('scroll', updateFade);
    window.addEventListener('resize', updateFade);
    updateFade(); // Initial check
});
