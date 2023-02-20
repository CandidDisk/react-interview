import StockTracker from "./StockTracker";
import {useState} from "react";
import StockCard from "./components/StockCardComponent";
import Stock from "./models/StockInterface";

const Question3: React.FC = () => {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-xl">Stock Price Tracker</h1>

            <div>
                <div>Description</div>
                <p className="text-gray-600">
                    When user provide a stock name and click start monitor button,
                    subscribe the corresponding stock price changes by subscribing the
                    emitted data from StockMonitor class.
                </p>
                <p className="text-gray-600">
                    The data will looks like {'{name: "Stock Name", price: "12.30"}'}
                </p>
            </div>
            <div>
                <div>Requirements:</div>
                <ol className="list-decimal list-inside text-gray-600">
                    <li>Create a list of cards to display the monitored stock details</li>
                    <li>
                        Show the stock name and current price with the delta changes from
                        the previous price
                    </li>
                    <li>Display last 5 history prices</li>
                    <li>
                        Add a button to unsubscribe a monitored stock and remove from the
                        list
                    </li>
                    <li>(Tips) Be aware of memory leak</li>
                </ol>
            </div>

            <hr/>

            <StockTrackerPanel/>
        </div>
    );
};

const StockTrackerPanel: React.FC = () => {

    const [stockList, setStockList] = useState<Stock[]>([])

    const [currentInput, setCurrentInput] = useState<string>('')

    function startTrack(stockName: string) {
        const tracker = new StockTracker(stockName)

        setStockList([...stockList, {name: stockName, stockTracker: tracker}])
    }

    return (
        <div className="gap-2">
            <input className="w-32" placeholder="Stock name" onChange={event => setCurrentInput(event.target.value)}/>
            <button onClick={() => startTrack(currentInput)}>Start Tracking</button>
            <div className="flex flex-row flex-wrap h-[500px] overflow-y-auto">
                {stockList.map(stock => <StockCard stock={stock}/>)}
            </div>
        </div>
    );
};

export default Question3;
