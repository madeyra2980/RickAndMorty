const main = document.querySelector(".main");
const form = document.createElement('form');


form.innerHTML = `
  <input type="text" id="search" name="search">
  <button type="submit">Search</button>
`;
const searchInput = form.querySelector('#search');

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value;

  fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
    .then((response) => response.json())
    .then(({ results }) => displayContent(results));
});

main.before(form);

fetch(`https://rickandmortyapi.com/api/character`)
  .then((response) => response.json())
  .then(({ results }) => {
    displayContent(results);
  });

function displayContent(results) {
  main.innerHTML = results
    .map(
      ({ name, species, image, status,  }) => `
      <div class="card">
      <div class = "data-persons">
        <img src="${image}" alt="${name}">
        </div>
        <div class = "data">
        <h4>${name}</h4>
        <h4>Status: ${status}</h4>
        <p>${species}</p>
       </div> 
      </div> 
      </div>
    `
    )
    .join("");
}