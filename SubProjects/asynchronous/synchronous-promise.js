/* 
How to handle Promises in a synchronous manner
 */

console.log("Before");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from database. DateTime: ", new Date());
      resolve({ id: id, gitHubUserName: "Mosh" });
    }, 2000);
  });
}

function getRepositories(userName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading GIT Repositories. DateTime: ", new Date());
      //resolve({ userName: userName, repos: ["repo1", "repo2", "repo3"] });
      reject(new Error("Could not read the git repository"));
    });
  });
}

/*  
await will run synchronous way. This will wait untill executing the next task. 
As a practice we put await method calls inside async function
We must handle async methods inside try catch blocks
*/
async function displayUserAndRepos() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUserName);
    console.log("Repos: ", JSON.stringify(repos));
  } catch (err) {
    console.error(err);
  }
}

displayUserAndRepos();

console.log("After");
