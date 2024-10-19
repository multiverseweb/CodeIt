function goBack() {
                window.history.back();
}
        
const darkThemeBtn = document.getElementById('darkThemeBtn');
      const lightThemeBtn = document.getElementById('lightThemeBtn');
      const body = document.getElementById('body');
      const errorText = document.getElementById('error-text');
      const errorNumbers = document.querySelectorAll('.error-number'); // Select all error-number elements

      darkThemeBtn.addEventListener('click', () => {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        darkThemeBtn.style.display = 'none';
        lightThemeBtn.style.display = 'block';
        errorText.style.color = 'white'; // Change text color to white
        errorNumbers.forEach(number => number.style.color = 'white'); // Change both numbers to white
      });

      lightThemeBtn.addEventListener('click', () => {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        lightThemeBtn.style.display = 'none';
        darkThemeBtn.style.display = 'block';
        errorText.style.color = 'black'; // Change text color to black
        errorNumbers.forEach(number => number.style.color = 'black'); // Change both numbers to black
      });