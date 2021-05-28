import React from 'react'
import styles from './parkinglotcard.module.css'
import ReactStars from "react-rating-stars-component"
import pic from "../assets/Rcc6d4e370587dee3b773ba1e3105aa18.png";

function ParkingLotCard({name, img, link, address, rating, reviews}) {
    var a = reviews * rating;
    var b = reviews + 1;
    var score = a / b;
    return (
      <div className={styles.container}>
        <h3>{name}</h3>
        <p>Address:{address}</p>
        <div className={styles.imgContainer}>
          {img? <img className={styles.img} src={img}></img> : <img className={styles.img} src={pic}></img>}
        </div>
       <form className={styles.form} action={link} method="get" target="_blank">
         <button className={styles.button} type="submit">Click to see more</button>
      </form>
        <p>{reviews} reviews</p>
        <ReactStars
          count={5}
          edit={false}
          value={Math.round(rating)}
          size={24}
          activeColor="#ffd700"
        />
        <p>Score:{score.toFixed(2)}</p>
      </div>
    );
}

export default ParkingLotCard
