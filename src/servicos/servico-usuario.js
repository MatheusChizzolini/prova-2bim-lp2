const urlBase = 'https://backend-bcc-2-b.vercel.app/usuario';

export async function gravarUsuario(user) {
    const resposta = await fetch(urlBase, {
        'method': "POST",
        'headers': {
            'Content-Type': "application/json"
        },
        'body': JSON.stringify(user)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarUsuario(user) {
    const resposta = await fetch(urlBase + "/" + user.id, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(user)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirUsuario(user) {
    const resposta = await fetch(urlBase + "/" + user.id, {
        'method': "DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarUsuario() {
    const resposta = await fetch(urlBase, {
        'method': "GET"
    });
    const resultado = await resposta.json();
    return resultado;
}
