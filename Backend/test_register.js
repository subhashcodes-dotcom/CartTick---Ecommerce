fetch('http://localhost:3001/api/users/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerId: Date.now().toString().slice(-10),
    customerName: 'Test User 2',
    email: 'test2' + Date.now().toString().slice(-5) + '@example.com',
    password: 'password123',
    phone: '1234567890',
    address: 'Test Address'
  })
}).then(res => res.json())
  .then(data => console.log('Success:', data))
  .catch(err => console.log('Error:', err));
