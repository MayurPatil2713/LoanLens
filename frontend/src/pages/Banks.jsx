import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function Banks() {

    const emptyBank = {
        bank_name: "",
        bank_code: "",
        interest_rate: "",
        processing_fee: "",
        max_tenure: "",
        loan_types: ""
    };

    const [banks, setBanks] = useState([]);
    const [bank, setBank] = useState(emptyBank);
    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");
    const [maxRate, setMaxRate] = useState("");
    const [sortOrder, setSortOrder] = useState("none");

    const filteredBanks = banks
        .filter((bank) =>
            bank.bank_name
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        .filter((bank) =>
            maxRate === ""
                ? true
                : Number(bank.interest_rate) <= Number(maxRate)
        );  

    useEffect(() => {
        loadBanks();
    }, []);

    const sortedBanks = [...filteredBanks].sort((a, b) => {

        if (sortOrder === "low") {
            return Number(a.interest_rate) - Number(b.interest_rate);
        }

        if (sortOrder === "high") {
            return Number(b.interest_rate) - Number(a.interest_rate);
        }

        return 0;
    });

    const loadBanks = async () => {
        try {
            const response = await api.get("banks/");
            setBanks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setBank({
            ...bank,
            [e.target.name]: e.target.value
        });
    };

    const saveBank = async (e) => {
        e.preventDefault();

        const payload = {
            ...bank,
            interest_rate: Number(bank.interest_rate),
            processing_fee: Number(bank.processing_fee),
            max_tenure: Number(bank.max_tenure),
            loan_types: bank.loan_types.split(",").map(item => item.trim())
        };

        try {
            if (editingId) {
                await api.put(`banks/${editingId}/`, payload);
            } else {
                await api.post("banks/", payload);
            }

            setBank(emptyBank);
            setEditingId(null);
            loadBanks();

        } catch (error) {
            console.error(error);
            toast.error("Unable to save bank");
        }
    };

    const editBank = (selectedBank) => {
        setEditingId(selectedBank._id);

        setBank({
            bank_name: selectedBank.bank_name,
            bank_code: selectedBank.bank_code,
            interest_rate: selectedBank.interest_rate,
            processing_fee: selectedBank.processing_fee,
            max_tenure: selectedBank.max_tenure,
            loan_types: selectedBank.loan_types.join(", ")
        });
    };

    const deleteBank = async (id) => {

        if (!window.confirm("Delete this bank?")) return;

        try {
            await api.delete(`banks/${id}/`);
            loadBanks();
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className="container">

            <div className="card shadow p-4 mb-4">

                <h2>
                    {editingId ? "Update Bank" : "Add Bank"}
                </h2>

                <form onSubmit={saveBank}>

                    <input
                        className="form-control mb-2"
                        placeholder="Bank Name"
                        name="bank_name"
                        value={bank.bank_name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="form-control mb-2"
                        placeholder="Bank Code"
                        name="bank_code"
                        value={bank.bank_code}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="form-control mb-2"
                        type="number"
                        step="0.01"
                        placeholder="Interest Rate"
                        name="interest_rate"
                        value={bank.interest_rate}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="form-control mb-2"
                        type="number"
                        step="0.01"
                        placeholder="Processing Fee"
                        name="processing_fee"
                        value={bank.processing_fee}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="form-control mb-2"
                        type="number"
                        placeholder="Maximum Tenure"
                        name="max_tenure"
                        value={bank.max_tenure}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Loan Types (comma separated)"
                        name="loan_types"
                        value={bank.loan_types}
                        onChange={handleChange}
                        required
                    />

                    <button className="btn btn-primary">
                        {editingId ? "Update Bank" : "Add Bank"}
                    </button>

                </form>

            </div>

            <div className="row mb-3">

                <div className="col-md-4 mb-2">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Bank Name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>


                <div className="col-md-3 mb-2">

                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        placeholder="Maximum Interest %"
                        value={maxRate}
                        onChange={(e) => setMaxRate(e.target.value)}
                    />

                </div>


                <div className="col-md-3 mb-2">

                    <select
                        className="form-select"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >

                        <option value="none">
                            Sort by Interest
                        </option>

                        <option value="low">
                            Lowest Interest First
                        </option>

                        <option value="high">
                            Highest Interest First
                        </option>

                    </select>

                </div>


                <div className="col-md-2 mb-2">

                    <button
                        className="btn btn-secondary w-100"
                        onClick={() => {
                            setSearch("");
                            setMaxRate("");
                            setSortOrder("none");
                        }}
                    >
                        Reset
                    </button>

                </div>

            </div> 
            
            <h5 className="mb-3">
                Showing {sortedBanks.length} of {banks.length} Banks
            </h5>   

        <div className="table-responsive">                

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>
                        <th>Bank</th>
                        <th>Code</th>
                        <th>Interest</th>
                        <th>Processing Fee</th>
                        <th>Tenure</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {sortedBanks.map((bank) => (

                        <tr key={bank._id}>

                            <td>{bank.bank_name}</td>
                            <td>{bank.bank_code}</td>
                            <td>{bank.interest_rate}%</td>
                            <td>{bank.processing_fee}%</td>
                            <td>{bank.max_tenure} Years</td>

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editBank(bank)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteBank(bank._id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>
        
        </div>

        </div>

    );

}

export default Banks;