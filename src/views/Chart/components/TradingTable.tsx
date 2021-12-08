import _ from "lodash"
import moment from "moment"
import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import { getPrettyPrice } from "utils/formatBalance"
import BigNumber from 'bignumber.js'

/* eslint-disable */

const Row = styled.tr`
    border-top: 1px solid rgba(128, 128, 128, 0.5);

    &:nth-child(2n + 1) {
        background-color: rgba(128, 128, 128, 0.05);
    }

    td {
        padding: 6px 10px;
        line-height: 1.3;
        word-break: break-word;
        font-size: 13px;

        a {
            color: #1995ff;
        }

        ${({ theme }) => theme.mediaQueries.sm} {
          font-size: 15px;
        }
    }
`

const BuyRow = styled(Row)`
    color: green;
`

const SellRow = styled(Row)`
    color: #EE5350;
`

const THead = styled.div`
    display: flex;
    margin-top: 30px;

    div {
        flex: 1;
        padding: 15px 6px;
        color: rgba(150, 150, 150);
    }
`

const Table = styled.table`
    table-layout: fixed;
    width: 100%;
`

const TradingTable = (props) => {

    const [trades, setTrades] = useState([]);
    const { token, bnbPrice } = props

    const e18 = new BigNumber(10).pow(18)

    const parseBlockData = (blockData, token, bnbPrice) => {

        const twei = new BigNumber(10).pow(token.decimals)
        
        let data = blockData.map(item => {
            let item2;
            let tokenIn = new BigNumber(0), quoteIn = new BigNumber(0), tokenOut = new BigNumber(0), quoteOut = new BigNumber(0);
            if (token.address < token.quoteToken.address) {
                [tokenIn, quoteIn, tokenOut, quoteOut] = item.params.map(n => (new BigNumber(n)));
            } else {
                [quoteIn, tokenIn, quoteOut, tokenOut] = item.params.map(n => (new BigNumber(n)));
            }

            let tokenTr = tokenIn.minus(tokenOut);
            let quoteTr = quoteIn.minus(quoteOut);

            const unitPrice = token.quoteToken.symbol === 'BUSD'? 1 : bnbPrice;

            if (tokenTr.gt(0)) {
                const tokens = tokenTr.div(twei).toNumber()
                const quote = quoteTr.abs().div(e18).toNumber()

                item2 = {
                    blockData: true,
                    type: 'Sell',
                    tokens: getPrettyPrice(tokens),
                    price: getPrettyPrice(quote * unitPrice),
                    tokenPrice: getPrettyPrice(quote * unitPrice / tokens),
                    quote: getPrettyPrice(quote),
                    time: item.timestamp,
                    baseCurrency: token.symbol,
                    quoteCurrency: token.quoteToken.symbol,
                    tx: item.tx,
                    block: item.blockNumber
                }
            } else {
                const tokens = tokenTr.abs().div(twei).toNumber()
                const quote = quoteTr.div(e18).toNumber()

                item2 = {
                    blockData: true,
                    type: 'Buy',
                    tokens: getPrettyPrice(tokens),
                    price: getPrettyPrice(quote * unitPrice),
                    tokenPrice: getPrettyPrice(quote * unitPrice / tokens),
                    quote: getPrettyPrice(quote),
                    time: item.timestamp,
                    baseCurrency: token.symbol,
                    quoteCurrency: token.quoteToken.symbol,
                    tx: item.tx,
                    block: item.blockNumber
                }
            }

            return item2;
            
        });

        data.sort((a, b) => {
            if (a.time > b.time) return -1
            else if (a.time == b.time) return 0
            else return 1
        })

        return data;
    }

    useEffect(()=>{

        let lastBlock = 0
        let fetching = false
        let tradesData = []

        const getTrades = (update) => {
            if (fetching) return
    
            fetching = true
    
            let api = `${props.udfHost}/trades?address=${token.address}&lpv1=${token.lpaddr1}&lpv2=${token.lpaddr2}`;
            if (update && lastBlock > 0) {
                api = `${api}&from=${lastBlock}`
            }
    
            fetch(api).then(res=>res.json()).then(data=>{

                tradesData = _.concat(data.data.filter(item=>{
                    return item.block > lastBlock
                }), tradesData)

                if (tradesData.length) {
                    lastBlock = tradesData[0].block;
                }

                let blockData = parseBlockData(data.blockData.filter(item => (item.blockNumber > lastBlock)), token, bnbPrice)

                if (blockData.length > 0 && tradesData.length > 0 && blockData[blockData.length - 1].tx == tradesData[0].tx) {
                    blockData.splice(blockData.length - 1, 1)
                }

                tradesData = _.concat(blockData, tradesData).slice(0, 400)

                if (tradesData.length) {
                    lastBlock = tradesData[0].block;
                }

                setTrades(tradesData)
    
                fetching = false
            }).catch(e=>{
                console.error(e)
                fetching = false
            })
        }

        if (token.address && bnbPrice > 0) {
            getTrades(false);

            const interval = setInterval(() => {
                getTrades(true)
            }, 5000)

            return ()=>clearInterval(interval)
        }

    }, [token, bnbPrice])

    return <>
        <THead>
            <div className="hide-mobile"></div>
            <div>Tokens</div>
            <div>Price</div>
            <div>Price/Token</div>
            <div>Time</div>
            <div>Tx</div>
        </THead>
        <div style={{height:'500px',overflowY:'auto',overflowX:'hidden'}} >
            <Table>
                <tbody>
                    {trades.map((item, key) => {
                        let type
                        let tokens
                        let price
                        let quote
                        let tokenPrice
                        if (item.blockData === true) {
                            // {tokens, price, quote, tokenPrice} = item
                            type = item.type
                            tokens = item.tokens
                            price = item.price
                            quote = item.quote
                            tokenPrice = item.tokenPrice
                        } else if (item.baseCurrency === item.buyCurrency.symbol) {
                            type = 'Sell'
                            tokens = getPrettyPrice(item.buy)
                            price = item.sellUsd.toFixed(2)
                            quote = getPrettyPrice(item.sell)
                            tokenPrice = getPrettyPrice(item.sellUsd / item.buy)
                        } else {
                            type = 'Buy'
                            tokens = getPrettyPrice(item.sell)
                            price = item.buyUsd.toFixed(2)
                            quote = getPrettyPrice(item.buy)
                            tokenPrice = getPrettyPrice(item.buyUsd / item.sell)
                        }
                        let quoteCurrency = item.quoteCurrency === 'WBNB'? 'BNB' : item.quoteCurrency
                        // const time = new Date(item.time * 1000).toLocaleString()
                        const time = moment(item.time * 1000).format('h:mm:ss A')
                        // @ts-ignore
                        if (type == 'Buy') {
                            return <BuyRow key={`tx-${key}`} >
                                <td className="hide-mobile" >{type}</td>
                                <td>{tokens}<br/>{item.baseCurrency}</td>
                                <td>${price} <br/> {quote} {quoteCurrency}</td>
                                <td>${tokenPrice}</td>
                                <td>{time}</td>
                                <td><a href={`https://bscscan.com/tx/${item.tx}`} target="_blank" >{item.tx.substring(0,8)}...</a></td>
                            </BuyRow>
                        }
                        return <SellRow key={`tx-${key}`} >
                            <td className="hide-mobile">{type}</td>
                            <td>{tokens}<br/>{item.baseCurrency}</td>
                            <td>${price} <br/> {quote} {quoteCurrency}</td>
                            <td>${tokenPrice}</td>
                            <td>{time}</td>
                            <td><a href={`https://bscscan.com/tx/${item.tx}`} target="_blank" >{item.tx.substring(0,8)}...</a></td>
                        </SellRow>
                    })}
                </tbody>
            </Table>

        </div>        
    </>
}

export default TradingTable
