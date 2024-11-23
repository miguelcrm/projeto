"use client";
import Pagina from "@/app/components/Navbar2";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {


  const router = useRouter();

  function handleLogin(values) {
    // Recupera lista de usuários armazenada
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verifica se o usuário existe e se a senha está correta
    const user = users.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (user) {
      // Armazena o usuário logado no localStorage com o nome
      localStorage.setItem("loggedUser", JSON.stringify({
        email: user.email,
        senha: user.password,
        nome: user.nome,
        role: user.role,
        identificador: user.identificador 
      }));
    
      // Redireciona para a página inicial
      router.push("/home");
    } else {
      alert("Usuário ou senha incorretos.");
    }
  }



  return (
    <>
      <Pagina></Pagina>

      <Container style={{display:"flex", justifyContent:"center",alignItems:"center",padding: "0", marginTop: "3rem" }}>
      <div
          style={{
            backgroundColor: "black",
            borderRadius: "0.3rem",
            padding: "1.5rem",
            marginTop: "1rem",
            width: "50rem",
          }}
        >
          <div className="container mt-4">
            <Row>
              <Formik
                initialValues={{ nome:"", email: "", password: "" }}
                onSubmit={(values) => handleLogin(values)} // Chama handleLogin ao submeter
              >
                {({ values, handleChange, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                      <Form.Label column sm="2" style={{ color: "#D3D3D3" }}>
                        Email
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          style={{ backgroundColor: "#D3D3D3", boxShadow: "none", outline: "none" }}
                          placeholder="email"
                          type="email"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="password">
                      <Form.Label column sm="2" style={{ color: "#D3D3D3" }}>
                        Password
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          type="password"
                          placeholder="Password"
                          style={{ backgroundColor: "#D3D3D3", boxShadow: "none", outline: "none" }}
                        />
                      </Col>
                    </Form.Group>

                    <div className="container mt-3" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Button
                        variant="primary"
                        type="submit"
                        className="mt-4"
                        style={{ backgroundColor: "#5e503f", border: "0", width: "5rem", cursor: "pointer" }}
                      >
                        Login
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Row>
          </div>
        </div>
      </Container>


    </>
  );
}
{}