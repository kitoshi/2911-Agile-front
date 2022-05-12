async function makeFetchtoBackEndToGetData() {
  const response = await fetch('https://agile-2199.uw.r.appspot.com/api')
  const json = await response.json()

  return json
}

const allMovies = document.getElementById('display_movies')

function movieTemplate(movie) {
  const template = `
    <div class = "Movies" id= ${movie._id}>
      <h1 class = "Titles">${movie.title}</h1>
      <img class = "Images" src = 'img/${movie.title.replace(
        /[^a-zA-Z0-9 ]/g,
        ''
      )}.jpg'></img>
      <div>
          <p class = "Year">Year: ${movie.year}</p>
          <p class = "Votes">Votes: ${movie.votes}</p>
          <p class = "Rating">Rating: ${movie.rating}</p>
          <p class = "Summary">Summary: ${movie.summary}</p>
      </div>
      <div>   
              <button class="Up">
                  <i class="fa fa-thumbs-up" id="Up"></i>
              </button>
              <button class="Down">
                  <i class="fa fa-thumbs-down"></i>
              </button>
    </div>
  `
  return template
}

function displayAllMovies(listofMovies) {
  const container = document.querySelector('#display_movies')
  for (let movie of listofMovies) {
    container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
  }
}

allMovies.addEventListener('click', (evt) => {
  if (evt.target.className === 'Up') {
    evt.preventDefault()
    const movieID = evt.target.parentElement.parentElement.id
    fetchUpVote(movieID)
  }
  if (evt.target.className === 'fa fa-thumbs-up') {
    evt.preventDefault()
    const movieID = evt.target.parentElement.parentElement.parentElement.id
    fetchUpVote(movieID)
  }
  if (evt.target.className === 'Down') {
    evt.preventDefault()
    const movieID = evt.target.parentElement.parentElement.id
    fetchDownVote(movieID)
  }
  if (evt.target.className === 'fa fa-thumbs-down') {
    evt.preventDefault()
    const movieID = evt.target.parentElement.parentElement.parentElement.id
    fetchDownVote(movieID)
  }
})

async function fetchUpVote(movieID) {
  let URL = 'https://agile-2199.uw.r.appspot.com/api/' + movieID + '/votes'

  const response = await fetch(URL, {
    method: 'PUT',
    body: JSON.stringify({ _id: movieID }),
    headers: { 'Content-Type': 'application/json' }
  })

  return response
}

async function fetchDownVote(movieID) {
  let URL = 'https://agile-2199.uw.r.appspot.com/api/' + movieID + '/downvotes'
  const response = await fetch(URL, {
    method: 'PUT',
    body: JSON.stringify({ _id: movieID }),
    headers: { 'Content-Type': 'application/json' }
  })
  return response
}

const dropRatings = document.getElementById("dropRatings")
dropRatings.addEventListener('click', (async (evt) =>{
  if (evt.target.textContent === 'PG') {
    const container = document.querySelector('#display_movies')
    container.innerHTML=""
    const listOfMovies = await makeFetchtoBackEndToGetData()
    for (let movie of listOfMovies) {
        if (movie.rating === 'PG'){
          container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
    }
  }
  }
  if (evt.target.textContent === 'PG-13') {
    const container = document.querySelector('#display_movies')
    container.innerHTML=""
    const listOfMovies = await makeFetchtoBackEndToGetData()
    for (let movie of listOfMovies) {
        if (movie.rating === 'PG-13'){
          container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
    }
  }
  }
  if (evt.target.textContent === 'R') {
    const container = document.querySelector('#display_movies')
    container.innerHTML=""
    const listOfMovies = await makeFetchtoBackEndToGetData()
    for (let movie of listOfMovies) {
        if (movie.rating === 'R'){
          container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
    }
  }
  }
  if (evt.target.textContent === 'Remove Filter') {
    const container = document.querySelector('#display_movies')
    container.innerHTML=""
    const listOfMovies = await makeFetchtoBackEndToGetData()
    for (let movie of listOfMovies) {
          container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
    }
  
  }
}))

const dropYear = document.getElementById("dropYear")
dropYear.addEventListener('click', (async (evt) =>{
  if (evt.target.textContent === 'Before 1990') {
    const container = document.querySelector('#display_movies')
    container.innerHTML=""
    const listOfMovies = await makeFetchtoBackEndToGetData()
    for (let movie of listOfMovies) {
        if (parseInt(movie.year) < 1990){
          container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
    }}}
    if (evt.target.textContent === '1990-2000') {
      const container = document.querySelector('#display_movies')
      container.innerHTML=""
      const listOfMovies = await makeFetchtoBackEndToGetData()
      for (let movie of listOfMovies) {
    if (parseInt(movie.year) >= 1990 && parseInt(movie.year) <= 2000){
      container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
}}}
if (evt.target.textContent === '2000-2010') {
  const container = document.querySelector('#display_movies')
  container.innerHTML=""
  const listOfMovies = await makeFetchtoBackEndToGetData()
  for (let movie of listOfMovies) {
if (parseInt(movie.year) >= 2000 && parseInt(movie.year) <= 2010){
  container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
}}}
if (evt.target.textContent === '2010-2020') {
  const container = document.querySelector('#display_movies')
  container.innerHTML=""
  const listOfMovies = await makeFetchtoBackEndToGetData()
  for (let movie of listOfMovies) {
if (parseInt(movie.year) >= 2010 && parseInt(movie.year) <= 2020){
  container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
}}}
if (evt.target.textContent === '2020+') {
  const container = document.querySelector('#display_movies')
  container.innerHTML=""
  const listOfMovies = await makeFetchtoBackEndToGetData()
  for (let movie of listOfMovies) {
if (parseInt(movie.year) >= 2020){
  container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
}}
  }
  

}))

async function main() {
  const listOfMovies = await makeFetchtoBackEndToGetData()
  await displayAllMovies(listOfMovies)
}

main()
