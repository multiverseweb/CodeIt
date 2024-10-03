

const sections = document.querySelectorAll('.section-l, .section-r');

sections.forEach(section => {
  section.addEventListener('mousemove', (e) => {
    // Get the mouse position relative to the section
    const { left, top, width, height } = section.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    // Set mouse-tracking gradient coordinates
    section.style.setProperty('--mouse-x', `${x * 100}%`);
    section.style.setProperty('--mouse-y', `${y * 100}%`);

    // Calculate the transform values for the 3D push effect
    const rotateX = (y - 0.5) * 20; // Tilt based on Y-axis (20 degrees max)
    const rotateY = (x - 0.5) * -20; // Tilt based on X-axis (20 degrees max)

    // Apply 3D transform for perspective
    section.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  // Reset the transform on mouse leave
  section.addEventListener('mouseleave', () => {
    section.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
});
