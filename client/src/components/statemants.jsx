import { useLoaderData } from "react-router-dom";



export const Statements = () => {
    const installments = useLoaderData();
    console.log( installments)
    return (
        <div className="h-screen bg-gray-900 text-white">
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3">Payments</th>
                        <th scope="col" className="px-6 py-3">EMI</th>
                        <th scope="col" className="px-6 py-3">Interest</th>
                        <th scope="col" className="px-6 py-3">Principal</th>
                        <th scope="col" className="px-6 py-3">outstanding</th>
                    </tr>
                </thead>
                <tbody>
                    {installments.map((installment) => (
                        <tr key={installment._id} class="border-b dark:bg-gray-800">
                            <td scope="col" class="px-6 py-3">{installment.payments}</td>
                            <td scope="col" class="px-6 py-3">ZAR {installment.emi}</td>
                            <td scope="col" class="px-6 py-3">ZAR {installment.interest}</td>
                            <td scope="col" class="px-6 py-3">ZAR {installment.principal}</td>
                            <td scope="col" class="px-6 py-3">ZAR {installment.closing} </td>
                        </tr>
                    ))}


                </tbody>
            </table>

        </div>
    )
}

export const dataLoader = async () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData.user._id
    const res = await fetch(`http://localhost:3001/loans/view/?userId=${userId}`);
    const installments = await res.json()
    return installments;
}

