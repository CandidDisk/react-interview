import axios from 'axios';
import {useEffect, useLayoutEffect, useState} from "react";

import Product from "./models/ProductInterface";

const Question2: React.FC = () => {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-xl">
                Please write a custom hook to fetch products from{" "}
                <a
                    className="text-blue-500 underline"
                    href="https://dummyjson.com/products"
                >
                    https://dummyjson.com/products
                </a>
            </h1>

            <div>
                API Documents:{" "}
                <a
                    className="text-blue-500 underline"
                    href="https://dummyjson.com/docs/products"
                >
                    https://dummyjson.com/docs/products
                </a>
            </div>
            <div>
                <div>Requirements:</div>
                <ol className="list-decimal list-inside text-gray-600">
                    <li>
                        The hook should at least return loading state and the list of
                        products
                    </li>
                    <li>
                        Render a <strong>full</strong> list of products
                    </li>
                    <li>Add a input textbox to filter products</li>
                    <li>Add pagination</li>
                </ol>
            </div>

            <hr/>

            <ProductInspector/>
        </div>
    );
};

/** You should start here */
const ProductInspector: React.FC = () => {
    const [productList, setProductList] = useState<Product[]>();
    const [paginationCount, setPaginationCount] = useState<number>(0);

    const count = 0

    const getProductList = async (searchTerm?: string) => {
        const getUrl = searchTerm ? `https://dummyjson.com/products/search?q=${searchTerm}` : `https://dummyjson.com/products?limit=20&skip=${paginationCount}`
        const response = await axios.get(getUrl)
        const responseData: Array<Product> = response.data.products
        setProductList(responseData)
    }

    useEffect(() => {
        getProductList()
    }, [count]);

    function adjustPagination(increment: number) {
        setPaginationCount(paginationCount + increment)
        console.log(paginationCount)
        getProductList()
        console.log(productList)
    }

    return <div className="text-gray-400">You should start here
        <div className="flex flex-col">
            <div className="flex flex-row">
                <input type="text" onChange={event => getProductList(event.target.value)}/>

                <button onClick={() => adjustPagination(-20)}>Back 20</button>
                <button onClick={() => adjustPagination(20)}>Forward 20</button>
            </div>
            {productList?.map(product => <div className="flex flex-row justify-between">
                <p>{product.title}</p>
                <p>{product.description}</p>
            </div>)}
        </div>
    </div>;
};

export default Question2;
