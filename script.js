let resultsData = [];

async function search() {
  const query = document.getElementById("searchInput").value;
  if (!query.trim()) {
    alert("Zadejte prosím klíčové slovo.");
    return;
  }

  const response = await fetch("/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    alert("Chyba při získávání výsledků.");
    return;
  }

  const data = await response.json();
  resultsData = data.results;

  displayResults(resultsData);
  document.getElementById("downloadBtn").style.display = "inline-block";
}

function displayResults(results) {
  const container = document.getElementById("results");
  container.innerHTML = "<h2>Výsledky:</h2>";
  results.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${index + 1}. ${item.title}</strong><br><a href="${item.link}" target="_blank">${item.link}</a><br><em>${item.snippet}</em><br><br>`;
    container.appendChild(div);
  });
}

function downloadResults() {
  const blob = new Blob([JSON.stringify(resultsData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "vysledky.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
