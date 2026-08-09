import { useState } from "react";
import { toast } from "react-toastify";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = (e) => {

        e.preventDefault();

        toast.success("Thank you! Your message has been submitted.");

        setFormData({
            name: "",
            email: "",
            message: ""
        });

    };


    return (
        <div className="container">

            <div className="text-center mb-5">

                <h1 className="fw-bold">
                    Contact Us
                </h1>

                <p className="text-muted">
                    Have a question about LoanLens? We'd love to hear from you.
                </p>

            </div>


            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow-sm p-4">

                        <form onSubmit={handleSubmit}>

                            {/* Name */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                />

                            </div>


                            {/* Email */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />

                            </div>


                            {/* Message */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Message
                                </label>

                                <textarea
                                    className="form-control"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Enter your message"
                                    required
                                ></textarea>

                            </div>


                            <button
                                type="submit"
                                className="btn btn-primary"
                            >

                                <i className="bi bi-send me-2"></i>

                                Send Message

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Contact;