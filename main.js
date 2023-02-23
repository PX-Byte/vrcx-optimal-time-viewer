import './style.css'

let fileinput = document.getElementById("dropzone-file");

fileinput.ondragover = () => { return false; };
fileinput.ondragend = () => { return false; };
fileinput.ondrop = (e) => {
  e.preventDefault();
  inputFileRecived(e.dataTransfer.files);
}

function inputFileRecived(files) {

  if (files.length != 1) {
    alert("Sorry, but you can only put one file")
    return;
  }

  fileinput.className = "hidden";
  
  let file = files[0];
  let reader = new FileReader();

  reader.onload = (evt) => {
    readData(evt.target.result);
  }
  reader.readAsText(file);
}

/**
 * 
 * @param {string} data 
 */
function readData(data) {
  console.log(data)

  // replace windows crlf to unix lf
  data = data.split("\r").join("");

  if (data.slice(0, 6) != "bucket") {
    alert("Invalid input file");
  }

  // separate by lines and columns by \t --> https://github.com/zkxs/vrcx-optimal-time/blob/5033331996224321dbf231791e055aaa5b06f20d/src/main.rs#L312
  let parsedData = data.split("\n") // parse rows
  if (parsedData.at(-1) == "") parsedData.pop(); // This remove empty end of line
  parsedData = parsedData.map((ln) => ln.split("\t")) // parse columns

  /** DATA FORMATING FOR HEADERS */

  // Get times list
  let times = parsedData.map((value, index) => value[0]);
  times.shift(); // Remove first element (csv header)

  // Get days
  let days = parsedData[0];
  days.shift();

  /** Chart builder */

  

  
  

  debugger;
  
}
