'use client'
import {
    Alert,
    Button,
    ButtonGroup,
    Card,
    Carousel,
    Col,
    Container,
    Dropdown,
    DropdownButton,
    Form,
    Modal,
    Navbar,
    Offcanvas,
    Row,
  } from "react-bootstrap";

  import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Figure from "react-bootstrap/Figure";
import { TbTruckDelivery } from "react-icons/tb";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';



export default function Pagina(props) {

  const [loggedUser, setLoggedUser] = useState(null);
  const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]); // Estado para armazenar os itens do carrinho
    const [cartCard, setCartCard] = useState(null); // Estado para armazenar o card do carrinho
    const [showAlert, setShowAlert] = useState(false);
  const route = useRouter();

  useEffect(() => {
    // Busca o usuário logado do localStorage
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (storedUser) {
      setLoggedUser(storedUser); // Atualiza o estado com o usuário logado
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("loggedUser");
    setLoggedUser(null);
    route.push("/home");
  }
  
  function ProductClick(itemName, isGeneralFilter = false) {
    // Busca os produtos no localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    
    // Decodifica qualquer valor codificado na URL (como espaços representados por "%20")
    const decodedItemName = decodeURIComponent(itemName);

    if (isGeneralFilter) {
        // Filtro geral: Redireciona para a página da categoria com todos os produtos da categoria
        if (itemName.toLowerCase().includes("iphone")) {
            route.push(`/productsUser/Iphone?category=iphone`);
        } else if (itemName.toLowerCase().includes("galaxy")) {
            route.push(`/productsUser/Galaxy?category=galaxy`);
        } else if (itemName.toLowerCase().includes("moto") || itemName.toLowerCase().includes("motorola")) {
            route.push(`/productsUser/Motorola?category=motorola`);
        } else {
            route.push(`/productsUser/Xiaomi?category=xiaomi`);
        }
        return; // Evita continuar executando o código abaixo
    }

    // Verifica se existe um produto com o nome correspondente
    const matchedProduct = storedProducts.find(
        (product) => product.nome.trim().toLowerCase() === decodedItemName.trim().toLowerCase()
    );

    if (matchedProduct) {
        // Verifica a categoria do produto e direciona para a rota apropriada
        if (itemName.toLowerCase().includes("iphone")) {
            route.push(`/productsUser/Iphone?product=${encodeURIComponent(itemName)}`);
        } else if (itemName.toLowerCase().includes("galaxy")) {
            route.push(`/productsUser/Galaxy?product=${encodeURIComponent(itemName)}`);
        } else if (itemName.toLowerCase().includes("moto") || itemName.toLowerCase().includes("motorola")) {
            route.push(`/productsUser/Motorola?product=${encodeURIComponent(itemName)}`);
        } else {
            // Caso o produto não se encaixe em nenhuma categoria conhecida
            route.push(`/productsUser/Xiaomi?product=${encodeURIComponent(itemName)}`);
        }
    } else {
        alert('Produto não encontrado!'); // Caso não encontre o produto
    }
}

useEffect(() => {
  // Busca os itens do carrinho no localStorage usando a chave correta
  const storedCartItems = JSON.parse(localStorage.getItem("cart")) || []; 
  setCartItems(storedCartItems); // Atualiza o estado com os itens salvos
}, []);

// Função para adicionar um item ao carrinho e salvar no localStorage
function addToCart(item) {
  // Adiciona o item ao estado local
  const updatedCartItems = [...cartItems, item];
  setCartItems(updatedCartItems); // Atualiza o estado com os novos itens
  // Salva os itens no localStorage usando a chave correta
  localStorage.setItem("cart", JSON.stringify(updatedCartItems));
}

const AbrirCart = () => setShowCart(false);
const FecharCart = () => setShowCart(true);

function ControleAlert() {
  setShowAlert(true); // Mostra o alerta
  setTimeout(() => {
    setShowAlert(false); // Oculta o alerta após alguns segundos
  }, 9000); // Alerta ficará visível por 5 segundos (ajuste conforme necessário)

  setShowCart(false);

  // Exibir o alert
  setShowAlert(true);
}


    return (
        <>

<style>{`
     
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
   *{
     font-family: "Bebas Neue", serif;
     font-weight: 400;
     font-style: normal;
   }

   body {
         background-color: #D3D3D3;
         margin: 0;
         padding: 0;
         position: relative;
       }
       
     .carousel-indicators [data-bs-target] {
     color: #111111;
     background-color: #111111;
     }

     .dropdown-toggle{
     border:none}

     .dropdown-menu{
     min-width:9rem;}

     
     .navbar {
  position: sticky;
  top: 0;
  z-index: 900;
}

 .navbar2 {
  position: sticky;
  top: 66.1px;
  z-index: 800;
 border-bottom-right-radius: 0.4rem;
border-bottom-left-radius: 0.4rem;
box-shadow:none;
}

.category-dropdown .dropdown-menu.show {
  display: flex !important;
  padding: 20px !important;
  position: absolute !important;
}

.account-text {
  color: #999797; 
  transition: color 0.3s ease;
}

#dropdown-button-drop-down:hover .account-text {
  color: white;
}

.modal-header {
    justify-content: center;
    display: flex
;
    flex-shrink: 0;
    align-items: center;
    padding: var(--bs-modal-header-padding);
    border-bottom: var(--bs-modal-header-border-width) solid var(--bs-modal-header-border-color);
    border-top-left-radius: var(--bs-modal-inner-border-radius);
    border-top-right-radius: var(--bs-modal-inner-border-radius);
}

.modal-title {
    align-items: center;
    display: flex;
    line-height: var(--bs-modal-title-line-height);
    gap: 0.5rem;
}

   `}</style>
          
          <Container style={{margin:"0", padding:"0", backgroundColor:"#D3D3D3", maxWidth:"100%", width:"100%"}}><div style={{display:"flex", justifyContent:"center", alignItems:"center", color:"#111111", marginTop:"0.1rem"}}> <TbTruckDelivery fontSize={22} />Frete grátis em todo o Brasil</div></Container>
           <Navbar
        className="flex navbar"
        style={{ backgroundColor: "#111111", width: "100%", marginTop:"0.2rem"}}>
        <Container style={{ width: "39rem"}}>
          <div
            style={{ display: "flex", margin: "0", padding: "0" }}
          >
            <Navbar.Brand
              href="/home"
              className="text-white"
              style={{ display: "flex", margin: "0", padding: "0" }}
            >
              <Figure style={{ display: "flex", marginBottom: "0" }}>
                <Figure.Image
                  width={40}
                  height={30}
                  alt="Logo"
                  src="/img/logo.png"
                  style={{ margin: "0" }}
                />
                <div>
                  <p
                    style={{
                      marginBottom: "0",
                      marginTop: "0.51rem",
                      fontSize: "1.3rem",
                    }}
                  >
                    SmartTel Phone
                  </p>
                </div>
              </Figure>
            </Navbar.Brand>
          </div>
        </Container>

        <Container style={{ display: "flex" }}>
          <div style={{ display: "flex" }}>
            <Form>
              <Col
                xs="auto"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Form.Control
                  type="text"
                  placeholder="Pesquisar"
                  className=""
                  style={{
                    width: "40rem",
                    outline: "none",
                    borderColor: "#111111",
                    boxShadow: "none",
                    borderRadius: "0.3rem",
                    color: "#111111",
                    backgroundColor: "#D3D3D3",
                  }}
                />

                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#111111",
                    borderColor: "#111111",
                    borderRadius: "0",
                  }}
                >
                  <IoIosSearch style={{ fontSize: "1.5rem" }} />
                </Button>
              </Col>
            </Form>
          </div>

          <div
            style={{
              color: "white",
              display: "flex",
              margin: "0rem 1rem 0rem 0rem ",
            }}
          >
            <div
              className="mb-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "0.2rem",
              }}
            >
              <DropdownButton
  as={ButtonGroup}
  id="dropdown-button-drop-down"
  drop="down"
  title={
    <>
      <FaUserCircle
        style={{
          fontSize: "1.7rem",
          marginRight: "0.5rem",
          color: "#D3D3D3",
        }}
      />
      {loggedUser ? ` ${loggedUser.nome}` : <span className="account-text">Conta</span>} {/* Mostra o nome ou "Conta" */}
    </>
  }
  variant="sucess"
  style={{
    outline: "none",
    border: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
  }}
