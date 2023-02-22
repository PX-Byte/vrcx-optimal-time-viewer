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

  debugger;
  
}
