import React from 'react';
import { Spinner } from 'react-bootstrap';

function importAll(r) {
    let images = {};
    r.keys().map((item) => { 
        images[item.replace('./', '')] = r(item); 
        return null;
    });
    return images;
  }
  
const images = importAll(require.context('../../images', false, /\.(png|jpe?g|svg)$/));

const forcastBox = (props) => {
    
    let singleBox = null;
    if(props.list !== undefined){
        singleBox = props.list.map((data, index) => {
            let icon = data.iconNight;
            if(icon > 9){
                icon = icon + "-s.png";
            }else{
                icon = "0" + icon + "-s.png"; 
            }
            const date = new Date(data.date);
            const day = date.toString().split(" ")[0];
            return (
                <div key={index} className="singleBox" style={{border: "2px solid black"}}>
                    <div>
                        <div style={{display: "flex", backgroundColor: props.boxesBG}}>
                            <img 
                                src={images[icon]} 
                                width="75" 
                                height="45" 
                                style={{marginTop: "0.3rem"}}
                                alt={images['01-s.png']}
                                />
                            {day ? <h3>{day}</h3> : <Spinner animation="border" variant="primary" />}
                        </div>

                        {data.temperatureMin ? <p className="mb-2 text-muted">{data.temperatureMin} {data.unit}</p> : <Spinner animation="border" variant="primary" />}
                    </div>
                </div>
            );
        })

    }

    return(
        <div className="boxes">    
            {singleBox}
        </div> 
        
    );
}

export default forcastBox;