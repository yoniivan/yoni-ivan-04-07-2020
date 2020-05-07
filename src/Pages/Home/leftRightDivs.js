import React from 'react';
import { Button, ToggleButtonGroup, ToggleButton, Spinner } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';

function importAll(r) {
    let images = {};
    r.keys().map((item) => { 
        images[item.replace('./', '')] = r(item); 
        return null;
    });
    return images;
  }
  
const images = importAll(require.context('../../images', false, /\.(png|jpe?g|svg)$/));

const leftRightDivs = (props) => {
    return(
        <div className="searchedFirst">
                        <div className="left" style={{justifyContent: "space-between", backgroundColor: props.leftBG}}>
                            <div style={{display: "flex", backgroundColor: props.leftBG}}>
                                <div>
                                    <img 
                                        src={images[props.img]} 
                                        width="75" 
                                        height="45"
                                        alt={images["01-s.png"]} />
                                </div>
                                <div>
                                    {props.city ? <p>{props.city}</p> : <Spinner animation="border" variant="primary" />}
                                    {props.temp ? <p>{props.temp} {props.unit}</p> : <Spinner animation="border" variant="primary" />}
                                </div>
                            </div>
                            <div>
                                <ToggleButtonGroup type="checkbox" 
                                    value={props.value} 
                                    onChange={props.handleChange}
                                    name="radio" 
                                    >
                                    <ToggleButton value={1}>Fahrenheit</ToggleButton>
                                    <ToggleButton value={2}>Celsius</ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
    
                        <div className="right" style={{backgroundColor: props.rightBG}}>
                            <div>
                                <h3 style={{color: "red"}}><FaHeart/></h3>
                            </div>
                            <div>
                                <Button onClick={props.addFav}>Add to Favorites</Button>
                            </div>
                        </div>
                    </div>
    );
}

export default leftRightDivs;