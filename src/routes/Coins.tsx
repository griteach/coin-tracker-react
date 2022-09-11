import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { createSolutionBuilder } from 'typescript';
import { fetchCoins } from '../api';
import { isDarkAtom } from '../atoms';


const Container = styled.div`
    padding: 0px 20px;
    max-width:480px;
    margin: 0 auto;
`;

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

const CoinsList = styled.ul`
    
`;

const Coin = styled.li`
    background-color: white;
    color:${props => props.theme.textColor};
    
    border-radius: 20px;
    margin-bottom: 15px;
    a{
        padding: 20px;
        transition: color 0.2s ease-in;
        display: block;
    }
    &:hover{
        a{
            color:${props => props.theme.accentColor};
        }
    }
`;

const Img = styled.img`
    width:35px;
    height:35px;
    margin-right: 10px;
`

const CoinWrapper = styled.div`
    display: flex;
    align-items: center;
`;


const Title = styled.h1`
  font-size:48px;
  color:${props => props.theme.accentColor};

`;

const ToggleDarkBackGround = styled.div`
    margin-left: 20px;
    background:#53FF4C;
    width:70px;
    height:30px;
    border:1px solid #53FF4C;
    border-radius:15px;

`;
const ToggleWhiteBackGround = styled.div`
    margin-left: 20px;
    background:#CCCCCC;
    width:70px;
    height:30px;
    border:1px solid #CCCCCC;
    border-radius:15px;

`;
const ToggleDark = styled.button`
    background:#FFFFFF;
    width:30px;
    height:30px;
    border:none;
    border-radius:15px;
    position:relative;
    left:40px;
`;

const ToggleWhite = styled.button`
    background:#FFFFFF;
    width:30px;
    height:30px;
    border:none;
    border-radius:15px;
    position:relative;
    left:0px;
`;

interface ICoin{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}




function Coins(){

/*     const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const getCoins = async () =>{
        const res = await axios("https://api.coinpaprika.com/v1/coins");
        setCoins(res.data.slice(0,100));
        setLoading(false);
    }
    useEffect(() => {
        getCoins();
    }, []) */



    //useQuery는 기본적으로 isLoading을 가지고 있으며 결과에 따라 이를 반납해준다 ㅋㅋ
    const isDark = useRecoilValue(isDarkAtom);
    const setDarkAtom =  useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom(prev => !prev);
    const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
    return (
        <Container>
        <Helmet>
            <title>Coins</title>
        </Helmet>
        <Header>
        
        <Title>Coins</Title>

        
            {isDark? <ToggleDarkBackGround><ToggleDark onClick={toggleDarkAtom}>
            </ToggleDark></ToggleDarkBackGround> : <ToggleWhiteBackGround><ToggleWhite onClick={toggleDarkAtom}>
            </ToggleWhite></ToggleWhiteBackGround>}
        
        
        </Header>
        {isLoading? <Loader>Loading...</Loader> : <CoinsList>
            {data?.slice(0,100).map(coin => <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{name:coin.name, rank:coin.rank}}>
                    <CoinWrapper>
                        <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
                        {coin.name} &rarr;
                    </CoinWrapper>        
                </Link>
                    
                </Coin>)}
        </CoinsList>}
        
    </Container>)
        
    
}

export default Coins;