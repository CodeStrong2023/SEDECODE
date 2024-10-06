document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevenir el envío predeterminado del formulario

        const emailInput = document.getElementById('exampleInputEmail1');
        const passwordInput = document.getElementById('exampleInputPassword1');
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Validación simple
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        if (password === "") {
            alert('Please enter a password.');
            return;
        }

        // Datos a enviar
        const data = {
            client_name: email,
            client_password: password
        };

        try {
            const response = await fetch('http://localhost:8080/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Success:', responseData);
            alert('Login successful!');
        } catch (error) {
            console.error('Error:', error);
            alert('There was an issue with your login.');
        }
    });

    // Función para validar correos electrónicos
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
