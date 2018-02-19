document.querySelector('input').addEventListener('input', event => {
  search();
});

const streamers = [
	"ESL_SC2",
	"OgamingSC2",
	"cretetion",
	"freecodecamp",
	"storbeck",
	"habathcx",
	"RobotCaleb",
	"noobs2ninjas",
  "MrLlamaSC",
  "Starladder_CS_en",
  "PGL",
  "starladder_cs_en2"
];

const streamsUrl = "https://wind-bow.glitch.me/twitch-api/streams/";
const usersUrl = "https://wind-bow.glitch.me/twitch-api/users/";
let streamersInfo = [];

streamers.map(async name => {
  const userUrl = `${usersUrl}${name}`;
  let streamingInfo = await checkStreaming(name);

  await fetch(userUrl)
  .then(response => {
    return response.json();
  })
  .then(jsonResponse => {
    const name = jsonResponse.display_name;
    const logo = jsonResponse.logo;
    const channelUrl = `https://www.twitch.tv/${name}`;

    //Push objects into array for filtering
    streamersInfo.push({
      name: name,
      logo: logo,
      channelUrl: channelUrl,
      streamingInfo: streamingInfo
    });

    createItem(name, logo, channelUrl, streamingInfo);
  });
});



function checkStreaming(channel) {
  const streamUrl = `${streamsUrl}${channel}`;
  return fetch(streamUrl)
    .then(response => {
      return response.json();
    })
    .then(jsonResponse => {
      const stream = jsonResponse.stream;
      let streamInfo = {};
      if (stream != null) {
        streamInfo.name = stream.game;
        streamInfo.status = stream.channel.status;
        return streamInfo;
      } else {
        return 0;
      }
    })
    .then(streamInfo => {
      return streamInfo;
    });
}

function search() {
  const input = document.querySelector('input').value;
  document.querySelector('ul').innerHTML = '';
  streamersInfo.map(info => {
    const lower = info.name.toLowerCase();
    if (lower.startsWith(input)) {
      createItem(info.name, info.logo, info.channelUrl, info.streamingInfo);
    }
  });
}

function createItem(name, logo, url, stream) {
  const ul = document.querySelector('ul');
  // Create elements
  const li = document.createElement('li'),
        a = document.createElement('a'),
        a2 = document.createElement('a'),
        img = document.createElement('img'),
        div = document.createElement('div'),
        a3 = document.createElement('a'),
        span1 = document.createElement('span'),
        span2 = document.createElement('span');

  // Set image element attributes and append elements
  a.setAttribute('target', 'blank');
  a.setAttribute('href', url);
  a2.setAttribute('target', 'blank');
  a2.setAttribute('href', url);
  img.setAttribute('src', logo);
  a3.setAttribute('target', 'blank');
  a3.setAttribute('href', url);

  a.append(img);
  a2.append(name);
  div.append(a2);

  if (stream != 0) {
    span1.style = "color: green";
    span2.style = "color: green";
    span1.append(stream.name);
    span2.setAttribute('class', "glyphicon glyphicon-facetime-video");
  } else {
    span1.append("Offline");
    span2.setAttribute('class', "glyphicon glyphicon-facetime-video");
  }

  a3.append(span2);
  a3.append(span1);
  div.append(a3);
  if (stream != 0) {
    const p = document.createElement('p');
    p.append(stream.status);
    div.append(p);
  }
  li.append(div);
  li.append(a);

  div.setAttribute('class', 'info');
  // div.append(a)
  li.append(div);
  ul.append(li);
}

function display(filter) {
  document.querySelector('ul').innerHTML = '';
  streamersInfo.map(channel => {
    if (filter === "Online") {
        if (channel.streamingInfo != 0) {
          createItem(channel.name, channel.logo, channel.channelUrl, channel.streamingInfo);
        }
    } else if (filter === "Offline") {
        if (channel.streamingInfo === 0) {
          createItem(channel.name, channel.logo, channel.channelUrl, channel.streamingInfo);
        }
    } else {
        createItem(channel.name, channel.logo, channel.channelUrl, channel.streamingInfo);
    }
  });
}

function filterOut(event) {
  const btnArray = Array.prototype.slice.call(event.parentElement.children);
  btnArray.map(child => {
    child.classList.remove('btn-primary');
    child.classList.add('btn-default');
  });

  event.classList.remove('btn-default');
  event.classList.add('btn-primary');

  display(event.innerText);
}
