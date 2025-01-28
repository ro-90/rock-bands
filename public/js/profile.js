console.log("Aca en la vista de profile")

const selectProvincias = document.getElementById("provincias");

selectProvincias.addEventListener("change", async (e) => {
    console.log(e.target.value);
    try {
        const localidades = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${e.target.value}`)
        const data = await response.json();
        console.log(data.localidades);
        const selectLocalidades = document.getElementById("localidades");
        selectLocalidades.innerHTML = "";
        data.localidades.forEach(municipio => {
            const option = document.createElement("option");
            option.value = municipio.id;
            option.text = municipio.nombre;
            selectLocalidades.appendChild(option);
        });

    } catch { error => console.log(error) }
});