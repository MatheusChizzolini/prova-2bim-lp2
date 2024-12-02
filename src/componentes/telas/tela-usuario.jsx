import { Alert } from "react-bootstrap";
import { useState } from "react";
import Pagina from "../pagina";
import TabelaUsuario from "../tabelas/tabela-usuario";
import FormularioUsuario from "../formulario-usuario";

export default function TelaUsuario(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        id: 0,
        nickname: "",
        urlAvatar: "",
        dataIngresso: "",
        senha: "",
        mensagens: []
    });

    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Usuário
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaUsuario
                            setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao}
                            setProdutoSelecionado={setUsuarioSelecionado}
                        />
                        :
                        <FormularioUsuario
                            setExibirTabela={setExibirTabela}
                            usuarioSelecionado={usuarioSelecionado}
                            setUsuarioSelecionado={setUsuarioSelecionado}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                        />
                }
            </Pagina>
        </div>
    );
}