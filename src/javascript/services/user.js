import { baseUrl } from "/src/javascript/variables.js"; // Importando a variável para ser usada no ${}

async function getUser(userName) {
  const url = `${baseUrl}/${userName}`;
  const response = await fetch(url);
  return await response.json();
}

export { getUser };
