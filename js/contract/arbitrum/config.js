$.CONFIG = function() {};
$.CONFIG.prototype = (function() {
    var setting = {

    };
    var CONTRACTS = {
        42161: {
            gameController: {
                contract: "0x802A72083ecA5FDb3B20Ea608d3055922C1FeD7F"
            },
            heroNft: {
                contract: "0x43D9eCEcdc4385D7B842cADc28A984C35fDB09b2"
            },
        },
        421613: {
            gameController: {
                contract: "0xBdEadEeBea3EB233E8c1dE50722f43f10a75D144"
            },
            heroNft: {
                contract: "0x3BDBCbc35B48E13e726d6cb75EC5F4fDb9653B3A"
            },
        },
    };
    var TOKENS = {
        42161: { //mainnet arbitrum one
            'grb': '0x5fd71280b6385157b291b9962f22153fc9e79000',
            'vegrb': '0x14c302dca44528a2b00b932afdf01e9d48100b7b',
            'grbo': '0x5fd71280b6385157b291b9962f22153fc9e79000',
            'weth': '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
            'etho': '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
            'wbtc': '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
            'usdc': '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
            'usdt': '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
            'dai': '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
            'gec': '0x5eba4d078a28578d24aa536f70448d507e1cc78e'
        },
        421613: {//arbitrum testnet
            'grb': '0xd1eb8a5798e04703ec5324c99405f581bd6318b8',
            'vegrb': '0xcf7d3a1ff5188a0d398cf8181b8bdc051204f8da',
            'weth': '0xE0EcA46EA3308E8184e3b462b8A722F93A8F6F27',
            'usdc': '0x29680BD5F3f324001Add9229d6B44615353f554c',
            'usdt': '0x2E4e7eBfF934B6999BDc2983F17F6bd4b6A84206',
            'dai': '0x9Ce3C139316A560A57c861F558284CF31EBC8acE',
            'gec': '0x965782738c1acca851104444bda0a03ee68355dc',
            'mgrb' : '0x570A6cFA0e11f0Db8594E6a74B9106d5F21151C0',
        }
    }
    var TOKENS_DECIMAL = {
        42161: {
            'grb': 18,
            'vegrb': 18,
            'grbo': 18,
            'weth': 18,
            'etho': 18,
            'wbtc': 8,
            'usdc': 6,
            'usdt': 6,
            'dai': 18,
            'gec': 18
        },
        421613: {
            'grb': 18,
            'vegrb': 18,
            'weth': 18,
            'usdc': 6,
            'usdt': 6,
            'dai': 18,
            'gec': 18
        }
    };
    var PRICES = {
        42161: {
            'grb': 0.6,
            'weth': 1700,
            'wbtc': 26000,
            'usdc': 1,
            'usdt': 1,
            'dai': 1
        },
        421613: {
            'grb': 0.6,
            'weth': 1700,
            'usdc': 1,
            'usdt': 1,
            'dai': 1
        }
    };
    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
        },
        /**
         * @param _chainId {Number} 42161 || 421613
         */
        getContracts(_chainId = 42161) {
            return CONTRACTS[_chainId];
        },
        /**
         * @param _chainId {Number} 56 || 421613
         */
        getTokens(_chainId = 42161) {
            return TOKENS[_chainId];
        },
        getTokenList(_chainId = 42161) {
            let _tokenObj = this.getTokens(_chainId);
            let _tokenList = [];
            for (let idx in _tokenObj) {
                _tokenList.push(_tokenObj[idx]);
            }
            return _tokenList;
        },
        getPrices(_chainId = 42161) {
            return PRICES[_chainId];
        },
        getPriceByTokenName(_chainId = 42161, _tokenName = '') {
            _tokenName = _tokenName.toLowerCase();
            return PRICES[_chainId][_tokenName] ? PRICES[_chainId][_tokenName] : 0;
        },
        /**
         * @param _chainId {Number} 42161 || 421613
         * @param _tokenName {String}
         */
        getTokenAddressByTokenName(_chainId = 42161, _tokenName = '') {
            _tokenName = _tokenName.toLowerCase();
            return TOKENS[_chainId][_tokenName];
        },
        getAddressByTokenName(_chainId = 42161, _tokenName = '') {
            _tokenName = _tokenName.toLowerCase();           
            let _tokens = TOKENS[_chainId];
            console.log(_tokens);
            for (let _tokenAddr in _tokens) {
                if (_tokens[_tokenAddr].toLowerCase() == _tokenName) return _tokenAddr;
                console.log(_tokens[_tokenAddr].toLowerCase());
                console.log(_tokenName);
            }
            return "";
        },
        getTokenDecimalByAddress(_chainId = 42161, _tokenAddr = '') {
            _tokenAddr = _tokenAddr.toLowerCase();
            let _tokens = TOKENS[_chainId];
            for (let _tokenName in _tokens) {
                if (_tokens[_tokenName].toLowerCase() == _tokenAddr) return TOKENS_DECIMAL[_chainId][_tokenName];;
            }
            throw new Error("Invalid Token Address");
        },
        /**
         * @param _chainId {Number} 42161 || 421613
         * @param _tokenName {String}
         */
        getTokenDecimalByTokenName(_chainId = 42161, _tokenName = '') {
            _tokenName = _tokenName.toLowerCase();
            return TOKENS_DECIMAL[_chainId][_tokenName];
        },
        getAmountLimit() {
            return '115792089237316195423570985008687907853269984665640564039457584007913129639935';
        },
        getContractAddressByName(_chainId = 421613, name) {
            return CONTRACTS[_chainId][name].contract;
        }
    };
}(jQuery));