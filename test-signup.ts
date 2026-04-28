(async () => {
  try {
    const response = await fetch('https://unionpost-ruddy.vercel.app/api/clubs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Manchester United Test',
        email: 'mutest' + Date.now() + '@test.com',
        password: 'test123'
      })
    });
    console.log('Status:', response.status);
    const text = await response.text();
    console.log('Response:', text);
  } catch (e) {
    console.log('Error:', e.message);
  }
})();