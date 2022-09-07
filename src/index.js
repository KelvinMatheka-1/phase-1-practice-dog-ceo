console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", function() {
  loadImages();
  loadBreeds();
})

function loadImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

  return fetch(imgUrl)
    .then(response => response.json())
    .then(results => {
      results.message.forEach(image => addImage(image))
    });
}

function addImage(picUrl) {
  let container = document.getElementById("#dog-image-container");
  let newImage = document.createElement('img');
  newImage.src = picUrl;
  container.appendChild(newImage);
}

function loadBreeds() {
  return fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(results => {
      
      breeds = Object.keys(results.message);
      addBreeds(breeds);
      addBreedSelectListener();
    });
}

function addBreeds(breeds) {
  let ul = document.getElementById("#dog-breeds");
  removeChildren(ul)
  breeds.forEach(breed => addBreeds(breed));
}
function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function selectBreedsStartingWith(letter) {
  updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
  let breedDropdown = document.querySelector('#breed-dropdown');
  breedDropdown.addEventListener('change', function (event) {
    selectBreedsStartingWith(event.target.value);
  });
}

function addBreed(breed) {
  let ul = document.querySelector('#dog-breeds');
  let li = document.createElement('li');
  li.innerText = breed;
  li.style.cursor = 'pointer';
  ul.appendChild(li);
  li.addEventListener('click', updateColor);
}

function updateColor(event) {
  event.target.style.color = 'palevioletred';
}