import Carousel from 'react-bootstrap/Carousel'
import React, {useState} from "react";
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';


function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./Images/Carousel/C1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 style={{ color: 'black' }}>Bird</h3>
            <p style={{ color: 'black' }}>The Art of Folding Paper</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./Images/Carousel/C2.jpg"
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h3>Fox</h3>
            <p>The Art of Folding Paper.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./Images/Carousel/C3.jpg"
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3>Camel</h3>
            <p>
            The Art of Folding Paper
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./Images/Carousel/C5.jpg"
            alt="Fourth slide"
          />
  
          <Carousel.Caption>
            <h3>Flower Ball</h3>
            <p>
            The Art of Folding Paper
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./Images/Carousel/C9.jpg"
            alt="Fifth slide"
          />
  
          <Carousel.Caption>
            <h3>Jellyfish</h3>
            <p>
            The Art of Folding Paper
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  export default ControlledCarousel;
 