const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjk2NmIzNjUxN2RlZTlhZWFmNjRhZjM4M2IxYjc4MSIsInN1YiI6IjY1MzBhNjUzMTEwOGE4MDEyY2E0YTlhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Dhtad5yjUP84yIMmdmzxkeKqK01mbrv4EgOnrBbTiM",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    const movieList = parseMovieList(response); //movielist = movielist;
    const $button = document.getElementById("searchBtn");
    //console.log(parsedMovieList);

    const $movieList = document.getElementById("movie-list");
    $movieList.innerHTML = movieList;
    $button.addEventListener("click", searchBtnOnClick);
  })
  .catch((err) => console.error(err));

function parseMovieList(response) {
  let movies = "";
  let movieList = response["results"];

  for (let i = 0; i < movieList.length; i++) {
    let id = movieList[i].id;
    let title = movieList[i].title;
    let overview = movieList[i].overview;
    let popularity = movieList[i].popularity;
    let vote_average = movieList[i].vote_average;

    let img_poster_path = movieList[i].poster_path;
    let img_base_path = "https://image.tmdb.org/t/p/w500";
    let img_path = img_base_path + img_poster_path;

    movies += `<div class= "movie-card" id="${id}" name="${title}" onclick="alertOnClick(${id})">
    <img src="${img_path}" />
    <h3> ${title}</h3>
    <p> ${overview}</p>
    <p> Popularity : ${popularity} </p>
    <p> Rating : ${vote_average} </p>
    </div>`;
  }

  return movies;
}

function alertOnClick(id) {
  alert(`ID: ${id}`);
}

function searchBtnOnClick(event) {
  event.preventDefault();
  const $movieList = document.getElementById("movie-list");
  const inputname = document.querySelector(".searchInput").value;
  const searchList = document.querySelectorAll("div");
  //console.log(searchList);

  //let searchtemp = searchList[0];
  //let searchResult = searchtemp.textContent;
  //console.log(searchResult);
  //

  if (inputname === "") {
    alert(`영화 제목을 입력하세요`);
  } else {
    $movieList.innerHTML = "";

    searchList.forEach(function (element) {
      let nameAttribute = element.getAttribute("name");
      if (nameAttribute === null) {
        nameAttribute = "";
      }

      //대소문자
      const inputstr = inputname.toLowerCase();
      const nameAttributestr = nameAttribute.toLowerCase();
      const nameAttributearr = nameAttributestr.split(" ");
      //console.log(nameAttributestr);
      let isSearch = nameAttributearr.find((word) => word.includes(inputstr));
      if (isSearch) {
        //console.log(nameAttribute);
        $movieList.innerHTML += element.outerHTML;
      }
    });
  }

  //alert(`name: ${inputname}`);
}
