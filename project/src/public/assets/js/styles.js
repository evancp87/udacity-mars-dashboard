// separation of concerns
// non-functional logic for styling for animation of hero image- parallex scroll, etc.

const regex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/,
const landscape = document.getElementById('landscape');
const landscapeLayers = document.querySelectorAll('path');
const sun = document.getElementById('sun');