// separation of concerns
// non-functional logic for styling for animation of hero image- parallex scroll, etc.



var regex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/,
  landscape = document.getElementById("landscape"),
  landscapeLayers = landscape.querySelectorAll("g"),
  // SVGoffsettop = landscape.getBoundingClientRect().top,
  vertHeight = landscape.getBoundingClientRect().height,
  sun = document.getElementById("sun");

function scrollHandler() {
  if (window.scrollY < vertHeight) {
    Array.prototype.forEach.call(landscapeLayers, function(layer) {
      const layerFill = layer.getAttribute("fill"),
        vertRoll = Math.abs(window.scrollY - vertHeight) / vertHeight;
      hslComponents = layerFill.match(regex).slice(1),
        newHSL = parseFloat(hslComponents[2]) * vertRoll;
      layer.style.fill = "hsl(" + hslComponents[0] + ", " + hslComponents[1] + "%, " + newHSL + "%)";
      landscape.style.background = "hsl(202, " + 100 * vertRoll + "%, " + 88 * vertRoll + "%)";
      sun.style.transform = "translate3d(0," + window.scrollY / 2 + "px, 0)";
    })
  } else {
    landscape.style.transform = "translateY(-" + (window.scrollY - vertHeight) + "px)";
  }
}

window.onscroll = function() {
  window.requestAnimationFrame(scrollHandler);
}


