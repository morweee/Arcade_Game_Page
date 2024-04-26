// Get all the button elements
const game_blocks = document.querySelectorAll('.game-tile a');

// Loop through each button element
game_blocks.forEach(game_block => {
  // Store the original background color 
  const originalBackgroundColor = game_block.style.backgroundColor;

  // Add a mouseover event listener
  game_block.addEventListener('mouseover', () => {
    // Change the button's background color
    game_block.style.backgroundColor = 'blue';
  });

  // Add a mouseout event listener
  game_block.addEventListener('mouseout', () => {
    // Restore the original background color
    game_block.style.backgroundColor = originalBackgroundColor;
  });
});