>
  {loggedUser ? (
    <>
      <div style={{ margin: "0", padding: "0rem 0rem 0rem 1rem" }}>Bem-vindo, {loggedUser.nome}!</div>
      <Dropdown.Divider />
      {loggedUser.identificador && (
        <Dropdown.Item href="/products">Controle de produtos</Dropdown.Item>
      )}
      <Dropdown.Divider />
      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item> {/* Logout se o usuário estiver logado */}
    </>
  ) : (
    <>
      <div style={{ margin: "0", padding: "0rem 0rem 0rem 1rem" }}>Já possui uma conta?</div>
      <Dropdown.Divider />
      <Dropdown.Item href="./login">Entrar</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="./login/register">Registrar-se</Dropdown.Item>
    </>
  )}
</DropdownButton>

<div style={{ display: "flex", alignItems: "center", color: "white" }}>
            {/* Ícone do carrinho */}
            <FaShoppingCart
                style={{ fontSize: "1.6rem", color: "#D3D3D3", cursor: "pointer" }}
                onClick={FecharCart}
            />

            {/* Modal do carrinho */}
            <Modal show={showCart} onHide={AbrirCart}>
  <Modal.Header>
    <Modal.Title>
      Carrinho de Compras 
      <FaShoppingCart style={{ fontSize: "1.6rem", color: "black" }} />
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {cartItems.length === 0 ? (
      <p>Seu carrinho está vazio!</p>
    ) : (
      cartItems.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <img
            src={item.foto}
            alt={item.nome}
            style={{ width: "50px", borderRadius: "5px" }}
          />
          <div>
            <h5 style={{ margin: "0" }}>{item.nome}</h5>
            <p style={{ margin: "0", color: "#555" }}>R$ {item.preco}</p>
          </div>
        </div>
      ))
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={AbrirCart}>
      Fechar
    </Button>
    {cartItems.length > 0 && (
      <Button variant="primary" onClick={ControleAlert}>
        Finalizar Compra
      </Button>
    )}
  </Modal.Footer> 
