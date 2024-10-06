document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    const apiSession = sessionStorage.getItem('api-session');

    if (apiSession === 'Acceso autorizado') {
        // Evita redirigir si ya estás en la página de inicio
        if (window.location.pathname !== '/') {
            window.location.href = '/';
        }
    } else if (!apiSession) {
        // Evita redirigir si ya estás en la página de inicio de sesión
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
    }

    form.addEventListener('submit', async function (event) {
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
            client_mail: email,
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
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `¡${responseData.message}!`,
                showConfirmButton: false,
                timer: 1500
            });
            window.location.href = '/';
            sessionStorage.setItem('api-session', responseData.message);
        } catch (error) {
            console.error('Error:', error);
            alert('Por favor, verifica tus credenciales y vuelve a intentarlo.');
        }
    });

    // Función para validar correos electrónicos
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
