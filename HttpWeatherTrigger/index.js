const axios = require('axios').default;

module.exports = async function (context, req) {
    context.log('JavaScript HTTP Weather trigger function processed a request.');

    try {
       const API_KEY = '20d5d937ecbafb9a9307608db61890a6';
        const latitude = (req.query.latitude || (req.body && req.body.latitude));
        const longitude = (req.query.longitude || (req.body && req.body.longitude));

        if (latitude && longitude) {
            const url = `http://api.openweathermap.org/data/2.5/weather?` +
                `lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

            const response = await axios.get(url);

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: response.data
            };
        } else {
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: 'Enter Latitude & Longitude'
            };
        }
    } catch (e) {
        context.log('Error in HTTP Weather API ', e.message);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: e.message
        };
    }
}