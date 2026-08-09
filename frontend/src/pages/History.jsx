import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import Loader from "../components/Loader";

function History() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadHistory = async () => {

        setLoading(true);

        try {

            const response = await api.get("history/");
            setHistory(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        loadHistory();

    }, []);

    const deleteHistory = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this record?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`history/${id}/`);

            loadHistory();

        } catch (error) {

            console.error(error);

            toast.error("Unable to delete record");

        }

    };

    return (

        <div>

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3>Loan History</h3>

                </div>

                <div className="card-body">

                    {loading ? (
                        <Loader />
                    ) : history.length === 0 ? (

                        <p>No records found.</p>

                    ) : (

                    <div className="table-responsive">

                        <table className="table table-bordered table-hover">

                            <thead className="table-dark">

                                <tr>

                                    <th>Loan Amount</th>
                                    <th>Interest</th>
                                    <th>Tenure</th>
                                    <th>Monthly EMI</th>
                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {history.map((item) => (

                                    <tr key={item._id}>

                                        <td>
                                            ₹ {Number(item.principal).toLocaleString("en-IN")}
                                        </td>

                                        <td>
                                            {item.interest_rate}%
                                        </td>

                                        <td>
                                            {item.tenure} Years
                                        </td>

                                        <td>
                                            ₹ {Number(item.monthly_emi).toLocaleString("en-IN", {
                                                minimumFractionDigits: 2
                                            })}
                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteHistory(item._id)}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                    )}

                </div>

            </div>

        </div>

    );

}

export default History;