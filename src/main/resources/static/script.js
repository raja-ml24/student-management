const API_URL = "http://localhost:8080/students";

// Load students
function loadStudents() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            let table = document.getElementById("studentTable");
            table.innerHTML = "";

            data.forEach(s => {
                table.innerHTML += `
                <tr>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.email}</td>
                    <td>${s.course}</td>
                    <td>${s.age}</td>
                    <td>
                        <button onclick="deleteStudent(${s.id})">Delete</button>
                    </td>
                </tr>`;
            });
        });
}

// Add student
function addStudent() {
    let student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        age: document.getElementById("age").value
    };

    fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(student)
    })
    .then(res => res.json())
    .then(() => {
        alert("Student Added");
        loadStudents();
    });
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("course").value = "";
    document.getElementById("age").value = "";
}

// Delete student
function deleteStudent(id) {
    fetch(API_URL + "/" + id, { method: "DELETE" })
        .then(() => {
            alert("Deleted");
            loadStudents();
        });
}

// Load on page start
loadStudents();
