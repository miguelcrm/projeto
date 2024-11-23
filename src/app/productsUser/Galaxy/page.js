'use client';
import Pagina from "@/app/components/Navbar";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


export default function Page() {

    const [Galaxy, setGalaxy] = useState([]); // Filtros dinâmicos para nomes
    const [Memoria, setMemoria] = useState([]); // Filtros dinâmicos para memória
    const [products, setProducts] = useState([]); // Esta variável de estado armazena os produtos exibidos atualmente.
    const [filters, setFilters] = useState([]); // Esta variável de estado armazena os filtros ativos no momento. Inicialmente, é um array vazio e é atualizado sempre que um filtro é alternado.
    const searchParams = useSearchParams();
    const route = useRouter();


    useEffect(() => {
        // Carrega produtos do localStorage
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    
        // Filtra apenas os Galaxy (case insensitive)
        const filteredGalaxy = storedProducts.filter((product) => 
            product.nome.toLowerCase().includes("galaxy") // Filtra apenas Galaxy
        );
    
        // Atualiza o estado com os produtos filtrados
        setProducts(filteredGalaxy);
    
        // Gera filtros dinâmicos para Galaxy
        const uniqueModels = [...new Set(filteredGalaxy.map((product) => product.nome))];
        const uniqueMemories = [...new Set(filteredGalaxy.map((product) => product.memoria))];
    
        setGalaxy(uniqueModels);
        setMemoria(uniqueMemories);
    }, []);


    useEffect(() => {
        filter(); // Aplica o filtro sempre que `filters` mudar
    }, [filters]);

    function filter() {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        
        // Filtra produtos Galaxy, garantindo que apenas Galaxy sejam considerados
        const filteredGalaxy = storedProducts.filter((product) => 
            product.nome.toLowerCase().includes("galaxy")
        );

        if (filters.length > 0) {
            // Aplica o filtro (modelo ou memória)
            const filteredProducts = filteredGalaxy.filter((product) => 
                filters.includes(product.nome) || filters.includes(product.memoria)
            );
            setProducts(filteredProducts);
        } else {
            setProducts(filteredGalaxy); // Se não houver filtro, exibe todos os Galaxy
        }
    }

    function toggleFilter(value) {
        setFilters((prevFilters) =>
            prevFilters.includes(value)
                ? prevFilters.filter((filter) => filter !== value)
                : [...prevFilters, value]
        );
    }

    useEffect(() => {
        const storeedProducts = JSON.parse(localStorage.getItem("products")) || [];
        console.log(storeedProducts)
        const producctName = searchParams.get("product");
        console.log("Product Name from URL:", producctName);
    
        if (producctName) {
            const decodeedProductName = decodeURIComponent(producctName).toLowerCase().trim();
            console.log("Decoded Product Name:", decodeedProductName);
    
            const filtereedProducts = storeedProducts.filter((product) =>
                product.nome.toLowerCase().trim() === decodeedProductName
            );
            console.log("Filtered Products:", filtereedProducts);
    
            setProducts(filtereedProducts);
        } else {
            setProducts(storeedProducts);
        }
    }, [searchParams]);


    return (
        <>
            <Pagina />

            <Container style={{margin:"0rem 0rem 0rem 2rem", padding:"2rem 0rem 0rem 2rem"}} className="my-3">
                <Row style={{width:"1400px"}}>
                    {/* Filtros */}
                    <Col
                        md={2}
                        className="position-sticky"
                        style={{marginTop:"0.51rem",top: "20px", zIndex: 2 }}
                    >
                        <div
                            className="border rounded p-3 shadow-md align-items-center"
                            style={{ backgroundColor: "#797979"}}
                        >
                            <Form>
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        marginLeft: "0.8rem",
                                        marginBottom: "0.6rem",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Modelo
                                </div>
                                {Galaxy.map((Galaxy, index) => (
                                    <Form.Group key={index} className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            id={`galaxy-${index + 1}`}
                                            label={Galaxy}
                                            onChange={() => toggleFilter(Galaxy)}
                                        />
                                    </Form.Group>
                                ))}
                            </Form>

                            <Container
                                style={{
                                    margin: "0",
                                    padding: "0",
                                    maxWidth: "100%",
                                    width: "100%",
                                    maxHeight: "10%",
                                    height: "10%",
                                }}
                            >
                                <div
                                    style={{
                                        margin: "0",
                                        padding: "0",
                                        maxWidth: "100%",
                                        width: "100%",
                                        backgroundColor: "#242423",
                                        fontSize: "0.06rem",
                                    }}
                                >
                                    i
                                </div>
                            </Container>

                            <Form>
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        marginLeft: "0.8rem",
                                        marginBottom: "0.6rem",
                                        marginTop: "0.4rem",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Memória interna
                                </div>
                                {Memoria.map((mem, index) => (
                                    <Form.Group key={index} className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            id={`memoria-${index + 1}`}
                                            label={mem}
                                            onChange={() => toggleFilter(mem)}
                                        />
                                    </Form.Group>
                                ))}
                            </Form>
                        </div>
                    </Col>

                    {/* Produtos */}
                    <Col md={10}>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center", paddingLeft:"5rem"}}>
                            <Image src="https://trocafone.vtexassets.com/assets/vtex.file-manager-graphql/images/fa5cda71-9f6a-4d67-98f3-01c8cdf21551___c88a9380e14fda17f57d8bc0ea5a2212.png" />
                        </div>

                        <h4 className="mb-5">Produtos</h4>
                        <Row className="g-5" style={{ paddingLeft: "5rem" }}>
    {products.length > 0 ? (
        products.map((item) => (
            <Col key={item.id} xs={10} sm={6} md={3}>
                <Card className="h-100 shadow-sm border-0 rounded-lg product-card">
                    <Card.Img
                        variant="top"
                        src={item.foto}
                        className="rounded-top"
                        alt={item.nome}
                    />
                    <Card.Body className="text-center p-2">
                        <Card.Title
                            className="mb-1"
                            style={{ fontSize: "0.9rem" }}
                        >
                            {item.nome}
                        </Card.Title>
                        <Card.Text
                            className="text-success fw-bold"
                            style={{ fontSize: "0.85rem" }}
                        >
                            R$ {item.preco}
                        </Card.Text>
                        <Button
                            variant="primary"
                            className="w-100 mt-2"
                            style={{ fontSize: "0.8rem" }}
                            onClick={() => alert("Adicionado ao carrinho!")}
                        >
                            Adicionar ao Carrinho
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        ))
    ) : (
        // Caso nenhum produto esteja disponível
        <p>Nenhum produto disponível.</p>
    )}
    {/* Adicionado log para depuração */}
    {console.log("Produtos renderizados:", products)}
</Row>
                    </Col>
                </Row>
            </Container>

            <style jsx>{`
                .product-card:hover {
                    transform: scale(1.05);
                    transition: transform 0.3s ease;
                }
                .product-card img {
                    object-fit: cover;
                    height: 150px;
                }
                .product-card .btn {
                    font-size: 0.8rem;
                    font-weight: bold;
                }
            `}</style>
        </>
    );
}
