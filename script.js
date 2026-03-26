function createDropdown() {
	    console.log("createDropdown function called");
    var fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        console.log("No file selected");
        return;
    }

    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
		console.log("File loaded successfully");
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[sheetName];

        var range = XLSX.utils.decode_range(worksheet['!ref']);
        var numRows = range.e.r;

        var names = [];
        for (var i = 2; i <= numRows + 1; i++) {
            var cell = worksheet['A' + i];
            if (cell && cell.v) {
                names.push(cell.v);
            }
        }

        var dropdown = document.getElementById('dropdown');
        dropdown.innerHTML = '';
        names.forEach(function(name) {
            var option = document.createElement('option');
            option.text = name;
            dropdown.add(option);
        });
		        // Change color of the Load button
        var loadButton = document.getElementById('loadButton');
        loadButton.classList.add('loaded'); // Add the 'loaded' class to change color
		console.log("Added 'loaded' class to button");
		
    };

    reader.readAsArrayBuffer(file);
}

// Function to open the modal
function openModal() {
	var fileInput = document.getElementById('fileInput');

	if (fileInput.files.length === 0) {
		console.log("No file selected");
		return;
	}

	var file = fileInput.files[0];
	var reader = new FileReader();

	reader.onload = function(e) {
		var data = new Uint8Array(e.target.result);
		var workbook = XLSX.read(data, { type: 'array' });
		var sheetName = workbook.SheetNames[0];
		var worksheet = workbook.Sheets[sheetName];
		var excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

		// Generate HTML table from the data
		var htmlTable = "<h2>---   Student Login Details Table   ---</h2><table>";
		for (var i = 0; i < excelData.length; i++) {
			htmlTable += "<tr>";
			for (var j = 0; j < excelData[i].length; j++) {
				htmlTable += "<td>" + excelData[i][j] + "</td>";
			}
			htmlTable += "</tr>";
		}
		htmlTable += "</table>";

		// Populate the modal with the HTML table
		var excelTable = document.getElementById("excelTable");
		excelTable.innerHTML = htmlTable;

		// Open the modal
		var modal = document.getElementById("myModal");
		modal.style.display = "block";

	};

	reader.readAsArrayBuffer(file);
}

// Function to handle file input change
function handleFileInputChange() {
	var loadButton = document.getElementById('loadButton');

	if (this.files.length === 0) {
		console.log("No file selected");
		return;
	}
openModal();
	// Change button color
	loadButton.style.backgroundColor = '#ffd700';
}

// Add event listener to file input element
document.addEventListener("DOMContentLoaded", function () {
    var fileInput = document.getElementById('fileInput');

    if (fileInput) {
        fileInput.addEventListener('change', function() {
            handleFileInputChange.call(this);
        });
    }
});

// Function to close the modal
function closeModal() {
	var modal = document.getElementById("myModal");
	modal.style.display = "none";
}

function openFileInput() {
    var fileInput = document.getElementById('fileInput');
    fileInput.click(); // Trigger the file input element to open the file selection dialog
}

function openCodePen() {
    window.open('https://codepen.io/pen', '_blank');
}


function loadExcel() {
  fetch("Worsfold_students.xlsx")   // make sure name is EXACT
    .then(res => res.arrayBuffer())
    .then(data => {
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const html = XLSX.utils.sheet_to_html(sheet);

      document.getElementById("excelTable").innerHTML =
        "<h2>--- Student Login ---</h2>" + html;

      document.getElementById("myModal").style.display = "block";
    })
    .catch(err => {
      console.error(err);
      alert("Excel file not found or path incorrect");
    });
}
