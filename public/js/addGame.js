// Defines async form handler
const addGameFormHandler = async (event) => {
    // Prevents the default form submission behavior
    event.preventDefault();
    
    // Variables with trimmed inputs
    const title = document.querySelector('#title').value.trim();
    const genre = document.querySelector('#genre').value.trim();
    const player_count = document.querySelector('#player_count').value.trim();
    const avg_play_time = document.querySelector('#avg_play_time').value.trim();
    const description = document.querySelector('#description').value.trim();

    // Checks if all form fields have values before proceeding
    if (title && genre && player_count && avg_play_time && description) {
        // Hold the form data
        const formData = { title, genre, player_count, avg_play_time, description };

        // Async POST request to the server endpoint '/api/games' with the form data
        const response = await fetch('/api/games', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        });

        // Response checker
        if (response.ok) {
            document.location.href = '/#games';
        } else {
            const errorMessage = "Failed to add game, Please fill out all fields and try again.";
            document.getElementById("errorBox").innerHTML = errorMessage;
            document.getElementById("errorBox").style.display = "block";
        }
    }
};

// Event listeners
document.querySelector('#addGameForm').addEventListener('submit', addGameFormHandler);