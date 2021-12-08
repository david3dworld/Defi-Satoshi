import React, { useRef, useState } from "react"
import { useHistory } from "react-router"
import styled from "styled-components"
import { Image, Input, Text } from "@satoshicrypto/uikit"
import { isAddress } from "utils/web3"
import { getBalanceNumber, getProperDecimals } from "utils/formatBalance"
import CardValue from "views/Home/components/CardValue"
import BigNumber from "bignumber.js"
import web3 from "web3"

const SearchList = styled.div`
background: ${({theme}) => theme.colors.background};
border: 1px solid ${({theme}) => theme.colors.borderColor};
color: ${({theme}) => theme.colors.contrast};
border-radius: 4px;
position: absolute;
top: 45px;
width: 100%;
z-index: 2;
max-height: 300px;
overflow-y: auto;
`

const SearchListItem = styled.div`
padding: 10px 15px;
cursor: pointer;
font-weight: 300;
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
&:hover {
    opacity: 0.8;
}
`

const Split = styled.hr`
border-color: rgba(120, 120, 120, 0.5);
border-style: solid;
border-width: 1px 0 0 0;
`

const Link = styled.a`
color: ${({theme}) => theme.colors.contrast};
display: flex;
align-items: center;

&:hover {
    text-decoration: underline;
}
`

const TokenIcon = styled.span`
width: 18px;
height: 18px;
background-size: contain;
background-position: center;
background-repeat: no-repeat;
display: inline-block;
margin-right: 5px;
vertical-align: middle;
`

const TokenDetails = styled.div`
border-radius: 20px;
background-color: ${({ theme }) => theme.colors.card};
padding: 15px;
margin-top: 20px;
`

