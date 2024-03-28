// Search bar event listener and functionality

// Defines async form handler
const searchFormHandlerUser = async (event) => {
    // Prevents the default form submission behavior
    event.preventDefault();

    // Variable with trimmed input
    const query = document.querySelector('#userSearchInput').value.trim();

    // Redirect to the game ID route if a valid query is provided
    if (query) {
        const response = await fetch(`/api/users/username/${query}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (response.status === 404) {
            alert(data.message);
        }
        document.location.replace(`/users/${data[0].id}`);
    }
};

// Event listeners
document.querySelector('#userSearchButton').addEventListener('click', searchFormHandlerUser);