const axios = require('axios');

const apis = {
    'CryptoCompare': 'https://min-api.cryptocompare.com/data/price',
    'CoinMarketCap': 'https://pro-api.coinmarketcap.com/v1/tools/price-conversion'
};

const stableCoins = [
    'USDT',
    'USDC',
    'DAI',
    'BUSD',
    'UST',
    'TUSD'
];

const state = {};

/**
 * @param {String} api
 * @param {String|null} apiKey
 * @throws {Error}
 */
let setApi = (api, apiKey = null) => {

    if (!apis[api]) {
        throw new Error('Unsupported api!');
    }

    state.api = api;
    state.apiKey = apiKey;
    state.apiUrl = apis[api];
}

/**
 * @param {String} from
 * @param {String} to
 * @param {Number} amount
 * @return {Float|null}
 * @throws {Error}
 */
let convert = (from, to, amount) => {
    if (state.api == 'CoinMarketCap') {
        return convertWithCoinMarketCap(from, to, amount);
    } else if (state.api == 'CryptoCompare') {
        return convertWithCryptoCompare(from, to, amount);
    } else {
        return null;
    }
}

/**
 * It is not currently used by js as requests are prohibited by coinmarketcap (only backend)
 * @param {String} from
 * @param {String} to
 * @param {Number} amount
 * @return {Float|null}
 * @throws {Error}
 */
let convertWithCoinMarketCap = async (from, to, amount) => {

    checkUsedApi('CoinMarketCap');

    let apiUrl = `${state.apiUrl}?amount=${amount}&symbol=${from}&convert=${to}`;

    let response = await axios.get(apiUrl, {
        headers: {
            'Accepts': 'application/json',
            'X-CMC_PRO_API_KEY': `${state.apiKey}`,
        }
    });

    let convertData = response.data;

    if (convertData.data) {
        let price = convertData.data.quote[to.toUpperCase()].price;
        return parseFloat(price);
    } else {
        return null;
    }
}

/**
 * @param {String} from
 * @param {String} to
 * @param {Number} amount
 * @return {Float|null}
 * @throws {Error}
 */
let convertWithCryptoCompare = async (from, to, amount)  => {

    if (from.toLocaleUpperCase() == 'USD' || to.toLocaleUpperCase() == 'USD') {
        if (stableCoins.includes(from.toLocaleUpperCase()) || stableCoins.includes(to.toLocaleUpperCase())) {
            return amount;
        }
    }

    checkUsedApi('CryptoCompare');

    let apiUrl = state.apiUrl + '?fsym=' + from + '&tsyms=' + to;
    let response = await axios.get(apiUrl);
    let convertData = response.data;
    if (convertData[to.toUpperCase()]) {
        let price = amount * convertData[to.toUpperCase()];
        return parseFloat(price);
    } else {
        return null;
    }
}


/**
 * @param {String} api
 * @return {void}
 * @throws {Error}
 */
let checkUsedApi = (api) => {
    if (state.api != api) {
        throw new Error(`The api chosen to be used is not the "${api}" api!`);
    } else {
        if (state.apiKey == null && state.api == 'coinmarketcap') {
            throw new Error("The key of the api selected to be used has not been entered.");
        }
    }
}

/**
 * @param {Array} symbols
 */
let addStableCoins = (symbols) => {
    stableCoins = stableCoins.concat(symbols);
}


module.exports = {
    state,
    setApi,
    convert,
    addStableCoins,
    convertWithCoinMarketCap,
    convertWithCryptoCompare
};