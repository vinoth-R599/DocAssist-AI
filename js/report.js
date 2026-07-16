const params = new URLSearchParams(window.location.search);

const consultationId = params.get("id");

async function loadReport() {

    try {

       const response = await fetch(`${API_URL}/consultations/${consultationId}`);

console.log(response.status);

const data = await response.json(); 

console.log(data);


        if (!data.success) {

            alert("Consultation not found");
            return;

        }

        const c = data.consultation;

        const doctor = JSON.parse(localStorage.getItem("doctor"));

        // ================= Doctor Details =================

        document.getElementById("hospital").innerText = doctor.hospital;
        document.getElementById("doctorName").innerText = doctor.fullName;
        document.getElementById("qualification").innerText = doctor.qualification || "MBBS";
        document.getElementById("specialization").innerText = doctor.specialization;
        document.getElementById("department").innerText = doctor.department || "General Medicine";
        document.getElementById("registrationNumber").innerText = doctor.registrationNumber || "Pending";
        document.getElementById("doctorEmail").innerText = doctor.email;
        document.getElementById("doctorPhone").innerText = doctor.phone || "-";
        document.getElementById("hospitalAddress").innerText = doctor.hospitalAddress || "-";

        document.getElementById("reportDate").innerText =
            new Date(c.createdAt).toLocaleString();

        // ================= Patient Details =================

        document.getElementById("patientName").innerText = c.patientName;
        document.getElementById("age").innerText = c.age;
        document.getElementById("weight").innerText = c.weight;
        document.getElementById("height").innerText = c.height;

        document.getElementById("symptoms").innerText = c.symptoms;
        document.getElementById("diagnosis").innerText = c.diagnosis;
        document.getElementById("prescription").innerText = c.prescription;
        document.getElementById("soap").innerText = c.soapNotes;
        document.getElementById("notes").innerText = c.notes;

    }

    catch (error) {

        console.log(error);

        alert("Unable to load report.");

    }

}

loadReport();


// ================= PDF Download =================

const { jsPDF } = window.jspdf;

document.getElementById("downloadPdf").onclick = function () {

    const doc = new jsPDF();

    let y = 20;

    // ================= Hospital =================

    doc.setFontSize(22);
    doc.text(document.getElementById("hospital").innerText.toUpperCase(), 20, y);

    y += 8;

    doc.setFontSize(11);
    doc.text(document.getElementById("hospitalAddress").innerText, 20, y);

    y += 6;
    doc.text("Phone : " + document.getElementById("doctorPhone").innerText, 20, y);

    y += 6;
    doc.text("Email : " + document.getElementById("doctorEmail").innerText, 20, y);

    y += 8;

    doc.line(20, y, 190, y);

    y += 10;

    doc.setFontSize(18);
    doc.text("CONSULTATION REPORT", 55, y);

    y += 10;

    // ================= Doctor =================

    doc.setFontSize(13);
    doc.text("Doctor Information", 20, y);

    y += 8;

    doc.setFontSize(11);

    doc.text("Doctor : " + document.getElementById("doctorName").innerText, 20, y);

    y += 7;

    doc.text("Qualification : " + document.getElementById("qualification").innerText, 20, y);

    y += 7;

    doc.text("Specialization : " + document.getElementById("specialization").innerText, 20, y);

    y += 7;

    doc.text("Department : " + document.getElementById("department").innerText, 20, y);

    y += 7;

    doc.text("Registration No : " + document.getElementById("registrationNumber").innerText, 20, y);

    y += 7;

    doc.text("Consultation Date : " + document.getElementById("reportDate").innerText, 20, y);

    y += 12;

    doc.line(20, y, 190, y);

    y += 10;

    // ================= Patient =================

    doc.setFontSize(13);
    doc.text("Patient Information", 20, y);

    y += 8;

    doc.setFontSize(11);

    doc.text("Patient Name : " + document.getElementById("patientName").innerText, 20, y);

    y += 7;

    doc.text("Age : " + document.getElementById("age").innerText, 20, y);

    y += 7;

    doc.text("Weight : " + document.getElementById("weight").innerText, 20, y);

    y += 7;

    doc.text("Height : " + document.getElementById("height").innerText, 20, y);

    y += 12;

    // ================= Symptoms =================

    doc.setFontSize(13);
    doc.text("Symptoms", 20, y);

    y += 8;

    doc.setFontSize(11);

    doc.text(doc.splitTextToSize(document.getElementById("symptoms").innerText, 170), 20, y);

    y += 20;

    // ================= Diagnosis =================

    doc.setFontSize(13);
    doc.text("Diagnosis", 20, y);

    y += 8;

    doc.setFontSize(11);

    doc.text(doc.splitTextToSize(document.getElementById("diagnosis").innerText, 170), 20, y);

    y += 20;

    // ================= Prescription =================

    doc.setFontSize(13);
    doc.text("Prescription", 20, y);

    y += 8;

    doc.setFontSize(11);

    doc.text(doc.splitTextToSize(document.getElementById("prescription").innerText, 170), 20, y);

    y += 30;

    // ================= Doctor Notes =================

    doc.setFontSize(13);
    doc.text("Doctor Notes", 20, y);

    y += 8;

    doc.setFontSize(11);

    doc.text(doc.splitTextToSize(document.getElementById("notes").innerText, 170), 20, y);

    y += 30;

    // ================= AI Summary =================

    doc.setFontSize(13);
    doc.text("AI Clinical Summary", 20, y);

    y += 8;

    doc.setFontSize(11);

    doc.text(doc.splitTextToSize(document.getElementById("soap").innerText, 170), 20, y);

    y += 45;

    // ================= Signature =================

    doc.line(130, y, 185, y);

    y += 6;

    doc.text(document.getElementById("doctorName").innerText, 135, y);

    y += 6;

    doc.text(document.getElementById("specialization").innerText, 135, y);

    // ================= Save =================

    doc.save("Consultation_Report.pdf");

};