// Imports de fetch

import { getUser } from "/src/javascript/services/user.js";
import { getRepositories } from "/src/javascript/services/repositories.js";

// Imports de objeto

import { user } from "/src/javascript/objects/user.js";
import { screen } from "/src/javascript/objects/screen.js";

const button = document.getElementById("btn-search");
const input = document.getElementById("input-search");

button.addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  getUserData(userName);
});

input.addEventListener("keyup", (event) => {
  // keyup é o evento de apertar alguma tecla
  const userName = event.target.value; // e.target diz respeito ao própro eventListener e value pega seu valor
  const key = event.which || event.keyCode;
  const isEnterKeyPressed = key === 13; // O código da tecla Enter é 13

  if (isEnterKeyPressed) {
    // Se isEnterKeyPressed for igual a true (key === 13), a função getUserData é disparada, assim como quando clicamos no botão de buscar
    getUserData(userName);
  }
});

// >>> As funções de fetch se encontravam aqui antes da refatoração. Elas foram movidas para a pasta "src/javascript/services"

// >>> Com os dados em mão, agora criamos uma função para pegar o perfil do usuário:

async function getUserData(userName) {
  // Antigamente nomeada "getUserProfile", pois antes da refatoração era uma função para pegar os dados do usuário e outra função para pegar os repositórios (as funções antigas estão documentadas abaixo)
  const userResponse = await getUser(userName); // Ao invés de usar o then, na refatoração utilizamos o async e await e armazenamos a resposta em uma variável
  const repositoriesResponse = await getRepositories(userName);
  user.setInfo(userResponse); // Invocando a função criada dentro do objeto importado "user" e colocando as informações retornadas da promise acima dentro dela. Se dermos um console.log(user) veremos que agora temos o objeto user preenchido somente com as informações necessárias determinadas no arquivo "src/javascript/objects/user.js"
  user.setInfo(repositoriesResponse); // O comentário acima vale para esta função, que retorna os repositórios do usuário

  screen.renderUser(user);
}

/* >>> A função getUserData acima é resultado da refatoração das funções abaixo (getUserProfile e getUserRepositories):

  function getUserProfile(userName){
    getUser(userName).then((userData) => { // Aqui temos o retorno da promise, com as infos dos usuários. 
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

    getUserRepositories(userName); // A função getUserProfile (disparada ao apertar Enter ou clicar no botão "Buscar") já chamava a getUserRepositories abaixo
  })
}

>>> Função antiga de pegar repositórios, substituída na refatoração pela função getUserProfile

function getUserRepositories(userName) {
  getRepositories(userName).then((repositoriesData) => {
    let repositories = "";
    repositoriesData.forEach((repo) => {
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
} */
