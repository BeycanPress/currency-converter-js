# Currency Converter

[![npm][npm-image]][npm-url]
[![MIT License][mit-license-image]][mit-license-url]

[npm-url]: https://www.npmjs.com/package/@beycanpress/currency-converter
[npm-image]: https://img.shields.io/npm/v/@beycanpress/currency-converter.svg?label=npm%20version
[mit-license-url]: LICENSE
[mit-license-image]: https://camo.githubusercontent.com/d59450139b6d354f15a2252a47b457bb2cc43828/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f7365727665726c6573732e737667

## About

It takes on the task of converting between fiat and cryptocurrencies.

## Installation

`npm install --save @beycanpress/currency-converter`

## Usage

```js
import CurrencyConverter from '@beycanpress/currency-converter';
//or
const CurrencyConverter = require('@beycanpress/currency-converter');


// 'coinmarketcap' can only use in backend. And it needs an API key.
let converter = new CurrencyConverter('cryptocompare | coinmarketcap', 'api key for coinmarketcap');
paymentPrice = await converter.convert('USD', 'BTC', 15 /* USD Price */);

paymentPrice // BTC Price
```