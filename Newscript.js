function setup() {
    const allShows = getAllShows();
    makePageForShows(allShows);
    //const allEpisodes = getAllEpisodes();
    //console.log(allShows);
    //makePageForEpisodes(allEpisodes);
    selectShowBox(allShows);
}
let rootElem;
let searchBar;
let episodeName;
let showDiv;
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
        episodediv.className = "showDiv";
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
}
function selectShowBox(selectShows) {
    let selectShowBar = document.createElement("select");
    selectShowBar.className = "select";
    showDiv = document.querySelectorAll(".showDiv")
    searchBar.appendChild(selectShowBar);
    selectShows.forEach(show => {
        //console.log(show)
        var showOption = document.createElement("option");
        let showName = show.name;
        selectShowBar.appendChild(showOption);
        showOption.innerText = showName;
        showOption.id = show.id;
        selectShowBar.addEventListener("change", (event) => {
            let userInput = event.target.value;
            //console.log(event.target.id)
            //let selectEpisode = document.querySelectorAll(".select2")[0];
            let selectShow = document.querySelectorAll(".select");
            selectShow.forEach(element => {
                //console.log(showName)

                if (showName === userInput) {
                    fetch(`https://api.tvmaze.com/shows/${show.id}/episodes`)
                        .then(response => response.json())
                        .then(data => {
                            makePageForEpisodes(data)
                            console.log(data)
                        })
                } else {
                    showDiv.style.display = 'none'
                }
            })
        })

    })
}

//get select episode in the other select bar

function makePageForEpisodes(episodeList) {
    let selectEpisodeBar = document.createElement("select");
    selectEpisodeBar.className = "select2";
    searchBar.appendChild(selectEpisodeBar);

    rootElem = document.getElementById("root");
    for (let i = 0; i < episodeList.length; i++) {
        let episodediv = document.createElement("div");
        episodediv.className = "showDiv";
        episodeName = document.createElement("h1");
        let episodeImage = document.createElement("img");
        episodeImage.src = episodeList[i].image.medium
        episodeSummaryText = document.createElement("p")
        //append children to parent element
        rootElem.appendChild(episodediv);
        episodediv.appendChild(episodeName);
        episodediv.appendChild(episodeImage);
        episodediv.appendChild(episodeSummaryText);
        episodeName.innerHTML = episodeList[i].name;
        episodeSummaryText.innerHTML = episodeList[i].summary
        episodeName.innerHTML = episodeList[i].name;
    }


    for (let i = 0; i < episodeList.length; i++) {
        let seasonNumber = episodeList[i].season.toString().padStart(2, "0")
        let episodeNumber = episodeList[i].number.toString().padStart(2, "0")
        let episodeCode = `S${seasonNumber}E${episodeNumber}`
        let name = episodeList[i].name + " " + "- " + episodeCode;
        let epicontent = name.split("-").reverse().join("");
        //console.log(epicontent);
        let episodeOption = document.createElement("option");
        selectEpisodeBar.appendChild(episodeOption);
        episodeOption.innerText = name;
    }
    // selectEpisodeBar.addEventListener("change", displaySelect)
    // function displaySelect(selected) {
    //   console.log("hurray!")
    //   let userSelect = selected.target.value;
    //   let selectList = Array.from(document.querySelectorAll(".episodeDiv"))
    //   selectList.forEach(element => {
    //     let innerHTMLContent = element.innerHTML
    //     console.log(innerHTMLContent);
    //     console.log(userSelect);
    //     if (innerHTMLContent.indexOf(userSelect) != -1) {
    //       element.style.display = 'block';
    //     } else {
    //       element.style.display = 'none';
    //     }
    //   })
    // }
}
window.onload = setup;
