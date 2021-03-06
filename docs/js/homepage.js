function LinkCheck(url) {
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  return http.status != 404;
}
const FileCheack = (url) => LinkCheck(url);

function menuSwap(arr) {
  if (!arr) {
    throw new ReferenceError("arr is cannot be null.")
  } else if (!Array.isArray(arr)) {
    throw new ReferenceError("arr is not Array")
  }
  var x = document.getElementById(arr[0]);
  if (x.className === arr[1]) {
    x.className += arr[2];
  } else {
    x.className = arr[1];
  }
}

function hidShow(str) {
  var x = document.querySelector(str);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
var battery = null;

function init() {
  let iconnode = document.createElement("i");
  iconnode.className = "fas fa-hourglass-start"; //fas fa-exclamation-triangle
  document.getElementById("batteryLevel")
    .appendChild(iconnode);
  let node = document.getElementById("batteryLevel");
  node.style.color = "white";
  node.style.backgroundColor = "transparent";
  // node.style.width = 0;
  node.style.display = "block";
  let dropdownMenu = document.createElement("ul");
  dropdownMenu.className = 'dropdown';
  dropdownMenu.innerHTML = "<label><input type='checkbox' name='use-internal-bms' value='false' onclick='onBMSSetupChange();'> use Internal</label>";
  document.querySelector("ul.menu li:nth-child(4)")
    .appendChild(dropdownMenu);
  bmsInit();
}

function bmsInit(str) {
  if (!str) str = '';
  console.info("BMS " + str + "Init....");
  console.log(document.querySelector(".dropdown label input")
    .checked);
  let show = null;
  show = setTimeout(() => {
    if (!battery) {
      console.info("BMS LOAD Failed.");
      console.log(document.querySelector(".mein-header ul li a.batteryContainer")
        .dataset.useInternalBms);
      document.querySelector("#batteryLevel i")
        .id = "onerror";
      document.querySelector("#batteryLevel i")
        .className = "fas fa-exclamation-triangle";
      document.querySelector(".batteryLevel.text")
        .textContent = "LoadError";
      clearTimeout(show);
    }
    console.log("BMS tout Finished.");
  }, 6000);
}

function onBMSSetupChange() {
  document.querySelector(".mein-header ul li a.batteryContainer")
    .dataset.useInternalBms = document.querySelector(".dropdown label input")
      .checked;
  bmsInit("RE ");
}

function displaySongInfo(songname, songParams, chrChoiced) {
  document.querySelector("#info a#songName")
    .innerText = "SongName : " + songname;
  document.querySelector("#info a#songAuthor")
    .innerText = songParams.author;
  let text = songParams.artist;
  if (songParams.artist == "初音ミク") {
    if (songParams.vocalTranner) {
      text += " (VocalTranned by " + songParams.vocalTranner + ")";
    }
  }
  document.querySelector("#info a#artistName")
    .innerText = "Artist : " + text;
  document.querySelector("#info a#songDencer")
    .innerText = "songDencer : " + mmdsetUpData[chrChoiced].fname.replace(/\/|\.pmd?x?/gm, "");
}
init();

function pageInit() {
  let chrlist = Object.keys(mmdsetUpData)
    .slice(0, -1);
  let songlist = Object.keys(mmdsetUpData.songParams);
  let chrSelectWraper = document.createElement("select");
  chrSelectWraper.id = "characters";
  for (let i in chrlist) {
    let choices = document.createElement("option");
    choices.id = i;
    choices.innerText = chrlist[i];
    if (i == 0) {
      choices.setAttribute('selected', 'selected');
    }
    chrSelectWraper.appendChild(choices);
  }
  let songSelectWraper = document.createElement("select");
  songSelectWraper.id = "songs";
  for (let i in songlist) {
    let choices = document.createElement("option");
    choices.id = i;
    choices.innerText = songlist[i];
    if (i == 0) {
      choices.setAttribute('selected', 'selected');
    }
    songSelectWraper.appendChild(choices);
  }
  document.getElementById("setup")
    .append(document.createElement("label")
      .innerText = "Choose a charactor : ", chrSelectWraper, document.createElement("br"), document.createElement("label")
        .innerText = "Choose a song : ", songSelectWraper)
}

function onXhrLoadLog(xhr) {
  if (xhr.lengthComputable) {
    const percentComplete = xhr.loaded / xhr.total * 100;
    const precent = Math.round(percentComplete, 2);
    const reqName = xhr.target.responseURL;
    
    const fName = decodeURI(reqName.replace(/.*\/assets\/models\/(mmd|songs)?\/(.*)/gm, "$2"));
    const fNameLo = fName.toLowerCase();
    const fType = (fNameLo.includes('.pmx')|fNameLo.includes( '.pmd')) ? "Character model" : (fNameLo.includes("camera")) ? "Camera motion" : (fNameLo.includes('motion')|fNameLo.includes('.vmd')) ? "Model motion" : (fNameLo.includes('.mp3')|fNameLo.includes('.wav')) ? "Song" : "Unknown";
    console.log(fType + " -> " + fName + " is " + precent + '% downloaded');
  }
}

function errorDisplay(data) {
  //#display-error <i class="far fa-exclamation-triangle"></i>
  let eew = document.createElement("div");
  eew.id = "errorWrapper";
  let tnode = document.createTextNode("Error Display");
  tnode.addEventListener("click", function(){document.getElementById("errorWrapper").style.display = "none"});
  let ee = document.createElement("div");
  ee.id = "display-error";
  let ttnode = document.createTextNode(data);
  ee.appendChild(ttnode)
  let ei = document.createElement("i");
  ei.className = "fas fa-exclamation-triangle";
  eew.append(tnode);
  ee.appendChild(ei);
  eew.append(ee);
  document.body.appendChild(eew);
}