import React from 'react';
import styles from './App.module.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Card,
    Button,
    CardTitle,
    CardText,
    Row,
    Col
} from 'reactstrap';
import { fetchData } from './service/api';
import logoImage from './assets/aglomerou.png';
import Chart from './components/grafico/Grafico.jsx';

class App extends React.Component {

    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        this.setState({ data: fetchedData, country: country });
    }


    render() {
        const { data, country } = this.state;

        return (
            <div class="header">
                <Navbar className={styles.headerNav} color="inverse" light expand="md">
                    <NavbarBrand href="https://ifto-palmas.github.io/aglomerou/">
                        <img className={styles.image} src={logoImage} alt="Logo aglomerou"></img>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">NOTIFICAÇÕES</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://coronavirus.palmas.to.gov.br/">COVID-19</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <div className={styles.cards}>
                    <Row>
                        <Col sm="4" className={styles.cardonly}>
                            <Card className={styles.cardbody} body outline color="warning">
                                <CardTitle>CASOS ATIVOS</CardTitle>
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                <Button color="warning"></Button>
                            </Card>
                        </Col>
                        <Col sm="4" className={styles.cardonly}>
                            <Card className={styles.cardbody} body outline color="primary">
                                <CardTitle>RECUPERADOS</CardTitle>
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                <Button color="primary"></Button>
                            </Card>
                        </Col>
                        <Col sm="4" className={styles.cardonly}>
                            <Card className={styles.cardbody} body outline color="danger">
                                <CardTitle>MORTES</CardTitle>
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                <Button color="danger"></Button>

                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className={styles.container}>
                    <Chart data={data} country={country} />
                </div>
            </div>
        );
    }

}

export default App;
