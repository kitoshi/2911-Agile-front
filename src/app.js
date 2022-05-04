async function makeFetchtoBackEndToGetData() {
    const response = await fetch('https://agile-2199.uw.r.appspot.com/api')
    const json = await response.json()
    return json
  }

const allMovies = document.getElementById("display_movies")
let idTracker = 0

async function main() {
    const listOfMovies = await makeFetchtoBackEndToGetData()
    await displayAllMovies(listOfMovies)

  }

function displayAllMovies(listOfMovies){
    for (let numberOfMovies of listOfMovies) {
        const titleTag = document.createElement('p');
        const objectTag = document.createElement('p');
        const ratingTag = document.createElement('p');
        const movieDiv = document.createElement('div');
        const imgTag = document.createElement('img');

        movieDiv.id = idTracker

        idTracker = idTracker + 1
        for (let object in numberOfMovies) {
            console.log(object)
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
main()