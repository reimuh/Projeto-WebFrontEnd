window.onload = function () {
    const searchToggle = document.getElementById("busca-toggle");
    const searchBox = document.getElementById("caixa-busca");
  
    if (!searchToggle || !searchBox) {
      console.error("Elementos da busca não encontrados!");
      return;
    }
  
    searchToggle.addEventListener("click", function (event) {
      event.preventDefault();
      searchBox.classList.toggle("active");
    });
  
    document.addEventListener("click", function (event) {
      if (
        !searchBox.contains(event.target) &&
        !searchToggle.contains(event.target)
      ) {
        searchBox.classList.remove("active");
      }
    });
  };
  