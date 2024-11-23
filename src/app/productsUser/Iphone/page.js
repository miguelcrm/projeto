'use client';
import Pagina from "@/app/components/Navbar";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


export default function Page() {

    const [iPhones, setIPhones] = useState([]); // Filtros dinâmicos para nomes
    const [Memoria, setMemoria] = useState([]); // Filtros dinâmicos para memória
    const [products, setProducts] = useState([]); // Esta variável de estado armazena os produtos exibidos atualmente.
    const [filters, setFilters] = useState([]); // Esta variável de estado armazena os filtros ativos no momento. Inicialmente, é um array vazio e é atualizado sempre que um filtro é alternado.
    const searchParams = useSearchParams();
    const route = useRouter();


    useEffect(() => {
        // Carrega produtos do localStorage
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    
        // Filtra apenas os iPhones (case insensitive)
        const filteredIPhones = storedProducts.filter((product) => 
            product.nome.toLowerCase().includes("iphone") // Filtra apenas iPhones
        );
    
        // Atualiza o estado com os produtos filtrados
        setProducts(filteredIPhones);
    
        // Gera filtros dinâmicos para iPhones
        const uniqueModels = [...new Set(filteredIPhones.map((product) => product.nome))];
        const uniqueMemories = [...new Set(filteredIPhones.map((product) => product.memoria))];
    
        setIPhones(uniqueModels);
        setMemoria(uniqueMemories);
    }, []);


    useEffect(() => {
        filter(); // Aplica o filtro sempre que `filters` mudar
    }, [filters]);

    function filter() {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        
        // Filtra produtos iPhones, garantindo que apenas iPhones sejam considerados
        const filteredIPhones = storedProducts.filter((product) => 
            product.nome.toLowerCase().includes("iphone")
        );

        if (filters.length > 0) {
            // Aplica o filtro (modelo ou memória)
            const filteredProducts = filteredIPhones.filter((product) => 
                filters.includes(product.nome) || filters.includes(product.memoria)
            );
            setProducts(filteredProducts);
        } else {
            setProducts(filteredIPhones); // Se não houver filtro, exibe todos os iPhones
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
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const productName = searchParams.get("product");
        const categoryName = searchParams.get("category");
    
        if (categoryName) {
            // Filtro geral: Carrega todos os produtos da categoria
            const filteredCategoryProducts = storedProducts.filter((product) =>
                product.nome.toLowerCase().includes(categoryName.toLowerCase())
            );
            setProducts(filteredCategoryProducts);
        } else if (productName) {
            // Filtro específico: Carrega apenas o produto
            const decodedProductName = decodeURIComponent(productName).toLowerCase().trim();
            const filteredProduct = storedProducts.filter(
                (product) => product.nome.toLowerCase().trim() === decodedProductName
            );
            setProducts(filteredProduct);
        } else {
            // Caso nenhum parâmetro seja encontrado, exibe todos os produtos
            setProducts(storedProducts);
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
                                {iPhones.map((iPhone, index) => (
                                    <Form.Group key={index} className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            id={`iphone-${index + 1}`}
                                            label={iPhone}
                                            onChange={() => toggleFilter(iPhone)}
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
