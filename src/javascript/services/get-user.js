import { baseUrl } from "/src/javascript/variables.js";

async function getUser(userName) {
  const response = await fetch(`${baseUrl}/${userName}`);
  return await response.json();
}

export { getUser };
