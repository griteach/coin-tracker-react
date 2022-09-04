import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, Outlet, Route, Routes, useLocation, useParams, useMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

import { Helmet } from "react-helmet";
import moment from 'moment';
import 'moment/locale/ko';
import { useInterval } from "react-use";


const Container = styled.div`
    padding: 0px 20px;
    max-width:480px;
    margin: 0 auto;
`;

const NavBar = styled.div`
    margin-top:15px;
    color:${props => props.theme.accentColor};
    height:3vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
        font-size: 12px;
        color:white;
    }
`

const Header = styled.div`
    height:10vh;
    margin: 30px 0px 25px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`

const Title = styled.h1`
    
    font-size:48px;
    color:${props => props.theme.accentColor};

`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0,0,0,0.5);
    padding:10px 20px;
    border-radius: 10px;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child{
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Description = styled.p`
    margin:20px 0px;
`;


const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;

`;

const Tab = styled.span<{isActive: boolean}>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    background-color: rgba(0,0,0,0.5);
    padding: 7px 0px;
    border-radius: 10px;
    a {
        display: block;
    }
    color:${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
`;


interface RouterState{
    name:string;
    rank:number;
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
  }
  
  interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  }

function getTime(){
    const date = new Date();
            const month = date.getMonth();

            // 달을 받아옵니다 
            const clockDate = date.getDate();

            // 몇일인지 받아옵니다 
            const day = date.getDay();

            // 요일을 받아옵니다. 
            const week = ['일', '월', '화', '수', '목', '금', '토'];

            // 요일은 숫자형태로 리턴되기때문에 미리 배열을 만듭니다. 
            const hours = date.getHours();

            // 시간을 받아오고 
            const minutes = date.getMinutes();

            // 분도 받아옵니다.
            const seconds = date.getSeconds();

            // 초까지 받아온후 
            return `${month+1}월 ${clockDate}일 ${week[day]}요일 ` + `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes }`  : minutes }:${seconds < 10 ? `0${seconds }`  : seconds }`;
}


function Coin(){
    const {coinId} = useParams();
    const location = useLocation();
    const currentCoin = location.state as RouterState;
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    //timer
    const [time, setTime] = useState(getTime());
    const [delay, setDelay] = useState(1000);
    const [isRunning, setIsRunning] = useState(true);

    useInterval(
        () => {
            setTime(getTime());
        },
        isRunning? delay:null
    );


    const { isLoading:infoLoading, data:infoData } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId!));
    const { isLoading:tickersLoading, data:tickersData } = useQuery<PriceData>(
        ["tickers", coinId], 
        () => fetchCoinTickers(coinId!),
        {
            refetchInterval:5000,
        }
        );
    
    /* 
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();
    
        
    useEffect(() => {
        (
            async () => {
                const infoData = await (await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`)).data;
                const priceData = await (await axios(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).data;
                setInfo(infoData);
                setPriceInfo(priceData);
                console.log(infoData, priceData);
                setLoading(false);
            }
        )();

    }, [])

 */
    
    return <Container>
    <Helmet>
        <title>{currentCoin?.name ? currentCoin.name : infoLoading? "Loading..." : infoData?.name}</title>
    </Helmet>

    <NavBar>
        <Link to={`/`}>🏠 Home</Link>    
        <span>{time}</span>
    </NavBar>    
    <Header>
    <Title>{currentCoin?.name ? currentCoin.name : infoLoading? "Loading..." : infoData?.name}</Title>
    </Header>
    {infoLoading? <Loader>Loading...</Loader>: 
        <>
        <Overview>
          <OverviewItem>
            <span>Rank:</span>
            <span>{infoData?.rank}</span>
          </OverviewItem>
              <OverviewItem>
            <span>Symbol:</span>
            <span>${infoData?.symbol}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Price:</span>
            <span>{`$${tickersData?.quotes.USD.price}`}</span>
          </OverviewItem>
        </Overview>
        <Description>{infoData?.description}</Description>
        <Overview>
          <OverviewItem>
            <span>Total Suply:</span>
            <span>{tickersData?.total_supply}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Max Supply:</span>
            <span>{tickersData?.max_supply}</span>
          </OverviewItem>
        </Overview>
        

        <Tabs>
            <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
        </Tabs>


        {/* 라우트 안에 라우트를 사용하기 위한 방식 */}
        <Outlet context={{coinId}}/>
      </>
    }
    </Container>
}

export default Coin;