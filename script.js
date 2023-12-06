document.addEventListener("DOMContentLoaded", () => {
    // Check local storage for saved goals
    const goals = JSON.parse(localStorage.getItem("goals")) || [];

    // Display goals
    displayGoals();

    // Event listener for adding a new goal
    document.getElementById("goal-form").addEventListener("submit", function (e) {
        e.preventDefault();
        addGoal();
    });
});

function addGoal() {
    const goalInput = document.getElementById("goal-input");
    const goalText = goalInput.value.trim();

    if (goalText !== "") {
        // Create goal object
        const goal = {
            id: new Date().getTime(),
            text: goalText,
            completed: false,
        };

        // Get existing goals from local storage
        const goals = JSON.parse(localStorage.getItem("goals")) || [];

        // Add new goal to the list
        goals.push(goal);

        // Save goals to local storage
        localStorage.setItem("goals", JSON.stringify(goals));

        // Clear input field
        goalInput.value = "";

        // Display goals
        displayGoals();
    }
}

function toggleCompleted(id) {
    // Get goals from local storage
    const goals = JSON.parse(localStorage.getItem("goals"));

    // Toggle the completed status of the goal
    goals.forEach((goal) => {
        if (goal.id === id) {
            goal.completed = !goal.completed;
        }
    });

    // Save updated goals to local storage
    localStorage.setItem("goals", JSON.stringify(goals));

    // Display goals
    displayGoals();
}

function editGoal(id) {
    // Get goals from local storage
    const goals = JSON.parse(localStorage.getItem("goals"));

    // Find the goal to edit
    const goalToEdit = goals.find((goal) => goal.id === id);

    // Prompt the user for a new goal text
    const newGoalText = prompt("Edit goal:", goalToEdit.text);

    if (newGoalText !== null) {
        // Update the goal text
        goalToEdit.text = newGoalText;

        // Save updated goals to local storage
        localStorage.setItem("goals", JSON.stringify(goals));

        // Display goals
        displayGoals();
    }
}

function deleteGoal(id) {
    // Get goals from local storage
    const goals = JSON.parse(localStorage.getItem("goals"));

    // Filter out the goal to delete
    const updatedGoals = goals.filter((goal) => goal.id !== id);

    // Save updated goals to local storage
    localStorage.setItem("goals", JSON.stringify(updatedGoals));

    // Display goals
    displayGoals();
}

function displayGoals() {
    const goalList = document.getElementById("goal-list");
    goalList.innerHTML = "";

    // Get goals from local storage
    const goals = JSON.parse(localStorage.getItem("goals")) || [];

    // Display each goal in the list
    goals.forEach((goal) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${goal.completed ? 'completed' : ''}" onclick="toggleCompleted(${goal.id})">${goal.text}</span>
            <div>
                <button onclick="editGoal(${goal.id})">Edit</button>
                <button onclick="deleteGoal(${goal.id})">Delete</button>
            </div>
        `;
        goalList.appendChild(li);
    });
}
