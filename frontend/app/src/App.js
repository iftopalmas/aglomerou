import React from 'react';
import styles from './App.module.css';
import { fetchData } from './service/api';
import Cards from './components/cards/Cards.jsx';
import Header from './components/header/Header.jsx';
import Maps from './maps';


class App extends React.Component {
    state = {
        data: {},
    };

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData });
    };

    render() {
        const { data } = this.state;
        return (
            <div className={styles.container}>
                <Header>{Header}</Header>
                <Cards data={data} />
                <Maps/>
            </div>
        );
    }
};

export default App;