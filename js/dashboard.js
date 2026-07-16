console.log("Dashboard Loaded");

// ================= Check Login =================

const doctor = JSON.parse(localStorage.getItem("doctor"));

if (!doctor) {
    alert("Please Login First");
    window.location.href = "login.html";
}

// ================= Welcome =================

document.getElementById("doctorName").innerHTML =
    `Welcome Dr. ${doctor.fullName} 👋`;

// ================= Greeting =================

window.onload = function () {

    const hour = new Date().getHours();

    let greeting = "";

    if (hour < 12)
        greeting = "Good Morning ☀️";
    else if (hour < 16)
        greeting = "Good Afternoon 🌤️";
    else if (hour < 19)
        greeting = "Good Evening 🌙";
    else
        greeting = "Good Night 🌟";

    alert(`${greeting} Dr. ${doctor.fullName}`);

};

// ================= Logout =================

document.getElementById("logoutBtn").addEventListener("click", function () {

    if (confirm("Are you sure you want to Logout?")) {

        localStorage.removeItem("token");
        localStorage.removeItem("doctor");

        window.location.href = "login.html";
    }

});

// ================= Dashboard =================

async function loadDashboard() {

    try {

        // Patients
        const patientRes = await fetch(`${API_URL}/patients`);
        const patientData = await patientRes.json();

        // Consultations
        const consultationRes = await fetch(`${API_URL}/consultations`);
        const consultationData = await consultationRes.json();

        const patients = patientData.patients || [];
        const consultations = consultationData.consultations || [];

        // Cards

        document.getElementById("totalPatients").innerText =
            patients.length;

        document.getElementById("reportsGenerated").innerText =
            consultations.length;

        const today = new Date().toDateString();

        const todayCount = consultations.filter(c =>
            new Date(c.createdAt).toDateString() === today
        ).length;

        document.getElementById("todayConsultations").innerText =
            todayCount;

        // Recent Activity

        const tbody = document.getElementById("recentActivity");

        tbody.innerHTML = "";

        if (consultations.length === 0) {

            tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">
                    No consultations available
                </td>
            </tr>
            `;

        } else {

            consultations.slice(0, 5).forEach(c => {

                tbody.innerHTML += `

                <tr>

                    <td>${c.patientName}</td>

                    <td>${c.diagnosis}</td>

                    <td>${new Date(c.createdAt).toLocaleDateString()}</td>

                    <td style="color:green;font-weight:bold;">
                        Completed
                    </td>

                </tr>

                `;

            });

        }

    }

    catch (error) {

        console.log(error);

    }

}


async function loadWaitingPatients(){

    try{

        const response=await fetch(`${API_URL}/patients`);

        const data=await response.json();

        const table=document.getElementById("waitingPatients");

        table.innerHTML="";

        data.patients
        .filter(patient=>patient.status==="Waiting")
        .forEach(patient=>{

            table.innerHTML+=`

            <tr>

            <td>${patient.patientName}</td>

            <td>${patient.disease}</td>

            <td>${patient.status}</td>

            <td>

            <button onclick="callPatient('${patient._id}')">

            Call

            </button>

            </td>

            </tr>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

function callPatient(id){

    localStorage.setItem("patientId",id);

    window.location.href=`consultation.html?id=${id}`;

}

loadDashboard();
loadWaitingPatients();