const user = {
  avatarUrl: "",
  name: "",
  bio: "",
  userName: "",
  repositories: [],
  setInfo(gitHubUser) {
    this.avatarUrl = gitHubUser.avatar_url; // Perceba que a chave é escrita em camel case e seu valor é escrito da mesma forma que veio na promise
    this.name = gitHubUser.name;
    this.bio = gitHubUser.bio;
    this.userName = gitHubUser.login;
  },
  setRepositories(repositories) {
    this.repositories = repositories;
  },
};

export { user };
