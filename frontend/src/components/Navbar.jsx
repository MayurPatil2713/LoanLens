import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">

                <Link className="navbar-brand" to="/">
                    LoanLens
                </Link>

                <div className="navbar-nav">

                    <Link className="nav-link" to="/">Home</Link>

                    <Link className="nav-link" to="/calculator">Calculator</Link>

                    <Link className="nav-link" to="/comparison">Comparison</Link>

                    <Link className="nav-link" to="/amortization">Amortization</Link>

                    <Link className="nav-link" to="/history">History</Link>

                    <Link className="nav-link" to="/banks">Banks</Link>

                    <Link className="nav-link" to="/about">About</Link>

                    <Link className="nav-link" to="/contact">Contact</Link>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;