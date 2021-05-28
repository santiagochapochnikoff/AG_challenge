import React, {useState} from 'react'
import axios from 'axios'
import ParkingLotCard from './ParkingLotCard'
import styles from './parkinglotlist.module.css'



function ParkingLotList() {
    const [searchList, setSearchList] = useState([])
    const [location, setLocation] = useState('')


    const handleLocation = (e) =>{
        setLocation(e.target.value)
    }
    const searchHandler = async(e) => {
       
const response = await axios
  .get(
    `/v3/businesses/search?categories=parking&location=${location}`,
    {
      headers: {
        "Authorization":
          "Bearer YQtEJ6fhOXwq2BZARHaZo9VZ0aB9jZBGeBUsszzeRgiQ68VCmin-G8SKRTn_jZU1h7IUEmzlfN7pxNVYVnWzXB3IkVb3pJTrNuzqeAA29k6eK3BwvjLAmmzyULOvYHYx"
      },
    }
  )
  .then((res) => setSearchList(res.data.businesses && res.data.businesses.sort(function (a, b) {  //Here I'm doing the sort so the ones with the lowest score appear first
              let firstA = a.review_count * a.rating;
              let secondA = a.review_count + 1;
              let scoreA = firstA / secondA;
              let firstB = b.review_count * b.rating;
              let secondB = b.review_count + 1;
              let scoreB = firstB / secondB;
              
              
              if (scoreA < scoreB) {
                return -1;
              }
              if (scoreA > scoreB) {
                return 1;
              }
              return 0;
            })))
  .catch(err => console.log(err))
  ;
    }

 
    return (
      <div className={styles.mainContainer}>
        <div >
        <h1 className={styles.main}><span className={styles.firsthalf}>AGL</span><span>ots</span></h1>
        <h5 className={styles.main}>Lowest ranked parking lots</h5>
        <div>
          <input className={styles.search} type="text" onChange={handleLocation}></input>
          <button className={styles.button} onClick={searchHandler}>Search</button>
        </div>
        </div>
        
        <div className={styles.container}>
            {searchList.map((p, i) => <ParkingLotCard
            name={p.name}
            address={p.location.address1}
            img={p.image_url}
            rating={p.rating}
            reviews={p.review_count}
            link={p.url}
            key={i}
            ></ParkingLotCard>)}
        </div>
        
      </div>
    )
   
    ;
}

export default ParkingLotList
