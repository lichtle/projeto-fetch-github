const button = document.getElementById("btn-search");

button.addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  getUserProfile(userName);
});

async function user(userName) {
  const url = `https://api.github.com/users/${userName}`;
  const response = await fetch(url);
  return await response.json();
}

console.log(await user()); // Necessário dar um console.log ao invocar a função, além do await, para visualizar sua resposta no console

// >>> Com os dados em mão, agora criamos uma função para pegar o perfil do usuário:

function getUserProfile(userName) {
  user(userName).then((userData) => {
    // Aqui temos a resposta do fetch, da mesma forma que em console.log(await user());
    let userInfo = `<img src="${
      userData.avatar_url
    }" alt="Foto de perfil do usuário">
                    <div class="data">
                        <h1>${
                          userData.name ?? "Não possui nome de usuário. 😓"
                        }</h1>
                        <p>${
                          userData.bio ?? "Este usuário não possui bio. 😢"
                        }</p>
                    </div>`;

    document.querySelector(".profile-data").innerHTML = userInfo;
  });
}