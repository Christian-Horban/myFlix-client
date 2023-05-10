<<<<<<< HEAD
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
=======
// import PropTypes from "prop-types";
>>>>>>> b5af9f5182c53d52258090c87cb8c0cc7df1d0b0

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card>
          <Card.Img variant="top" src={book.image} />
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>{book.author}</Card.Text>
            <Button onClick={() => onBookClick(book)} variant="link">
              Open
            </Button>
          </Card.Body>
        </Card>
      );
    };