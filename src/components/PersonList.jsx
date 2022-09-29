import "./PersonList.css";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function PersonListHeader(props) {
  return (
    <ListGroup>
      <ListGroup.Item className="headerRow">
        <Row>
          <Col sm={2}>First Name</Col>
          <Col sm={2}>Last Name</Col>
          <Col sm={5}>E-mail</Col>
          <Col sm={2}>Nationality</Col>
          <Col sm={1}>Age</Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
}

export function PersonList(props) {
  return (
    <>
      <h2>Click on row to edit</h2>
      <Container fluid className="personList">
        <PersonListHeader />
        <ListGroup>
          {props.persons.map((p) => (
            <ListGroup.Item className="clickableRow" key={p.id}>
              <Row onClick={() => props.rowClick(p.id)}>
                <Col sm={2}>{p.first_name}</Col>
                <Col sm={2}>{p.last_name}</Col>
                <Col sm={5}>{p.email}</Col>
                <Col sm={2}>{p.nationality}</Col>
                <Col sm={1}>{p.age}</Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
}
