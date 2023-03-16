import { useLoaderData } from "react-router-dom";



export const Statements = () => {
    const installments = useLoaderData();
    console.log(installments)
    return (
        <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    )
}

export const dataLoader = async () => {
    const res = await fetch('http://localhost:3001/loans/view/?userId=6412cd28d277d4949dd1fbf1');
    const installments = await res.json()
    return installments;
}

