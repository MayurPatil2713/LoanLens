import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function Amortization() {

    const [formData, setFormData] = useState({
        principal: "",
        interest_rate: "",
        tenure: ""
    });

    const [schedule, setSchedule] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 12;

    const totalPages = Math.ceil(schedule.length / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;

    const currentRows = schedule.slice(
        startIndex,
        startIndex + rowsPerPage
    );    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const generateSchedule = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "calculate/amortization/",
                formData
            );

            setSchedule(response.data);
            setCurrentPage(1);

        } catch (error) {

            console.error(error);
            alert("Unable to generate schedule");

        }

    };

    return (

        <div>

            <div className="card shadow p-4">

                <h2>Amortization Schedule</h2>

                <form onSubmit={generateSchedule}>

                    <div className="mb-3">

                        <label>Loan Amount</label>

                        <input
                            className="form-control"
                            name="principal"
                            type="number"
                            value={formData.principal}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Interest Rate</label>

                        <input
                            className="form-control"
                            name="interest_rate"
                            type="number"
                            step="0.01"
                            value={formData.interest_rate}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Tenure (Years)</label>

                        <input
                            className="form-control"
                            name="tenure"
                            type="number"
                            value={formData.tenure}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button className="btn btn-primary">
                        Generate Schedule
                    </button>

                </form>

            </div>

            {schedule.length > 0 && (

                <div className="mt-4">

                <div className="table-responsive">

                    <table className="table table-striped table-bordered">

                        <thead className="table-dark">

                            <tr>

                                <th>Month</th>
                                <th>EMI</th>
                                <th>Principal</th>
                                <th>Interest</th>
                                <th>Balance</th>

                            </tr>

                        </thead>

                        <tbody>

                            {currentRows.map((row) => (

                                <tr key={row.month}>

                                    <td>{row.month}</td>

                                    <td>
                                        ₹ {Number(row.emi).toLocaleString("en-IN", {
                                            minimumFractionDigits: 2
                                        })}
                                    </td>

                                    <td>
                                        ₹ {Number(row.principal_paid).toLocaleString("en-IN", {
                                            minimumFractionDigits: 2
                                        })}
                                    </td>

                                    <td>
                                        ₹ {Number(row.interest_paid).toLocaleString("en-IN", {
                                            minimumFractionDigits: 2
                                        })}
                                    </td>

                                    <td>
                                        ₹ {Number(row.remaining_balance).toLocaleString("en-IN", {
                                            minimumFractionDigits: 2
                                        })}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>
                </div>
                    
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center align-items-center gap-2 mt-3">

                            <button
                                className="btn btn-outline-primary"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </button>

                            <span>
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                className="btn btn-outline-primary"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </button>

                        </div>
                    )}                    

                </div>

            )}

        </div>

    );

}

export default Amortization;