document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const contactInput = document.getElementById('contactInput').value.trim();
    const messageDiv = document.getElementById('message');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    
    let data = {};
    
    if (emailRegex.test(contactInput)) {
        data.email = contactInput;
    } else if (phoneRegex.test(contactInput)) {
        data.phone = contactInput;
    } else {
        messageDiv.textContent = 'Please enter a valid email or phone';
        return;
    }

    try {
        // Update this URL to your actual server address
        const serverUrl = 'http://api.flyai.online:3000/api/save-contact';
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (response.ok) {
            messageDiv.textContent = 'Contact saved successfully!';
            document.getElementById('contactForm').reset();
        } else {
            messageDiv.textContent = result.error || 'Something went wrong';
        }
    } catch (error) {
        messageDiv.textContent = 'Error connecting to server';
        console.error('Error:', error);
    }
});
