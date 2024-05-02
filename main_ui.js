document.getElementById('about-link').addEventListener('click', function(event) {
  event.preventDefault();  // Prevent the default anchor behavior
  let aboutMessage = document.getElementById('about-message');
  if (aboutMessage.style.display === 'block') {
      aboutMessage.style.display = 'none';
  } else {
      aboutMessage.style.display = 'block';
  }
});
