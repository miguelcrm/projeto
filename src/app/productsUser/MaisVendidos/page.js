'use client';
import Pagina from "@/app/components/Navbar";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
    const [products, setProducts] = useState([]); // Esta variável de estado armazena os produtos exibidos atualmente.
    const searchParams = useSearchParams();
    const route = useRouter();

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        
        // Filtra os produtos por redirection = "mais-vendidos"
        const filteredProducts = storedProducts.filter((product) =>
            product.redirection && product.redirection.toLowerCase() === "mais-vendidos"
        );
        setProducts(filteredProducts);
    }, [searchParams]);

    return (
        <>
            <Pagina />
            <Container style={{margin:"0rem 0rem 0rem 2rem", padding:"2rem 0rem 0rem 2rem"}} className="my-3">
                <Row style={{width:"1400px"}}>
                    {/* Produtos */}
                    <Col md={12}>
                        <div style={{display:"flex", maxWidth:"100%", width:"100%" ,justifyContent:"center", alignItems:"center", marginLeft:"0.3rem"}}>
                            <Image src="https://trocafone.vtexassets.com/assets/vtex.file-manager-graphql/images/dc95c17d-5675-49ac-9a62-431027df1f0e___52c58b817a7625968bd9d38996d62a91.png" width={1700} height={260} style={{borderRadius:"1rem", marginTop:"0.36rem"}}/>
                        </div>



                        

                        <h4 className="mb-5" style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"4rem", fontSize:"5rem"}}>Produtos Mais Vendidos</h4>
                        <Row className="g-5" style={{ paddingLeft: "5rem" }}>
                            {products.length > 0 ? (
                                products.map((item) => (
                                    <Col key={item.id} xs={12} sm={6} md={2.4} lg={2}>
                                        <Card className="h-100 shadow-sm border-0 rounded-lg product-card">
                                            <Card.Img variant="top" src={item.foto} className="rounded-top" alt={item.nome} />
                                            <Card.Body className="text-center p-2">
                                                <Card.Title className="mb-1" style={{ fontSize: "0.9rem" }}>
                                                    {item.nome}
                                                </Card.Title>
                                                <Card.Text className="text-success fw-bold" style={{ fontSize: "0.85rem" }}>
                                                    R$ {item.preco}
                                                </Card.Text>
                                                <Button variant="primary" className="w-100 mt-2" style={{ fontSize: "0.8rem" }}>
                                                    Adicionar ao Carrinho
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <p>Nenhum produto disponível.</p>
                            )}
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
