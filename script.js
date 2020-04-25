//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

//console.log(document.body.style.background = "grey");

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`

  for (let i = 0; i < episodeList.length; i++) {

    let episodediv = document.createElement("div");
    rootElem.appendChild(episodediv);
    episodediv.className = "episodeDiv";

    let episodeName = document.createElement("h1");
    let episodeImage = document.createElement("img");
    episodeImage.src = episodeList[i].image.medium
    let episodeSummaryText = document.createElement("p")

    episodediv.appendChild(episodeName)
    episodediv.appendChild(episodeImage)
    episodediv.appendChild(episodeSummaryText)

    let seasonNumber = episodeList[i].season.toString().padStart(2, "0")
    console.log(seasonNumber);
    let episodeNumber = episodeList[i].number.toString().padStart(2, "0")
    console.log(episodeNumber);
    let episodeCode = `S${seasonNumber}E${episodeNumber}`
    console.log(episodeCode);

    episodeName.innerHTML = episodeList[i].name + " " + "- " + episodeCode;
    console.log(episodeName);

    episodeImage.innerHTML = episodeList[i].image.medium;
    console.log(episodeImage);

    episodeSummaryText.innerHTML = episodeList[i].summary
    console.log(episodeSummaryText)
  }
}
window.onload = setup;