const SearchToken = (props) => {
    const [searchList, setSearchList] = useState([])
    const [searching, setSearching] = useState(false)
    const [showTokenIcon, setShowTokenIcon] = useState(true)
    const search = useRef()
    const history = useHistory()

    let delayTimer

    const { udfHost } = props

    const searchToken = async () => {
        setSearching(true)

        // @ts-ignore
        const value = search.current.value

        if (value.length > 1) {
            if (isAddress(value)) {
                setSearchList([
                    {
                        name: value,
                        address: value
                    }
                ])
            } else {
                try {
                    const res =  await (await fetch(`https://node5049.myfcloud.com/search-token?search=${value}`)).json()
                    // const res =  await (await fetch(`${udfHost}/search-token?search=${value}`)).json()
                    setSearchList(res.map(i => ({
                        address: i.address,
                        name: `${i.symbol} (${i.name})`
                    })))
                } catch(e) {
                    console.error(e)
                    setSearchList([])
                }
            }
        } else {
            setSearchList([])
        }

        setSearching(false)
        delayTimer = false
    }

    const onInput = e => {
        if (delayTimer || searching) return

        delayTimer = setTimeout(searchToken, 400)
    }

    const onBlurSearch = () => {
        // @ts-ignore
        const value = search.current.value

        if (value.length < 2) {
            clearSearch()
        }
    }

    const onKeyPressInput = e => {
        if (e.charCode === 13) {
            // @ts-ignore
            const value = search.current.value

            if (isAddress(value)) {
                showAddress(value)
            }
        }
    }

    const showAddress = (addr) => {
        clearSearch()
        if (addr === props.token.address) return;
        history.push(`/chart/${addr}`)
    }

    const clearSearch = () => {
        // @ts-ignore
        search.current.value = ''
        setSearchList([]);
    }

    const {
        token,
        bnbPrice
    } = props

    const tokenPriceBusd = token.tokenPriceBnb? token.tokenPriceBnb.multipliedBy(bnbPrice).toNumber() : 0
    const tokenPriceDecimals = getProperDecimals(tokenPriceBusd)

    const ZERO = new BigNumber(0)

    const quotePrice = (token.quoteToken && token.quoteToken.symbol === 'BNB')? bnbPrice : 1

    return <div style={{position:'relative'}} >
        <Input ref={search} onBlur={onBlurSearch} onChange={onInput} onKeyPress={onKeyPressInput} placeholder="Search by address or name" />
        {
            searchList.length > 0 && (
                <SearchList>
                    {searchList.map(item=><SearchListItem onClick={()=>{showAddress(item.address)}} key={item.address} >
                        <TokenIcon style={{backgroundImage:`url(https://r.poocoin.app/smartchain/assets/${web3.utils.toChecksumAddress(item.address, 56)}/logo.png)`}} />
                        {item.name}
                    </SearchListItem>)}
                </SearchList>
            )
        }
        {
            token.address && <TokenDetails>
                {/* <TokenIcon style={{backgroundImage:`url(https://r.poocoin.app/smartchain/assets/${web3.utils.toChecksumAddress(token.address, 56)}/logo.png)`}} /> */}

                <img style={{display:showTokenIcon?'inline-block':'none'}} alt="token" src={`https://r.poocoin.app/smartchain/assets/${web3.utils.toChecksumAddress(token.address, 56)}/logo.png`} width={26} height={26} onError={()=>setShowTokenIcon(false)} onLoad={()=>setShowTokenIcon(true)} />
                <div style={{display:"inline-block",verticalAlign:'bottom',marginLeft:4}}>
                    <Text fontSize="18px" >{`${token.name} (${token.symbol})`}</Text>
                </div>
                <Text color="#029a02" fontSize="15px" >${tokenPriceBusd.toFixed(tokenPriceDecimals)}</Text>
                <Split/>
                <Text fontWeight="200" small>Total Supply:</Text>
                <CardValue bold={false} fontSize="17px" value={getBalanceNumber(token.totalSupply, token.decimals)} decimals={0} />
                <Split/>
                <Text fontWeight="200" small>Market Cap:</Text>
                { token.totalSupply && 
                <CardValue bold={false} fontSize="17px" value={getBalanceNumber(token.totalSupply.minus(token.burnedAmount).multipliedBy(token.tokenPriceBnb).multipliedBy(bnbPrice), token.decimals)} prefix="$" decimals={0} />} 

                <Split/>
                <Text fontWeight="200" small >
                    <span style={{color:'#4ab4ff'}} >Pcv2</span>&nbsp;
                    {token.symbol}/{token.quoteToken.symbol} LP Holdings
                </Text>
                <CardValue bold={false} fontSize="17px" value={token.lpv2} suffix={` ${token.quoteToken.symbol}`} decimals={0} />
                <CardValue color="#029a02" fontSize="15px" bold={false} value={token.lpv2.multipliedBy(quotePrice)} prefix="$" />

                <Split/>
                <Text fontWeight="200" small >
                    <span style={{color:'#4ab4ff'}} >Satoshi</span>&nbsp;
                    {token.symbol}/{token.quoteToken.symbol} LP Holdings
                </Text>
                <CardValue bold={false} fontSize="17px" value={token.lpv1} suffix={` ${token.quoteToken.symbol}`} decimals={0} />
                <CardValue color="#029a02" fontSize="15px" bold={false} value={token.lpv1.multipliedBy(quotePrice)} prefix="$" />

                <Split/>
                <Link href={`https://bscscan.com/token/${token.address}`} target="_blank" >
                    <Image src="/images/bsc-logo.svg" alt="BSC Logo" width={16} height={16} />
                    &nbsp;&nbsp;
                    {token.symbol} Transactions 
                </Link>
                
                <Split/>
                <Link href={`https://bscscan.com/token/${token.address}#balances`} target="_blank" >
                    <Image src="/images/bsc-logo.svg" alt="BSC Logo" width={16} height={16} />
                    &nbsp;&nbsp;
                    {token.symbol} Holders
                </Link>
                
                <Split/>
                <Link href={`https://bscscan.com/address/${token.address}#code`} target="_blank" >
                    <Image src="/images/bsc-logo.svg" alt="BSC Logo" width={16} height={16} />
                    &nbsp;&nbsp;
                    {token.symbol} Contract
                </Link>
            </TokenDetails>
        }
    </div>
}

export default SearchToken
