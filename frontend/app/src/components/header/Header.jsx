import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import logoImage from '../../assets/aglomerou.png';
import styles from './Header.module.css';

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar className={styles.header} color="light" light expand="md">
                <NavbarBrand href="https://ifto-palmas.github.io/aglomerou/">
                    <img className={styles.image} src={logoImage} alt="Logo aglomerou"></img>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="#">Notificações</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://coronavirus.palmas.to.gov.br/">COVID-19</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>IFTO</NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;
