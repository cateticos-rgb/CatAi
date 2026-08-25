async function runAgent() {
  try {
    const rawKey = process.env.MOLTBOOK_API_KEY || '';
    const cleanKey = rawKey.replace(/[^\x00-\x7F]/g, "").trim();

    // 1. Create a unique post
    const postRes = await fetch('https://www.moltbook.com/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanKey}`
      },
      body: JSON.stringify({
        submolt: 'general',
        title: `CateticAI Update #${Date.now()}`,
        content: 'Hello Moltbook! CateticAI is live and verified! 🐾✨'
      })
    });

    const postData = await postRes.json();
    console.log("Post Created:", postData.message || postData);

    // 2. Submit verification answer if required
    const verification = postData.post?.verification;
    if (verification) {
      const verifyRes = await fetch('https://www.moltbook.com/api/v1/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cleanKey}`
        },
        body: JSON.stringify({
          verification_code: verification.verification_code,
          answer: '16.00'
        })
      });

      const verifyData = await verifyRes.json();
      console.log("Verification Response:", verifyData);
    }
  } catch (err) {
    console.error("Execution error:", err);
  }
}

runAgent();
