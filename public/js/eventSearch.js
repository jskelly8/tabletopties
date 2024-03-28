// Event search bar event listener and functionality
const searchFormHandler = async (event) => {
    event.preventDefault();
    const query = document.querySelector('#eventSearchInput').value.trim();
    const errorBox = document.getElementById('eventSearchErrorBox');

    if (query) {
        try {
            const response = await fetch(`/api/events/title/${query}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }

            const data = await response.json();

            if (data.length === 0) {
                errorBox.textContent = 'No events found with that title.';
                errorBox.style.display = 'block';
                return;
            }

            const eventCardsContainer = document.getElementById('eventCardsContainer');
            eventCardsContainer.innerHTML = '';
            data.forEach(event => {
                const formatDate = (dateString) => {
                    const date = new Date(dateString);
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    const year = date.getFullYear();
                    return `${month}/${day}/${year}`;
                };

                const eventDate = formatDate(event.date_of);
                const eventCardHTML = `
                    <div class="col-md-6 mb-4">
                        <div class="card text-bg-dark text-center m-4 bg-black bg-gradient">
                            <div class="card-header">
                                <h5 class="card-title">${event.title}</h5>
                            </div>
                            <div class="card-body">
                                <h5 class="card-subtitle mb-3">Date: ${eventDate}</h5>
                                <h6 class="card-text">Location: ${event.location}</h6>
                                <p class="card-text">Description: ${event.description}</p>
                                <a href="/events/${event.id}" class="btn btn-outline-danger">Event Details</a>
                            </div>
                        </div>
                    </div>
                `;
                eventCardsContainer.innerHTML += eventCardHTML;
            });
        } catch (error) {
            errorBox.textContent = 'No events found with that title'; 
            errorBox.style.display = 'block';
        }
    }
};

document.querySelector('#eventSearchButton').addEventListener('click', searchFormHandler);
