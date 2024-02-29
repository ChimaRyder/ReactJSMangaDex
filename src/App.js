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


function CardTemplate({key, coverimg, title, author, text, button_text}) {
    const [cardCover, setCardCover] = useState('')
    const [mAuthor, setMAuthor] = useState('')

    coverimg.resolve().then((cover) => setCardCover(cover.url))
    author[0].resolve().then((author) => setMAuthor(author.name))
  return (
      <Col>
          <Card className="m-2" style={{ width: '18rem' }} key={key}>
            <Card.Img variant="top" src={ cardCover } />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{mAuthor}</Card.Subtitle>
              <Card.Text>
                {text}
              </Card.Text>
              <Button variant="primary">{button_text}</Button>
            </Card.Body>
          </Card>
      </Col>
  );
}

let hasChanged = false;
function DisplayManga() {
    const [list, setList] = useState(null);
    const [title, setTitle] = useState('');

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
            <Row className="">
                { list != null ?
                    list.map(({id, localTitle, authors, mainCover}) =>
                        <CardTemplate
                            coverimg = {mainCover}
                            key={id}
                            title={localTitle}
                            author={ authors }
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
