let isScrolling;
const fixedElement = document.querySelector('.footer-dashboard-container');

// Detectar cuando el usuario está desplazándose
window.addEventListener('scroll', () => {
  // Ocultar el elemento fijo cuando hay scroll
  fixedElement.classList.remove('show');

  // Limpiar el timeout previo
  clearTimeout(isScrolling);

  // Después de que el scroll se detiene, mostrar el elemento
  isScrolling = setTimeout(() => {
    fixedElement.classList.add('show');
  }, 200); // Retraso de 200ms después de que el scroll se detiene
});
