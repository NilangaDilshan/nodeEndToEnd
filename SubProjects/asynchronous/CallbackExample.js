/* 
    CallBack How TO
 */
console.log("Before");

/* getUser(1, function (user) {
  console.log("User: ", user);
  getRepositories(user.gitHubUserName, displayRepositories);
}); */

getUser(1, displayUser);

console.log("After");

function displayUser(user) {
  console.log("User: ", user);
  getRepositories(user.gitHubUserName, displayRepositories);
}

function displayRepositories(repos) {
  //console.log(`Repos: ${repos}`);
  console.log("Repos: ", JSON.stringify(repos));
}
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from database");
    callback({ id: id, gitHubUserName: "Mosh" });
  }, 2000);
}

function getRepositories(userName, callback) {
  setTimeout(() => {
    console.log("Reading GIT Repositories");
    callback({ userName: userName, repos: ["repo1", "repo2", "repo3"] });
  }, 2000);
}
