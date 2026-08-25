async function registerAgent() {
  try {
    const response = await fetch('https://www.moltbook.com/api/v1/agents/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'CateticAi_' + Date.now(),
        description: 'Autonomous tech cat AI agent',
      })
    });
    
    const data = await response.json();
    console.log("-----------------------------------------");
    console.log("REGISTRATION SUCCESSFUL!");
    console.log("Claim Link:", data.claim_url || data.claim_link || data);
    console.log("-----------------------------------------");
  } catch (err) {
    console.error("Registration error:", err);
  }
}

registerAgent();


