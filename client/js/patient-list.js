let patients=[];

async function loadPatients(){

    try{

        const response=await fetch(`${API_URL}/patients`);

        const data=await response.json();

        patients=data.patients;

        showPatients(patients);

    }

    catch(error){

        console.log(error);

    }

}

function showPatients(list){

    const table=document.getElementById("patientTable");

    table.innerHTML="";

    list
.filter(patient => patient.status === "Waiting")
.forEach(patient=>{

        table.innerHTML+=`

        <tr>

        <td>${patient.patientName}</td>

        <td>${patient.age}</td>

        <td>${patient.gender}</td>

        <td>${patient.disease}</td>

        <td>${patient.status}</td>

        <td>

        <button onclick="callPatient('${patient._id}')">

        Call

        </button>

        <button onclick="deletePatient('${patient._id}')">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

}

function callPatient(id){

    localStorage.setItem("patientId",id);

    window.location.href=`consultation.html?id=${id}`;

}

async function deletePatient(id){

    if(!confirm("Delete Patient?")) return;

    await fetch(`${API_URL}/patients/${id}`,{

        method:"DELETE"

    });

    loadPatients();

}

document.getElementById("search").addEventListener("keyup",function(){

    const keyword=this.value.toLowerCase();

    const filtered=patients.filter(patient=>

        patient.patientName.toLowerCase().includes(keyword)

    );

    showPatients(filtered); 

});

loadPatients();