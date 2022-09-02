import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { createSolutionBuilder } from 'typescript';


const Container = styled.div`
    padding: 0px 20px;
    max-width:480px;
    margin: 0 auto;
`;

const Header = styled.div`
    height:10vh;
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
    color:${props => props.theme.bgColor};
    
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


interface CoinInterface{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins(){

    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const getCoins = async () =>{
        const res = await axios("https://api.coinpaprika.com/v1/coins");
        setCoins(res.data.slice(0,100));
        setLoading(false);
    }
    useEffect(() => {
        getCoins();
    }, [])

    return (
        <Container>
        <Header>
        <Title>Coins</Title>
        </Header>
        {loading? <Loader>Loading...</Loader> : <CoinsList>
            {coins.map(coin => <Coin key={coin.id}>
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