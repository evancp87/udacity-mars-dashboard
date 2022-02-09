// separation of concerns
// non-functional logic for styling for animation of hero image- parallex scroll, etc.

const parallex = document.getElementById("parallex");

window.addEventListener("scroll", function() {
  let offset = window.pageYOffset;
  parallex.style.backgroundPositionY = offset * 1 + 'px';  
})


