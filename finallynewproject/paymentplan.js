import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
    const supabaseUrl = "https://aeoskrbfdgoonnoyyeud.supabase.co";
    const supabaseKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlb3NrcmJmZGdvb25ub3l5ZXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMjEyOTgsImV4cCI6MjA2MTg5NzI5OH0.x0o8TWVaQUolaT48Sf3DxLABGSjUGzo7fyoHkTM-DO4";
    const supabase = createClient(supabaseUrl, supabaseKey);

// Check login
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  alert("Please log in first.");
  window.location.href = "signin.html";
}

// Check if purchased
const selected = JSON.parse(localStorage.getItem("selected_insurance"));
if (!localStorage.getItem("purchased") || !selected) {
  alert("No completed purchase found.");
  window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", async () => {
  const planDiv = document.getElementById("plan-info");

  // Get user's latest quote
  const { data, error } = await supabase
    .from("insurance_quotes")
    .select("*")
    .eq("user_email", user.email)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    planDiv.innerHTML = "<p>We couldn't load your plan. Please try again.</p>";
    return;
  }

  const quote = data[0];
  const nextPayment = getNextPaymentDate();

  planDiv.innerHTML = `
    <p><strong>Insurance Company:</strong> ${selected.name}</p>
    <p><strong>Monthly Price:</strong> $${selected.price}</p>
    <p><strong>Next Payment Due:</strong> ${nextPayment}</p>
    <hr style="margin: 20px 0;">
    <h3>Vehicle Information</h3>
    <p><strong>Car:</strong> ${quote.vehicle_year} ${quote.make} ${quote.model}</p>
    <p><strong>Annual Mileage:</strong> ${quote.mileage}</p>
    <p><strong>Coverage Level:</strong> ${quote.coverage_level}</p>
  `;
});

// Helper: format date one month from now
function getNextPaymentDate() {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
