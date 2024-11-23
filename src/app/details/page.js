'use client';
import Pagina from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import { Modal, Button, Accordion, Container } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
    const [productDetails, setProductDetails] = useState(null); // Estado para armazenar os detalhes do produto
    const [showCart, setShowCart] = useState(false); // Estado para mostrar o carrinho
    const [cartItems, setCartItems] = useState([]); // Estado para armazenar os itens do carrinho
    const searchParams = useSearchParams();
    const route = useRouter(); // Para navegação

    useEffect(() => {
        // Recupera os itens do carrinho do localStorage
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    
        // Recupera os produtos do localStorage e carrega o produto atual
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const productNameFromURL = searchParams.get("product");
    
        if (productNameFromURL) {
            const decodedProductName = decodeURIComponent(productNameFromURL).toLowerCase().trim();
            const matchedProduct = storedProducts.find(product => product.nome.toLowerCase().trim() === decodedProductName);
            
            if (matchedProduct) {
                setProductDetails(matchedProduct); // Armazena os detalhes do produto encontrado
            } else {
                alert("Produto não encontrado!");
                route.push("/home");
            }
        }
    }, [searchParams, route]);

    

    const addToCart = () => {
        // Adiciona o produto atual ao carrinho
        const updatedCart = [...cartItems, productDetails];
        setCartItems(updatedCart); // Atualiza o estado do carrinho
    
        // Atualiza o carrinho no localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    
        // Exibe o Modal
        setShowCart(true);
    };


    const handleCloseCart = () => setShowCart(false); // Fecha o modal
    

    if (!productDetails) {
        return <div>Carregando detalhes do produto...</div>;
    }

    return (
        <>
            <Pagina />

            <div style={{ margin: "1.5rem 1rem 1.5rem 1.17rem", padding: "6rem 0rem", maxWidth: "1528px",  border: "3px solid #92A598", borderRadius:"5px", backgroundColor:"white" }}>
                <div style={{ display: "flex", gap: "2rem", marginLeft:"0.3rem" }}>
                    {/* Imagens do produto */}
                    <div style={{ flex: "1", textAlign: "center" }}>
                        <img
                            src={productDetails.foto}
                            alt={productDetails.nome}
                            style={{ width: "300px", border: "2px solid #92A598", borderRadius: "5px", marginBottom: "10px" }}
                        />
                        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                            {/* Exibe as miniaturas das imagens (ajustar conforme o número de imagens do produto) */}
                            {productDetails.imagens && productDetails.imagens.map((image, index) => (
                                <img key={index} src={image} alt={`Thumbnail ${index + 1}`} style={{ width: "50px", border: "1px solid #92A598", borderRadius: "5px" }} />
                            ))}
                        </div>
                    </div>

                    {/* Descrição do produto */}
                    <div style={{ flex: "2" }}>
                        <h1 style={{ fontSize: "24px", marginBottom: "10px"}}>{productDetails.nome}</h1>

                        <div style={{ border: "2px solid #92A598", padding: "15px", borderRadius: "5px", marginBottom: "20px", backgroundColor:"#D3D3D3" }}>
                            <h5 style={{ marginBottom: "10px" }}>Produto entregue por celularstore, empresa tercerizada para entregas dos nossos produtos.</h5>
                            <p style={{ color: "#3E3E3E", marginBottom: "10px" }}>Lojista parceiro Trocafone</p>
                            <p style={{ color: "#555", fontSize: "14px" }}>
                                Nossos parceiros são selecionados e avaliados por critérios de excelência no serviço. Certificamos as vendas
                                com nota fiscal e garantimos produtos originais.
                            </p>
                            <a href="#" style={{ color: "#007bff", textDecoration: "none", fontSize: "14px" }}>
                                Ver mais produtos da loja
                            </a>
                        </div>
                    </div>

                    {/* Área do preço e botões */}
                    <div style={{ flex: "1", textAlign: "left" }}>
                        <p style={{ fontSize: "28px", fontWeight: "bold", color: "#000", marginBottom: "10px" }}>
                            R$ {productDetails.preco}
                        </p>
                        <p style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>
                            ou{" "}
                        </p>
                        <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                            Até 12x de R$ <strong style={{ fontSize: "16px", color: "#000" }}>
                                R$ {(parseFloat(productDetails.preco) / 12).toFixed(2)}
                            </strong> sem juros
                        </p>

                        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                            <button
                                style={{
                                    background: "#ff6600",
                                    color: "#fff",
                                    padding: "10px 15px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginTop: "1.2rem",
                                }}
                                onClick={addToCart} // Chama a função ao clicar
                            >
                                Adicionar ao carrinho
                            </button>
                            <button
                                style={{
                                    background: "#ff6600",
                                    color: "#fff",
                                    padding: "10px 15px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginTop:"1.2rem"
                                }}
                            >
                                Comprar
                            </button>
                        </div>

                        <div>
                            <p style={{ marginBottom: "5px" }}>Receba em seu endereço</p>
                            <a href="#" style={{ fontSize: "14px", color: "#007bff", textDecoration: "none" }}>
                                Consultar entrega
                            </a>
                        </div>
                    </div>
                </div>

                <Container style={{display:"flex",maxWidth:"100%", margin:"0", padding:"0", border:"none", boxShadow:"none"}}>
                <Accordion
            style={{
              maxWidth: "100%",
              width: "100%",
              marginLeft: "0.02rem",
              border:"0.2px solid white"
            }}
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: "#333",
                  padding: "1rem",
                }}
              >
                <span style={{ marginLeft: "4.76rem" }}>
                  Características técnicas
                </span>
              </Accordion.Header>
              <Accordion.Body
                style={{
                  backgroundColor: "white",
                  padding: "1rem",
                  fontSize: "1rem",
                  color: "#444",
                }}
              >
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: "bold" }}>Memória RAM:</span>{" "}
                    {productDetails.memoriaRam || "Não especificado"}
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: "bold" }}>Memória Interna:</span>{" "}
                    {productDetails.memoria || "Não especificado"}
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: "bold" }}>Câmera Principal:</span>{" "}
                    {productDetails.cameraPrincipal || "Não especificado"}
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: "bold" }}>Câmera Frontal:</span>{" "}
                    {productDetails.cameraFrontal || "Não especificado"}
                  </li>
                  
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
      </Container>
            </div>

            {/* Modal do Carrinho */}
            <Modal show={showCart} onHide={handleCloseCart}>
                <Modal.Header closeButton>
                    <Modal.Title>Carrinho de Compras</Modal.Title>
                </Modal.Header>
                <Modal.Body>
    {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio!</p>
    ) : (
        cartItems.map((item, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px", border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
                <img src={item.foto} alt={item.nome} style={{ width: "50px", borderRadius: "5px" }} />
                <div>
                    <h5 style={{ margin: "0" }}>{item.nome}</h5>
                    <p style={{ margin: "0", color: "#555" }}>R$ {item.preco}</p>
                </div>
            </div>
        ))
    )}
</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCart}>
                        Fechar
                    </Button>
                    {cartItems.length > 0 && (
                        <Button variant="primary" onClick={() => alert("Finalizando a compra...")}>
                            Finalizar Compra
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
            

      <style>{`
     
.accordion-button:not(.collapsed) {
    color: black;
    background-color: white;
    box-shadow: none;
}

.accordion-button:focus {
    z-index: 3;
     outline: none; 
     box-shadow: none 
}

.accordion-button::after {
    margin: 0rem -10.1rem;
    display: flex;
    flex-shrink: 0;
    width: var(--bs-accordion-btn-icon-width);
    height: var(--bs-accordion-btn-icon-width);
    content: "";
    background-image: var(--bs-accordion-btn-icon);
    background-repeat: no-repeat;
    background-size: var(--bs-accordion-btn-icon-width);
    transition: var(--bs-accordion-btn-icon-transition);
    justify-content: center;
    align-items:center;
}

.accordion-item {
    color: var(--bs-accordion-color);
    background-color: var(--bs-accordion-bg);
    border: none
}
 
    `}</style>
        </>
    );
}
