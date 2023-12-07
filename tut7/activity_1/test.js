const makeRequest = async (location) => {
  return new Promise((resolve, reject) => {
    console.log(`Making request to ${location}`);
    if (location === "google") {
      resolve("Google say hi.");
    } else {
      reject(`We are not allowed to make requests to ${location}`);
    }
  });
};
const processRequest = async (response) => {
  return new Promise((resolve, reject) => {
    console.log("Process request");
    resolve(`Response: ${response}`);
  });
};

// makeRequest("googlee")
//   .then((response) => {
//     console.log("Response received");
//     console.log("makeResquest Resolve:" + response);
//     return processRequest(response);
//   })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

async function app() {
  try {
    const response = await makeRequest("google");
    const processResponse = await processRequest(response);
    console.log(response);
    console.log(processResponse);
  } catch (error) {
    console.log(error);
  }
}

app();
