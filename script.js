let spese = JSON.parse(localStorage.getItem("spese")) || [];

let filtri = {
    descrizione: "",
    min: null,
    max: null
};

function salvaDati() {
    localStorage.setItem("spese", JSON.stringify(spese));
}

function aggiungiSpesa() {
    const descrizione = document.getElementById("descrizione").value;
    const importo = parseFloat(document.getElementById("importo").value);

    if (!descrizione || isNaN(importo)) {
        alert("Inserisci dati validi");
        return;
    }

    spese.push({ descrizione, importo });
    salvaDati();
    aggiornaUI();

    document.getElementById("descrizione").value = "";
    document.getElementById("importo").value = "";
}

function eliminaSpesa(index) {
    spese.splice(index, 1);
    salvaDati();
    aggiornaUI();
}

function applicaFiltri() {
    filtri.descrizione = document.getElementById("filtroDescrizione").value.toLowerCase();
    filtri.min = parseFloat(document.getElementById("filtroMin").value) || null;
    filtri.max = parseFloat(document.getElementById("filtroMax").value) || null;

    aggiornaUI();
}

function resetFiltri() {
    filtri = { descrizione: "", min: null, max: null };

    document.getElementById("filtroDescrizione").value = "";
    document.getElementById("filtroMin").value = "";
    document.getElementById("filtroMax").value = "";

    aggiornaUI();
}

function aggiornaUI() {
    const lista = document.getElementById("listaSpese");
    lista.innerHTML = "";

    let totale = 0;

    spese.forEach((spesa, index) => {

        // FILTRI
        if (
            (filtri.descrizione && !spesa.descrizione.toLowerCase().includes(filtri.descrizione)) ||
            (filtri.min !== null && spesa.importo < filtri.min) ||
            (filtri.max !== null && spesa.importo > filtri.max)
        ) {
            return;
        }

        totale += spesa.importo;

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${spesa.descrizione}</span>
            <span>€${spesa.importo.toFixed(2)} 
            <span class="delete" onclick="eliminaSpesa(${index})">❌</span></span>
        `;
        lista.appendChild(li);
    });

    document.getElementById("totale").textContent = totale.toFixed(2);
}

aggiornaUI();