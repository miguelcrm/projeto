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
    Navbar,
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

   `}</style>
          
          <Container style={{margin:"0", padding:"0", backgroundColor:"#D3D3D3", maxWidth:"100%", width:"100%"}}><div style={{display:"flex", justifyContent:"center", alignItems:"center", color:"#111111", marginTop:"0.1rem"}}> <TbTruckDelivery fontSize={22} />Frete grátis em todo o Brasil</div></Container>
           <Navbar
        className="flex navbar"
        style={{ backgroundColor: "#111111", width: "100%", marginTop:"0.2rem"}}
      >
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

              
            </div>
          </div>
        </Container>
      </Navbar>

        </>
    )
}

