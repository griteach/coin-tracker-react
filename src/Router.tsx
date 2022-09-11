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



function Router(){

    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Coins />}></Route>
        </Routes>
        <Routes>
            <Route path="/:coinId" element={<Coin />}>
                <Route path="table" element={<Table />}></Route>
                <Route path="chart" element={<Chart  />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>)
}

export default Router;