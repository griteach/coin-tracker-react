
import { fetchCoinInfo } from '../api';
import { useQuery} from 'react-query';
import { useOutletContext } from "react-router";
import styled from "styled-components";

interface TableProps{
    coinId:string;
}

interface ITableData {
    
    type: string;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    
  }

const Tr = styled.div`
    height:25vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.2);
    border-radius: 10px;
    padding:10px;
    margin-bottom: 50px;
    table{
        width:100%;
        height:100%;
        text-align: center;
        table-layout: fixed;
        
    }
    
    
    td{
        vertical-align: middle;
        white-space: nowrap;
    }
    /* td:first-child{
        text-align: right;
        padding-right: 10px;
    }
    td:last-child{
        text-align: left;
        padding-left: 10px;
    } */

    
    
`;


function Table() {
    const {coinId} = useOutletContext<TableProps>();
    const { isLoading, data } = useQuery<ITableData>(
        ["tabledata", coinId], 
        () => fetchCoinInfo(coinId!));
    
    return (<div>
        {isLoading? "Loading info..." : <div>
            
            <Tr>
                <table>
                    
                    <tbody>
                        <tr>
                            <td>Type : </td>
                            <td>{data?.type}</td>
                            
                        </tr>
                        <tr>
                            <td>Status :</td>
                            <td>{data?.development_status}</td>
                        </tr>
                        <tr>
                            <td>Wallet :</td>
                            <td>{data?.hardware_wallet.toString()}</td>
                        </tr>
                        <tr>
                            <td>Proof :</td>
                            <td>{data?.proof_type}</td>
                        </tr>
                        <tr>
                            <td>Structure :</td>
                            <td>{data?.org_structure}</td>
                        </tr>
                        <tr>
                            <td>Hash :</td>
                            <td>{data?.hash_algorithm}</td>
                        </tr>
                        <tr>
                            <td>Start :</td>
                            <td>{data?.started_at}</td>
                        </tr>
                        <tr>
                            <td>First data :</td>
                            <td>{data?.first_data_at}</td>
                        </tr>
                        
                    </tbody>
                </table>
                
            </Tr>
            </div>}
    </div>
    );
  }
  
  export default Table;