</Modal>

{showAlert && (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparente
          zIndex: 1040, // Abaixo do alert
        }}
      />
      <Alert
        variant="success"
        onClose={() => setShowAlert(false)}
        dismissible
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Centraliza na tela
          zIndex: 1050, // Certifique-se de que o alert ficará acima do overlay
          width: "500px", // Tamanho do alert
        }}
      >
        <Alert.Heading>Finalizando a Compra</Alert.Heading>
        <p>
          Você será redirecionado ao pagamento do seu produto! Aguarde um momento.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowAlert(false)} variant="outline-success">
            Fechar
          </Button>
        </div>
      </Alert>
    </>
  )}


          </div>
            </div>
          </div>
        </Container>
      </Navbar>


      
      <Container className="navbar2" style={{ maxWidth: "100%", width: "99.70%", backgroundColor:"#111111", padding:"0.4rem", color:"White"}}>
  <div style={{ margin: "0", padding: "0", maxWidth: "100%", width: "100%"}}>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div style={{ display: "flex", justifyContent:"space-evenly", width: "100%", padding:"0rem 1rem"}}>


      <Dropdown as={NavItem} className="category-dropdown">
          <Dropdown.Toggle as={NavLink}>Categorias</Dropdown.Toggle>
          <Dropdown.Menu>
            {/* Coluna 1 */}
            <div style={{ flex: 1 }}>
              <h6 style={{ fontWeight: "bold" }}>Celulares</h6>
             
              <Dropdown.Item onClick={() => ProductClick("iphone", true)}>Iphone</Dropdown.Item>
              <Dropdown.Item>Samsung</Dropdown.Item>
              <Dropdown.Item>Motorola</Dropdown.Item>
              <Dropdown.Item>Xiaomi</Dropdown.Item>

           
            </div>

          </Dropdown.Menu>
        </Dropdown>



      <Dropdown as={NavItem}  className="category-dropdown">
          <Dropdown.Toggle as={NavLink}>iPhone</Dropdown.Toggle>
          <Dropdown.Menu>
            {/* Coluna 1 */}
            <div style={{ flex: 1 }}>
    <h6 style={{ fontWeight: "bold" }}>iPhone</h6>
    <Dropdown.Item onClick={() => ProductClick("iphone 15 pro max")}>iPhone 15 Pro Max</Dropdown.Item>
    <Dropdown.Item onClick={() => ProductClick("iphone 15 pro")}>iPhone 15 Pro</Dropdown.Item>
    <Dropdown.Item onClick={() => ProductClick("iphone 15")}>iPhone 15</Dropdown.Item>
    <Dropdown.Item onClick={() => ProductClick("iphone 14 pro")}>iPhone 14 Pro</Dropdown.Item>
    <Dropdown.Item onClick={() => ProductClick("iphone 14 plus")}>iPhone 14 Plus</Dropdown.Item>
    <Dropdown.Item onClick={() => ProductClick("iphone 14")}>iPhone 14</Dropdown.Item>
    <Dropdown.Item onClick={() => ProductClick("iphone 13 pro max")}>iPhone 13 Pro Max</Dropdown.Item>
    <Dropdown.Item onClick={() => ProductClick("iphone 13")}>iPhone 13</Dropdown.Item>
    <Dropdown.Item onClick={() => ProductClick("iphone 12 pro")}>iPhone 12 Pro</Dropdown.Item>
    <Dropdown.Item onClick={() => ProductClick("iphone 12")}>iPhone 12</Dropdown.Item>
