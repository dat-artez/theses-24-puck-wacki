"use strict";

/*
to test locally, in the terminal type:

python3 -m http.server 80

then in the browser:

localhost



*/

let img_candle;
let img_nul;
let img_een;

// array aanmaken
let letters = [];

console.log("ok!");

function spanTextNodes(node) {
  if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0) {
    //   console.log(node);
    // Split the text content into individual characters
    const characters = node.nodeValue.split("");
    // Create a document fragment to improve performance
    const fragment = document.createDocumentFragment();
    characters.forEach((char) => {
      // Create a span for each character
      const span = document.createElement("span");
      span.textContent = char;
      fragment.appendChild(span);

      // toevoegen aan array
      letters.push(span);
    });
    //   Replace the text node with the fragment
    node.parentNode.replaceChild(fragment, node);
  } else {
    // Recursively traverse child nodes
    node.childNodes.forEach(spanTextNodes);
  }
}

const to_span = document.querySelectorAll(".to_span");

for (let i = 0; i < to_span.length; i++) {
  spanTextNodes(to_span[i]);
}

// log de array met de spans
// console.log(letters);

function dist_sq(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  return dx * dx + dy * dy;
}

function preload() {
  img_candle = loadImage("img/candle-1.png");
  img_nul = loadImage("img/nul dicht.png");
  img_een = loadImage("img/1dicht.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // console.log(letters);

  console.log(letters[1000]);
  var s = letters[1000];
  console.log(s.getBoundingClientRect());

  console.log(dist_sq(0, 0, 10, 10));
}

function draw() {
  clear();

  for (let i = 1; i < letters.length; i++) {
    var s = letters[i];
    var rect = s.getBoundingClientRect();
    var center_x = rect.x + rect.width / 2;
    var center_y = rect.y + rect.height / 2;

    var distance = dist_sq(center_x, center_y, mouseX, mouseY);

    var max_distance = 300 * 300;

    var scale = map(distance, 0, max_distance, 0, 1);

    if (scale > 1) {
      scale = 1;
    }

    const char = s.innerText;
    let as_binary = char.charCodeAt(0).toString(2); // 1100011
    as_binary = nf(int(as_binary), 8); // 01100011

    const one_or_zero = as_binary.charAt(7);

    imageMode(CENTER);

    if (one_or_zero == 1) {
      const ratio = img_een.width / img_een.height;

      image(
        img_een,
        center_x,
        center_y,
        rect.height * ratio * scale * 0.7,
        rect.height * scale
      );
    } else {
      const ratio = img_nul.width / img_nul.height;

      image(
        img_nul,
        center_x,
        center_y,
        rect.height * ratio * scale * 0.7,
        rect.height * scale
      );
    }
  }

  noCursor();
  image(img_candle, mouseX, mouseY);
}
