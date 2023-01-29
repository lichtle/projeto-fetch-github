const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
  <img src="${user.avatarUrl}" alt="Foto de perfil do usuário"> 
  <div class="data">
    <h1>${user.name ?? "Não possui nome de usuário. 😓"}</h1>
    <p>${user.bio ?? "Este usuário não possui bio. 😢"}</p>
    <br>
    <p><span class="follow">Seguidores:</span> ${
      user.followers ?? "Este usuário não possui seguidores. 😢"
    } pessoas</p>
    <p><span class="follow">Seguindo:</span> ${
      user.following ?? "Este usuário não segue ninguém. 😓"
    } pessoas</p>
  </div>
</div>`;

    let repositoriesItems = "";

    user.repositories.forEach(
      (repo) =>
        (repositoriesItems += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`)
    );

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += ` <div class="repositories section">
                                        <h2>Repositórios</h2>
                                        <ul>${repositoriesItems}</ul>
                                      </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
