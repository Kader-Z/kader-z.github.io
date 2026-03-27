			//document.getElementById("demo3").innerHTML = "JS file";
	document.addEventListener('contextmenu', event => event.preventDefault());
	document.onkeydown = function (e) {
        return false;
	}
	var i = 0;
		function Home() {
			document. location. reload();
	}		
		function F1(s) {
		document.getElementById("count").innerHTML = 999  ;
		//document.getElementById("count").value = i  ;
	}
	
	var i = 0;
	var GIF_ims = 93;
	var JPGcount = 0;
	var Y = 0;
	var  JPG_ims = 162;
	var GIFcount = 0;
	
	function JPG(folder, type_, Y) {
			JPGcount=JPGcount+Y	
			if (JPGcount > JPG_ims) {
				JPGcount = 1;
			} else if (JPGcount < 1) {	
				JPGcount= JPG_ims
			} 
		document.body.style.backgroundImage = "url("+folder+"/"+JPGcount+"."+type_+")";
		document.getElementById("jpg").innerHTML = JPGcount;
	}

	function GIF(folder, type_, Y) {

			GIFcount=GIFcount+Y	
			if (GIFcount > GIF_ims) {
				GIFcount = 1;
			} else if (GIFcount < 1) {	
				GIFcount= GIF_ims
			} 
		document.body.style.backgroundImage = "url("+folder+"/"+GIFcount+"."+type_+")";
		document.getElementById("gif").innerHTML = GIFcount;
	}
	function setSharedVar() {
      var sharedVar = document.getElementById('sharedVar').value;
      localStorage.setItem('sharedVar', sharedVar);
    }
	
	function getSharedVar() {
    var sharedVar = localStorage.getItem('sharedVar');
    document.getElementById('displayVar').textContent = sharedVar
      ? 'Shared Variable: ' + sharedVar
      : 'Shared Variable not set';
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
