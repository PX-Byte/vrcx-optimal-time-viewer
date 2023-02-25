import './style.css'
import Chart from 'chart.js/auto'

let fileinput = document.getElementById("dropzone-file");

fileinput.ondragover = () => { return false; };
fileinput.ondragend = () => { return false; };
fileinput.ondrop = (e) => {
  e.preventDefault();
  inputFileRecived(e.dataTransfer.files);
}
document.getElementById("file-input").addEventListener('change', (e) => {
  e.preventDefault();
  inputFileRecived(e.target.files);
});

function inputFileRecived(files) {

  if (files.length != 1) {
    alert("Sorry, but you can only put one file")
    return;
  }

  fileinput.className = "hidden";

  let file = files[0];

  if (file.type != "text/csv") {
    alert("Sorry but file shound be csv format (separated by tabs)")
    return;
  }
  let reader = new FileReader();

  reader.onload = (evt) => readData(evt.target.result);
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
  let days = parsedData[0].map((v, i) => getColum(parsedData, i));
  days.shift(); // Remove bucket day

  /** Chart builder */

  let datasets = days.map((v, i) => {
    return {
      type: 'line',
      label: v[0],
      data: v.filter((_, i) => i != 0),
      tension: 0.1,
      pointRadius: 0
    }
  })

  const mixedChart = new Chart(document.getElementById("myChart"), {
    data: {
      datasets: datasets,
      labels: times
    },
    options: {
      responsive: true,
      interaction: {
        intersect: false
      },
      plugins: {
        tooltip: {
          enabled: false
        },
        subtitle: {
          text: "Click week name to enable or disable it",
          align: "center",
          display: true,
          position: 'top'
        }
      }
    }
  });
}

/**
 * 
 * @param {string[[]]} datasets 
 * @param {number} numCol 
 */
function getColum(dataset, numCol) {
  return dataset.map((row, index) => row[numCol]);
}
