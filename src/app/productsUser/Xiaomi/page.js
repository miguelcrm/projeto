'use client';
import Pagina from "@/app/components/Navbar";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


export default function Page() {

    const [Xiaomi, setXiaomi] = useState([]); // Filtros dinâmicos para nomes
    const [Memoria, setMemoria] = useState([]); // Filtros dinâmicos para memória
    const [products, setProducts] = useState([]); // Esta variável de estado armazena os produtos exibidos atualmente.
    const [filters, setFilters] = useState([]); // Esta variável de estado armazena os filtros ativos no momento. Inicialmente, é um array vazio e é atualizado sempre que um filtro é alternado.
    const searchParams = useSearchParams();
    const route = useRouter();


    useEffect(() => {
        // Carrega produtos do localStorage
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    
        // Filtra apenas os Xiaomi (case insensitive)
        const filteredXiaomi = storedProducts.filter((product) => 
            product.nome.toLowerCase().includes("xiaomi") // Filtra apenas Xiaomi
        );
    
        // Atualiza o estado com os produtos filtrados
        setProducts(filteredXiaomi);
    
        // Gera filtros dinâmicos para Xiaomi
        const uniqueModels = [...new Set(filteredXiaomi.map((product) => product.nome))];
        const uniqueMemories = [...new Set(filteredXiaomi.map((product) => product.memoria))];
    
        setXiaomi(uniqueModels);
        setMemoria(uniqueMemories);
    }, []);


    useEffect(() => {
        filter(); // Aplica o filtro sempre que `filters` mudar
    }, [filters]);

    function filter() {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        
        // Filtra produtos Xiaomi, garantindo que apenas Xiaomi sejam considerados
        const filteredXiaomi = storedProducts.filter((product) => 
            product.nome.toLowerCase().includes("xiaomi")
        );

        if (filters.length > 0) {
            // Aplica o filtro (modelo ou memória)
            const filteredProducts = filteredXiaomi.filter((product) => 
                filters.includes(product.nome) || filters.includes(product.memoria)
            );
            setProducts(filteredProducts);
        } else {
            setProducts(filteredXiaomi); // Se não houver filtro, exibe todos os Xiaomi
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
                                {Xiaomi.map((xiaomi, index) => (
                                    <Form.Group key={index} className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            id={`xiaomi-${index + 1}`}
                                            label={xiaomi}
                                            onChange={() => toggleFilter(xiaomi)}
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
                            <Image src="https://trocafone.vtexassets.com/assets/vtex.file-manager-graphql/images/249060ed-84ca-4ce2-8916-450b26e1fc4a___b02757a8d4d85bc2a6a9ee023d754bde.png" />
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
