"use client";
import Head from "next/head";
import Link from "next/link";
import { Container, Table, Button, Navbar, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Home() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchSuppliers() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/supplier`);
      if (!response.ok) throw new Error('Failed to fetch suppliers');
      const data = await response.json();
      data.sort((a, b) => a.name.localeCompare(b.name));
      setSuppliers(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const deleteSupplier = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/supplier/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error('Failed to delete supplier');
      fetchSuppliers();
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

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
          <Link href="https://github.com/Hein199" style={{ color: "#6c757d" }}>
            Hein Naing Soe
          </Link>
        </p>
      </footer>
    );
  };

  return (
    <>
      <Head>
        <title>Suppliers Management</title>
      </Head>
      <Navbar bg="light" expand="lg" style={{ padding: "1rem 2rem" }}>
        <Container>
          <Navbar.Brand style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            Supplier Management
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Link href="/supplier" passHref>
              <Button variant="outline-primary" style={{ fontSize: "1rem", padding: "0.5rem 1.5rem" }}>
                + Add Supplier
              </Button>
            </Link>
          </Nav>
        </Container>
      </Navbar>

      <Container
        style={{
          backgroundColor: "white",
          margin: "2rem auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "1200px",
        }}
      >
        <div className="table-container" style={{ width: "100%" }}>
          <h1 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Suppliers</h1>
          {loading && <p>Loading suppliers...</p>}
          {error && <p className="text-danger">{error}</p>}

          <Table responsive bordered hover style={{ backgroundColor: "#fff", borderRadius: "8px" }}>
            <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
              <tr>
                <th style={{ width: "15rem", textAlign: "center" }}>Supplier Name</th>
                <th style={{ width: "15rem", textAlign: "center" }}>Address</th>
                <th style={{ width: "15rem", textAlign: "center" }}>Phone Number</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier._id} style={{ textAlign: "center" }}>
                  <td>{supplier.name}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.phoneNumber}</td>
                  <td>
                    <>
                      <Link href={`/supplier/${supplier._id}`}>
                        <Button variant="secondary" size="sm" style={{ marginRight: "0.5rem" }}>
                          Update
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteSupplier(supplier._id)}
                        style={{
                          backgroundColor: "#dc3545",
                          border: "none",
                          padding: "0.3rem 0.8rem",
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
      <Footer />
    </>
  );
}
