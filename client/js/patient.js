const form = document.getElementById("patientForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const patientName = document.getElementById("patientName").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const phone = document.getElementById("phone").value;
    const disease = document.getElementById("disease").value;
    const address = document.getElementById("address").value;

    try {

        const response = await fetch(`${API_URL}/patients`, {

            method: "POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                patientName,
                age,
                gender,
                phone,
                disease,
                address

            })

        });

        const data = await response.json();

        if(data.success){

            alert("Patient Added Successfully");

            window.location.href="patient-list.html";

        }
        else{

            alert(data.message);

        }

    }

    catch(error){

        alert("Server Error");

        console.log(error);

    }

});