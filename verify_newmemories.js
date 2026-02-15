async function verifyApi() {
  const baseUrl = 'http://localhost:3000/api/newmemories';

  console.log('1. Testing POST (Create Memory)...');
  try {
    const createRes = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Memory',
        description: 'Testing the new memories API',
        images: ['http://example.com/img1.jpg', 'http://example.com/img2.jpg']
      })
    });

    if (createRes.ok) {
        const data = await createRes.json();
        console.log('✅ POST Success:', data.success);
    } else {
        console.error('❌ POST Failed:', createRes.status, await createRes.text());
    }

  } catch (err) {
      console.error('❌ POST Error:', err.message);
  }

  console.log('\n2. Testing GET (Fetch Memories)...');
  try {
    const getRes = await fetch(baseUrl);
    if (getRes.ok) {
        const data = await getRes.json();
        console.log('✅ GET Success:', data.success);
        console.log('Memories count:', data.memories ? data.memories.length : 0);
    } else {
        console.error('❌ GET Failed:', getRes.status, await getRes.text());
    }
  } catch (err) {
      console.error('❌ GET Error:', err.message);
  }
}

verifyApi();
