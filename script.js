//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
function makePageForEpisodes(episodeList) {
  //parent div and child input element
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

    //append children to parent element
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
  //Live search
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

  const selectBar = document.createElement("select")
  selectBar.className = "select";
  searchBar.appendChild(selectBar)
  for (let i = 0; i < episodeList.length; i++) {
    let seasonNumber = episodeList[i].season.toString().padStart(2, "0")
    let episodeNumber = episodeList[i].number.toString().padStart(2, "0")
    let episodeCode = `S${seasonNumber}E${episodeNumber}`
    let name = episodeList[i].name + " " + "- " + episodeCode;
    //let epicontent = name.split("").reverse().join("");
    let epicontent = name.split("").join("");
    //issue -  search box // does not display the correct order, format: "S01E01 - Winter is Coming"
    console.log(epicontent)
    let optionContainer = document.createElement("option");
    selectBar.appendChild(optionContainer);
    optionContainer.innerText = epicontent;
    console.log(optionContainer)
  }
}
window.onload = setup;



// Complete all requirements from level 200
// Add a select input which allows you to jump quickly to an episode:
// The select input should list all episodes in the format: "S01E01 - Winter is Coming"
// When the user makes a selection, they should be taken directly to that episode in the list
// Bonus: if you prefer, when the select is used, ONLY show the selected episode. If you do this, be sure to provide a way for the user to see all episodes again.

