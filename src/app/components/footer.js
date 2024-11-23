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



export default function Footer(props) {
return(
        <>

<footer style={{ backgroundColor: "#000", color: "#fff", padding: "40px 0", fontSize: "14px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", position: "relative" }}>
        {/* Área Esquerda: Nome, E-mail, Contato e Copyright */}
        <div
          style={{
            position: "absolute",
            left: "0.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            textAlign: "left",
          }}
        >
          <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "bold" }}>SmartCelPhone</h3>
          <p style={{ margin: "5px 0" }}>E-mail: contato@smartcelphone.com</p>
          <p style={{ margin: "5px 0" }}>Telefone: (11) 1234-5678</p>
          <p style={{ margin: "10px 0 0", fontSize: "12px" }}>© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>

        {/* Área Direita: Redes Sociais */}
        <div
          style={{
            position: "absolute",
            right: "0.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            textAlign: "right",
          }}
        >
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 10px", textDecoration: "none" }}
          >
            <img
              src="https://via.placeholder.com/30x30?text=FB"
              alt="Facebook"
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 10px", textDecoration: "none" }}
          >
            <img
              src="https://via.placeholder.com/30x30?text=IG"
              alt="Instagram"
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 10px", textDecoration: "none" }}
          >
            <img
              src="https://via.placeholder.com/30x30?text=TW"
              alt="Twitter"
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
          </a>
        </div>

        {/* Conteúdo Central: Links Úteis */}
        <div style={{ marginLeft: "150px", marginRight: "150px", textAlign: "center" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            <a href="#sobre" style={{ color: "#fff", textDecoration: "none", margin: "0 15px" }}>
              Sobre Nós
            </a>
            <a href="#servicos" style={{ color: "#fff", textDecoration: "none", margin: "0 15px" }}>
              Serviços
            </a>
            <a href="#suporte" style={{ color: "#fff", textDecoration: "none", margin: "0 15px" }}>
              Suporte
            </a>
          </div>

          {/* Termos e Políticas */}
          <div style={{ marginTop: "20px" }}>
            <a href="#termos" style={{ color: "#fff", textDecoration: "none", margin: "0 10px" }}>
              Termos de Uso
            </a>
            <a href="#politica" style={{ color: "#fff", textDecoration: "none", margin: "0 10px" }}>
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>


        </>
    )
}

