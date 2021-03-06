function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const userSearch = $('#js-user-search').val();
      const maxResults = $('#js-max-results').val();
      getRepos(userSearch, maxResults);
      console.log('watchForm ran')
    })
}
  
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getRepos(userSearch, maxResults=10) {
    const params = {
        per_page: maxResults,
       };
    const userName = userSearch;
    const searchUrl = 'https://api.github.com/users/' + userName + '/repos'
    const queryString = formatQueryParams(params)
    const url = searchUrl + '?' + queryString;
         
       console.log(url);

       fetch(url)
       .then(response => {
         if (response.ok) {
           return response.json();
         } else {
         throw new Error(response.statusText);
         }
       })
       .then(responseJson => displayResults(responseJson, maxResults))
       .catch(err => {
         $('#js-error-message').text(`Something went wrong: ${err.message}`);
       });
    console.log('getRepos ran')
}

function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    $('#results').empty();
    $('#results').removeClass('hidden');
    // iterate through the articles array, stopping at the max number of results
    for (let i = 0; i < maxResults ; i++){
      $('#results').append(
        `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
        <p>${responseJson[i].description}</p>
        </li>`
      )};
    console.log('displayResults ran')
  };

$(watchForm);





//`<li><h3><a href="${responseJson[i[i+1]].html_url}">${responseJson[i[i+1]].name}</a></h3>
 //       <p>${responseJson[i[i+1]].description}</p>
  //      </li>`








/*onst searchURL =  https://api.github.com/users/USERNAME/repos


function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const userSearch = $('#js-user-search').val();
      const maxResults = $('#js-max-results').val();
      getRepos(userSearch, maxResults);
    });
  }
  
  $(watchForm);








/*function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}



function getRepos(query, maxResults=10) {
  const params = {
    q: query,
    pageSize: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
      "x-rapidapi-key": apiKey})
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
} */
