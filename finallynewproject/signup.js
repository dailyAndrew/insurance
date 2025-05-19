import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
    const supabaseUrl = "https://aeoskrbfdgoonnoyyeud.supabase.co";
    const supabaseKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlb3NrcmJmZGdvb25ub3l5ZXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMjEyOTgsImV4cCI6MjA2MTg5NzI5OH0.x0o8TWVaQUolaT48Sf3DxLABGSjUGzo7fyoHkTM-DO4";
    const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Save to Supabase
  const { data, error } = await supabase
    .from("insurance_users")
    .insert([{ username, email, password }]);

  if (error) {
    alert("Error: " + error.message);
    return;
  }

  // Save to localStorage
  localStorage.setItem("user", JSON.stringify({ username, email }));

  alert("Signup successful! Redirecting to login...");
  window.location.href = "signin.html";
});
