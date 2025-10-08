window.onload = function () {
    const searchToggle = document.getElementById("search-toggle");
    const searchBox = document.getElementById("search-box");
  
    if (!searchToggle || !searchBox) {
      console.error("Elementos da busca não encontrados!");
      return;
    }
  
    // Clique na lupa
    searchToggle.addEventListener("click", function (event) {
      event.preventDefault();
      searchBox.classList.toggle("active");
    });
  
    // Fechar ao clicar fora
    document.addEventListener("click", function (event) {
      if (
        !searchBox.contains(event.target) &&
        !searchToggle.contains(event.target)
      ) {
        searchBox.classList.remove("active");
      }
    });
  };
  