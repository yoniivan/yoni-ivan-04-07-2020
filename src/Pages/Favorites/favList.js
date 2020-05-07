import React from 'react';
import { Card, Button } from 'react-bootstrap';

function importAll(r) {
    let images = {};
    r.keys().map((item) => { 
        images[item.replace('./', '')] = r(item); 
        return null;
    });
    return images;
  }
  
const images = importAll(require.context('../../images', false, /\.(png|jpe?g|svg)$/));

const favoritesList = (props) => {

    const favList = props.list.map((data, index) => {
        let icon = data.icon;
        if(icon > 9){
            icon = icon + "-s.png";
        }else{
            icon = "0" + icon + "-s.png"
        }
        return (
            <Card className="singleFav" key={index} style={{ width: '18rem' }}>
                <Card.Header
                    style={{backgroundColor: props.cardBG, color: props.cardColor}}>
                    <img 
                        src={images[icon]}
                        width="75"
                        heght="45"
                        alt={images['01-s.png']}
                        />
                    {data.cityName}
                </Card.Header>
                <Card.Body>
                    <Card.Title> {data.temp} {data.unit} </Card.Title>
                    <Card.Text>{data.text}</Card.Text>
                    <Button
                        style={{ marginBottom: '0.5rem' }} 
                        variant="danger" 
                        onClick={() => props.deleteFav(index)}>
                            Delete from Favorites
                    </Button>
                    <Button 
                        variant="success" 
                        onClick={() => props.loadFav(index)}>Load Favorites</Button>
                </Card.Body>
            </Card>
                );
    })

    return(
        <div className="favoritesList">    
            {favList}
        </div> 
        
    );
}

export default favoritesList;