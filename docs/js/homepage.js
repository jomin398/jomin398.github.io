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

function guiInit(gui, helper, guiChanged, SKE, chrC, efC) {
  const bkSky = gui.addFolder('backgroud Sky Setup');
  bkSky.add(SKE, 'turbidity', 0.0, 20.0, 0.1).onChange(guiChanged);
  bkSky.add(SKE, 'rayleigh', 0.0, 4, 0.001).onChange(guiChanged);
  bkSky.add(SKE, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(guiChanged);
  bkSky.add(SKE, 'mieDirectionalG', 0.0, 1, 0.001).onChange(guiChanged);
  bkSky.add(SKE, 'elevation', 0, 90, 0.1).onChange(guiChanged);
  bkSky.add(SKE, 'azimuth', -180, 180, 0.1).onChange(guiChanged);
  bkSky.add(SKE, 'exposure', 0, 1, 0.0001).onChange(guiChanged);

  const chrSetup = gui.addFolder('character Visual Setup');
  chrSetup.add(chrC, 'animation').onChange(function () {
    helper.enable('animation', chrC.animation);
  });
  chrSetup.add(chrC, 'ik').onChange(function () {
    helper.enable('ik', chrC.ik);
  });
  chrSetup.add(chrC, 'outline').onChange(function () {
    effect.enabled = chrC.outline;
  });
  chrSetup.add(chrC, 'physics').onChange(function () {
    helper.enable('physics', chrC.physics);
  });
  chrSetup.add(chrC, 'show IK bones').onChange(function () {
    ikHelper.visible = chrC['show IK bones'];
  });
  chrSetup.add(chrC, 'show rigid bodies').onChange(function () {
    if (physicsHelper !== undefined) physicsHelper.visible = chrC['show rigid bodies'];
  });
  chrSetup.add(chrC, "afterglow", 0, 10, 0.01).onChange(function () {
    helper.afterglow = chrC.afterglow;
  })
  gui.add(efC, 'sky').onChange(guiChanged);
  gui.add(efC, 'fpsShow').onChange(guiChanged);
  gui.add(efC, 'infoShow').onChange(guiChanged);
  gui.add(efC, 'physics Reset');
};
function onXhrLoadLog(xhr) {
  if (xhr.lengthComputable) {
    const percentComplete = xhr.loaded / xhr.total * 100;
    const precent = Math.round(percentComplete, 2);
    const reqName = xhr.target.responseURL;
    const fType = reqName.replace(/.*\/assets\/(models\/)?(mmd|songs)?\/(.*)/gm, "$2");
    const fName = decodeURI(reqName.replace(/.*\/assets\/(models\/)?(mmd|songs)?\/(.*)/gm, "$3"));
    console.log(fType + " -> " + fName + " is " + precent + '% downloaded');
  }
}
function songParamsSelfDefine(rf, sn) {
  this.fname = null;
  this.vmd = null;
  this.cam = null;
  this.song = null;
  this.vmdAuthor = null;
  this.camAuthor = null;
  this.vocalTranner = null;
  this.author = null;
  this.artist = null;
  this.delayTime = 0;

  let http = new XMLHttpRequest();
  let songFolder = rf + sn;
  http.open('HEAD', songFolder, false);
  http.send();
  let resp = http.response;
  let iscam = (el) => el.includes("Camera") || el.includes("camera");
  let isMotion = (el) => el.includes("Motion") || el.includes("motion");
  let isSong = (el) => el.includes(".mp3") || el.includes(".wav");
  // parse responce to make folder list
  if (resp.includes("addRow")) {
    //folder list
    let list = resp.split("addRow").splice(2, 3).map(e =>
      e.split(',')[0].split('(\"')[1].split('\"')[0]).filter(e => e.indexOf(".txt") == -1);
    
    //make tempate;
    this.fname = sn;
    this.vmd = "/" + list.filter(e => isMotion(e));
    this.cam = "/" + list.filter(e => iscam(e));
    this.song = "/" + list.filter(e => isSong(e));
    this.vmdAuthor = "[Unknown Author]";
    this.camAuthor = "[Unknown Author]";
    this.vocalTranner = "[Unknown Author]";
    this.author = "[Unknown Author]";
    this.artist = "[Unknown Artist]";
    this.delayTime = 0;
  } else {
    alert("Sorry, " + sn + " is Unsupport song. :(");
    throw new InternalError("Unsupport song, " + sn);
  }
}