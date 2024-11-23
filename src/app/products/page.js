'use client'
import Pagina from "@/app/components/Navbar2";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Carousel, Col, Container, Form, Row } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";

export default function Page(){
  
  const route = useRouter();
  const [products, setProducts] = useState([]); // Produtos do localStorage
  const [Redirecionar, setRedirecionar] = useState(null); // Controla o id do produto com select aberto
  const [tempRedirecionar, setTempRedirecionar] = useState(""); // Valor temporário do Redirecionar selecionado

  useEffect(() => {
      setProducts(JSON.parse(localStorage.getItem('products')) || [])
  }, []); /* Carregar os produtos armazenados no localStorage */

  useEffect(() => {
    // Verifica o usuário logado
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    
    // Redireciona para login se o usuário não for um funcionário
    if (!loggedUser || loggedUser.role !== "funcionario") {
      route.push("/login"); // Redireciona para a página de login
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("loggedUser");
    setLoggedUser(null);
  }

  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
        const dados = products.filter(item => item.id != id)
        localStorage.setItem('products', JSON.stringify(dados))
        setProducts(dados)
    }
}

function Redirect(id) {
  // Verifica e atualiza o campo de redirecionamento para o produto correspondente
  const redirecionamentoProdutos = products.map(product => {
    if (product.id === id) {
      return { ...product, redirection: tempRedirecionar }; // Atualiza o redirecionamento
    }
    return product; // Retorna os outros produtos sem alterações
  });

  // Atualiza o localStorage com os produtos alterados
  localStorage.setItem('products', JSON.stringify(redirecionamentoProdutos));

  // Atualiza o estado local para refletir as mudanças
  setProducts(redirecionamentoProdutos);

  // Fecha o select ao confirmar
  setRedirecionar(null);
}

  
  return (
    <> 
        <Pagina />
        <Container style={{padding:"0", marginTop:"3rem"}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", backgroundColor:"black", borderRadius:"0.3rem", padding:"1rem 0rem 1rem 0rem"}}>
            <Row style={{display:"flex", marginLeft:"1rem"}}>
              <Link href="/products/form">
                <Button variant="light" style={{fontSize:"1.05rem"}}>Registrar produto</Button>
              </Link>
            </Row>
            <div style={{margin:"0", padding:"0", color:"white", fontSize:"1.6rem", paddingTop:"0.2rem"}}>
              Controle de produtos
            </div>
            <Form>
              <Col xs="auto" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Form.Control
                  type="text"
                  placeholder="Pesquisar"
                  style={{
                    width: "10rem",
                    outline: "none",
                    borderColor: "black",
                    boxShadow: "none",
                    borderRadius: "0.3rem",
                    color: "white",
                    backgroundColor: "#D3D3D3",
                  }}
                />
                <Button type="submit" style={{ backgroundColor: "black", borderColor: "black", borderRadius: "0" }}>
                  <IoIosSearch style={{ fontSize: "1.5rem" }} />
                </Button>
              </Col>
            </Form> 
          </div>

          <div style={{backgroundColor:"black", borderRadius:"0.3rem", padding:"1.5rem 1.5rem 1.5rem 1.5rem", marginTop:"1rem"}}>
            <div className="container mt-4">
              <Row>
                {products.map((item) => (
                  <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Card>
                      <Card.Body>
                        <Card.Img src={item.foto}></Card.Img>
                        <Card.Title>{item.nome}</Card.Title>
                        <Card.Text>{item.categoria}</Card.Text>
                        <Card.Text><strong>Preço:</strong> R$ {item.preco}</Card.Text>
                        <Button
                          variant="primary"
                          style={{ marginRight: "0.2rem" }}
                          onClick={() => route.push(`/products/form/${item.id}`)}
                        >
                          Alterar
                        </Button>
                        <Button variant="danger" style={{ marginRight: "0.2rem" }} onClick={() => excluir(item.id)}>
                          Excluir
                        </Button>
                        <Button 
                          variant="dark"
                          onClick={() => setRedirecionar(Redirecionar === item.id ? null : item.id)}
                        >
                          Redirecionar
                        </Button>

                        {/* Select exibido apenas se Redirecionar === item.id */}
                        {Redirecionar === item.id && (
                          <>
                            <div style={{ display: "inline-block", margin: "1rem 0rem", padding: "0" }}>
                              <Form.Select
                                style={{ boxShadow: "none", outline: "none", borderColor: "#1B4228" }}
                                value={tempRedirecionar}
                                onChange={(e) => setTempRedirecionar(e.target.value)}
                              >
                                <option value="">Selecione um Redirecionamento</option>
                                <option value="promocoes">Promoções</option>
                                <option value="bbb">Bom Bonito e Barato</option>
                                <option value="mais-vendidos">Mais Vendidos</option>
                                <option value="ofertas">Ofertas</option> {/* Nova opção */}
                              </Form.Select>

                              <Button
                                variant="success"
                                onClick={() => Redirect(item.id)}
                                style={{ marginTop: "0.5rem" }}
                              >
                                Confirmar
                              </Button>
                            </div>
                          </>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Container>
    </>
  );
}
