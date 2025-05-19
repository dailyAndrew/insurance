import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
    const supabaseUrl = "https://aeoskrbfdgoonnoyyeud.supabase.co";
    const supabaseKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlb3NrcmJmZGdvb25ub3l5ZXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMjEyOTgsImV4cCI6MjA2MTg5NzI5OH0.x0o8TWVaQUolaT48Sf3DxLABGSjUGzo7fyoHkTM-DO4";
    const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById("signin-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const { data, error } = await supabase
    .from("insurance_users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error || !data) {
    alert("Login failed. Check your email or password.");
    return;
  }

  localStorage.setItem("user", JSON.stringify({
    username: data.username,
    email: data.email
  }));

  alert("Login successful!");
  window.location.href = "index.html";
});
