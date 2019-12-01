
import React from 'react';

export default ( { input, label, icon, meta: {error, touched} } ) => {
    return(
        <div>
            <i class="material-icons prefix"> {icon} </i>
            <label for="icon_prefix" style={{fontSize: "15px", color: 'black'}}> {label} </label>
            <input {...input} id="icon_prefix" style={{ margin: '5px' }}/>
            <div className="red-text" style={{ marginBottom: '20px' }}> {touched && error} </div>
        </div>
    )
}