</div>

{/* Coluna 2 */}
<div style={{ flex: 1 }}>
    <h6 style={{ fontWeight: "bold" }}>Mais Vendidos</h6>
    <Dropdown.Item onClick={() => ProductClick("iphone 13")}>iPhone 13</Dropdown.Item>
    <Dropdown.Item onClick={() => ProductClick("iphone xr")}>iPhone XR</Dropdown.Item>
    <Dropdown.Item onClick={() => ProductClick("iphone 11")}>iPhone 11</Dropdown.Item>
</div>
            
            {/* Imagem ao lado */}
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img src="https://trocafone.vtexassets.com/assets/vtex.file-manager-graphql/images/50035b93-2444-44c1-a7f2-9ebbcd0a1493___902ee7a13f0704be3f7b48f4c92f608b.png" alt="iPhone" style={{ maxWidth: "200x", maxHeight: "250px" }} />
            </div>
          </Dropdown.Menu>
        </Dropdown>  

        <Dropdown as={NavItem}  className="category-dropdown">
  <Dropdown.Toggle as={NavLink}>Samsung</Dropdown.Toggle>
  <Dropdown.Menu>
 {/* Coluna 1 */}
<div style={{ flex: 1 }}>
  <h6 style={{ fontWeight: "bold" }}>Galaxy S</h6>
  <Dropdown.Item onClick={() => ProductClick("Galaxy S23 Ultra")}>Galaxy S23 Ultra</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Galaxy S23")}>Galaxy S23</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Galaxy S22 Ultra")}>Galaxy S22 Ultra</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Galaxy S22")}>Galaxy S22</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Galaxy S21 FE")}>Galaxy S21 FE</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Galaxy S21")}>Galaxy S21</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Galaxy S10")}>Galaxy S10</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Galaxy S10e")}>Galaxy S10e</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Galaxy Note")}>Galaxy Note</Dropdown.Item>
</div>

{/* Coluna 2 */}
<div style={{ flex: 1 }}>
  <h6 style={{ fontWeight: "bold" }}>MAIS BUSCADOS</h6>
  <Dropdown.Item onClick={() => ProductClick("Galaxy S20 FE")}>Galaxy S20 FE</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Galaxy S21 Plus")}>Galaxy S21 Plus</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Galaxy Note 10")}>Galaxy Note 10</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Galaxy Z Flip3")}>Galaxy Z Flip3</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Galaxy A30s")}>Galaxy A30s</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Galaxy A30")}>Galaxy A30</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Galaxy A71")}>Galaxy A71</Dropdown.Item>
</div>

    {/* Imagem ao lado */}
    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src="https://trocafone.vtexassets.com/assets/vtex.file-manager-graphql/images/84773302-3991-49a2-833b-00c1fbb42dac___37d1f2b15a1c65086adc4f065b5ffccb.png" alt="Samsung Phones" style={{ maxWidth: "200px", maxHeight: "250px" }} />
    </div>
  </Dropdown.Menu>
