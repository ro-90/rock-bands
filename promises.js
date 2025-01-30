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


const getImage = async () => {
    try {
        const headers = {
            "x-api-key": "live_6EqiSEU8yr7y2u2KY8TBM3nQOYxTnMyKglEO1QwPx4BrzIyzYAQjnhbBmg2HpkIQ",
        };

        const response = await fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", { headers })
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Error en la peticion");
    }
}

getImage().then((data) => console.log(data)).catch((error) => console.log(error));