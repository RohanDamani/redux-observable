import React from "react";
import { Container, Image, Card, Modal, Header } from "semantic-ui-react";

export function BeerList(props) {
  const { data } = props;

  const Item = (props) => {
    const {beer} = props;
    return (
      <Card centered {...props}>
        <Image src={beer.image_url} alt={beer.name} size="tiny" centered />
        <Card.Content>
          <Card.Header>{beer.name}</Card.Header>
        </Card.Content>
      </Card>
    );
  };

  return (
    <Container textAlign="center">
      {data.map(beer => {
        return (
          <Modal key={beer.id} trigger={<Item beer={beer} {...props} />}>
            <Modal.Header>{beer.name}</Modal.Header>
            <Modal.Content image>
              <Image
                wrapped
                size="small"
                src={beer.image_url}
              />
              <Modal.Description>
                <Header>{beer.tagline}</Header>
                <p>
                  {beer.description}
                </p>
                <p>First Brewed: {beer.first_brewed}}</p>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        );
      })}
    </Container>
  );
}
