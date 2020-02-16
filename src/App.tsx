import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Node } from './components/TreeElement/TreeElementData';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return <Container>
        <Row>
            <Col>
              <header>
                  <h1>TREE</h1>
              </header>
            </Col>
        </Row>
        <Row>
            <Col>
                <Node elementIndex={0} />
            </Col>
        </Row>
    </Container>;
}

export default App;
