let votes = 3

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
              <button class="Up" onclick="handleAllMovies(event)">
                  <i class="fa fa-thumbs-up" id="Up"></i>
              </button>
              <button class="Down" onclick="handleAllMovies(event)">
                  <i class="fa fa-thumbs-down"></i>
              </button>
    </div>
  `
  return template
}

async function fetchTopMovie() {
  const response = await fetch(
    'https://agile-2199.uw.r.appspot.com/api/popular'
  )
  const json = await response.json()
  return json
}

function displayTopMovie(topMovie) {
  const container = document.querySelector('h1')
  container.insertAdjacentHTML('afterend', movieTemplate(topMovie))
}

function displayAllMovies(listofMovies) {
  const container = document.querySelector('#display_movies')
  for (let movie of listofMovies) {
    container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
  }
}
// popup stuff
function disableButtons() {
  const buttons = document.querySelectorAll('button')
  for (const item of buttons) {
    item.disabled = true
  }
}
function enableButtons() {
  const buttons = document.querySelectorAll('button')
  for (const item of buttons) {
    item.disabled = false
  }
}

function destroyPopup() {
  const popupContainer = document.querySelectorAll('.popup')
  for (const item of popupContainer) {
    item.remove()
  }
}

function popUpTemplate() {
  const listOfAds = ['BzCbXm2w22E', 'bsgnKjgUd6k', 'M853v2oFQRs']
  const template = `
    <div class="popup" id="popup-container">
      <iframe width="100%" height="100%" display="inline" src="https://www.youtube-nocookie.com/embed/${
        listOfAds[Math.floor(Math.random() * listOfAds.length - 1)]
      }?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <button class="skip-popup" onclick="destroyPopup()" disabled>(X) Close Ad</button>
    </div>
  `
  return template
}

function alertTemplate() {
  console.log('broken')
  const template = `
    <div class="alert">
     <p>${votes} remaining</p>
    </div>
  `
  return template
}

function destroyAlert() {
  const alertContainer = document.querySelectorAll('.alert')
  for (const item of alertContainer) {
    item.remove()
  }
}

function userVoteHandler() {
  votes = votes - 1
  if (votes > 0) {
    document
      .querySelector('header')
      .insertAdjacentHTML('afterend', alertTemplate())
    setTimeout(() => {
      console.log('alerting')
    }, 5000)
    destroyAlert()
  } else {
    document.querySelector('h1').insertAdjacentHTML('afterend', popUpTemplate())
    disableButtons()
    setTimeout(() => {
      console.log('enabled')
      enableButtons()
    }, 5000)
    setTimeout(() => {
      destroyPopup()
    }, 200000)
    votes = 3
    return votes
  }
}

function handleAllMovies(event) {
  event.preventDefault()
  console.log('button press')
  if (event.target.className === 'Up' || event.target.className === 'Down') {
    userVoteHandler()
    const movieID = event.target.parentElement.parentElement.id
    fetchUpVote(movieID)
  } else if (
    event.target.className === 'fa fa-thumbs-up' ||
    event.target.className === 'fa fa-thumbs-down'
  ) {
    userVoteHandler()
    const movieID = event.target.parentElement.parentElement.parentElement.id
    fetchUpVote(movieID)
  }
}

async function fetchUpVote(movieID) {
  let URL = `'https://agile-2199.uw.r.appspot.com/api/${movieID}/votes'`

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

var ratingsGlobal = ""
var jsonList = []

const dropRatings = document.getElementById('dropRatings')
dropRatings.addEventListener('click', (evt) => {
  const container = document.querySelector('#display_movies')
  if (
    evt.target.textContent === 'PG' ||
    evt.target.textContent === 'PG-13' ||
    evt.target.textContent === 'R' ||
    evt.target.textContent === 'Remove Filter'
  ) {
    container.innerHTML = ''
    const listOfMovies = JSON.parse(localStorage.getItem('movielist'))
    jsonList = []
    for (let movie of listOfMovies) {
      if (
        movie.rating === evt.target.textContent ||
        evt.target.textContent === 'Remove Filter'
      ) {
        ratingsGlobal = evt.target.textContent
        jsonList.push(JSONTemplate(movie))
        console.log(JSON.parse(JSON.stringify(jsonList)))
        container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
      }
    }
  }
})

const dropYear = document.getElementById('dropYear')
dropYear.addEventListener('click', async (evt) => {
  const container = document.querySelector('#display_movies')
  const listOfMovies = JSON.parse(localStorage.getItem('movielist'))
  container.innerHTML = ''
  if (ratingsGlobal === 'PG') {
    for (let movie of JSON.parse(jsonList)) {
      if (evt.target.textContent === 'Before 1990') {
        if (parseInt(movie.year) < 1990) {
          container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
        }
      }
      if (evt.target.textContent === '1990-2000') {
        if (parseInt(movie.year) >= 1990 && parseInt(movie.year) <= 2000) {
          container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
        }
      }
      if (evt.target.textContent === '2000-2010') {
        if (parseInt(movie.year) >= 2000 && parseInt(movie.year) <= 2010) {
          container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
        }
      }
      if (evt.target.textContent === '2010-2020') {
        if (parseInt(movie.year) >= 2010 && parseInt(movie.year) <= 2020) {
          container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
        }
      }
      if (evt.target.textContent === '2020+') {
        if (parseInt(movie.year) >= 2020) {
          container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
        }
      }
    }
    
  }
  else
  for (let movie of listOfMovies) {
    if (evt.target.textContent === 'Before 1990') {
      if (parseInt(movie.year) < 1990) {
        container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
      }
    }
    if (evt.target.textContent === '1990-2000') {
      if (parseInt(movie.year) >= 1990 && parseInt(movie.year) <= 2000) {
        container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
      }
    }
    if (evt.target.textContent === '2000-2010') {
      if (parseInt(movie.year) >= 2000 && parseInt(movie.year) <= 2010) {
        container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
      }
    }
    if (evt.target.textContent === '2010-2020') {
      if (parseInt(movie.year) >= 2010 && parseInt(movie.year) <= 2020) {
        container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
      }
    }
    if (evt.target.textContent === '2020+') {
      if (parseInt(movie.year) >= 2020) {
        container.insertAdjacentHTML('afterbegin', movieTemplate(movie))
      }
    }
  }
})

function JSONTemplate(movie) {
  const template = `{_id: ${movie._id}, title: ${movie.title}, votes: ${movie.votes}, rating: ${movie.rating}, year: ${movie.year}, trailer: ${movie.trailer}, summary: ${movie.summary}}`
  return template
}

async function main() {
  const movieListString = await makeFetchtoBackEndToGetData()
  localStorage.setItem('movielist', JSON.stringify(movieListString))
  const topMovieString = await fetchTopMovie()
  localStorage.setItem('topmovie', JSON.stringify(topMovieString))
  displayTopMovie(JSON.parse(localStorage.getItem('topmovie')))
  displayAllMovies(JSON.parse(localStorage.getItem('movielist')))
}

main()
