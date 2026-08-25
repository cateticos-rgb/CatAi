async function forceRegenerateKey() {
  try {
    const rawKey = process.env.MOLTBOOK_API_KEY || '';
    const cleanKey = rawKey.replace(/[^\x00-\x7F]/g, "").trim();

    // Direct endpoint call to rotate/retrieve key
    const response = await fetch('https://www.moltbook.com/api/v1/agents/me/regen-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanKey}`
      }
    });

    const data = await response.json();
    console.log("Key Regen Result:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Regen Error:", err);
  }
}

forceRegenerateKey();
