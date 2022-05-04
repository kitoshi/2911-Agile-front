async function makeFetchtoBackEndToGetData() {
    const response = await fetch('https://agile-2199.uw.r.appspot.com/api')
    const json = await response.json()
    return json
  }


const allMovies = document.getElementById("display_movies")
let idTracker = 0

  
function displayAllMovies(listOfMovies){
    for (let numberOfMovies of listOfMovies) {
        const titleTag = document.createElement('p');
        const objectTag = document.createElement('p');
        const ratingTag = document.createElement('p');
        const movieDiv = document.createElement('div');
        const imgTag = document.createElement('img');
        const button = document.createElement('button');

        movieDiv.id = idTracker

        idTracker = idTracker + 1
        for (let object in numberOfMovies) {
            movieDiv.append(button)
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
    console.log(evt.target)
    let button = document.createElement('button')
    if (evt.target == button){
        console.log(evt.target.parentElement)
    }
 


    
})
// async function fetchCrud(listOfMovies) {
//     let movieID = 'https://agile-2199.uw.r.appspot.com/api' + 
//     const response = await fetch(movieID, {
//         method: 'PUT'

//     })
// }


// function incrementVote() {
//     database?.updateOne()
// }



async function main() {


    const listOfMovies = await makeFetchtoBackEndToGetData()
    await displayAllMovies(listOfMovies)

  }

main()