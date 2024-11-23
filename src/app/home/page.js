"use client";

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
  Image,
  Navbar,
  Row,
} from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Figure from "react-bootstrap/Figure";
import Pagina from "@/app/components/Navbar";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { MdOutlineHeadphonesBattery } from "react-icons/md";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BsFillHexagonFill } from "react-icons/bs";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/footer";

export default function Page() {
  const carouselImages = [
    { src: "/img/Galaxy.png", width: 1528, height: 560 },
    {
      src: "https://celltronics.vteximg.com.br/arquivos/ids/183540/BANNER SAMSUNG.png?v=638551099752900000",
      width: 1528,
      height: 560,
    },
    {
      src: "https://celltronics.vteximg.com.br/arquivos/ids/183461/BANNER APPLE.png?v=638551099295230000",
      width: 1528,
      height: 560,
    },
    {
      src: "https://celltronics.vteximg.com.br/arquivos/ids/175556/banner motorola.png?v=638551100510870000",
      width: 1535,
      height: 560,
    },
    {
      src: "https://celltronics.vteximg.com.br/arquivos/ids/183541/BANNER XIAOMI.png?v=638551100851200000",
      width: 1535,
      height: 560,
    },
  ];

  const Carrosel = {
    infinite: true, // 
    speed: 500, // Velocidade
    slidesToShow: 5, // Quantidade de produtos visíveis
    slidesToScroll: 5, // Quantidade que se move por vez
  }

  const [products, setProducts] = useState([]);
  const route = useRouter();


  // Carregar os produtos ao montar a página
  useEffect(() => {
    const carregarProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(carregarProducts);
  }, []);

  const promotionalProducts = products.filter(
    (product) => product.redirection === "promocoes"
  );
  const bbbProducts = products.filter(
    (product) => product.redirection === "bbb"
  );

  const handleNavigation = () => {
    route.push("/productsUser/MaisVendidos");
  };

  const Navigation = () => {
    route.push("/productsUser/Ofertas");
  };


  return (
    <>

<style>{`
     
     .slick-next:before {
      color: black;
      opacity: .90;
      font-size: 25px;
     }

    .slick-prev:before {
      color: black;
      opacity: .90;
      font-size: 25px;
     }

     .slick-prev {
    left: -30px;
}

.slick-next {
    right: 5px;
}

.link-card {
    width: 130px;
    height: 130px;
    color: white; /* Cor do texto */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 10px;
    cursor: pointer; /* Cursor tipo "mãozinha" */
    transition: transform 0.2s, box-shadow 0.2s;
}
    .link-card:hover {
    transform: translateY(-20px); /* Elevação do card */
    box-shadow: 0 20px 20px rgba(1, 1, 1, 1); /* Sombra */
    background-color: black; /* Muda a cor de fundo ao passar o mouse */
}

a {

    text-decoration: none;
}

    `}</style>

      <Pagina></Pagina>

      <div>
        <div
          style={{
            marginTop: "0.4rem",
            paddingLeft: "0.3rem",
            paddingRight: "0.3rem",
          }}
        >
          <Carousel controls={false}>
            {carouselImages.map((image, page) => (
              <Carousel.Item key={page}>
                <img
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={`Slide ${page + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>

      <Container
        style={{
          paddingTop: "1rem",
          maxWidth: "1528px",
        }}
      >
        <div
          style={{
            marginTop: "3rem",
            marginBottom: "3rem",
            borderRadius: "0.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              padding: "1rem 10rem 1rem 10rem",
              borderRadius: "0.5",
            }}
          >
           
              <div style={{ borderRadius: "0.5rem", cursor: "pointer" }}>
                <div
                  className="link-card"
                  style={{
                    backgroundColor: "#242423",
                    padding: "0.6rem 1.5rem",
                  }}
                >
                  <BiSolidOffer style={{ fontSize: "4.5rem", color: "white" }} />
                  <div style={{ display: "flex", justifyContent: "center", alignContent: "center", padding: "0.1rem", color: "white", marginTop: "0.3rem" }}>
                    Ofertas
                  </div>
                </div>
              </div>
            
              <div style={{ borderRadius: "0.5rem", cursor: "pointer" }}>
                <div
                  className="link-card"
                  style={{
                    backgroundColor: "#242423",
                    padding: "0.6rem 1.5rem",
                  }}
                >
                  <IoPhonePortraitOutline style={{ fontSize: "4.49rem", color: "white" }} />
                  <div style={{ display: "flex", justifyContent: "center", alignContent: "center", padding: "0.1rem", color: "white", marginTop: "0.43rem" }}>
                    
                    <Button onClick={handleNavigation} style={{backgroundColor:"#242423", border:"none",fontSize:"0.9rem" ,cursor: "pointer" }}>Mais Vendidos</Button>
                  </div>
                </div>
              </div>

             
          </div>
        </div>
      </Container>

      <Row style={{ margin: "2.5rem 0rem 0rem 0rem" }}>
  <Col>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#D3D3D3",
        color: "black",
        fontSize: "2.3rem",
        borderRadius: "0.4rem",
        marginBottom: "1rem",
        padding: "0.3rem 0rem 0.3rem 5rem",
        color: "#242423",
      }}
    >
      <BsFillHexagonFill style={{ fontSize: "1.2rem", color: "#242423", marginRight: "0.8rem" }} />
      Promoções
    </div>

    <div
      style={{
        backgroundColor: "white",
        border: "0.2rem",
        borderRadius: "0.4rem",
        padding: "1.5rem 1rem 1.5rem 1rem",
        marginBottom: "1.5rem",
        backgroundColor: "#D3D3D3",
      }}
    >
      <Row style={{display:"flex", marginLeft:"1.35rem"}}>
      <Slider {...Carrosel}>
      {promotionalProducts.map((product) => (
  <div key={product.id}>
    {/* Aqui usamos o Link para fazer o redirecionamento */}
    <Link href={`/details?product=${encodeURIComponent(product.nome)}`} passHref>
      <Card style={{ width: "85%", margin: "0", borderColor: "black", padding: "0rem 1.05rem" }}>
        <Card.Img variant="top" src={product.foto} />
        <Card.Body style={{ textAlign: "center" }}>
          {/* Nome do modelo centralizado e com cor preta */}
          <Card.Title style={{ fontSize: "18px", fontWeight: "bold", color: "#000" }}>
            {product.nome}
          </Card.Title>
          {/* Preço destacado com azul chamativo */}
          <Card.Text style={{ fontSize: "22px", color: "#007BFF", fontWeight: "bold" }}>
            {product.preco} R$
          </Card.Text>
          {/* Texto da fórmula do parcelamento */}
          <p style={{ fontSize: "14px", marginBottom: "10px" }}>
            Até 12x de{" "}
            <strong style={{ fontSize: "16px", color: "#000" }}>
              R$ {(parseFloat(product.preco) / 12).toFixed(2)}
            </strong>{" "}
            sem juros
          </p>
        </Card.Body>
      </Card>
    </Link>
  </div>
))}
</Slider>
      </Row>
    </div>

    <div style={{display:"flex", maxWidth:"100%", width:"100%" ,justifyContent:"center", alignItems:"center", marginLeft:"0.3rem"}}>
                            <Image src="https://mundodosreviews.com.br/wp-content/uploads/2024/05/Melhor-marca-de-celular.jpg" width={900} height={270} style={{borderRadius:"1rem", marginTop:"0.36rem"}}/>
                        </div>



    {/* Repetindo para o segundo grupo de produtos */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#D3D3D3",
        color: "black",
        fontSize: "2.3rem",
        borderRadius: "0.4rem",
        marginBottom: "1rem",
        padding: "0.3rem 0rem 0.3rem 5rem",
        color: "#242423",
        marginTop:"3rem"
      }}
    >
      <BsFillHexagonFill style={{ fontSize: "1.2rem", color: "#242423", marginRight: "0.8rem" }} />
      BBB = Bom bonito e barato
    </div>

    <div
      style={{
        backgroundColor: "white",
        border: "0.2rem",
        borderRadius: "0.4rem",
        padding: "1.5rem 1rem 1.5rem 1rem",
        marginBottom: "1.5rem",
        backgroundColor: "#D3D3D3",
      }}
    >
      <Row style={{display:"flex", marginLeft:"1.35rem"}}>
      <Slider {...Carrosel}>
      {bbbProducts.map((product) => (
  <div key={product.id}>
    {/* Aqui usamos o Link para fazer o redirecionamento */}
    <Link href={`/details?product=${encodeURIComponent(product.nome)}`} passHref>
      <Card style={{ width: "85%", margin: "0", borderColor: "black", padding: "0rem 1.05rem" }}>
        <Card.Img variant="top" src={product.foto} />
        <Card.Body style={{ textAlign: "center" }}>
          {/* Nome do modelo centralizado e com cor preta */}
          <Card.Title style={{ fontSize: "18px", fontWeight: "bold", color: "#000" }}>
            {product.nome}
          </Card.Title>
          {/* Preço destacado com azul chamativo */}
          <Card.Text style={{ fontSize: "22px", color: "#007BFF", fontWeight: "bold" }}>
            {product.preco} R$
          </Card.Text>
          {/* Texto da fórmula do parcelamento */}
          <p style={{ fontSize: "14px", marginBottom: "10px" }}>
            Até 12x de{" "}
            <strong style={{ fontSize: "16px", color: "#000" }}>
              R$ {(parseFloat(product.preco) / 12).toFixed(2)}
            </strong>{" "}
            sem juros
          </p>
        </Card.Body>
      </Card>
    </Link>
  </div>
))}
</Slider>
      </Row>
    </div>
    

  </Col>
</Row>



<div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#D3D3D3",
        color: "black",
        fontSize: "2.3rem",
        borderRadius: "0.4rem",
        marginBottom: "1rem",
        marginTop:"4rem",
        padding: "0.3rem 0rem 0.3rem 5rem",
        color: "#242423",
      }}
    >
      <BsFillHexagonFill style={{ fontSize: "1.2rem", color: "#242423", marginRight: "0.8rem" }} />
      Produto que trabalhamos
    </div>
<div className="container my-5" style={{backgroundColor:"white", borderRadius:"1rem", width:"1450px"}}>
  <div className="row align-items-center" style={{backgroundColor:"white", borderRadius:"1rem", padding:"2rem 0rem"}}>
    <div className="col-md-6 p-0" style={{width:"300px", marginLeft:"15.2rem", backgroundColor:"white"}}>
      <img 
        src="https://trocafone.vtexassets.com/assets/vtex.file-manager-graphql/images/1274eab3-6ef6-4022-bb56-5b52e7954a1a___8df7bd736bb742b018d5faa971b45e28.png" 
        className="img-fluid mb-4" 
        style={{maxWidth: '100%', height: 'auto'}} 
        alt="iPhone" 
      />
    </div>
    <div className="col-md-6">
      <h2 className="display-4" style={{fontSize: '2.5rem', fontWeight: 400, color: '#6c757d'}}>iPhone</h2>
      <p className="lead" style={{fontSize: '1rem', fontWeight: 400, color: '#6c757d'}}>
        Sinônimo de design, status e excelentes funcionalidades, o iPhone é um dos celulares mais desejados da atualidade. Seja pela câmera quase imbatível, seja pelo famoso "ele não trava", o smartphone da gigante Apple entrou para a história e ganhou o gosto de milhões de pessoas ao redor do mundo. Onde comprar iPhone barato virou objetivo de muita gente.
      </p>
      
    </div>
  </div>
</div>

<Footer>
</Footer>


    </>
  );
}
