const btnSearch = document.getElementById("btnSearch");
const inputSearch = document.getElementById("submitQUery");
const btnClear = document.getElementById("btnClear");
const searchResult = document.getElementById("searchResult");

async function fetchData() {
  const url = "../travel-info.json";
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
async function showResult() {
  searchResult.innerHTML = "";

  let searchKeyword = inputSearch.value.toLowerCase();
  let data = await fetchData();
  if (!data) return;

  let filteredResults = [];
  data.countries.forEach((country) => {
    if (country.name.toLowerCase() === searchKeyword) {
      country.cities.forEach((city) => {
        filteredResults.push(city);
        console.log(city);
      });
    } else {
      country.cities.forEach((city) => {
        if (city.name.toLowerCase() === searchKeyword) {
          filteredResults.push(city);
          console.log(city);
        }
      });
    }
  });

  data.beachs.forEach((beach) => {
    if (beach.name.toLowerCase() === searchKeyword) {
      beach.plages.forEach((plage) => {
        filteredResults.push(plage);
      });
    } else {
      beach.plages.forEach((plage) => {
        if (plage.name.toLowerCase() === searchKeyword) {
          filteredResults.push(plage);
        }
      });
    }
  });

  data.temples.forEach((temple) => {
    if (temple.name.toLowerCase() === searchKeyword) {
      temple.domaines.forEach((domaine) => {
        filteredResults.push(domaine);
      });
    } else {
      temple.domaines.forEach((domaine) => {
        if (domaine.name.toLowerCase() === searchKeyword) {
          filteredResults.push(domaine);
        }
      });
    }
  });

  if (filteredResults.length > 0) {
    searchResult.classList.add("with-results");
    filteredResults.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("list-result");
      if (item.hasOwnProperty("name")) {
        li.innerHTML = `
                <div class="parent">
                <div class="parent-container">
                <img src="${item.imgUrl}" class="show-img" width="450" height="350px">
                <div class="under-section">
                    <h1>${item.name}</h1>
                    <p>${item.population}</p>
                    <p class="desc-Country">${item.description}</p>
                </div>
            </div>
            </div>
                `;
      } else {
        li.innerHTML = `
                <div class="parent-container">
                <img src="${item.imgUrl}" alt="${item.name}" class="show-img" width="450" height="200px">
                <div class="under-section">
                    <p>${item.description}</p>
                    <button class="visit-btn form-submit-btn">Visit</button> <!-- Add Visit button -->
                </div>
            </div>
                `;
      }

      searchResult.appendChild(li);
    });
  }
}
function clearSearchResults() {
  searchResult.innerHTML = "";
  inputSearch.value = "";
  searchResult.classList.remove('with-results');
}

btnSearch.addEventListener("click", showResult);
btnClear.addEventListener("click", function () {
  clearSearchResults();
});
