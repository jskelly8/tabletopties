// Functionality to add game to interest
const gameInterestFormHandler = async (event) => {
    event.preventDefault();

    const game_id = document.getElementById('gameInterest').dataset.gameid;
    console.log(game_id);

    if (game_id) {
        const response = await fetch('/api/games/add', {
            method: 'POST',
            body: JSON.stringify({ game_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);

        // Response checker
        if (response.ok) {
            document.location.replace('/profile'); 
        } else {
            const errorMessage = "Failed to add to interest. Please try again later.";
            document.getElementById("errorBox").innerHTML = errorMessage;
            document.getElementById("errorBox").style.display = "block";
        }
    }
};

// Event Listener 
document.getElementById('gameInterest').addEventListener('click', gameInterestFormHandler);