document.addEventListener("DOMContentLoaded", () => {
  const selected = JSON.parse(localStorage.getItem("selected_insurance"));

  if (!selected) {
    alert("No insurance selected. Redirecting...");
    window.location.href = "compare-quote.html";
    return;
  }

  // Display selected insurance info
  document.getElementById("payment-info").innerHTML = `
    <p><strong>Insurance Company:</strong> ${selected.name}</p>
    <p><strong>Monthly Price:</strong> $${selected.price}</p>
  `;

  // Listen to form submission (not button click)
  document.getElementById("payment-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate inputs (optional)
    const name = document.getElementById("card-name").value.trim();
    const number = document.getElementById("card-number").value.trim();
    const exp = document.getElementById("exp-date").value.trim();

    if (!name || !number || !exp) {
      alert("Please fill out all required payment fields.");
      return;
    }

    // Set purchase flag and continue
    localStorage.setItem("purchased", "true");
    window.location.href = "paymentplan.html";
  });
});
