import React from 'react'
import './readpopularfeature.css'
import car from '../../assets/rsz_merol.png'
function ReadPopularFeature(props) {
    const data123 = props;
    //console.log(data123)
  return (
    <div className='cr__features-pFcontainer'>
        <div className='cr__features-pFimage'>
        {data123.data.imageUrl ? (<img src={data123.data.imageUrl} alt='car'/>) : (<img src={car} alt='car'/>)}
        </div>
        <div className='cr__features-pFname'>
            <p>{data123.data.name}</p>
        </div>
        <div className='cr__features-pFspecify'>
        <table>
            <tbody>
            <tr>
                <td><i className="fa-solid fa-user-group"></i>{data123.data.passengerCapacity} People </td>
                <td><i className="fa-solid fa-gear"></i>{data123.data.transmissionType} </td>
            </tr>
            
            <tr>
                <td><i className="fa-solid fa-gauge"></i>{data123.data.fuelConsumption}km/1-litre</td>
                <td><i className="fa-solid fa-gas-pump"></i>{data123.data.fuelType}</td>
            </tr>
            </tbody>
        </table>
        </div>
        <div className='cr__features-pFprice'><span className='cr__features-pFprice-day'>${data123.data.pricePerDay} </span>/PerDay {<i className="fa-solid fa-phone"></i>}{data123.data.phoneNumber}</div>
    </div>
  )
}

export default ReadPopularFeature