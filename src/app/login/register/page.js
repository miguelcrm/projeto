"use client";
import Pagina from "@/app/components/Navbar2";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const route = useRouter();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const dados = users.find((item) => item.id == params.id);
  const user = dados || {
    nome: "",
    email: "",
    password: "",
    role: "",
    telefone: "",
    identificador: "",
  };

  function salvar(dados) {
    // Verifica se o usuário já existe no array
    if (user.id) {
      Object.assign(user, dados);
    } else {
      dados.id = uuidv4();
      if (dados.role === "funcionario" && dados.identificador) {
        dados.identificador == dados.identificador;
      } else {
        delete dados.identificador;
      }
      users.push(dados);
    }

    // Salva a lista de usuários atualizada no localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Redireciona com base no role
    if (dados.role === "funcionario") {
      route.push("/login");
    } else {
      route.push("/login");
    }
  }

  // Função para aplicar a máscara nos campos
  const aplicarMascara = (campo, evento) => {
    let valor = evento.target.value;

    if (campo === "telefone") {
      // Aplica a máscara de telefone (ex: (99) 99999-9999)
      valor = valor.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
      valor = valor.replace(/^(\d{2})(\d)/, "($1) $2"); // Adiciona o primeiro grupo de parênteses
      valor = valor.replace(/(\d{5})(\d)/, "$1-$2"); // Adiciona o traço

      evento.target.value = valor;
    }
  };

  return (
    <>
      <Pagina></Pagina>

      <div
        className="container mt-5"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0",
          fontSize: "3rem",
          color: "black",
        }}
      >
        Crie seu usuário
      </div>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0",
        }}
      >
        <div
          style={{
            backgroundColor: "black",
            borderRadius: "0.3rem",
            padding: "1.5rem 1.5rem 1.5rem 1.5rem",
            marginTop: "1rem",
            width: "45rem",
          }}
        >
          <div className="container mt-4">
            <Row>
              <Formik
                initialValues={user}
                onSubmit={(values) => salvar(values)}
              >
                {({ values, handleChange, handleSubmit }) => {
                  return (
                    <Form>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="nome"
                        name="nome"
                      >
                        <Form.Label column sm="2" style={{ color: "#D3D3D3" }}>
                          Nome
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            name="nome"
                            style={{
                              backgroundColor: "white",
                              boxShadow: "none",
                              outline: "none",
                              backgroundColor: "#D3D3D3",
                            }}
                            value={values.nome}
                            onChange={handleChange}
                            placeholder="nome"
                            type="text"
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="email"
                        name="email"
                      >
                        <Form.Label column sm="2" style={{ color: "#D3D3D3" }}>
                          Email
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            name="email"
                            style={{
                              backgroundColor: "white",
                              boxShadow: "none",
                              outline: "none",
                              backgroundColor: "#D3D3D3",
                            }}
                            value={values.email}
                            onChange={handleChange}
                            placeholder="email"
                            type="email"
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="password"
                        name="password"
                      >
                        <Form.Label column sm="2" style={{ color: "#D3D3D3" }}>
                          Password
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            style={{
                              backgroundColor: "white",
                              boxShadow: "none",
                              outline: "none",
                              backgroundColor: "#D3D3D3",
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="role"
                        name="role"
                      >
                        <Form.Label column sm="2" style={{ color: "#D3D3D3" }}>
                          Tipo de Usuário
                        </Form.Label>
                        <Col sm="10">
                          <Form.Select
                            name="role"
                            value={values.role}
                            onChange={handleChange}
                            style={{ backgroundColor: "#D3D3D3" }}
                          >
                            <option>Selecione</option>
                            <option value="user">Usuário Comum</option>
                            <option value="funcionario">Funcionário</option>
                          </Form.Select>
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="telefone"
                        name="telefone"
                      >
                        <Form.Label column sm="2" style={{ color: "#D3D3D3" }}>
                          Telefone
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            name="telefone"
                            type="tel"
                            placeholder="Telefone"
                            value={values.telefone}
                            onChange={(e) => {
                              handleChange(e);
                              aplicarMascara("telefone", e); // Aplica a máscara
                            }}
                            style={{
                              backgroundColor: "white",
                              boxShadow: "none",
                              outline: "none",
                              backgroundColor: "#D3D3D3",
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="identificador"
                        name="identificador"
                        style={{
                          display:
                            values.role === "funcionario" ? "block" : "none",
                        }}
                      >
                        <Form.Label column sm="2" style={{ color: "#D3D3D3" }}>
                          Identificador
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            name="identificador"
                            type="text"
                            placeholder="Identificador do Funcionário"
                            value={values.identificador}
                            onChange={handleChange}
                            style={{ backgroundColor: "#D3D3D3" }}
                          />
                        </Col>
                      </Form.Group>

                      <div
                        className="container mt-3"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="primary"
                          onClick={handleSubmit}
                          className="mt-4"
                          style={{
                            backgroundColor: "#5e503f",
                            border: "0",
                            width: "6rem",
                            cursor: "pointer",
                          }}
                        >
                          Registrar
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Row>
          </div>
        </div>
      </Container>
    </>
  );
}
