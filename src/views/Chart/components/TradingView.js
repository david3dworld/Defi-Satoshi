/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { getProperDecimals } from 'utils/formatBalance';
import { getPrettyPrice } from "utils/formatBalance"
import BigNumber from 'bignumber.js'

const SCRIPT_ID = 'tradingview-widget-script';
const CONTAINER_ID = 'tradingview-widget';

export default class TradingViewWidget extends PureComponent {

  containerId = `${CONTAINER_ID}-${Math.random()}`;

  scriptLoaded = false;

  componentDidMount = () => {
    this.appendScript(()=>{
      this.scriptLoaded = true
      this.initWidget(this.props.token)

      this.address = this.props.token.address
      this.lpType = this.props.lpType
    });
  }

  address = '';

  componentDidUpdate = () => {
    if (this.scriptLoaded && this.props.token.address && (this.address != this.props.token.address || this.lpType != this.props.lpType)) {
      this.address = this.props.token.address
      this.lpType = this.props.lpType
      this.cleanWidget();
      this.initWidget(this.props.token);
    }
  };

  canUseDOM = () => !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );

  appendScript = (onload) => {
    if (!this.canUseDOM()) {
      onload();
      return;
    }

    if (this.scriptExists()) {
      /* global TradingView */
      if (typeof TradingView === 'undefined') {
        this.updateOnloadListener(onload);
        return;
      }
      onload();
      return;
    }
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'text/javascript';
    script.async = true;
    script.src = '/tradingview.js';
    script.onload = onload;
    document.getElementsByTagName('head')[0].appendChild(script);
  };

  getScriptElement = () =>
    document.getElementById(SCRIPT_ID);

  scriptExists = () =>
    this.getScriptElement() !== null;

  updateOnloadListener = (onload) => {
    const script = this.getScriptElement();
    const oldOnload = script.onload;
    return script.onload = () => {
      oldOnload();
      onload();
    };
  };

  initWidget = (token) => {

    if (!token || !token.symbol) return;

    const tokenPriceBusd = token.tokenPriceBnb? token.tokenPriceBnb.multipliedBy(this.props.bnbPrice).toNumber() : 0
    const tokenPriceDecimals = getProperDecimals(tokenPriceBusd)
    const lpType = this.lpType

    // let priceUnit = token.address.toLowerCase() === '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'.toLowerCase()? 1 : this.props.bnbPrice;
    let priceUnit = 1;

    const udfHost = this.props.udfHost;
    const bnbPrice = this.props.bnbPrice;
    let pairName = `${token.symbol}/BNB`;

    if (token.address === '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c') {
      pairName = `${token.symbol}/BUSD`;
    }

    if (!window.tvSubscribers) {
      window.tvSubscribers = {};
    }

    var supportedResolutions = [
      '1', '3', '15', '60', '120', '240', '480', '1D', '1W', '1M'
    ];

    var ResultionSeconds = {
      '1': 60,
      '3': 180,
      '15': 900,
      '60': 3600,
      '120': 7200,
      '240': 14400,
      '480': 28800,
      '1D': 86400,
      '1W': 604800,
      '1M' : 2592000,
    } 
  
    // set trading view config object
    var tradingViewConfig = {
      supports_search: true,
      supports_group_request: false,
      supports_marks: false,
      supports_timescale_marks: false,
      supports_time: true,
      exchanges: [],
      symbols_types: [],
      supported_resolutions: supportedResolutions,
      currency_codes: ['USD', 'BNB']
    };
  
    // ------------------------------------------------------
    // provide chart history ~ get data points/bars
    // ------------------------------------------------------
  
    var historyProvider = {
      last_tid: 0, // record of last trade id
      last_time: null, // record of last bar time on the chart
      last_bar: {},
      getBars: function (
        symbolInfo,
        resolution,
        from,
        to,
        onHistoryCallback,
        onErrorCallback,
        attempt = 0
        // first
      ) {
        var url = `${udfHost}/history?from=${from}&to=${to}&resolution=${resolution}&address=${token.address}&lpv1=${token.lpaddr1}&lpv2=${token.lpaddr2}&dex=${lpType}`;
  
        self = this;

        fetch(url).then(res=>res.json()).then(response=>{
          var data = handleData(response);
          if (data.length) {
            onHistoryCallback(data, { noData: false });
          } else {
            onHistoryCallback(data, { noData: true });
          }
        }).catch(e=>{
          if (attempt < 5) {
            self.getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, attempt + 1)
          } else {
            console.log("Request Failed: " + e.message);
            onErrorCallback(e.message);
          }
        })
  
      }
    };
  
    // handle data
    function handleData(data, minutes) {
      historyProvider.last_tid = 0;
      // handle error
      if (data.error && data.error === 1001) {
        console.log(data.error.message);
        return [];
      }
      // handle data
      if (data.length) {
        var bars = data.map(i => {
          var j = i;
          j.close *= priceUnit;
          j.open *= priceUnit;
          j.low *= priceUnit;
          j.high *= priceUnit;
          return j;
        });
        historyProvider.last_time = bars[bars.length - 1].time / 1000;
        historyProvider.last_bar = bars[bars.length - 1];
        return bars;
      } else {
        historyProvider.last_time = 0;
        return [];
      }
    }

    function parseBlockData(blockData, token, bnbPrice) {
      let open = 0, close, low = 10000000000, high = 0, time = 0, volume = 0;

      const twei = new BigNumber(10).pow(token.decimals);
      const e18 = new BigNumber(10).pow(18);

      blockData.map((item, i) => {
        let tokenIn = new BigNumber(0), quoteIn = new BigNumber(0), tokenOut = new BigNumber(0), quoteOut = new BigNumber(0);

        if (token.address < token.quoteToken.address) {
          [tokenIn, quoteIn, tokenOut, quoteOut] = item.params.map(n => (new BigNumber(n)));
        } else {
          [quoteIn, tokenIn, quoteOut, tokenOut] = item.params.map(n => (new BigNumber(n)));
        }

        let tokenTr = tokenIn.minus(tokenOut);
        let quoteTr = quoteIn.minus(quoteOut);

        const unitPrice = token.quoteToken.symbol === 'BUSD'? 1 : bnbPrice;

        const tokens = tokenTr.div(twei).abs().toNumber()
        const quote = quoteTr.abs().div(e18).times(unitPrice).abs().toNumber()

        if (quote > 1) {
          const price = quote / tokens;

          if (open === 0) {
            open = price;
            time = item.timestamp * 1000;
          }
          close = price;
          if (price < low) low = price;
          if (price > high) high = price;
          volume += quote;
        }
        
      });

      if (time > 0) {
        return {
          open: open,
          close: close,
          low: low,
          high: high,
          time: time,
          volume: volume
        };
      } else {
        return null;
      }
    }

    var subscribeTimer
  
    var Datafeed = {
      /*
        onReady is called immediately after the chart widget initializes, and we pass the datafeed config options
        into the onReady cb function. The charting library wants this to be executed asynchronously, and suggests wrapping
        in setTimeout with delay of 0 to force this behavior. Thus, the implementation.
      */
      onReady: function (cb) {
        setTimeout(function () {
          cb(tradingViewConfig)
        }, 0)
      },
      searchSymbols: function (
        userInput,
        exchange,
        symbolType,
        onResultReadyCallback
      ) {
        // console.log("==== Search Symbols running");
      },
      // expects a symbolInfo object in response
      resolveSymbol: function (
        symbolName,
        onSymbolResolvedCallback,
        onResolveErrorCallback
      ) {
        // console.log("====== resolveSymbol running");
        
        setTimeout(function () {
          var symbol_stub = {
            name: token.symbol, // name of symbol
            description: pairName, // description of symbol
            type: "crypto", // type of asset
            session: "24x7", // trading session, 24hrs everyday
            timezone: 'Etc/UTC', // moment.tz.guess(), // timezone of exchange
            ticker: token.symbol, // has precedence over name, if empty, name will be used. Can be used for custom symbol name
            exchange: "", // Name of Exchange
            minmov: 1, // The amount of price precision steps for 1 tick
            // pricescale: 10000, // number of decimal places ~ 10^8
            pricescale: 10**tokenPriceDecimals,
            has_intraday: true, // boolean for showing intraday historical data, example ~ 3 min historical data
            // intraday_multipliers: ["1", "5", "15", "30", "60", "120", "240", "720"],
            has_daily: true, // https://github.com/tradingview/charting_library/wiki/Symbology#has_daily
            has_weekly_and_monthly: false, // https://github.com/tradingview/charting_library/wiki/Symbology#has_weekly_and_monthly
            has_no_volume: false,
            supported_resolution: supportedResolutions, // duration period on chart
            volume_precision: 8,
            data_status: "streaming",
            currency_code: 'USD',
            original_currency_code: 'BNB'
          };

          onSymbolResolvedCallback(symbol_stub);
          // console.log("Resolving that symbol....", symbol_stub);
        }, 0);
  
        // onResolveErrorCallback('Not feeling it today')
      },
      getBars: function (
        symbolInfo,
        resolution,
        range,
        onHistoryCallback,
        onErrorCallback,
        firstDataRequest
      ) {
        // console.log("=====getBars running", arguments);
        historyProvider.getBars(
          symbolInfo,
          resolution,
          range.from,
          range.to,
          onHistoryCallback,
          onErrorCallback,
          firstDataRequest
        );
      },
  
      subscribeBars: function (
        symbolInfo,
        resolution,
        onRealtimeCallback,
        subscribeUID,
        onResetCacheNeededCallback
      ) {
        // console.log("subscribeBars...", subscribeUID);
        this.unsubscribeBars()

        var getBar = function() {
          var from = parseInt(historyProvider.last_time);
          var url = `${udfHost}/history2?from=${from}&lpv1=${token.lpaddr1}&lpv2=${token.lpaddr2}`;

          fetch(url).then(res=>res.json()).then(response=>{
            if (response.length && token.lpaddr1 && bnbPrice > 0) {
              var lastItem = parseBlockData(response, token, bnbPrice);

              if (lastItem) {
                var trade = {
                  date: lastItem.time / 1000,
                  price: (lastItem.open + lastItem.close) / 2,
                  amount: lastItem.volume
                };
                var lastBar = historyProvider.last_bar;
                if (lastBar.open && lastItem.open > lastBar.open * 1.5) return;
  
                let _lastBar;
                if (trade.date > historyProvider.last_time + ResultionSeconds[resolution]) {
                  _lastBar = lastItem;
                  onRealtimeCallback(_lastBar);
                  historyProvider.last_time = _lastBar.time / 1000
                  historyProvider.last_bar = _lastBar
                } else {
                  // if the time is less than, update the previous bar, multiple trades can
                  // happen at the same time by different traders
                  // update lastBar candle!
                  if (lastItem.low * priceUnit < lastBar.low) {
                    lastBar.low = lastItem.low * priceUnit;
                  } else if (lastItem.high * priceUnit > lastBar.high) {
                    lastBar.high = lastItem.high * priceUnit;
                  }
                  lastBar.volume = lastItem.volume;
                  lastBar.close = lastItem.close * priceUnit;
                  _lastBar = lastBar;
                  onRealtimeCallback(_lastBar);
                  historyProvider.last_bar = _lastBar
                }
              }
            }
          }).catch(e=>{
            console.log("Request Failed: " + e.message);
          }).finally(() => {
            update();
          });
        }

        var update = function() {
          // console.log("update...");
          window.tvSubscribers[subscribeUID] = setTimeout(getBar, 2000);
        }

        update();
      },
      unsubscribeBars: function (subscribeUID) {
        // console.log("=====unsubscribeBars running", subscribeUID);
        // ranger.unbind(`${gon.market.id}.trades`, window[`${subscribeUID}_channel`])

        if (subscribeUID && window.tvSubscribers[subscribeUID]) {
          clearTimeout(window.tvSubscribers[subscribeUID])
          window.tvSubscribers[subscribeUID] = null
        }
      },
      calculateHistoryDepth: function (resolution, resolutionBack, intervalBack) {
        // console.log("=====calculateHistoryDepth running");
        var result =
          resolution < 60
            ? {
              resolutionBack: "D",
              intervalBack: "1"
            }
            : undefined;
        return result;
      },
      getMarks: function (symbolInfo, from, to, onDataCallback, resolution) {
        // console.log("=====getMarks running");
      },
      getTimeScaleMarks: function (
        symbolInfo,
        from,
        to,
        onDataCallback,
        resolution
      ) {
        // console.log("=====getTimeScaleMarks running");
      },
      getServerTime: function (callback) {
        // console.log("=====getServerTime running");
      }
  
    }

    /* global TradingView */
    var widget = window.tvWidget = new TradingView.widget({
      debug: false, // uncomment this line to see Library errors and warnings in the console
      fullscreen: false,
      symbol: token.symbol,
      interval: '60',
      container_id: this.containerId,

      //	BEWARE: no trailing slash is expected in feed URL
      // datafeed: new Datafeeds.UDFCompatibleDatafeed(this.props.udfHost, 30000),
      datafeed: Datafeed,
      library_path: "/charting_library/",
      locale: "en",

      disabled_features: ["header_symbol_search"],
      enabled_features: ["hide_left_toolbar_by_default"],
      // charts_storage_url: 'https://saveload.tradingview.com',
      // charts_storage_api_version: "1.1",
      // client_id: 'infinity-tradingview.com',
      user_id: 'public_user_id',
      theme: 'Dark',
      autosize: true,
      timezone: moment.tz.guess(),
      custom_css_url: '/charting_library/tv.css'
    });

  };

  cleanWidget = () => {
    if (!this.canUseDOM()) return;
    document.getElementById(this.containerId).innerHTML = '';
  };

  getStyle = () => {
    if (!this.props.autosize) return {};
    return {
      width: '100%',
      height: '100%'
    };
  };

  render = () => <article id={this.containerId} style={this.getStyle()} />
}