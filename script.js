
//You can edit ALL of the code here
const url = "https://api.tvmaze.com/shows/82/episodes"

function getTvShowData() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const allEpisodes = data
      makePageForEpisodes(allEpisodes)
    })
}
function makePageForEpisodes(episodeList) {
  //parent div and child input element
  let searchBar = document.createElement("div")
  document.body.appendChild(searchBar);
  searchBar.innerHTML = "<input type= 'search' placeholder = 'Live search'>";
  document.body.insertBefore(searchBar, document.body.childNodes[0]);

  const rootElem = document.getElementById("root");
  const flexDiv = document.createElement("div")
  rootElem.appendChild(flexDiv)
  flexDiv.className = "flex-row"
  const divWidth = document.createElement("div")
  flexDiv.appendChild(divWidth)
  divWidth.className = "divWidth";
  // divWidth.appendChild(episodeDiv)




  for (let i = 0; i < episodeList.length; i++) {
    let episodeDiv = document.createElement("div");
    episodeDiv.className = "episodeDiv";

    console.log(episodeDiv)
    episodeName = document.createElement("h1");
    let episodeImage = document.createElement("img");
    episodeImage.src = episodeList[i].image.medium
    episodeSummaryText = document.createElement("p")

    //append children to parent element
    //rootElem.appendChild(episodeDiv);
    divWidth.appendChild(episodeDiv)
    episodeDiv.appendChild(episodeName);
    episodeDiv.appendChild(episodeImage);
    episodeDiv.appendChild(episodeSummaryText);


    //padstart (2, "0") the 2 inside the bracket is the character 2 from the left which is replaced by 0 in this case (or whatever no you want it to be)
    //padstart connects two srings
    //https://stackoverflow.com/questions/54050227/padstart-is-not-a-function/54050245
    //There is a simpler way of writing line 40-42 by using one variable - const epiSeasonNumber = ${episode.name} - S0${episode.season}E0${episode.number};

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
window.onload = getTvShowData;





