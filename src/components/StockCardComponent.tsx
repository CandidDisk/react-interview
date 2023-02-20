import {useEffect, useState} from "react";
import Stock from "../models/StockInterface";

interface IStockCardProps {
    stock: Stock,
}

const StockCard: React.FC<IStockCardProps> = (props) => {
    const [priceHistory, setPriceHistory] = useState<any[]>([])
    const [currentDelta, setCurrentDelta] = useState<string>(0)

    useEffect(() => {
        props.stock.stockTracker.on('data', (callback) => {
            updatePrice(callback.price)
        })
        return () => props.stock.stockTracker.removeListeners()
    }, [])

    function updatePrice (price: string){
        setPriceHistory(prevState => {
            if (prevState.length > 4) {
                prevState.pop()
            }
            let delta = parseFloat(price) - parseFloat(prevState[0])
            setCurrentDelta(delta.toFixed(2))
            return [price, ...prevState]
        })
    }

    return (
        <div className="flex flex-row w-fit h-fit bg-gray-700 p-3 text-white rounded-3xl">
            <div className="flex flex-col m-2 mr-4">
                <h1 className="font-bold text-4xl">{props.stock.name}</h1>
                <h1 className="font-semibold text-2xl">{priceHistory[0]}</h1>
                <h1 className="font-semibold text-2xl">{currentDelta}</h1>
            </div>
            <div className="flex flex-col m-2 ml-4">
                {priceHistory?.map(price =>
                    <div>
                        <p>{price}</p>
                    </div>)}
            </div>
        </div>
    );
};

export default StockCard;