</Dropdown>

<Dropdown as={NavItem}  className="category-dropdown">
  <Dropdown.Toggle as={NavLink}>Motorola</Dropdown.Toggle>
  <Dropdown.Menu>
    
  <div style={{ flex: 1 }}>
  <h6 style={{ fontWeight: "bold" }}>Modelos</h6>
  <Dropdown.Item onClick={() => ProductClick("Edge 20")}>Edge 20</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Moto G20")}>Moto G20</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Moto G9 Plus")}>Moto G9 Plus</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Moto G9 Power")}>Moto G9 Power</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Moto One Vision")}>Moto One Vision</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Moto One Fusion Plus")}>Moto One Fusion Plus</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Moto One Hyper")}>Moto One Hyper</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Moto One Action")}>Moto One Action</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Moto Z3 Play")}>Moto Z3 Play</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Moto G7 Play")}>Moto G7 Play</Dropdown.Item>
</div>

{/* Coluna 2 */}
<div style={{ flex: 1 }}>
  <h6 style={{ fontWeight: "bold" }}>MAIS VENDIDOS</h6>
  <Dropdown.Item onClick={() => ProductClick("Moto G100")}>Moto G100</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Moto G7")}>Moto G7</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Moto G8 Power")}>Moto G8 Power</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Moto One")}>Moto One</Dropdown.Item>
</div>

    {/* Imagem ao lado */}
    <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src="https://trocafone.vtexassets.com/assets/vtex.file-manager-graphql/images/6e893e62-28eb-4e52-bb3c-45f47ce1a45a___4bd53e346191ec32362d0a77ce7eab53.png" alt="Motorola Phones" style={{ maxWidth: "200px", maxHeight: "250px"}} />
    </div>
  </Dropdown.Menu>
</Dropdown>

<Dropdown as={NavItem} className="category-dropdown">
  <Dropdown.Toggle as={NavLink}>Xiaomi</Dropdown.Toggle>
  <Dropdown.Menu>
  <div style={{ flex: 1 }}>
  <h6 style={{ fontWeight: "bold" }}>MODELOS</h6>
  <Dropdown.Item onClick={() => ProductClick("Xiaomi 13 Ultra")}>Xiaomi 13 Ultra</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Xiaomi 13 Pro")}>Xiaomi 13 Pro</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Xiaomi 12S Ultra")}>Xiaomi 12S Ultra</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Xiaomi 12 Pro")}>Xiaomi 12 Pro</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Xiaomi Mi 11 Ultra")}>Xiaomi Mi 11 Ultra</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Xiaomi Mi 10 Ultra")}>Xiaomi Mi 10 Ultra</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Redmi K60 Pro")}>Redmi K60 Pro</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Redmi K50 Pro")}>Redmi K50 Pro</Dropdown.Item>
</div>

{/* Coluna 2 */}
<div style={{ flex: 1 }}>
  <h6 style={{ fontWeight: "bold" }}>MAIS VENDIDOS</h6>
  <Dropdown.Item onClick={() => ProductClick("Redmi Note 13 Pro")}>Redmi Note 13 Pro</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Redmi Note 12 Pro+")}>Redmi Note 12 Pro+</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Redmi Note 12")}>Redmi Note 12</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Poco X5 Pro")}>Poco X5 Pro</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Poco F5")}>Poco F5</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Xiaomi 11 Lite 5G NE")}>Xiaomi 11 Lite 5G NE</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Redmi Note 11")}>Redmi Note 11</Dropdown.Item>
  <Dropdown.Item onClick={() => ProductClick("Redmi Note 10 Pro")}>Redmi Note 10 Pro</Dropdown.Item>
</div>

    {/* Imagem ao lado */}
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="https://cdn.folhape.com.br/upload/dn_arquivo/2022/10/redmi-note-12.jpg"
        alt="Xiaomi Phones"
        style={{ maxWidth: "200px", maxHeight: "270px" }}
      />
    </div>
  </Dropdown.Menu>
</Dropdown>


      


      
      </div>
    </div>
  </div>
</Container>
        </>
    )
}

