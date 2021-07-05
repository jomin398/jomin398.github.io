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
  function hidShow(str){
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
    iconnode.className = "fas fa-hourglass-start";//fas fa-exclamation-triangle
    document.getElementById("batteryLevel").appendChild(iconnode);
    let node = document.getElementById("batteryLevel");
    node.style.color = "white";
    node.style.backgroundColor = "transparent";
    // node.style.width = 0;
    node.style.display = "block";
    let dropdownMenu = document.createElement("ul");
    dropdownMenu.className = 'dropdown';
    dropdownMenu.innerHTML = "<label><input type='checkbox' name='use-internal-bms' value='false' onclick='onBMSSetupChange();'> use Internal</label>";
    document.querySelector("ul.menu li:nth-child(4)").appendChild(dropdownMenu);
    bmsInit();
  }
  function bmsInit(str){
    if(!str) str = '';
    console.info("BMS "+str+"Init....");
    console.log(document.querySelector(".dropdown label input").checked);
    let show = null;
    show = setTimeout(() => {
      if (!battery) {
        console.info("BMS LOAD Failed.");
        console.log(document.querySelector(".mein-header ul li a.batteryContainer").dataset.useInternalBms);
        document.querySelector("#batteryLevel i").id = "onerror";
        document.querySelector("#batteryLevel i").className = "fas fa-exclamation-triangle";
        document.querySelector(".batteryLevel.text").textContent = "LoadError";
        clearTimeout(show);
      }
      console.log("BMS tout Finished.");
    }, 6000);
  }
  function onBMSSetupChange(){
    document.querySelector(".mein-header ul li a.batteryContainer").dataset.useInternalBms =document.querySelector(".dropdown label input").checked;
    bmsInit("RE ");
  }
  function displaySongInfo(songname,songParams,chrChoiced){
    document.querySelector("#info a#songName").innerText = "SongName : " + songname;
    document.querySelector("#info a#songAuthor").innerText = songParams.author;
    document.querySelector("#info a#artistName").innerText = "Artist : " + (songParams.artist == "初音ミク") ? songParams.artist + " (VocalTranned by " + songParams.vocalTranner + ")" : songParams.artist;
    document.querySelector("#info a#songDencer").innerText = "songDencer : " + mmdsetUpData[chrChoiced].fname.replace(/\/|\.pmd?x?/gm, "");
  }
  init();