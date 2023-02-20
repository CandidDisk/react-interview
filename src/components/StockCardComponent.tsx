import {useEffect, useState} from "react";
import Stock from "../models/StockInterface";

interface IStockCardProps {
    stock: Stock,
}

const StockCard: React.FC<IStockCardProps> = (props) => {
    const [priceHistory, setPriceHistory] = useState<any[]>([])
    const [currentDelta, setCurrentDelta] = useState<string>('')

    useEffect(() => {
        props.stock.stockTracker.on('data', (callback) => {
            updatePrice(callback.price)
        })
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

    function setDelta(priceNew: string, priceOld: string) {
        let calcDelta = parseFloat(priceNew) - parseFloat(priceOld)
        if (isNaN(calcDelta)) calcDelta = 0
        let delta = calcDelta.toFixed(2)
        delta = delta.includes('-') ? delta : `+${delta}`
        setCurrentDelta(delta)
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
        </div>
    );
};

export default StockCard;
