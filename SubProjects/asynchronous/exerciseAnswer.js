function getCustomer(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Mosh Hamedani",
        isGold: true,
        email: "email@email.com",
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Email: ", email, " Movies: ", JSON.stringify(movies));
      resolve();
    }, 4000);
  });
}

async function callAsyncWithSynchronous() {
  const customer = await getCustomer(1);
  if (customer.isGold) {
    console.log("Customer is gold!");
    const topMovies = await getTopMovies();
    await sendEmail(customer.email, topMovies); //Not assigned to variable since no resolve value assigned
  }
}

callAsyncWithSynchronous();
