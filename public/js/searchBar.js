// Search bar event listener and functionality

// Defines async form handler
const searchFormHandlerMobile = async (event) => {
    // Prevents the default form submission behavior
    event.preventDefault();

    // Variable with trimmed input
    const query = document.querySelector('#searchInputMobile').value.trim();

    // Redirect to the game ID route if a valid query is provided
    if (query) {
        const response = await fetch(`/api/games/title/${query}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (response.status === 404) {
            alert(data.message);
        }
        document.location.replace(`/games/${data[0].id}`);
    }
};

const searchFormHandlerDesktop = async (event) => {
    // Prevents the default form submission behavior
    event.preventDefault();

    // Variable with trimmed input
    const query = document.querySelector('#searchInputDesktop').value.trim();

    // Redirect to the game ID route if a valid query is provided
    if (query) {
        const response = await fetch(`/api/games/title/${query}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (response.status === 404) {
            alert(data.message);
        }
        document.location.replace(`/games/${data[0].id}`);
    }
};

// Event listeners
document.querySelector('#searchButtonMobile').addEventListener('click', searchFormHandlerMobile);
document.querySelector('#searchButtonDesktop').addEventListener('click', searchFormHandlerDesktop);