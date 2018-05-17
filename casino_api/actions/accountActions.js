const requestActions = require('../requestActions');

const log4js = require('log4js');
const logger = log4js.getLogger();

module.exports = {

    getAccountInfoByUser: async function (user, field) {
        let req = {
            "value"    : user.value.toString(),
            "search_by": field
        };

        let url      = "/gateway/v2/account/info";
        let response = await requestActions.send(req, url);

        logger.debug("Response HTTP Status Code: " + response.statusCode);
        logger.debug("Response Body: " + JSON.stringify(response.body));

        return response;

    },
};