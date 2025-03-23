import { wines } from "/scripts/wines.js";

const image = document.getElementById("image");
const name = document.getElementById("name");
const region = document.getElementById("region");
const description = document.getElementById("description");
const price = document.getElementById("price");
const grapes = document.getElementById("grapes");
const productLink = document.getElementById("product-link");

function pickWine(dontPick) {
  const randomIndex = Math.floor(Math.random() * wines.length);
  const wine = wines[randomIndex];
  if (wine.id === +dontPick) {
    return pickWine(dontPick);
  }
  // preload image
  const wineImage = new Image();
  wineImage.src = `/assets/images/${wine.id}.png`;
  return [wine, wineImage];
}

function showWine(wine, preloadedImage) {
  image.src = preloadedImage.src;
  name.textContent = wine.name;
  region.textContent = wine.region;
  description.textContent = wine.description;
  price.textContent = `$${wine.price}`;
  grapes.textContent = wine.grapes;
  productLink.href = `/product/${wine.id}.html`;
}

let [initialWine, initialImage] = pickWine();
showWine(initialWine, initialImage);
let [nextWine, nextImage] = pickWine(initialWine.id);

function showNextWine() {
  showWine(nextWine, nextImage);
  [nextWine, nextImage] = pickWine(nextWine.id);
}

const button = document.getElementById("new-wine-button");
button.addEventListener("click", showNextWine);
