async function makeFetchtoBackEndToGetData() {
    const response = await fetch('https://agile-2199.uw.r.appspot.com/api')
    const json = await response.json()
    return json
  }


const allMovies = document.getElementById("display_movies")

  
function displayAllMovies(listOfMovies){
    for (let numberOfMovies of listOfMovies) {
        const titleTag = document.createElement('p');
        const objectTag = document.createElement('p');
        const ratingTag = document.createElement('p');
        const movieDiv = document.createElement('div');
        const imgTag = document.createElement('img');
        const buttonUp = document.createElement('button');
        const buttonDown = document.createElement('button');
        buttonUp.className = 'Up'
        buttonDown.className = 'Down'
        buttonUp.textContent = 'Up'
        buttonDown.textContent = 'Down'

        movieDiv.id = numberOfMovies._id

        for (let object in numberOfMovies) {
            movieDiv.append(buttonUp)
            movieDiv.append(buttonDown)
            if ( object === 'title' ) {
                noSpecialCharacters = numberOfMovies.title.replace(/[^a-zA-Z0-9 ]/g, '')
                titleTag.textContent = numberOfMovies.title
                imgTag.src = 'img/' + noSpecialCharacters + '.jpg'
                movieDiv.append(titleTag)
                movieDiv.append(imgTag)
            }
            if ( object === 'year' )  {
                objectTag.textContent = numberOfMovies.year
                movieDiv.append(objectTag)
            }
            if ( object === 'rating' ) {
                ratingTag.textContent = numberOfMovies.rating
                movieDiv.append(ratingTag)
            }


        }
        allMovies.append(movieDiv)
        }
    
}

allMovies.addEventListener('click', (evt) => {
    console.log(evt.target.nodeName)
    if ( evt.target.className === 'Up' ){
        const movieID = evt.target.parentElement.id
         fetchUpVote(movieID)
    }
    if ( evt.target.className === 'Down' ) {
        const movieID = evt.target.parentElement.id
        console.log('hello')
        fetchDownVote(movieID)
    }
    }
)


async function fetchUpVote(movieID) {
    let URL = 'https://agile-2199.uw.r.appspot.com/api/' + movieID + '/votes'
    const bodyStuff = 'ObjectId("' + movieID + '")'
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




async function main() {


    const listOfMovies = await makeFetchtoBackEndToGetData()
    await displayAllMovies(listOfMovies)

  }

main()