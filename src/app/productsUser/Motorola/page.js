'use client';
import Pagina from "@/app/components/Navbar";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


export default function Page() {

    const [Moto, setMoto] = useState([]); // Filtros dinâmicos para nomes
    const [Memoria, setMemoria] = useState([]); // Filtros dinâmicos para memória
    const [products, setProducts] = useState([]); // Esta variável de estado armazena os produtos exibidos atualmente.
    const [filters, setFilters] = useState([]); // Esta variável de estado armazena os filtros ativos no momento. Inicialmente, é um array vazio e é atualizado sempre que um filtro é alternado.
    const searchParams = useSearchParams();
    const route = useRouter();


    useEffect(() => {
        // Carrega produtos do localStorage
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    
        // Filtra apenas os Moto (case insensitive)
        const filteredMoto = storedProducts.filter((product) => 
            product.nome.toLowerCase().includes("moto") // Filtra apenas Moto
        );
    
        // Atualiza o estado com os produtos filtrados
        setProducts(filteredMoto);
    
        // Gera filtros dinâmicos para Moto
        const uniqueModels = [...new Set(filteredMoto.map((product) => product.nome))];
        const uniqueMemories = [...new Set(filteredMoto.map((product) => product.memoria))];
    
        setMoto(uniqueModels);
        setMemoria(uniqueMemories);
    }, []);


    useEffect(() => {
        filter(); // Aplica o filtro sempre que `filters` mudar
    }, [filters]);

    function filter() {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        
        // Filtra produtos Moto, garantindo que apenas Moto sejam considerados
        const filteredMoto = storedProducts.filter((product) => 
            product.nome.toLowerCase().includes("moto")
        );

        if (filters.length > 0) {
            // Aplica o filtro (modelo ou memória)
            const filteredProducts = filteredMoto.filter((product) => 
                filters.includes(product.nome) || filters.includes(product.memoria)
            );
            setProducts(filteredProducts);
        } else {
            setProducts(filteredMoto); // Se não houver filtro, exibe todos os Moto
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
                                {Moto.map((Moto, index) => (
                                    <Form.Group key={index} className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            id={`moto-${index + 1}`}
                                            label={Moto}
                                            onChange={() => toggleFilter(Moto)}
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
                        <Image src="https://www.cidademarketing.com.br/marketing/wp-content/uploads/2021/12/5g_motorola.jpg" width={879} height={234} style={{borderRadius:"2rem", marginTop:"0.36rem"}}/>
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
