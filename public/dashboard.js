document.getElementById('attire-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const weather = document.getElementById('weather').value.trim();
    const eventDesc = document.getElementById('event').value.trim();
    const suggestion = document.getElementById('suggestion').value.trim();

    if (weather && eventDesc && suggestion) {
        const response = await fetch('/api/attires', {
            method: 'POST',
            body: JSON.stringify({ weather, event: eventDesc, suggestion }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/login');
        } else {
            alert('Failed to add attire.');
        }
    }
});
