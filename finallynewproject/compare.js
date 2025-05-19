// 1. Companies and their pros/cons
const benefits = {
  "State Farm": {
    pros: [
      "Wide coverage options",
      "Strong mobile app",
      "Established reputation"
    ],
    cons: [
      "Rates can be higher for younger drivers",
      "Mixed customer service reviews"
    ]
  },
  "Travelers": {
    pros: [
      "Multiple discount options",
      "Strong financial ratings",
      "Customizable policies"
    ],
    cons: [
      "Not available in all states",
      "Fewer local agents"
    ]
  },
  "Geico": {
    pros: [
      "Very competitive pricing",
      "User-friendly online system",
      "24/7 customer support"
    ],
    cons: [
      "Limited local agent support",
      "Add-ons can get pricey"
    ]
  }
};

// 2. Get selected companies from localStorage
const quotes = JSON.parse(localStorage.getItem("compare_quotes")) || [];
const container = document.getElementById("comparison-area");

// 3. Guard clause if no data
if (quotes.length !== 2) {
  alert("You must select exactly 2 companies to compare.");
  window.location.href = "compare-quote.html";
}

// 4. Render both quote cards
quotes.forEach((quote) => {
  const { name, price } = quote;
  const pros = benefits[name]?.pros || [];
  const cons = benefits[name]?.cons || [];

  const box = document.createElement("div");
  box.className = "compare-card";
  box.style = `
    border: 1px solid #ccc;
    padding: 20px;
    width: 300px;
    border-radius: 8px;
    background: white;
    text-align: center;
    cursor: pointer;
  `;
  box.innerHTML = `
    <h3>${name}</h3>
    <p><strong>$${price} / month</strong></p>
    <p><strong>Pros:</strong><br>${pros.map(p => `- ${p}`).join("<br>")}</p>
    <p><strong>Cons:</strong><br>${cons.map(c => `- ${c}`).join("<br>")}</p>
  `;

  box.dataset.name = name;
  box.dataset.price = price;
  container.appendChild(box);
});

// 5. Handle card selection + confirm logic
let selectedCard = null;

document.querySelectorAll(".compare-card").forEach(card => {
  card.addEventListener("click", () => {
    // Deselect all
    document.querySelectorAll(".compare-card").forEach(c => c.style.borderColor = "#ccc");

    // Select clicked one
    card.style.borderColor = "#007bff";
    selectedCard = {
      name: card.dataset.name,
      price: card.dataset.price
    };

    // Show confirm button
    document.getElementById("confirm-btn").style.display = "inline-block";
  });
});

// 6. Save selection and redirect to payment page
document.getElementById("confirm-btn").addEventListener("click", () => {
  if (!selectedCard) return;
  localStorage.setItem("selected_insurance", JSON.stringify(selectedCard));
  window.location.href = "payment.html";
});
