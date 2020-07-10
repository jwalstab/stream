function loadMovies() {
    fetch('/getmovielist')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(title => {
                //title = title.split('.')[0]
                //var myNode = document.createElement("button");
                //var myText = document.createTextNode('' + title);
                //myNode.appendChild(myText);
                //document.getElementById('list').appendChild(myNode);
                var myTable = document.getElementById('movietable');
                var newRow = myTable.insertRow();
                var newCell = newRow.insertCell(0);
                var inputElement = document.createElement('input');
                newCell.innerHTML = '<button>'+ title + '</button>'
                newCell.addEventListener('click', function () {
                    ChangeMovie(title);
                });
            });
        });
}


//<button> test</button>