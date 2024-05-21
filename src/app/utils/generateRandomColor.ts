function generateRandomColor(): string {
  // Generate a random number between 0 and 255 and convert to a two-digit hexadecimal string
  const getRandomHexComponent = () => {
      const hex = Math.floor(Math.random() * 256).toString(16);
      return hex.padStart(2, '0');
  };

  // Concatenate the hex components for red, green, and blue
  const red = getRandomHexComponent();
  const green = getRandomHexComponent();
  const blue = getRandomHexComponent();

  return `#${red}${green}${blue}`;
}

export default generateRandomColor;