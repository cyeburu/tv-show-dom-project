
function setup() {
  const allShows = getAllShows();
  makePageForShows(allShows);
  const allEpisodes = getAllEpisodes();
  console.log(allEpisodes);
  makePageForEpisodes(allEpisodes);
  matchEpisodeValue(allEpisodes);
}

let rootElem;
let searchBar;
let episodeName;
function makePageForShows(shows) {
  searchBar = document.createElement("div")
  document.body.appendChild(searchBar);
  document.body.insertBefore(searchBar, document.body.childNodes[0]);

  let searchInput = document.createElement("input");
  searchBar.appendChild(searchInput)
  searchInput.type = 'search';
  searchInput.placeholder = "Live Search";
  rootElem = document.getElementById("root");

  for (let i = 0; i < shows.length; i++) {
    let episodediv = document.createElement("div");
    episodediv.className = "episodeDiv";
    episodeName = document.createElement("h1");
    let episodeImage = document.createElement("img");
    episodeImage.src = shows[i].image.medium
    episodeSummaryText = document.createElement("p")

    //append children to parent element
    rootElem.appendChild(episodediv);
    episodediv.appendChild(episodeName);
    episodediv.appendChild(episodeImage);
    episodediv.appendChild(episodeSummaryText);
    episodeName.innerHTML = shows[i].name;
    episodeSummaryText.innerHTML = shows[i].summary
    episodeName.innerHTML = shows[i].name;
  }
  searchInput.addEventListener("input", searchFunction)
  function searchFunction(userInput) {
    let filter = userInput.target.value.toUpperCase();
    let searchList = Array.from(document.querySelectorAll(".episodeDiv"));
    searchList.forEach(show => {
      let text = show.innerHTML.toUpperCase();
      if (text.indexOf(filter) != -1) {
        show.style.display = 'block';
      } else {
        show.style.display = 'none';
      }
    });
  }
  let selectShowBar = document.createElement("select");
  selectShowBar.className = "select";
  searchBar.appendChild(selectShowBar);
  for (let i = 0; i < shows.length; i++) {
    let name = shows[i].name;
    let showOption = document.createElement("option");
    selectShowBar.appendChild(showOption);
    showOption.innerText = name;
  }
}
function makePageForEpisodes(episodeList) {
  let selectEpisodeBar = document.createElement("select");
  selectEpisodeBar.className = "select2";
  searchBar.appendChild(selectEpisodeBar);
  for (let i = 0; i < episodeList.length; i++) {
    let seasonNumber = episodeList[i].season.toString().padStart(2, "0")
    let episodeNumber = episodeList[i].number.toString().padStart(2, "0")
    let episodeCode = `S${seasonNumber}E${episodeNumber}`
    let name = episodeList[i].name + " " + "- " + episodeCode;
    //let epicontent = name.split("-").reverse().join("");
    let episodeOption = document.createElement("option");
    selectEpisodeBar.appendChild(episodeOption);
    episodeOption.innerText = name;
  }
  selectEpisodeBar.addEventListener("change", displaySelect)
  function displaySelect(selected) {
    let userSelect = selected.target.value;
    let selectList = Array.from(document.querySelectorAll(".episodeDiv"))
    selectList.forEach(element => {
      let innerHTMLContent = element.innerHTML
      if (innerHTMLContent.indexOf(userSelect) != -1) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    })
  }
}
window.onload = setup;


