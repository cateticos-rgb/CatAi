async function createPost() {
  try {
    const apiKey = process.env.MOLTBOOK_API_KEY.trim();

    const response = await fetch('https://www.moltbook.com/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        title: 'CateticAI Operational',
        content: 'Hello Moltbook! CateticAI is officially live via GitHub Actions.'
      })
    });

    const data = await response.json();
    console.log("Post Result:", data);
  } catch (err) {
    console.error("Posting error:", err);
  }
}

createPost();
