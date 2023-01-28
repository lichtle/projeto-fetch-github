const button = document.getElementById("btn-search");
const input = document.getElementById("input-search");

button.addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  getUserProfile(userName);
});

input.addEventListener("keyup", (event) => {
  // keyup é o evento de apertar alguma tecla
  const userName = event.target.value; // e.target diz respeito ao própro eventListener e value pega seu valor
  const key = event.which || event.keyCode;
  const isEnterKeyPressed = key === 13; // O código da tecla Enter é 13

  if (isEnterKeyPressed) {
    // Se isEnterKeyPressed for igual a true (key === 13), a função getUserProfile é disparada, assim como quando clicamos no botão de buscar
    getUserProfile(userName);
  }
});

async function user(userName) {
  const url = `https://api.github.com/users/${userName}`;
  const response = await fetch(url);
  return await response.json();
}

async function repos(userName) {
  const url = `https://api.github.com/users/${userName}/repos`;
  const response = await fetch(url);
  return await response.json();
}

/* console.log(await user()); >>> Necessário dar um console.log ao invocar a função, além do await, para visualizar sua resposta no console */

// >>> Com os dados em mão, agora criamos uma função para pegar o perfil do usuário:

function getUserProfile(userName) {
  user(userName).then((userData) => {
    // Aqui temos a resposta do fetch, da mesma forma que em console.log(await user());
    let userInfo = `<div class="info">
                        <img src="${
                          userData.avatar_url
                        }" alt="Foto de perfil do usuário">
                        <div class="data">
                          <h1>${
                            userData.name ?? "Não possui nome de usuário. 😓"
                          }</h1>
                          <p>${
                            userData.bio ?? "Este usuário não possui bio. 😢"
                          }</p>
                        </div>
                    </div>`;

    document.querySelector(".profile-data").innerHTML = userInfo;

    getUserRepositories(userName);
  });
}

function getUserRepositories(userName) {
  repos(userName).then((reposData) => {
    let repositories = "";
    reposData.forEach((repo) => {
      // Esse parâmetro corresponde ao "item" do forEach
      repositories += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`; // Criará um li para cada item recebido
    });

    document.querySelector(
      ".profile-data"
    ).innerHTML += `<div class="repositories section">
                      <h2>Repositórios</h2>
                      <ul>${repositories}</ul>
                    </div>`;
    // += para concatenar com as informações já obtidas anteriormente pela função getUserProfile
  });
}
