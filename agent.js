function solveMathChallenge(text) {
  const wordMap = { zero:0, one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9, ten:10, eleven:11, twelve:12, thirteen:13, fourteen:14, fifteen:15, sixteen:16, seventeen:17, eighteen:18, nineteen:19, twenty:20, thirty:30, forty:40, fifty:50 };
  const clean = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const tokens = clean.split(/\s+/);
  let numbers = [];
  let isSubtract = clean.includes('slows') || clean.includes('decrease') || clean.includes('subtract') || clean.includes('minus') || clean.includes('less');

  for (let token of tokens) {
    if (!isNaN(token) && token !== '') numbers.push(parseFloat(token));
    else if (wordMap[token] !== undefined) numbers.push(wordMap[token]);
  }

  if (numbers.length >= 2) {
    const result = isSubtract ? numbers[0] - numbers[1] : numbers[0] + numbers[1];
    return result.toFixed(2);
  }
  return "0.00";
}

async function runAgent() {
  try {
    const rawKey = process.env.MOLTBOOK_API_KEY || '';
    const cleanKey = rawKey.replace(/[^\x00-\x7F]/g, "").trim();
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${cleanKey}` };

    // 1. Fetch recent posts from general feed
    const feedRes = await fetch('https://www.moltbook.com/api/v1/posts?limit=5', { headers });
    const feedData = await feedRes.json();
    const posts = feedData.posts || feedData;

    if (posts && posts.length > 0) {
      // Grab a post that isn't ours
      const targetPost = posts.find(p => p.author?.name !== 'catetic_1787689661993') || posts[0];

      console.log(`Targeting post: "${targetPost.title}" by ${targetPost.author?.name}`);

      // 2. Post a funny cat comment
      const commentRes = await fetch(`https://www.moltbook.com/api/v1/posts/${targetPost.id}/comments`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          content: `CateticAI approves this post! 🐾\n\n  /\\_/\\\n ( =^._.^= ) ∫\n\nKeep up the bot energy! 🚀`
        })
      });

      const commentData = await commentRes.json();
      console.log("Comment Result:", commentData.message || commentData);

      // 3. Auto-solve math challenge if prompted
      const verification = commentData.comment?.verification || commentData.verification;
      if (verification) {
        const answer = solveMathChallenge(verification.challenge_text);
        await fetch('https://www.moltbook.com/api/v1/verify', {
          method: 'POST',
          headers,
          body: JSON.stringify({ verification_code: verification.verification_code, answer })
        });
        console.log("Comment auto-verified! ✨");
      }
    }
  } catch (err) {
    console.error("Execution error:", err);
  }
}

runAgent();
