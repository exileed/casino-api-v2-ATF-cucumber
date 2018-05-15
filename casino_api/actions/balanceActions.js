const requestActions = require('../requestActions');
const accountActions = require('./accountActions');
const should         = require("should");

module.exports = {

    addBalance: async function (user, amount) {
        let url = "/gateway/v2/payment/deposit";

        let req = {
            "value"    : user.value,
            "amount"   : amount,
            "search_by": "login"
        };

        return await requestActions.send(req, url);
    },

    removeBalance: async function (user, amount) {
        let url = "/gateway/v2/payment/withdraw";

        let req = {
            "value"    : user.value,
            "amount"   : amount,
            "search_by": "login"
        };

        return await requestActions.send(req, url);

    },


    removeAllBalance: async function (user) {
        let url = "/gateway/v2/payment/withdraw";

        let account = await accountActions.getAccountInfoByUser(user);

        let req = {
            "value"    : user.value,
            "amount"   : account.body.result.balance,
            "search_by": "login"
        };

        let {body: {result: response}} = await requestActions.send(req, url).expect(200);
        parseInt(response.balance).should.equal(0);
    },

};