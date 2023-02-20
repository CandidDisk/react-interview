import {useState} from "react";

// Simulate send order request
const sendOrder = () => {
    return new Promise<boolean>((resolve) => {
        setTimeout(() => {
            resolve(Math.random() > 0.5);
        }, 1000);
    });
};

const Question1: React.FC = () => {
    const [successOrderCount, setSuccessOrderCount] = useState<number>(0);
    const [failOrderCount, setFailOrderCount] = useState<number>(0);
    const [sendCount, setSendCount] = useState<number>(0);

    const handleSendOrder = async () => {
        setSendCount(sendCount + 1);

        sendOrder().then((result) => {
            if (result) {
                setSuccessOrderCount(successOrderCount + 1)
            } else {
                setFailOrderCount(failOrderCount + 1)
            }
        });
    };

    const orderCount = successOrderCount + failOrderCount

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-xl">
                Question: Please make order count synced with send count eventually after smashing send order button
            </h1>
            <hr/>
            <div>Send Count: {sendCount}</div>
            <div>Order Count: {orderCount} (<span className="text-green-600">Success: {successOrderCount}</span> <span
                className="ml-2 text-red-600">Failed: {failOrderCount}</span>)
            </div>
            <button onClick={handleSendOrder} className="w-32">
                Send Order
            </button>
        </div>
    );
};

export default Question1;
