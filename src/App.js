import './App.css';
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import {Manga} from "mangadex-full-api";
import React, {useState} from "react";


function CardTemplate({key, coverimg, title, text, button_text}) {
    const [cardCover, setCardCover] = useState('')
    coverimg.resolve().then((cover) => setCardCover(cover.url))
  return (
      <Col>
          <Card style={{ width: '18rem' }} key={key}>
            <Card.Img variant="top" src={ cardCover } />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>
                {text}
              </Card.Text>
              <Button variant="primary">{button_text}</Button>
            </Card.Body>
          </Card>
      </Col>
  );
}

function DisplayManga() {
    const [list, setList] = useState(null);
    const [title, setTitle] = useState('');
    let hasChanged = false;

    if (hasChanged) {
        Manga.search({
            title: title,
            limit: 10,
            hasAvailableChapters: true, }).then(mangas => {
            setList(mangas)

        }).catch(e=> console.log(e))
        hasChanged = false;
    }

    return (
        <>
        <Form>
            <Form.Group className="mb-3" controlId="searchbar">
                <Form.Label>Manga</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Search For Manga..."
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            setTitle(e.target.value)
                            hasChanged = true;
                        }

                    }}
                />
            </Form.Group>
        </Form>

        <Container>
            <Row>
                { list != null ?
                    list.map(({id, localTitle, description, mainCover}) =>
                        <CardTemplate
                            coverimg = {mainCover}
                            key={id}
                            title={localTitle}
                            text={ description.en }
                            button_text="Read"
                        ></CardTemplate> )
                    :
                        <p>No Manga Here...</p>
                }
            </Row>
        </Container>
        </>
    )
}



function App() {
  return (
    <div className="App">

            <DisplayManga></DisplayManga>

    </div>
  );
}

export default App;
