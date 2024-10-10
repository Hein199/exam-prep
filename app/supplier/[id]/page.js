"use client";
import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Form, Button, Navbar } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function UpdateSupplier({ params }) {
    const { id } = params;
    const [supplier, setSupplier] = useState(null);
    const [error, setError] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/supplier/${id}`);
                if (!res.ok) throw new Error('Failed to fetch supplier data');
                const data = await res.json();
                setSupplier(data);
                reset(data);
            } catch (err) {
                setError(err.message || "Something went wrong.");
                console.error("Error fetching supplier:", err);
            }
        };

        fetchSupplier();
    }, [id, reset]);

    const updateSupplier = async (data) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/supplier/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update supplier");
            }

            window.location.href = "/";
        } catch (err) {
            setError(err.message || "Something went wrong.");
            console.error("Error updating supplier:", err);
        }
    };

    const Footer = () => (
        <footer style={{
            position: "fixed",
            bottom: "0",
            right: "0",
            left: "0",
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
            textAlign: "center",
        }}>
            <p style={{ color: "#6c757d" }}>
                &copy; A Web Application Development Project from:{" "}
                <Link href="https://github.com/Hein199" style={{ color: "#6c757d" }}>
                    Hein Naing Soe
                </Link>
            </p>
        </footer>
    );

    if (!supplier && !error) {
        return (
            <Container>
                <p>Loading supplier data...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <p className="text-danger">{error}</p>
                <Link href="/">Back</Link>
            </Container>
        );
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand style={{ marginLeft: "7rem" }} href="/">
                    Supplier Management
                </Navbar.Brand>
            </Navbar>
            <Head>
                <title>Update {supplier.name}</title>
            </Head>
            <Container style={{ margin: "2rem", maxWidth: "50%", marginLeft: "5rem" }}>
                <h1>Update Supplier</h1>
                <Form onSubmit={handleSubmit(updateSupplier)}>
                    <Row className="mb-4">
                        <Col>
                            <Form.Group controlId="name">
                                <Form.Label>Supplier Name</Form.Label>
                                <Form.Control
                                    {...register("name", { required: true })}
                                    placeholder="John Doe"
                                />
                            </Form.Group>

                            <br />

                            <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    {...register("address", { required: true })}
                                    placeholder="123 Main St."
                                />
                            </Form.Group>

                            <br />

                            <Form.Group controlId="phoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    {...register("phoneNumber", { required: true })}
                                    placeholder="555-123-1234"
                                />
                            </Form.Group>

                            <br />

                            <Button variant="outline-primary" type="submit">
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Footer />
        </>
    );
}
