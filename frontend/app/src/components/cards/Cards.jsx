import React from "react";
import CountUp from "react-countup";
import cx from "classnames";
import { Card, CardTitle, CardText, Row, Col, CardFooter } from "reactstrap";
import styles from "./Cards.module.css";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return "Carregando...";
  }
  return (
    <div className={styles.container}>
      <Row className={styles.row} container spacing={3} justify="center">
        <Col sm="4">
          <Card xs={12} md={3} className={cx(styles.card, styles.infected)}>
            <CardTitle>CASOS ATIVOS</CardTitle>
            <CardText variant="h5">
              <CountUp
                start={0}
                end={confirmed.value}
                duration={2.5}
                separator=","
              />
            </CardText>
            <CardText color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </CardText>
            <CardFooter variant="body2">
              Número de casos ativos de COVID-19
            </CardFooter>
          </Card>
        </Col>
        <Col sm="4">
          <Card xs={12} md={3} className={cx(styles.card, styles.recovered)}>
            <CardTitle color="textSecondary">RECUPERADOS</CardTitle>
            <CardText variant="h5">
              <CountUp
                start={0}
                end={recovered.value}
                duration={2.5}
                separator=","
              />
            </CardText>
            <CardText color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </CardText>
            <CardFooter variant="body2">
              Números de recuperados do COVID-19
            </CardFooter>
          </Card>
        </Col>
        <Col sm="4">
          <Card xs={12} md={3} className={cx(styles.card, styles.deaths)}>
            <CardTitle color="textSecondary">MORTES</CardTitle>
            <CardText variant="h5">
              <CountUp
                start={0}
                end={deaths.value}
                duration={2.5}
                separator=","
              />
            </CardText>
            <CardText color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </CardText>
            <CardFooter variant="body2">
              Número de mortes causadas pelo COVID-19
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cards;
