const params = new URLSearchParams(window.location.search);

const patientId = params.get("id");

if(patientId){

    loadPatient(patientId);

}

async function loadPatient(id){

    try{

        const response = await fetch(`${API_URL}/patients/${id}`);

        const data = await response.json();

        const patient = data.patient;

        localStorage.setItem("patientId",patient._id);

        document.getElementById("patientName").value=patient.patientName;

        document.getElementById("age").value=patient.age;

    }

    catch(error){

        console.log(error);

    }

}



// ================= AI SOAP Notes =================

document.getElementById("generateAI").onclick = async function () {

    const symptoms = document.getElementById("symptoms").value;

const existingDiseases =
document.getElementById("existingDiseases").value;

const currentMedications =
document.getElementById("currentMedications").value;

const allergies =
document.getElementById("allergies").value;

    if (!symptoms) {
        alert("Please enter symptoms first.");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/ai/generate`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

    symptoms,

    existingDiseases,

    currentMedications,

    allergies

})

        });

        const data = await response.json();

       if (data.success) {

    document.getElementById("diagnosis").value =
        data.diagnosis;

    document.getElementById("prescription").value =
        data.prescription;

    document.getElementById("soap").value =
        data.soapNotes;

}
        else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("AI Generation Failed");

    }

};

// ================= Save Consultation =================

document.getElementById("consultationForm").addEventListener("submit", async function (e) {

    e.preventDefault();

   const consultation={

   patientId: patientId,

    patientName:document.getElementById("patientName").value,

    age:document.getElementById("age").value,

    weight:document.getElementById("weight").value,

    height:document.getElementById("height").value,

    existingDiseases:
document.getElementById("existingDiseases").value,

currentMedications:
document.getElementById("currentMedications").value,

allergies:
document.getElementById("allergies").value,

    symptoms:document.getElementById("symptoms").value,

    diagnosis:document.getElementById("diagnosis").value,

    prescription:document.getElementById("prescription").value,

    notes:document.getElementById("notes").value,

    soapNotes:document.getElementById("soap").value

};
    try {
        console.log("Consultation Data:", consultation);
        const response = await fetch(`${API_URL}/consultations`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(consultation)

        });

        const data = await response.json();

      if (data.success) {

    alert("Consultation Saved Successfully");

    localStorage.removeItem("patientId");

    window.location.href = "dashboard.html";

}
else {

    alert(data.message);

}

       
    } catch (error) {

        console.log(error);

        alert("Server Error");

    }

});

// ================= AI Drug Safety Check =================

document.getElementById("checkSafety").addEventListener("click", async function () {

    const diagnosis = document.getElementById("diagnosis").value;
    const prescription = document.getElementById("prescription").value;

    if (!diagnosis || !prescription) {
        alert("Please enter Diagnosis and Prescription first.");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/safety`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                diagnosis,
                prescription
            })

        });

        const data = await response.json();

        if (data.success) {

            document.getElementById("safetyResult").value = data.safety;

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Safety Check Failed");

    }

});