import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function Calculator() {

    const [formData, setFormData] = useState({
        principal: "",
        interest_rate: "",
        tenure: ""
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const calculateEMI = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post(
                "calculate/",
                formData
            );

            setResult(response.data);

        } catch (error) {
            toast.error("Unable to calculate EMI");
            console.error(error);
        }
    };

    return (

        <div className="container">

            <div className="card shadow p-4">

                <h2 className="mb-4">
                    EMI Calculator
                </h2>

                <form onSubmit={calculateEMI}>

                    <div className="mb-3">

                        <label>Loan Amount</label>

                        <input
                            type="number"
                            name="principal"
                            className="form-control"
                            value={formData.principal}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Interest Rate (%)</label>

                        <input
                            type="number"
                            step="0.01"
                            name="interest_rate"
                            className="form-control"
                            value={formData.interest_rate}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Tenure (Years)</label>

                        <input
                            type="number"
                            name="tenure"
                            className="form-control"
                            value={formData.tenure}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        Calculate EMI
                    </button>

                </form>

            </div>

            {result && (

                <div className="card mt-4 shadow">

                    <div className="card-body">

                        <h3>Calculation Result</h3>

                        <hr />

                        <h5>
                            Monthly EMI :
                            ₹ {result.monthly_emi}
                        </h5>

                        <h5>
                            Total Interest :
                            ₹ {result.total_interest}
                        </h5>

                        <h5>
                            Total Payment :
                            ₹ {result.total_payment}
                        </h5>

                    </div>

                </div>

            )}

        </div>

    );
}

export default Calculator;