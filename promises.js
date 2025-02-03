// const promise = new Promise((resolve, reject) => {
//     const number = Math.floor(Math.random() * 10);
//     setTimeout(
//         () => number > 5 ? resolve(number) : reject(new Error("Menor a 5")),
//         1000
//     );
// });

// // const result = promise
// //     .then((number) => number)
// //     .catch((error) => console.log( "Error: ",error.message));

// async function getResult() {
//     try {
//         const result = await promise;
//         return result;
//     } catch (error) {
//         console.log("Error: ", error.message);
//         throw error;
//     }
// } 
// getResult().then((result) => console.log(result)).catch((error) => console.log(error.message));

fetch("https://apis.datos.gob.ar/georef/api/provincias").then((response) => {
    console.log(response);
}).catch((error) => {
    console.log("Error: ", error);
}); 