// Functionality to add event to interest
const eventInterestFormHandler = async (event) => {
    event.preventDefault();

    const event_id = document.getElementById('eventInterest').dataset.eventid;
    console.log(event_id);

    if (event_id) {
        const response = await fetch('/api/events/add', {
            method: 'POST',
            body: JSON.stringify({ event_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);

        // Response checker
        if (response.ok) {
            document.location.replace('/profile'); // Redirect to profile page
        } else {
            const errorMessage = "Failed to add attendance. Please try again later.";
            document.getElementById("errorBox").innerHTML = errorMessage;
            document.getElementById("errorBox").style.display = "block";
        }
    }
};

// Event Listener 
document.getElementById('eventInterest').addEventListener('click', eventInterestFormHandler);