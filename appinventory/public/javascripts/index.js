var element = document.getElementById('pivotBtn');
element.addEventListener("click", function(e) {
    var x = document.getElementById("idnormal");
    var z = document.getElementById("idpivot");
    if (z.style.display === "none") {
        x.style.display = "none";
        z.style.display = "table";
        document.getElementById('pivotBtn').innerHTML = "To Normal Table";
    } else {
        z.style.display = "none";
        x.style.display = "table";
        document.getElementById('pivotBtn').innerHTML = "To Pivot Table";
    }
}, false);