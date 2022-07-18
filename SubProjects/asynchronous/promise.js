const baseLine = true;

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve(1);
    if (baseLine) {
      resolve("Success!");
    } else {
      reject(new Error("Error!"));
    }
  }, 2000);
  //resolve(1); // this is to give back the result to consumer
  // reject(new Error("message"));  //This is when error occurs and inform the consumer
});

p.then((result) => console.log("Result: ", result)).catch((error) =>
  console.log("Error: ", error.message)
);
