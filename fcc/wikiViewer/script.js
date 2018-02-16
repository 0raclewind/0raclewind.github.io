//https://en.wikipedia.org/w/api.php?action=query&titles=&prop=revisions&rvprop=content&format=json

const API_URL = "https://en.wikipedia.org/w/api.php/w/api.php?action=opensearch&format=json&search=";
const CORS = "https://cors-anywhere.herokuapp.com/";


function search() {
  const searchTerm = document.getElementById('searchTerm').value;
  const urlToFetch = `${CORS}${API_URL}${searchTerm}`;
  const result = fetch(urlToFetch)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      const result = {
        names: responseJson[1],
        description: responseJson[2],
        urls: responseJson[3]
      };
      const ul = document.querySelector('ul');

      for (var i = 0; i < responseJson[1].length; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const p = document.createElement('p');
        const hr = document.createElement('hr');
        const url = result.urls[i];
        const name = document.createTextNode(result.names[i]);
        const description = document.createTextNode(result.description[i]);

        a.setAttribute('href', url);
        a.setAttribute('target', 'blank');

        a.append(name);
        p.append(description);
        li.append(a);
        li.append(p);
        li.append(hr);
        ul.append(li);
      }
  });
  // console.log(result);
}
