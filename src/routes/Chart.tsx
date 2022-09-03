
import { useOutletContext } from 'react-router';
import { fetchCoinHistory } from '../api';
import { useQuery} from 'react-query';
import Apexchart from "react-apexcharts";


interface ChartProps {
    coinId:string;
}

interface IHistorical{
    close: string;
    high: string;
    low: string;
    market_cap: number;
    open: string;
    time_close: number;
    time_open: number;
    volume: string;
}

function Chart(){
    const {coinId} = useOutletContext<ChartProps>();
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    
    return <div>{isLoading? "Loading chart..." : <Apexchart 
    type="line" 
    series={[
       
        {
            name: "price",
            data: data?.map(price => parseFloat(price.close))??[],
        }

    ]}
    options={{
        theme:{
            mode:"dark",
        },
        grid:{
            show:false,
        },
        chart:{
            height:500,
            width:500,
            toolbar:{
                show:false,
            },
            background: "transparent",
            
        },
        stroke:{
            curve:"smooth",
            width:2,
        },
        xaxis:{
            labels:{
                show:false,
            },
            axisTicks:{
                show:false,
            },
            axisBorder:{
                show:false,
            }
        },
        yaxis:{
            show:false,
        }
        
    }} />}</div>
    
}

export default Chart;