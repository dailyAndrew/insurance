const companies = [
  {
    name: "State Farm",
    logo: "https://1000logos.net/wp-content/uploads/2017/06/State-Farm-Logo-768x432.png",
    basePrice: 127
  },
  {
    name: "Travelers",
    logo: "https://www.travelers.com/iw-images/logo.svg", // use any preferred Travelers logo
    basePrice: 181
  },
  {
    name: "Geico",
    logo: "https://logowik.com/content/uploads/images/geico9054.jpg",
    basePrice: 137
  }
];

const container = document.getElementById("quote-cards");

companies.forEach(company => {
  const price = Math.floor(company.basePrice * (0.8 + Math.random() * 0.3)); // Random within ~20–30% range
  const card = document.createElement("div");
  card.innerHTML = `
    <div style="border: 1px solid #ccc; padding: 20px; margin: 15px auto; max-width: 500px; border-radius: 8px; text-align:center; background: white;">
      <img src="${company.logo}" alt="${company.name}" style="height: 80px;" />
      <h3>${company.name}</h3>
      <p><strong>$${price} / month</strong></p>
      <label><input type="checkbox" class="compare-check" data-name="${company.name}" data-price="${price}" /> Compare This</label>
    </div>
  `;
  container.appendChild(card);
});

// Handle checkbox logic
document.addEventListener("change", () => {
  const selected = document.querySelectorAll(".compare-check:checked");
  const btn = document.getElementById("compare-btn");
  btn.style.display = selected.length === 2 ? "inline-block" : "none";
});

// Compare selected → move to next page
document.getElementById("compare-btn").addEventListener("click", () => {
  const selected = [...document.querySelectorAll(".compare-check:checked")];
  const selections = selected.map(el => ({
    name: el.dataset.name,
    price: el.dataset.price
  }));
  localStorage.setItem("compare_quotes", JSON.stringify(selections));
  window.location.href = "compare.html";
});
