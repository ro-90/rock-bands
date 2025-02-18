console.log("Aca en la vista de profile")

const selectProvincias = document.getElementById("provincia");

selectProvincias.addEventListener("change", async (e) => {
    console.log("valor captura del select", e);
    try {
        const response = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${e.target.value}&max=500`);
        const data = await response.json();
        const localidades = data.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre));
        const selectLocalidades = document.getElementById("localidad");
        selectLocalidades.innerHTML = ""; //Limpia las opciones anteriores
        localidades.forEach(municipio => {
            const option = document.createElement("option");
            option.value = municipio.id;
            option.text = municipio.nombre;
            selectLocalidades.appendChild(option);
        });

    } catch { error => console.log(error) }
});