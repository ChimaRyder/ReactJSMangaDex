import logo from './logo.svg';
import './App.css';
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import {Manga, resolveArray} from "mangadex-full-api";
import {getValue} from "@testing-library/user-event/dist/utils";
import React, {useState} from "react";


function CardTemplate({key, coverimg, title, text, button_text}) {
    const [c, setC] = useState('')
    coverimg.resolve().then((cover) => setC(cover.url))
  return (
      <Col>
          <Card style={{ width: '18rem' }} key={key}>
            <Card.Img variant="top" src={ c } />
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

let hasChanged = false;
// function titleChanger(title) {
//     DisplayManga(title);
// }

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


        {/*<Container>*/}
        {/*    <Row>*/}
        {/*        /!*<CardTemplate*!/*/}
        {/*        /!*    coverimg= 'guidephoto_alegria.jpg'*!/*/}
        {/*        /!*    title= "Bali"*!/*/}
        {/*        /!*    text="A place to visit in Indonesia. Hopefully it's good."*!/*/}
        {/*        /!*    button_text="More Info"></CardTemplate>*!/*/}
        {/*        /!*<CardTemplate*!/*/}
        {/*        /!*    coverimg= 'guidephoto_alegria.jpg'*!/*/}
        {/*        /!*    title= "China"*!/*/}
        {/*        /!*    text="Wonderful place in the east, with beautiful landscapes."*!/*/}
        {/*        /!*    button_text="More Info"></CardTemplate>*!/*/}
        {/*        /!*<CardTemplate*!/*/}
        {/*        /!*    coverimg= 'guidephoto_alegria.jpg'*!/*/}
        {/*        /!*    title= "Wakayama"*!/*/}
        {/*        /!*    text="Japan's premiere waterfall destination"*!/*/}
        {/*        /!*    button_text="More Info"></CardTemplate>*!/*/}

        {/*        <listdisplay></listdisplay>*/}

        {/*    </Row>*/}
        {/*</Container>*/}

        {/*{hasChanged === false ?*/}
        {/*    <p>No manga here</p>*/}
        {/*    :*/}
            <DisplayManga></DisplayManga>
        {/*}*/}
    </div>
  );
}

export default App;
