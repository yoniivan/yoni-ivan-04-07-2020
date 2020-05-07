import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

const searchCity = (props) => {
    return(
        <div>
            <InputGroup>
                <FormControl
                    placeholder="Enter City"
                    aria-describedby="basic-addon1"
                    value={props.formValue}
                    onChange={props.formChange}
                    />
            </InputGroup>
        </div>
    );
}

export default searchCity;