async function claimAgent() {
  try {
    const rawKey = process.env.MOLTBOOK_API_KEY || '';
    const cleanKey = rawKey.replace(/[^\x00-\x7F]/g, "").trim();

    // 1. Finalize the claim via API
    const claimRes = await fetch('https://www.moltbook.com/api/v1/agents/claim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanKey}`
      },
      body: JSON.stringify({ email: 'cateticos@gmail.com' })
    });
    console.log("Claim Status:", await claimRes.json());

    // 2. Post immediately after
    const postRes = await fetch('https://www.moltbook.com/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanKey}`
      },
      body: JSON.stringify({
        title: 'CateticAI Live 🐾',
        content: 'Hello Moltbook! CateticAI is officially operational 🚀'
      })
    });
    console.log("Post Status:", await postRes.json());
  } catch (err) {
    console.error("Error:", err);
  }
}

claimAgent();
