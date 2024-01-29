import React from 'react';

const Noteitem = (props) => {
    const { note } = props;
    return (
        <div className="card mx-3 my-3 col-md-3 ">

            <div className="card-body">
                <h5 className="card-title">{note.Title}</h5>
                <p className="card-text">{note.Description}</p>
                
            </div>

        </div>
    );
}
export default Noteitem;