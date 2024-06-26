// Form handler for searching events by date
const searchByDateFormHandler = async (event) => {
    event.preventDefault();

    const searchDate = document.querySelector('#dateSearchInput').value.trim();
    const errorBox = document.getElementById('eventSearchErrorBox');

    if (searchDate) {
        try {
            const response = await fetch(`/api/events/date/${searchDate}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const events = await response.json();
                displayEvents(events);
            } else {
                const errorText = 'Failed to find event. Please try again later.';
                errorBox.textContent = errorText;
                errorBox.style.display = 'block';
                return;
            }
        } catch (error) {
            console.error('Error:', error);
            errorBox.textContent = 'Unable to find event for that date.';
            errorBox.style.display = 'block';
        }
    }
};

// Function to display events on the page
const displayEvents = (events) => {
    const container = document.querySelector('#eventCardsContainer');
    container.innerHTML = '';

    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('card', 'text-bg-dark', 'text-center', 'm-4', 'bg-black', 'bg-gradient', 'col-md-5',  'col-12');

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
        };
        const eventDate = formatDate(event.date_of);

        eventElement.innerHTML = `
            <div class="card-header">
                <h5 class="card-title">${event.title}</h5>
            </div>
            <div class="card-body">
                <h5 class="card-subtitle mb-3">Date: ${eventDate}</h5>
                <h6 class="card-text">Location: ${event.location}</h6>
                <p class="card-text">Description: ${event.description}</p>
                <a href="/events/${event.id}" class="btn btn-outline-danger">Event Details</a>
            </div>
        `;
        container.appendChild(eventElement);
    });
};

// Event listener
document.querySelector('#searchByDateForm').addEventListener('submit', searchByDateFormHandler);