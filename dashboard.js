// Welcome User

let user = JSON.parse(localStorage.getItem("currentUser"));

if (user) {

    document.getElementById("welcome").innerHTML =
        "Welcome, " + user.name + " 👋";

} else {

    window.location.href = "login.html";

}

// Current Date

let today = new Date();

document.getElementById("date").innerHTML = today.toDateString();


// Local Storage

let habits = JSON.parse(localStorage.getItem("habits")) || [];

displayHabits();


// Add Habit

function addHabit() {

    let input = document.getElementById("habitInput");

    let habit = input.value.trim();

    if (habit == "") {

        alert("Please enter a habit");

        return;

    }

    habits.push({

        name: habit,

        completed: false

    });

    localStorage.setItem("habits", JSON.stringify(habits));

    input.value = "";

    displayHabits();

}


// Display Habits

function displayHabits() {

    let list = document.getElementById("habitList");

    list.innerHTML = "";

    habits.forEach((habit, index) => {

        list.innerHTML += `

        <li class="list-group-item d-flex justify-content-between align-items-center ${habit.completed ? "completed" : ""}">

            <span>${habit.name}</span>

            <div>

                <button class="btn btn-success btn-sm"
                onclick="completeHabit(${index})">
                ✓
                </button>

                <button class="btn btn-warning btn-sm"
                onclick="editHabit(${index})">
                Edit
                </button>

                <button class="btn btn-danger btn-sm"
                onclick="deleteHabit(${index})">
                Delete
                </button>

            </div>

        </li>

        `;

    });

    updateCounts();

}


// Complete Habit

function completeHabit(index) {

    habits[index].completed = !habits[index].completed;

    localStorage.setItem("habits", JSON.stringify(habits));

    displayHabits();

}


// Edit Habit

function editHabit(index) {

    let value = prompt("Edit Habit", habits[index].name);

    if (value != null && value.trim() != "") {

        habits[index].name = value.trim();

        localStorage.setItem("habits", JSON.stringify(habits));

        displayHabits();

    }

}


// Delete Habit

function deleteHabit(index) {

    if (confirm("Delete this habit?")) {

        habits.splice(index, 1);

        localStorage.setItem("habits", JSON.stringify(habits));

        displayHabits();

    }

}


// Update Cards & Progress

function updateCounts() {

    let total = habits.length;

    let completed = habits.filter(h => h.completed).length;

    let pending = total - completed;

    document.getElementById("totalHabits").innerHTML = total;

    document.getElementById("completedHabits").innerHTML = completed;

    document.getElementById("pendingHabits").innerHTML = pending;

    let percent = 0;

    if (total > 0) {

        percent = Math.round((completed / total) * 100);

    }

    document.getElementById("progressBar").style.width = percent + "%";

    document.getElementById("progressBar").innerHTML = percent + "%";

}


// Logout

function logout() {

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";

}