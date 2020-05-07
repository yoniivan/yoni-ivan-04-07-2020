import React from 'react';
import { ListGroup } from 'react-bootstrap';

const CountryList = (props) => {

    const countryList = props.list.map((data, index) => {
        return (
            <ListGroup 
                key={index} 
                onClick={() => props.itemClick(data.text)}>
                <ListGroup.Item>{data.text}</ListGroup.Item>
            </ListGroup>
        
                );
    })

    return(
        <div className="searchList">    
            {countryList}
        </div> 
        
    );
}

export default CountryList;