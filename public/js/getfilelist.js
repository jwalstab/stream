function loadMovies() {
    fetch('http://127.0.0.1/getmovielist')
  .then(response => response.json())
  .then(data => {
      console.log(data);
    });
}