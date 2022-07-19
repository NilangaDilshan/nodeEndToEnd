/* Creating fixed promises promises. This is useful for unit test scenarios*/
const p1 = Promise.resolve({ id: 1 });
p1.then((result) => console.log("Result: ", result));

const p2 = Promise.reject(new Error("Reason for rejection"));
p2.catch((error) => console.log("Result: ", error));

/* Handling multiple promises */
const async1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Asynchronous operation 1: ", new Date());
    //resolve(1);
    reject(new Error("Reject test error!"));
  }, 2000);
});

const async2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Asynchronous operation 2: ", new Date());
    resolve(2);
  }, 2000);
});

Promise.all([async1, async2])
  .then((result) => console.log("Result Complete: ", result))
  .catch((error) => console.log("Error: ", error));

/* Handling asynchronous first operation completes */
const async3 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Asynchronous operation 3: ", new Date());
    resolve(3);
  }, 2000);
});

const async4 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Asynchronous operation 4: ", new Date());
    resolve(4);
  }, 2000);
});

Promise.race([async3, async4])
  .then((result) => console.log("Race Completes: ", result))
  .catch((error) => console.log("Error: ", error));
