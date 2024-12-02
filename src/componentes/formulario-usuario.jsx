import { Alert, Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ESTADO from '../redux/estados';
import toast, { Toaster } from 'react-hot-toast';
import { atualizarUsuario, incluirUsuario } from '../redux/reducer-usuario';

export default function FormularioUsuario(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const { estado, mensagem, listaUsuarios } = useSelector((state) => state.usuario);
    const [mensagemExibida, setMensagemExibida] = useState("");
    const despachante = useDispatch();

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                despachante(incluirUsuario(usuario));
                setMensagemExibida(mensagem);
                setMensagemExibida("");
                setUsuario({
                    id: 0,
                    nickname: '',
                    urlAvatar: '',
                    dataIngresso: '',
                    senha: '',
                    mensagens: []
                });
                props.setExibirTabela(true);
            }
            else {
                despachante(atualizarUsuario(usuario));
                setMensagemExibida(mensagem);
                props.setModoEdicao(false);
                props.setUsuarioSelecionado({
                    id: 0,
                    nickname: '',
                    urlAvatar: '',
                    dataIngresso: '',
                    senha: '',
                    mensagens: []
                });
                props.setExibirTabela(true);
            }
        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setUsuario({ ...usuario, [elemento]: valor });
    }

    if (estado === ESTADO.PENDENTE) {
        return (
            <div>
                <Spinner animation="border" role="status" />
                <Alert variant="primary">{mensagem}</Alert>
            </div>
        );
    } else if (estado === ESTADO.ERRO) {
        return (
            <div>
                <Alert variant="danger">{mensagem}</Alert>
                <Button onClick={() => props.setExibirTabela(true)}>Voltar</Button>
            </div>
        );
    } else if (estado === ESTADO.OCIOSO) {
        return (
            <div>
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="id"
                                name="id"
                                value={usuario.id}
                                disabled={props.modoEdicao}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o ID do usuário!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="nickname"
                                name="nickname"
                                value={usuario.nickname}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe o nickname do usuário!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="12">
                            <Form.Label>URL do Avatar</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="urlAvatar"
                                name="urlAvatar"
                                value={usuario.urlAvatar}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a URL do avatar do usuário!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Data de Ingresso</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                id="dataIngresso"
                                name="dataIngresso"
                                value={usuario.dataIngresso}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a data de ingresso do usuário!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                id="senha"
                                name="senha"
                                value={usuario.senha}
                                onChange={manipularMudanca}
                            />
                        </Form.Group>
                    </Row>
                    <Row className='mt-2 mb-2'>
                        <Col md={1}>
                            <Button type="submit">{props.modoEdicao ? "Alterar" : "Cadastrar"}</Button>
                        </Col>
                        <Col md={{ offset: 1 }}>
                            <Button onClick={() => props.setExibirTabela(true)}>Voltar</Button>
                        </Col>
                    </Row>
                    <Toaster position="top-right" />
                </Form>
                {mensagemExibida && <Alert variant="success">{mensagem}</Alert>}
            </div>
        );
    }
}