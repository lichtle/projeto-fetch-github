const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    // Perceba que o método user abaixo (previamente populado no arquivo objects/user.js) é acompanhado de uma instrução em Camel Case, pois é assim que está escrito no objeto user (do arquivo objects/user.js)
    this.userProfile.innerHTML = `<div class="info">
  <img src="${user.avatarUrl}" alt="Foto de perfil do usuário"> 
  <div class="data">
    <h1>${user.name ?? "Não possui nome de usuário. 😓"}</h1>
    <p>${user.bio ?? "Este usuário não possui bio. 😢"}</p>
  </div>
</div>`;

    let repositoriesItems = ""; // Variável a ser populada com repositórios

    user.repositories.forEach((repo) => {
      repositoriesItems += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`;
    });

    if (repositoriesItems > 0) {
      // Condição para verificar se o usuário possui repositórios
      this.userProfile.innerHTML += ` <div class="repositories section>
                                        <h2>Repositórios</h2>
                                        <ul>${repositoriesItems}</ul>
                                      </div>`;
    }
  },
};

export { screen };
