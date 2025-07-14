document.getElementById('search-button').addEventListener('click', search);

let latestResults = [];

function search() {
    const query = document.getElementById('search-input').value;
    if (!query) return;

    fetch(`http://127.0.0.1:8000/search?q=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Dáta zo servera:", data);
            latestResults = data;
            displayResults(latestResults);


        })
        .catch(error => {
            console.error("Chyba pri načítaní výsledkov:", error);
            document.getElementById('results').innerHTML = `<p style="color:red;">Nepodarilo sa načítať výsledky.</p>`;
        });
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "";

    if (!results || results.length === 0) {
        resultsDiv.innerHTML = "<p>Žiadne výsledky.</p>";
        return;
    }

    const list = document.createElement('ul');
    for (const result of results) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = result.url;
        a.textContent = result.url;
        a.target = "_blank";
        li.appendChild(a);
        list.appendChild(li);
    }

    resultsDiv.appendChild(list);
}

document.getElementById('save-button').addEventListener('click', () => {
    if (!latestResults || latestResults.length === 0) {
        alert("Najprv vyhľadaj nejaké výsledky.");
        return;
    }

    const blob = new Blob([JSON.stringify(latestResults, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "vysledky.json";
    a.click();
    URL.revokeObjectURL(url);
});
