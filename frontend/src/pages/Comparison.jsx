import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function Comparison() {

    const [formData, setFormData] = useState({
        principal: "",
        tenure: ""
    });

    const [banks, setBanks] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const compareBanks = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "calculate/compare/",
                formData
            );

            setBanks(response.data);

        } catch (error) {

            console.error(error);
            toast.error("Unable to compare bank");

        }

    };

    return (

        <div>

            <div className="card shadow p-4">

                <h2>Bank Comparison</h2>

                <form onSubmit={compareBanks}>

                    <div className="mb-3">

                        <label>Loan Amount</label>

                        <input
                            type="number"
                            className="form-control"
                            name="principal"
                            value={formData.principal}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Tenure (Years)</label>

                        <input
                            type="number"
                            className="form-control"
                            name="tenure"
                            value={formData.tenure}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button className="btn btn-success">

                        Compare Banks

                    </button>

                </form>

            </div>

            {banks.length > 0 && (

                <div className="mt-4">

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>Rank</th>
                                <th>Bank</th>
                                <th>Interest</th>
                                <th>EMI</th>
                                <th>Total Interest</th>
                                <th>Total Payment</th>

                            </tr>

                        </thead>

                        <tbody>

                            {banks.map((bank, index) => (

                                <tr
                                    key={bank.bank_code}
                                    className={index === 0 ? "table-success" : ""}
                                >

                                    <td>{index + 1}</td>

                                    <td>{bank.bank_name}</td>

                                    <td>{bank.interest_rate}%</td>

                                    <td>  
                                    ₹ {Number(bank.monthly_emi).toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                    </td>

                                    <td>  
                                    ₹ {Number(bank.total_interest).toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                    </td>

                                    <td>  
                                    ₹ {Number(bank.total_payment).toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );

}

export default Comparison;