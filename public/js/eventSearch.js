// Event search bar event listener and functionality

// Defines async form handler
const searchFormHandler = async (event) => {
    // Prevents the default form submission behavior
    event.preventDefault();

    // Variable with trimmed input
    const query = document.querySelector('#eventSearchInput').value.trim();

    // Redirect to the game ID route if a valid query is provided
    if (query) {
        const response = await fetch(`/api/events/title/${query}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (response.status === 404) {
            alert(data.message);
        }
        document.location.replace(`/events/${data[0].id}`);
    }
};

// Event listeners
document.querySelector('#eventSearchButton').addEventListener('click', searchFormHandler);
