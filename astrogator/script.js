const pastLaunchesURL = 'https://api.spacexdata.com/v3/launches/past';

const loadingAnimation = '<div class="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';

function createPastLaunchesItem(flightNumber,
                    name,
                    imgUrl,
                    date,
                    status,
                    site,
                    rocket,
                    details,
                    youtubeUrl,
                    articleUrl) {

  const ul = document.querySelector('#launches');
  ul.innerHTML += `
    <li>
      <div class=name>${flightNumber}. ${name}</div>
      <div class="row">
        <div class="col-xs-3 pic" style="background-image: url('${imgUrl}')"></div>
        <div class="col-xs-9 info">
          <div class="row date">
            <div class="col-xs-6">${date}</div>
            <div class="col-xs-5 col-xs-offset-1 status ${status}">${status}</div>
          </div>
          <div class="row site">
            <div class="col-xs-3">Site:</div>
            <div class=col-xs-9 id=site>${site}</div>
          </div>
          <div class="row rocket">
            <div class=col-xs-3>Rocket:</div>
            <div class=col-xs-9 id=rocket>${rocket}</div>
          </div>
        </div>
      </div>
      <div class="row details">
        <div>${details}</div>
      </div>
      <div class="row links">
        <a href="${youtubeUrl}" target=_blank>
          <div class="col-xs-4 col-xs-offset-1">
            <span class="glyphicon glyphicon-facetime-video"></span>
            Youtube
          </div>
        </a>
        <a href="${articleUrl}" target=_blank>
          <div class="col-xs-4 col-xs-offset-2">
            <span class="glyphicon glyphicon-globe"></span>
            Article
          </div>
        </a>
      </div>
    </li>
  `
}

function renderPastLaunches() {
  const app = document.querySelector('.app');
  let h3 = document.createElement('h3');
  let ul = document.createElement('ul');
  h3.append('Past SpaceX Launches');
  ul.setAttribute('id', 'launches');
  app.append(h3);
  app.append(ul);

  ul.innerHTML = loadingAnimation;

  fetch(pastLaunchesURL)
  .then(response => {
    return response.json();
  })
  .then(jsonResponse => {
    ul.innerHTML = "";
    jsonResponse.map(flight => {
      let date = flight.launch_date_utc.split("T");
      date[1] = date[1].substring(0, date[1].length - 8);
      date = date.join(" ");
      const status = flight.launch_success ? "SUCCESS" : "FAIL";
      const details = flight.details ? flight.details : "No details to show";

      createPastLaunchesItem(
        flight.flight_number,
        flight.mission_name,
        flight.links.mission_patch_small,
        date,
        status,
        flight.launch_site.site_name,
        flight.rocket.rocket_name,
        details,
        flight.links.video_link,
        flight.links.article_link
      );
    });
  });
}
