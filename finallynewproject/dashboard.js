import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
    const supabaseUrl = "https://aeoskrbfdgoonnoyyeud.supabase.co";
    const supabaseKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlb3NrcmJmZGdvb25ub3l5ZXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMjEyOTgsImV4cCI6MjA2MTg5NzI5OH0.x0o8TWVaQUolaT48Sf3DxLABGSjUGzo7fyoHkTM-DO4";
    const supabase = createClient(supabaseUrl, supabaseKey);
// Check if user is logged in
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  alert("Please log in first.");
  window.location.href = "signin.html";
}

// Display greeting
document.getElementById("user-info").innerText = `Hello, ${user.username}`;

// Fetch their latest quote
async function loadQuote() {
  const { data, error } = await supabase
    .from("insurance_quotes")
    .select("*")
    .eq("user_email", user.email)
    .order("created_at", { ascending: false })
    .limit(1);

  const container = document.getElementById("quote-info");

  if (error || data.length === 0) {
    container.innerHTML = "<p>No quote info found. Please submit one first.</p>";
    return;
  }

  const quote = data[0];
  container.innerHTML = `
  <p><strong>Car:</strong> ${quote.vehicle_year} ${quote.make} ${quote.model}</p>
  <p><strong>Zip Code:</strong> ${quote.zip_code}</p>
  <p><strong>Driving Experience:</strong> ${quote.years_licensed} years</p>
  <p><strong>Accidents (last 5 years):</strong> ${quote.accidents_last_5}</p>
  <p><strong>DUI / Reckless Driving:</strong> ${quote.dui_or_reckless === 1 ? 'Yes' : 'No'}</p>
  <p><strong>Coverage Level:</strong> ${quote.coverage_level}</p>
  <p><strong>College Student:</strong> ${quote.is_college_student}</p>
`;
}

loadQuote();
// Handle Get Quote button to go to compare-quote.html only if quote exists
document.getElementById("start-quote").addEventListener("click", async () => {
  const { data, error } = await supabase
    .from("insurance_quotes")
    .select("id")
    .eq("user_email", user.email);

  if (error) {
    alert("Error checking quote status.");
    return;
  }

  if (!data || data.length === 0) {
    alert("Please fill out the quote form first.");
  } else {
    window.location.href = "compare-quote.html";
  }
});

