'use client'
import Pagina from "@/app/components/Navbar2";
import { Formik } from "formik";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Container, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import * as Yup from 'yup';

export default function Page(){

    const route = useRouter();
    const params = useParams();

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const dados = products.find(item => item.id == params.id);
    const product = dados || { id: '', nome: '', memoria: '', memoriaRam: '', cameraPrincipal:'', cameraFrontal: '', preco: '', foto:'', redirection: ''};

    function salvar(dados) {
        if (dados.nome) {
            dados.nome = dados.nome.toLowerCase().trim();
        }
    
        if (product.id) {
            Object.assign(product, dados);
        } else {
            dados.id = v4();
            dados.redirection = ''; 
            products.push(dados);
        }
    
        localStorage.setItem('products', JSON.stringify(products));
        return route.push('/products');
    }

    const validationSchema = Yup.object({
        nome: Yup.string()
            .required('O nome do produto é obrigatório')
            .min(3, 'O nome do produto deve ter pelo menos 3 caracteres')
            .max(50, 'O nome do produto não pode ter mais de 50 caracteres'),
    
        preco: Yup.number()
            .required('O preço do produto é obrigatório')
            .positive('O preço deve ser um valor positivo')
            .typeError('O preço deve ser um número'),
    
        memoria: Yup.string()
            .required('A memória interna é obrigatória')
            .matches(/^[0-9]+GB$/, 'A memória deve ser no formato "XXGB"'),
    
        memoriaRam: Yup.string()
            .required('A memória RAM é obrigatória')
            .matches(/^[0-9]+GB$/, 'A memória RAM deve ser no formato "XXGB"'),
    
        processador: Yup.string()
            .required('O processador é obrigatório')
            .min(3, 'O nome do processador deve ter pelo menos 3 caracteres'),
    
        cameraFrontal: Yup.string()
            .required('A câmera frontal é obrigatória')
            .matches(/^[0-9]+MP$/, 'A câmera frontal deve ser no formato "XXMP"'),
    
        cameraPrincipal: Yup.string()
            .required('A câmera principal é obrigatória')
            .matches(/^[0-9]+MP$/, 'A câmera principal deve ser no formato "XXMP"'),
    
        foto: Yup.string()
            .required('A foto do produto é obrigatória')
            .url('A URL da foto deve ser válida'),
    });

    return (
        <>

                <Pagina>
                </Pagina>
        
    
        <Container style={{display:"flex",padding:"0", marginTop:"5rem"}}>

       
        
        <div style={{display:"flex", width:"100%", height:"100%", backgroundColor:"black", borderRadius:"0.3rem", padding:"1rem 0rem 1rem 0rem"}}>
        
    
        <div style={{display:"flex", flexDirection:"column"  ,marginLeft:"1rem"}}>           
        <h1 style={{color:"white"}}>Registros</h1>

            <Formik
                initialValues={product}
                validationSchema={validationSchema}
                onSubmit={values => salvar(values)}
            >

            {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
            }) => {
                return (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label style={{color:"white"}}>Nome do produto</Form.Label>
                        <Form.Control
                            style={{color:"black", backgroundColor:"#D3D3D3", border:"0", outline:"none", boxShadow:"none", width:"80.3rem"}}
                            type="text"
                            name="nome"
                            value={values.nome}
                            onChange={handleChange}
                            isInvalid={errors.nome}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.nome}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="preco">
                        <Form.Label style={{color:"white"}}>Preço</Form.Label>
                        <Form.Control
                            style={{color:"black", backgroundColor:"#D3D3D3", border:"0", outline:"none", boxShadow:"none", width:"80.3rem"}}
                            type="text"
                            name="preco"
                            value={values.preco}
                            onChange={handleChange}
                            isInvalid={errors.preco}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.preco}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="memoria">
                        <Form.Label style={{color:"white"}}>Memória Interna</Form.Label>
                        <Form.Control
                            style={{color:"black", backgroundColor:"#D3D3D3", border:"0", outline:"none", boxShadow:"none", width:"80.3rem"}}
                            type="text"
                            name="memoria"
                            value={values.memoria}
                            onChange={handleChange}
                            isInvalid={errors.memoria}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.memoria}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="memoriaRam">
                        <Form.Label style={{color:"white"}}>Memória Ram</Form.Label>
                        <Form.Control
                            style={{color:"black", backgroundColor:"#D3D3D3", border:"0", outline:"none", boxShadow:"none", width:"80.3rem"}}
                            type="text"
                            name="memoriaRam"
                            value={values.memoriaRam}
                            onChange={handleChange}
                            isInvalid={errors.memoriaRam}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.memoriaRam}
                        </Form.Control.Feedback>
                    </Form.Group>

                 
                    <Form.Group className="mb-3" controlId="cameraFrontal">
                        <Form.Label style={{color:"white"}}>Câmera Frontal</Form.Label>
                        <Form.Control
                            style={{color:"black", backgroundColor:"#D3D3D3", border:"0", outline:"none", boxShadow:"none", width:"80.3rem"}}
                            type="text"
                            name="cameraFrontal"
                            value={values.cameraFrontal}
                            onChange={handleChange}
                            isInvalid={errors.cameraFrontal}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.cameraFrontal}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cameraPrincipal">
                        <Form.Label style={{color:"white"}}>Câmera Principal</Form.Label>
                        <Form.Control
                            style={{color:"black", backgroundColor:"#D3D3D3", border:"0", outline:"none", boxShadow:"none", width:"80.3rem"}}
                            type="text"
                            name="cameraPrincipal"
                            value={values.cameraPrincipal}
                            onChange={handleChange}
                            isInvalid={errors.cameraPrincipal}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.cameraPrincipal}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="foto">
                        <Form.Label style={{color:"white"}}>Foto do produto</Form.Label>
                        <Form.Control
                            style={{color:"black", backgroundColor:"#D3D3D3", border:"0", outline:"none", boxShadow:"none", width:"80.3rem"}}
                            type="text"
                            name="foto"
                            value={values.foto}
                            onChange={handleChange}
                            isInvalid={errors.foto}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.foto}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="text-center">
                        <Button type="submit" variant="success" style={{backgroundColor:"#5e503f", border:"0"}}>
                            <FaCheck style={{fontSize:"0.69rem"}}/> Salvar
                        </Button>
                        <Link
                            href="/products"
                            className="btn btn-danger ms-2"
                            style={{backgroundColor:"#5e503f", border:"0"}}
                        >
                            <MdOutlineArrowBack /> Voltar
                        </Link>
                    </div>
                </Form>
                );
            }}
            </Formik>
        </div>

        </div>

        </Container>

        </>
    );
}
