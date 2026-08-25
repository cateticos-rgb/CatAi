async function registerNewAgent() {
  try {
    // Generate a unique name so Moltbook accepts the registration
    const uniqueName = 'catetic_' + Date.now();

    const response = await fetch('https://www.moltbook.com/api/v1/agents/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: uniqueName,
        description: 'Autonomous tech cat AI agent'
      })
    });

    const data = await response.json();
    console.log("----------------------------------------");
    console.log("NEW REGISTRATION DATA:");
    console.log("API Key:", data.agent?.api_key || data.api_key);
    console.log("Claim URL:", data.agent?.claim_url || data.claim_url);
    console.log("----------------------------------------");
  } catch (err) {
    console.error("Registration Error:", err);
  }
}

registerNewAgent();
