import { BrowserRouter, Route, Routes } from "react-router-dom";
import Table from "./components/Table";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

interface IRouterProps{
    toggleDark:()=>void;
    isDark:boolean;
}



function Router({ toggleDark, isDark }:IRouterProps){

    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Coins toggleDark={toggleDark} />}></Route>
        </Routes>
        <Routes>
            <Route path="/:coinId" element={<Coin isDark={isDark} />}>
                <Route path="table" element={<Table />}></Route>
                <Route path="chart" element={<Chart  />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>)
}

export default Router;