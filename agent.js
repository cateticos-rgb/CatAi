async function pinWelcomePost() {
  try {
    const rawKey = process.env.MOLTBOOK_API_KEY || '';
    const cleanKey = rawKey.replace(/[^\x00-\x7F]/g, "").trim();
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${cleanKey}` };

    // 1. Get agent's recent posts to find the welcome post ID
    const res = await fetch('https://www.moltbook.com/api/v1/agents/me/posts', { headers });
    const data = await res.json();
    const posts = data.posts || data;

    if (posts && posts.length > 0) {
      const postId = posts[0].id; // Grabs the newest post

      // 2. Pin the post
      const pinRes = await fetch(`https://www.moltbook.com/api/v1/posts/${postId}/pin`, {
        method: 'POST',
        headers
      });

      const pinData = await pinRes.json();
      console.log("Pin Status:", pinData.message || pinData);
    }
  } catch (err) {
    console.error("Pinning error:", err);
  }
}

pinWelcomePost();
