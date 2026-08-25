async function setupOwnerEmail() {
  try {
    const response = await fetch('https://www.moltbook.com/api/v1/agents/me/setup-owner-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer moltbook_sk_GLxIfVzMoE1YoUSMYrtkErQ2exbwj7Q0'
      },
      body: JSON.stringify({
        email: 'Cateticos@gmail.com' // Replace with your real email address
      })
    });

    const data = await response.json();
    console.log("Email Setup Response:", data);
  } catch (err) {
    console.error("Setup error:", err);
  }
}

setupOwnerEmail();
