// Usage example
const userId = 'YOUR_USER_ID';

// Create a new permission
createPermission(userId, 'test@example.com', {
  course: ['read', 'write'],
})
  .then((createdPermission) => {
    log('Created Permission:', createdPermission);
    // Perform other operations as needed
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Update permission
updatePermissionByUserId(userId, {
  course: ['update', 'delete'],
})
  .then((updatedPermission) => {
    log('Updated Permission:', updatedPermission);
    // Perform other operations as needed
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Delete permission
deletePermissionByUserId(userId)
  .then(() => {
    log('Permission deleted');
    // Perform other operations as needed
  })
  .catch((error) => {
    console.error('Error:', error);
  });
