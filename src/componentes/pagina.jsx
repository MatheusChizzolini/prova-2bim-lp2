import { Menu } from "./menu";
import Cabecalho from "./cabecalho";
import { Container } from "react-bootstrap";

export default function Pagina(props) {
    return (
        <>
            <Container>
                <Cabecalho titulo="Bate-papo" />
                <Menu />
                {
                    props.children
                }
            </Container>
        </>
    );
}
