"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
    Container,
    Form,
    Button,
    Navbar,
} from "react-bootstrap";

export default function AddSupplier() {
    const { register, handleSubmit } = useForm();
    // const [data, setData] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const saveSupplier = async (formData) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/supplier`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create supplier");
            }

            const result = await response.json();
            window.location.href = "/";

        } catch (err) {
            setError(err.message || "Something went wrong.");
            console.error("Error creating supplier:", err);
        } finally {
            setLoading(false);
        }
    };

    const Footer = () => {
        return (
            <footer
                style={{
                    position: "fixed",
                    bottom: "0",
                    right: "0",
                    left: "0",
                    marginTop: "2rem",
                    padding: "1rem",
                    backgroundColor: "#f8f9fa",
                    textAlign: "center",
                }}
            >
                <p style={{ color: "#6c757d" }}>
                    &copy; A Web Application Development Project from:{" "}
                    <Link href="https://github.com/LynnT-2003" style={{ color: "#6c757d" }}>
                        Lynn Thit Nyi Nyi
                    </Link>
                </p>
            </footer>
        );
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand style={{ marginLeft: "7rem" }} href="/">
                    Supplier Management
                </Navbar.Brand>
            </Navbar>
            <Container style={{ margin: "2rem", maxWidth: "50%", marginLeft: "5rem" }}>
                <div className="app-container">
                    <h1>New Supplier</h1> <br />
                    {error && <p className="text-danger">{error}</p>}
                    <Form onSubmit={handleSubmit(saveSupplier)}>
                        <Form.Group controlId="supplierName">
                            <Form.Label>Supplier Name</Form.Label>
                            <Form.Control
                                {...register("name", { required: true })}
                                placeholder="John Doe"
                                style={{ width: "750px" }}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                {...register("address", { required: true })}
                                placeholder="123 Black Clover St."
                                style={{ width: "750px" }}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="phone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                {...register("phoneNumber", { required: true })}
                                placeholder="089-234-567"
                                style={{ width: "750px" }}
                            />
                        </Form.Group>
                        <br />
                        <Button variant="outline-primary" type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </Form>
                </div>
            </Container>
            <Footer />
        </>
    );
}
