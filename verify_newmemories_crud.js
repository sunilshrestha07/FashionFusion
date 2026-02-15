async function verifyCrud() {
  const baseUrl = 'http://localhost:3000/api/newmemories';
  let memoryId = '';

  console.log('1. Creating a memory...');
  try {
    const createRes = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Original Title',
        description: 'Original Description',
        images: ['img1.jpg']
      })
    });
    const createData = await createRes.json();
    if (createData.success) {
        memoryId = createData.memory._id;
        console.log('✅ Created, ID:', memoryId);
    } else {
        console.error('❌ Create Failed');
        return;
    }
  } catch (e) { console.error('❌ Create Error', e); return; }

  console.log('\n2. Updating the memory...');
  try {
    const updateRes = await fetch(`${baseUrl}/${memoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'Updated Title',
            description: 'Updated Description',
            images: ['img1.jpg', 'img2.jpg']
        })
    });
    const updateData = await updateRes.json();
    if (updateData.success && updateData.memory.title === 'Updated Title') {
        console.log('✅ Updated Successfully');
    } else {
        console.error('❌ Update Failed', updateData);
    }
  } catch (e) { console.error('❌ Update Error', e); }

  console.log('\n3. Deleting the memory...');
  try {
    const deleteRes = await fetch(`${baseUrl}/${memoryId}`, {
        method: 'DELETE'
    });
    const deleteData = await deleteRes.json();
    if (deleteData.success) {
        console.log('✅ Deleted Successfully');
    } else {
        console.error('❌ Delete Failed', deleteData);
    }
  } catch (e) { console.error('❌ Delete Error', e); }

  console.log('\n4. Verifying deletion...');
  try {
      const getRes = await fetch(`${baseUrl}/${memoryId}`);
      if (getRes.status === 404) {
          console.log('✅ Memory correctly not found (404)');
      } else {
          console.error('❌ Memory still exists or error', getRes.status);
      }
  } catch (e) { console.error('❌ Verify Deletion Error', e); }
}

verifyCrud();
