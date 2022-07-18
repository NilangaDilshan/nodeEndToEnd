/* 
    Refactor CallBack to Promises
 */
console.log("Before");

getUser(1).then((user) => {
  console.log("User: ", user);
  getRepositories(user.gitHubUserName).then((repos) => {
    console.log("Repos: ", JSON.stringify(repos));
  });
});

getUser(1)
  .then((user) => getRepositories(user.gitHubUserName))
  .then((repos) => console.log("Repos: ", JSON.stringify(repos)))
  .catch((err) => console.log("Error: ", err.messge));

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from database");
      resolve({ id: id, gitHubUserName: "Mosh" });
    }, 2000);
  });
}

function getRepositories(userName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading GIT Repositories");
      resolve({ userName: userName, repos: ["repo1", "repo2", "repo3"] });
    });
  });
}
