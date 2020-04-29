//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
function makePageForEpisodes(episodeList) {

  let searchBar = document.createElement("div")
  document.body.appendChild(searchBar);
  searchBar.innerHTML = "<input type= 'search' placeholder = 'Live search'>";
  document.body.insertBefore(searchBar, document.body.childNodes[0]);
  const rootElem = document.getElementById("root");

  for (let i = 0; i < episodeList.length; i++) {
    let episodediv = document.createElement("div");
    episodediv.className = "episodeDiv";

    episodeName = document.createElement("h1");
    let episodeImage = document.createElement("img");
    episodeImage.src = episodeList[i].image.medium
    episodeSummaryText = document.createElement("p")

    rootElem.appendChild(episodediv);
    episodediv.appendChild(episodeName);
    episodediv.appendChild(episodeImage);
    episodediv.appendChild(episodeSummaryText);

    let seasonNumber = episodeList[i].season.toString().padStart(2, "0")

    let episodeNumber = episodeList[i].number.toString().padStart(2, "0")

    let episodeCode = `S${seasonNumber}E${episodeNumber}`

    episodeName.innerHTML = episodeList[i].name + " " + "- " + episodeCode;

    episodeImage.innerHTML = episodeList[i].image.medium;

    episodeSummaryText.innerHTML = episodeList[i].summary
  }

  searchBar.addEventListener("input", searchFunction)
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
}
window.onload = setup;








