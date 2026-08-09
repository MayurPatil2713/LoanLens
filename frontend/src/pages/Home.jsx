import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";

function Home() {

    const [stats, setStats] = useState({
        totalBanks: 0,
        totalHistory: 0,
        lowestRate: 0
    });

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const [banksResponse, historyResponse] = await Promise.all([
                    api.get("banks/"),
                    api.get("history/")
                ]);

                const banks = banksResponse.data;
                const history = historyResponse.data;

                const lowestRate =
                    banks.length > 0
                        ? Math.min(
                            ...banks.map(bank =>
                                Number(bank.interest_rate)
                            )
                        )
                        : 0;

                setStats({
                    totalBanks: banks.length,
                    totalHistory: history.length,
                    lowestRate: lowestRate
                });

            } catch (error) {

                console.error("Dashboard loading error:", error);

            } finally {

                setLoading(false);

            }

        };

        loadDashboard();

    }, []); 
    
    if (loading) {
        return <Loader />;
    }
        
    return (
        <div>

            {/* Hero Section */}
            <div className="bg-primary text-white rounded-4 p-5 mb-5 shadow">

                <h1 className="display-4 fw-bold">
                    LoanLens
                </h1>

                <p className="lead">
                    Smart Home Loan EMI Calculator & Bank Comparison Platform
                </p>

                <Link
                    to="/calculator"
                    className="btn btn-light btn-lg mt-3"
                >
                    <i className="bi bi-calculator me-2"></i>

                    Calculate EMI
                </Link>

            </div>

            {/* Statistics */}

            <div className="row mb-5">

                <div className="col-md-3">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <i className="bi bi-bank display-4 text-primary"></i>

                            <h3 className="mt-3">
                                {stats.totalBanks}
                            </h3>

                            <p>Banks Available</p>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <i className="bi bi-cash-stack display-4 text-success"></i>

                            <h3 className="mt-3">
                                EMI
                            </h3>

                            <p>Calculator</p>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <i className="bi bi-graph-up-arrow display-4 text-warning"></i>

                            <h3 className="mt-3">
                                {stats.lowestRate}%
                            </h3>

                            <p>Lowest Interest Rate</p>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <i className="bi bi-clock-history display-4 text-danger"></i>

                            <h3 className="mt-3">
                                {stats.totalHistory}
                            </h3>

                            <p>Saved Calculations</p>

                        </div>

                    </div>

                </div>

            </div>

            {/* Quick Actions */}

            <h2 className="mb-4">
                Quick Actions
            </h2>

            <div className="row">

                <div className="col-md-4 mb-3">

                    <Link
                        to="/calculator"
                        className="btn btn-outline-primary w-100 p-3"
                    >
                        <i className="bi bi-calculator me-2"></i>

                        EMI Calculator
                    </Link>

                </div>

                <div className="col-md-4 mb-3">

                    <Link
                        to="/comparison"
                        className="btn btn-outline-success w-100 p-3"
                    >
                        <i className="bi bi-bar-chart-line me-2"></i>

                        Compare Banks
                    </Link>

                </div>

                <div className="col-md-4 mb-3">

                    <Link
                        to="/history"
                        className="btn btn-outline-warning w-100 p-3"
                    >
                        <i className="bi bi-clock-history me-2"></i>

                        Loan History
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Home;