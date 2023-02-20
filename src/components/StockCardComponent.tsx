import {useEffect, useState} from "react";
import Stock from "../models/StockInterface";

interface IStockCardProps {
    stock: Stock,
    unTrackStock: () => void
}

const StockCard: React.FC<IStockCardProps> = (props) => {
    const [priceHistory, setPriceHistory] = useState<any[]>([])
    const [currentDelta, setCurrentDelta] = useState<string>('')

    //
    useEffect(() => {
        props.stock.stockTracker.on('data', (callback) => {
            updatePrice(callback.price)
        })
        // Clean up listener to prevent firing twice
        return () => props.stock.stockTracker.removeListeners()
    }, [])

    function updatePrice(price: string) {
        setPriceHistory(prevState => {
            if (prevState.length > 4) {
                prevState.pop()
            }
            setDelta(price, prevState[0])
            return [price, ...prevState]
        })
    }

    // calculate delta & convert to string for render
    function setDelta(priceNew: string, priceOld: string) {
        let calcDelta = parseFloat(priceNew) - parseFloat(priceOld)
        if (isNaN(calcDelta)) calcDelta = 0
        let delta = calcDelta.toFixed(2)
        delta = delta.includes('-') ? delta : `+${delta}`
        setCurrentDelta(delta)
    }

    // unsubscribe & call on parent unTrackStock to remove stock from stockList
    function unTrack() {
        props.stock.stockTracker.stop()
        props.unTrackStock()
    }

    return (
        <div
            className="flex flex-row w-60 h-40 bg-gray-700 justify-center p-3 m-10 text-white rounded-3xl drop-shadow-md">
            <div className="flex flex-col m-2 mr-7 w-16">
                <h1 className="font-bold text-4xl">{props.stock.name}</h1>
                <h1 className="font-semibold text-2xl">{priceHistory[0]}</h1>
                <h1 className={`font-semibold text-2xl ${currentDelta.includes('-') ? 'text-red-600' : 'text-green-700'}`}>{currentDelta}</h1>
            </div>
            <div className="flex flex-col m-2 ml-7">
                {priceHistory?.map(price =>
                    <div>
                        <p>{price}</p>
                    </div>)}
            </div>
            <button className="absolute -top-2 -right-10 h-8 w-fit p-1 pl-2 pr-2" onClick={() => unTrack()}>untrack</button>
        </div>
    );
};

export default StockCard;
