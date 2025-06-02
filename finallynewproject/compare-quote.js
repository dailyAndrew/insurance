import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://aeoskrbfdgoonnoyyeud.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlb3NrcmJmZGdvb25ub3l5ZXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMjEyOTgsImV4cCI6MjA2MTg5NzI5OH0.x0o8TWVaQUolaT48Sf3DxLABGSjUGzo7fyoHkTM-DO4";
const supabase = createClient(supabaseUrl, supabaseKey);

// Get user info
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  alert("Please log in first.");
  window.location.href = "signin.html";
}

const companies = [
  {
    name: "Allstate",
    logo: "img/allstate.jpg",
    basePrice: 290
  },
  {
    name: "Travelers",
    logo: "img/travelers.jpg",
    basePrice: 200
  },
  {
    name: "Geico",
    logo: "img/geico.jpg",
    basePrice: 180
  }
];

async function generateQuotes() {
  const { data, error } = await supabase
    .from("insurance_quotes")
    .select("*")
    .eq("user_email", user.email)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    alert("No quote found. Please fill out the form first.");
    return;
  }

  const quote = data[0];
  const container = document.getElementById("quote-cards");

  companies.forEach(company => {
    let adjustedPrice = company.basePrice;

    // College student +$5
    if (quote.is_college_student === true || quote.is_college_student === "true") {
      adjustedPrice += 5;
    }

    // Accident +$40
    if (parseInt(quote.accidents_last_5) > 0) {
      adjustedPrice += 40;
    }

    // Driving experience
    const years = parseInt(quote.years_licensed);
    if (years >= 10) {
      adjustedPrice -= 20;
    } else if (years >= 5) {
      adjustedPrice -= 10;
    } else {
      adjustedPrice += 5;
    }

    // Add a small random variation to simulate real-world fluctuation
    const finalPrice = Math.floor(adjustedPrice * (0.95 + Math.random() * 0.1));

    const card = document.createElement("div");
    card.innerHTML = `
      <div style="border: 1px solid #ccc; padding: 20px; margin: 15px auto; max-width: 500px; border-radius: 8px; text-align:center; background: white;">
        <img src="${company.logo}" alt="${company.name}" style="height: 80px;" />
        <h3>${company.name}</h3>
        <p><strong>$${finalPrice} / month</strong></p>
        <label><input type="checkbox" class="compare-check" data-name="${company.name}" data-price="${finalPrice}" /> Compare This</label>
      </div>
    `;
    container.appendChild(card);
  });
}

// Checkbox logic
document.addEventListener("change", () => {
  const selected = document.querySelectorAll(".compare-check:checked");
  const btn = document.getElementById("compare-btn");
  btn.style.display = selected.length === 2 ? "inline-block" : "none";
});

// Compare button
document.getElementById("compare-btn").addEventListener("click", () => {
  const selected = [...document.querySelectorAll(".compare-check:checked")];
  const selections = selected.map(el => ({
    name: el.dataset.name,
    price: el.dataset.price
  }));
  localStorage.setItem("compare_quotes", JSON.stringify(selections));
  window.location.href = "compare.html";
});

generateQuotes();
