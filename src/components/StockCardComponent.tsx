import {useEffect, useState} from "react";
import Stock from "../models/StockInterface";

interface IStockCardProps {
    stock: Stock,
}

const StockCard: React.FC<IStockCardProps> = (props) => {
    const [priceHistory, setPriceHistory] = useState<any[]>([])

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
            return [price, ...prevState]
        })
    }

    return (
        <div className="flex flex-col w-10 h-10">
            <h1>{props.stock.name}</h1>
            {priceHistory?.map(price =>
                <div>
                    <p>{price}</p>
                </div>)}
        </div>
    );
};

export default StockCard;
