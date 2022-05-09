movieID = '6272b2e349b22bb576873e7f'
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

fetchUpVote()