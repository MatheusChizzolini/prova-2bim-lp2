import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarUsuario, excluirUsuario as apagarUsuario, gravarUsuario, alterarUsuario } from "../servicos/servico-usuario";
import ESTADO from "./estados";

export const buscarUsuario = createAsyncThunk('buscarUsuario', async () => {
    const resultado = await consultarUsuario();

    try {
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Usuarios recuperados com sucesso.",
                "listaUsuarios": resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar usuarios do backend.",
                "listaUsuarios": []
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
            "listaUsuarios": []
        }
    }
});

export const excluirUsuario = createAsyncThunk('excluirUsuario', async (user) => {
    const resultado = await apagarUsuario(user);

    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "id": user.id
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
        }
    }
});

export const incluirUsuario = createAsyncThunk('incluirUsuario', async (user) => {
    try {
        const resultado = await gravarUsuario(user);
        if (resultado.status) {
            user.id = resultado.id;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "usuario": user
            }
        }
        else {
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

export const atualizarUsuario = createAsyncThunk('atualizarUsuario', async (user) => {
    try {
        const resultado = await alterarUsuario(user);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "usuario": user
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

const usuarioReducer = createSlice({
    name: 'usuario',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaUsuarios: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarUsuario.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE
            state.mensagem = "Processando requisição"
        })
            .addCase(buscarUsuario.fulfilled, (state, action) => { // BUSCAR
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios = action.payload.listaUsuarios;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios = action.payload.listaUsuarios;
                }
            })
            .addCase(buscarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.listaUsuarios = action.payload.listaUsuarios;
            })
            .addCase(excluirUsuario.pending, (state, action) => { // EXCLUIR
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(excluirUsuario.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaUsuarios = state.listaUsuarios.filter((item) => item.id !== action.payload.id);
                } else
                    state.estado = ESTADO.ERRO;
            })
            .addCase(excluirUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = ""
            })
            .addCase(incluirUsuario.pending, (state, action) => { // INCLUIR
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(incluirUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios.push(action.payload.usuario);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(atualizarUsuario.pending, (state, action) => { // ATUALIZAR
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(atualizarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios = state.listaUsuarios.map((item) => item.id === action.payload.usuario.id ? action.payload.usuario : item);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
})

export default usuarioReducer.reducer;
