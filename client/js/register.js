const form = document.getElementById("registerForm");
console.log("Register JS Loaded");
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const specialization = document.getElementById("specialization").value;
    const hospital = document.getElementById("hospital").value;

    try {

        const response = await fetch(`${API_URL}/auth/register`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                fullName,
                email,
                password,
                specialization,
                hospital

            })

        });

        const data = await response.json();

        if (data.success) {

            alert("Registration Successful");

            window.location.href = "login.html";

        } else {

            alert(data.message);

        }

    }

    catch (err) {

        alert("Server Error");

    }

});