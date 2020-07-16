/* function loadMovies() {
    let rowCount = 0;
    fetch('/getmovielist')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(title => {
                var myTable = document.getElementById('movietable');
                var newRow = myTable.insertRow();
                var titleCell = newRow.insertCell(0);
                titleCell.innerHTML = '<button>'+ title + '</button>'
                titleCell.addEventListener('click', function () {
                    ChangeMovie(title);
                });
                var deleteCell = newRow.insertCell(1);
                deleteCell.innerHTML = '<button> DELETE </button>'
                deleteCell.addEventListener('click', function () {
                    DeleteMovie(title,);
                    let thisRow = rowCount;
                    myTable.deleteRow(thisRow);
                });
                rowCount++;
            });
        });
}


//<button> test</button> */