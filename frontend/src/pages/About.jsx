function About() {
    return (
        <div className="container">

            {/* Page Header */}
            <div className="text-center mb-5">

                <h1 className="fw-bold">
                    About LoanLens
                </h1>

                <p className="text-muted">
                    Smart Home Loan EMI Calculator & Bank Comparison Platform
                </p>

            </div>


            {/* Introduction */}
            <div className="card shadow-sm p-4 mb-4">

                <h3 className="mb-3">
                    What is LoanLens?
                </h3>

                <p>
                    LoanLens is a FinTech application designed to help users
                    understand and compare home loan options before making
                    financial decisions.
                </p>

                <p>
                    The platform provides EMI calculation, bank comparison,
                    loan amortization schedules and calculation history in
                    one place.
                </p>

            </div>


            {/* Features */}
            <div className="card shadow-sm p-4 mb-4">

                <h3 className="mb-4">
                    Key Features
                </h3>

                <div className="row">

                    <div className="col-md-4 mb-3">

                        <div className="text-center">

                            <i className="bi bi-calculator display-5 text-primary"></i>

                            <h5 className="mt-3">
                                EMI Calculator
                            </h5>

                            <p className="text-muted">
                                Calculate monthly EMI, total interest and
                                total repayment amount.
                            </p>

                        </div>

                    </div>


                    <div className="col-md-4 mb-3">

                        <div className="text-center">

                            <i className="bi bi-bank display-5 text-success"></i>

                            <h5 className="mt-3">
                                Bank Comparison
                            </h5>

                            <p className="text-muted">
                                Compare loan rates and estimated EMI across
                                different banks.
                            </p>

                        </div>

                    </div>


                    <div className="col-md-4 mb-3">

                        <div className="text-center">

                            <i className="bi bi-calendar3 display-5 text-warning"></i>

                            <h5 className="mt-3">
                                Amortization
                            </h5>

                            <p className="text-muted">
                                View monthly principal, interest and
                                remaining loan balance.
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* Technology */}
            <div className="card shadow-sm p-4 mb-4">

                <h3 className="mb-3">
                    Technology Stack
                </h3>

                <div className="row">

                    <div className="col-md-3 mb-2">
                        <strong>Frontend:</strong>
                        <br />
                        React.js
                    </div>

                    <div className="col-md-3 mb-2">
                        <strong>Backend:</strong>
                        <br />
                        Django REST Framework
                    </div>

                    <div className="col-md-3 mb-2">
                        <strong>Database:</strong>
                        <br />
                        MongoDB
                    </div>

                    <div className="col-md-3 mb-2">
                        <strong>API:</strong>
                        <br />
                        REST API
                    </div>

                </div>

            </div>


            {/* Objective */}
            <div className="card shadow-sm p-4">

                <h3 className="mb-3">
                    Project Objective
                </h3>

                <p>
                    The objective of LoanLens is to provide a simple and
                    user-friendly platform that helps users estimate home
                    loan costs, compare available bank rates and understand
                    their repayment schedule.
                </p>

            </div>

        </div>
    );
}

export default About;