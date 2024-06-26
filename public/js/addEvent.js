// Defines async form handler
const addEventFormHandler = async (event) => {
    // Prevents the default form submission behavior
    event.preventDefault();

    // Variables with trimmed inputs
    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
    const location = document.querySelector('#location').value.trim();
    const date_of = document.querySelector('#date_of').value.trim();
    const game_id = parseInt(document.querySelector('#game_id').value.trim(), 10);

    // Checks if all form fields have values before proceeding
    if (title && description && location && date_of && game_id) {
        // Hold the form data
        const formData = { title, description, location, date_of, game_id };

        // Async POST request to the server endpoint '/api/events' with the form data
        const response = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        });

        // Response checker
        if (response.ok) {
            window.location.href = '/#events';
        } else {
            const errorMessage = "Failed to create event, Please fill out all fields and try again.";
            document.getElementById("errorBox").innerHTML = errorMessage;
            document.getElementById("errorBox").style.display = "block";
        }
    }
};

// Event listeners
document.querySelector('#addEventForm').addEventListener('submit', addEventFormHandler);