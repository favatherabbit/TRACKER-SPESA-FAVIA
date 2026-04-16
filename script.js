let spese = JSON.parse(localStorage.getItem("spese")) || [];

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

function aggiornaUI() {
    const lista = document.getElementById("listaSpese");
    lista.innerHTML = "";

    let totale = 0;

    spese.forEach((spesa, index) => {
        totale += spesa.importo;

        const li = document.createElement("li");
        li.innerHTML = `
            ${spesa.descrizione} - €${spesa.importo.toFixed(2)}
            <span class="delete" onclick="eliminaSpesa(${index})">❌</span>
        `;
        lista.appendChild(li);
    });

    document.getElementById("totale").textContent = totale.toFixed(2);
}

aggiornaUI();