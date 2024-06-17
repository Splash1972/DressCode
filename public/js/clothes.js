document.getElementById('event-type').addEventListener('change', async (event) => {
    const eventType = event.target.value;
    const webID = getWebIDForEvent(eventType); // Get the correct webID for the selected event type

    try {
        const url = `https://kohls.p.rapidapi.com/products/detail?webID=${webID}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '4c39475279msh8f91520ad9b9519p12eec7jsn8ccfc415f2ce',
                'x-rapidapi-host': 'kohls.p.rapidapi.com'
            }
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        displayClothingData(result);
    } catch (error) {
        console.error('Error:', error);
    }
});

function getWebIDForEvent(eventType) {
    // Return the correct webID based on the event type
    const eventWebIDs = {
        wedding: '5676911',
        party: '6868621',
        formal: '6395741',
        beach: '7065386',
        gym: '6634580',
        casual: '3343173'
    };
    return eventWebIDs[eventType];
}

function displayClothingData(data) {
    const clothingDataDiv = document.getElementById('clothing-data');
    clothingDataDiv.innerHTML = ''; // Clear any previous data

    if (data && data.payload && data.payload.products && data.payload.products.length > 0) {
        const product = data.payload.products[0]; // Access the first product in the array
        const productHTML = `
            <div style="text-align: center; margin: 0 auto;">
                <h2>${product.productTitle}</h2>
                <p>${product.description.shortDescription}</p>
                <img src="${product.images[0].url}" alt="${product.productTitle}" style="display: block; margin: 0 auto;">
            </div>
        `;
        clothingDataDiv.innerHTML = productHTML;
    }
}