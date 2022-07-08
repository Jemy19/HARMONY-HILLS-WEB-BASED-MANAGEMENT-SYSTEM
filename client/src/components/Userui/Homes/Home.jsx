import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import "./home.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col} from 'react-bootstrap';

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase";


function Home() {

  const [data, setData] = useState([]);
  const [news, setNews] = useState([]);
  
  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "announcement"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "events"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setNews(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return (       
    <div className="container p-3">
      <div className="carousel">
    <Carousel>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100 imgcarousell"
          src="https://images.pexels.com/photos/902288/pexels-photo-902288.jpeg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100 imgcarousell"
          src="https://images.pexels.com/photos/942547/pexels-photo-942547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100 imgcarousell"
          src="https://images.pexels.com/photos/4330929/pexels-photo-4330929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    <Row className="mx-0">
    <Card as={Col} className="text-center overflow-auto" >
      <Card.Header>Announcement</Card.Header>
      {data.map((item)=>(
      <Card.Body>
      <div className="list-group">
        <a href="#" className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{item.title}</h5>
            <small>{item.date}</small>
          </div>
          <p className="mb-1">{item.body}</p>
          <small>Donec id elit non mi porta.</small>
        </a>
      </div>
      </Card.Body>
      ))}
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>

    <Card as={Col} className="text-center">
      <Card.Header>Events</Card.Header>
      {news.map((item)=>(
      <Card.Body>
      <div className="list-group">
        <a href="#" className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{item.title}</h5>
            <small>{item.date}</small>
          </div>
          <p className="mb-1">{item.body}</p>
          <small>Donec id elit non mi porta.</small>
        </a>
      </div>
      </Card.Body>
      ))}
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
      </Row>
    </div>
  );
}

export default Home
