const fetchUrl = 'https://newsapi.org/v2/everything?sources=bbc-news,mirror&q=brexit&sortBy=publishedAt&apiKey=ab39bcbaefda4f2ba6d31773baefa072';
var countDownDate = new Date("Jan 31, 2020 23:00:00").getTime();

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
    document.getElementById("days").innerHTML = "Brexit time";
    document.getElementById("time").innerHTML = "Expired";
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
    if (daysStr[daysStr.length - 1] == "1" && days > 11 || days == 1) {
    	return "day";
    } else {
    	return "days";
    }
};

function createItem(publishedAt, title, description, source, url, urlToImage) {
  const ul = document.querySelector('ul');
  // Create elements
  const li = document.createElement('li');
  li.innerHTML = `<a href="${url}" target=_blank>
                    <div class="container">
                      <div class="row top-row">
                        <div class="col-xs-6 date">${publishedAt}</div>
                        <div class="col-xs-6 source">${source}</div>
                      </div>
                      <div class="row description">
                        <div class="imgDiv col-xs-4" style="background-image: url('${urlToImage}')"></div>
                        <div class="col-xs-8">
                          <p class=title>${title}</p>
                          <p class=desc>${description}</p>
                        </div>
                      </div>
                    </div>
                  </a>`;
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
