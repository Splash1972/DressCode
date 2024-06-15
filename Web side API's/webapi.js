
async function testApi() {
    const url = 'https://kohls.p.rapidapi.com/products/detail?webID=4201989';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '4c39475279msh8f91520ad9b9519p12eec7jsn8ccfc415f2ce',
            'x-rapidapi-host': 'kohls.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
}
// Call the function to test the API
testApi();

