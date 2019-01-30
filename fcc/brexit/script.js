const fetchUrl = 'https://newsapi.org/v2/everything?sources=bbc-news,mirror&q=brexit&from=2019-01-01&sortBy=publishedAt&apiKey=ab39bcbaefda4f2ba6d31773baefa072';
const article = {
  publishedAt: '2019-01-30T06:47:78Z',
  title: "Scotland's papers: May's 'mandate' for new Brexit talks",
  description: "Most papers lead with Theresa May securing the backing of MPs to renegotiate her Brexit deal.",
  source: "BBC News",
  url: "https://www.bbc.co.uk/news/uk-scotland-47053444",
  urlToImage: "https://ichef.bbci.co.uk/news/1024/branded_news/14153/production/_105395228_herald-page-001.jpg"
};
var countDownDate = new Date("Mar 29, 2019 23:00:00").getTime();

var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  document.getElementById("days").innerHTML = days + " " + checkDays(days);
  document.getElementById("time").innerHTML = checkTime(hours) + ":"
  + checkTime(minutes) + ":" + checkTime(seconds);

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

function checkTime(time) {
	if (time < 10) {
    	return "0" + time.toString();
    } else {
    	return time
	}
};

function checkDays(days) {
	var daysStr = days.toString();
    if (daysStr[1] == "1") {
    	return "day";
    } else {
    	return "days";
    }
};

function createItem(publishedAt, title, description, source, url, urlToImage) {
  const ul = document.querySelector('ul');
  // Create elements
  const li = document.createElement('li'),
        containerDiv = document.createElement('div'),
        topRowDiv = document.createElement('div'),
        dateDiv = document.createElement('div'),
        sourceDiv = document.createElement('div'),
        descriptionDiv = document.createElement('div'),
        imgDiv = document.createElement('div'),
        textDiv = document.createElement('div'),
        titleP = document.createElement('p'),
        descP = document.createElement('p'),
        articleDiv = document.createElement('div'),
        articleA = document.createElement('a')

  containerDiv.setAttribute("class", 'container');

  topRowDiv.setAttribute("class", 'row top-row');
  dateDiv.setAttribute("class", 'col-xs-6 date');
  sourceDiv.setAttribute("class", 'col-xs-6 source');
  dateDiv.append(publishedAt);
  sourceDiv.append(source);
  topRowDiv.append(dateDiv);
  topRowDiv.append(sourceDiv);

  descriptionDiv.setAttribute("class", 'row description');
  imgDiv.setAttribute("class", 'imgDiv col-xs-4');
  imgDiv.style = `background-image: url(${urlToImage})`;
  textDiv.setAttribute("class", 'col-xs-8');
  titleP.setAttribute("class", 'title');
  descP.setAttribute("class", 'desc');
  titleP.append(title);
  descP.append(description);
  textDiv.append(titleP);
  textDiv.append(descP);
  descriptionDiv.append(imgDiv);
  descriptionDiv.append(textDiv);

  articleDiv.setAttribute("class", 'row article');
  articleA.href = url;
  articleA.target = "_blank";
  articleA.append('Read full article');
  articleDiv.append(articleA);

  containerDiv.append(topRowDiv);
  containerDiv.append(descriptionDiv);
  containerDiv.append(articleDiv);

  li.append(containerDiv);
  ul.append(li);
}

fetch(fetchUrl)
  .then(response => {
    return response.json();
  })
  .then(jsonResponse => {
    jsonResponse.articles.map(article => {
      let date = article.publishedAt.split("T");
      date[1] = date[1].substring(0, date[1].length - 4);
      date = date.join(" ");

      createItem(date,
                article.title,
                article.description,
                article.source.name,
                article.url,
                article.urlToImage);
    })
  })
