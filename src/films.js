document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
  });
  
  const BASE_URL = `https://api.npoint.io/3e60251e8c5103d91884/films/`

  const fetchMovies = () => {
    fetch(BASE_URL)
      .then((resp) => resp.json())
      .then(populateMovieList);
  }
  const populateMovieList = (films) => {
    displayFilms(films)
    const buyTicketBtn = document.querySelector("#buy-ticket");
    buyTicketBtn.addEventListener("click", () => {
        films = films.map(film => {
            if(film.tickets_bought && film.tickets_sold <= film.capacity){
                film.tickets_sold = parseInt(film.tickets_sold) + parseInt(film.tickets_bought)
                displayFilm(film)
                film.tickets_bought=0
            } 
            return film
        });
        const filmTickets = document.querySelector("#ticket-count");
        filmTickets.value = 0;
      });
  }

  const displayFilms = (films) =>{
    films.map((film) => {
        setFilmDetails(film)
      });
  }
  //Displaying current film selected
  let currentFilm; 
  const setFilmDetails = (film) =>{
    const movies = document.querySelector("#movies-list");
    const moviesList = document.createElement("li");
    moviesList.classList.add('col-6', 'text-center', 'py-2')

    const movieListCard = document.createElement('div')
    movieListCard.classList.add('card', 'mx-2')

    const movieListHeading = document.createElement('h2')
    movieListHeading.classList.add('mt-3')
    movieListHeading.textContent = film.title

    const movieListImage = document.createElement("img");
    movieListImage.classList.add('mx-auto', 'my-2')
    movieListImage.src = film.poster;

    const movieListShowTime = document.createElement('b')
    movieListShowTime.classList.add('d-block')
    movieListShowTime.textContent = 'ShowTime: '+film.showtime

    const movieListDesc = document.createElement('p')
    movieListDesc.classList.add('d-block')
    movieListDesc.textContent = film.description
    
    movieListCard.appendChild(movieListHeading)
    movieListCard.appendChild(movieListImage)
    movieListCard.appendChild(movieListShowTime)
    movieListCard.appendChild(movieListDesc)
    
    moviesList.appendChild(movieListCard);
    movies.appendChild(moviesList);
    
    movies.style.cursor = "pointer";

    moviesList.addEventListener("click", () => {
      currentFilm = film;
      displayFilm(film);
    });
  }
  const displayFilm = (film) => {
    const title = document.querySelector("#title");
    title.innerHTML = film.title;
    const filmImg = document.querySelector("img#display-image");
    filmImg.src = film.poster;
    const filmDesc = document.querySelector("#description");
    filmDesc.textContent = film.description;
    const showTime = document.querySelector("#showTime");
    showTime.textContent = 'ShowTime '+film.showtime;
    const capacity = document.querySelector("#capacity");
    capacity.textContent = 'capacity '+film.capacity;
    const titcketsSold = document.querySelector("#sold");
    titcketsSold.textContent = 'Tickets Sold : ' +film.tickets_sold;
    const titcketsRemaining = document.querySelector("#remaining");
    const ticketsRemaining = film.capacity - film.tickets_sold
    if(ticketsRemaining===0){
        titcketsRemaining.textContent = 'Sold Out ';
    }else{
        titcketsRemaining.textContent = 'Tickets Remaining : ' +(film.capacity - film.tickets_sold);
    }
    const runTime = document.querySelector("#runTime");
    let hrs =  Math.floor(film.runtime/60)
    let minutes = film.runtime%60
    runTime.textContent = 'Duration: ' +hrs + ' hrs ' + minutes +' minutes';
    const filmTickets = document.querySelector("#ticket-count");
    filmTickets.value = currentFilm.tickets_bought ?? 0;
  }
  
  //Adding votes for the selected Character
  const addTicket = () => {
    if(currentFilm == null){
      return alert('You have not selected a film')
      
    }
    const filmTickets = document.querySelector("#ticket-count");
    const boughtTickets = parseInt(filmTickets.value)
    
    if(currentFilm.tickets_sold + boughtTickets >= currentFilm.capacity){
      return alert("Tickets exceed available capacity")
        
    }
    
    if(currentFilm.tickets_bought){
        currentFilm.tickets_bought += 1
    }else{
        currentFilm.tickets_bought = 1
    }
    filmTickets.value = currentFilm.tickets_bought ?? 0;
    
  }

  const removeTicket = () => {
    if(currentFilm == null){
        alert('You have not selected a film')
    }
    if(currentFilm.tickets_bought){
        currentFilm.tickets_bought -= 1
    }else{
        currentFilm.tickets_bought = 0
    }
    
    const filmTickets = document.querySelector("#ticket-count");
    filmTickets.value = currentFilm.tickets_bought ?? 0;
  }


