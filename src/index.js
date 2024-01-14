function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search_input");
  let cityElement = document.querySelector("#main_city");

  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search_form");
searchFormElement.addEventListener("submit", searchSubmit);
