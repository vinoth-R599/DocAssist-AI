async function loadConsultations() {

    try {

        const response = await fetch(`${API_URL}/consultations`);

        const data = await response.json();

        const table = document.getElementById("historyBody");

        table.innerHTML = "";

        data.consultations.forEach((consultation) => {

            const row = `

            <tr>

                <td>${consultation.patientName}</td>

                <td>${consultation.diagnosis}</td>

                <td>${new Date(consultation.createdAt).toLocaleDateString()}</td>

                <td>

                    <button onclick="viewConsultation('${consultation._id}')">

                        👁 View

                    </button>

                </td>

            </tr>

            `;

            table.innerHTML += row;

        });

    } catch (error) {

        console.log(error);

        alert("Unable to load consultation history.");

    }

}

function viewConsultation(id){

    window.location.href = `report.html?id=${id}`;

}

loadConsultations();