// Graph Node Animation
function createGraphBackground() {
    const graphBackground = document.getElementById('graphBackground');
    const numNodes = 20;
    const nodes = [];
    
    // Create nodes
    for (let i = 0; i < numNodes; i++) {
        const node = document.createElement('div');
        node.className = 'node';
        node.style.left = `${Math.random() * 100}%`;
        node.style.top = `${Math.random() * 100}%`;
        node.style.animationDelay = `${Math.random() * 5}s`;
        graphBackground.appendChild(node);
        nodes.push(node);
    }

    // Create connecting lines
    for (let i = 0; i < numNodes / 2; i++) {
        const line = document.createElement('div');
        line.className = 'line';
        const node1 = nodes[Math.floor(Math.random() * nodes.length)];
        const node2 = nodes[Math.floor(Math.random() * nodes.length)];
        const x1 = parseFloat(node1.style.left);
        const y1 = parseFloat(node1.style.top);
        const x2 = parseFloat(node2.style.left);
        const y2 = parseFloat(node2.style.top);
        
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        line.style.width = `${length}%`;
        line.style.height = '1px';
        line.style.left = `${x1}%`;
        line.style.top = `${y1}%`;
        line.style.transform = `rotate(${angle}deg)`;
        graphBackground.appendChild(line);
    }
}

createGraphBackground();

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const contactInput = document.getElementById('contactInput').value.trim();
    const messageDiv = document.getElementById('message');
    const confirmationOverlay = document.getElementById('confirmationOverlay');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    
    let data = {};
    
    if (emailRegex.test(contactInput)) {
        data.email = contactInput;
    } else if (phoneRegex.test(contactInput)) {
        data.phone = contactInput;
    } else {
        messageDiv.textContent = 'Please enter a valid email or phone';
        messageDiv.classList.add('show');
        return;
    }

    try {
        const serverUrl = 'http://api.flyai.online/api/save-contact'; 
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (response.ok) {
            // Show confirmation animation
            confirmationOverlay.classList.add('show');
            setTimeout(() => {
                confirmationOverlay.classList.remove('show');
                messageDiv.textContent = 'Contact saved successfully!';
                messageDiv.classList.add('show');
                document.getElementById('contactForm').reset();
                setTimeout(() => messageDiv.classList.remove('show'), 3000);
            }, 2000); // Hide confirmation after 2 seconds
        } else {
            messageDiv.textContent = result.error || 'Something went wrong';
            messageDiv.classList.add('show');
        }
    } catch (error) {
        messageDiv.textContent = 'Error connecting to server';
        messageDiv.classList.add('show');
        console.error('Error:', error);
    }
});
