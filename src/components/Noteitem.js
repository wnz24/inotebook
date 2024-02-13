import React, { useContext } from 'react';
import noteContext from './Context/notes/notecontext';


const Noteitem = (props) => {
    const { deleteNote } = useContext(noteContext);
    const { note ,updatenote} = props;
    return (
        <div className="card mx-3 my-3 col-md-3 ">

            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                    <h5 className="card-title">{note.Title}</h5>
                    <div className="ml-auto">
                        <i className='far fa-trash-alt mx-1 ' onClick={() => { deleteNote(note._id) }}></i>
                        <i className="fa-solid fa-pen-to-square mx-1" onClick={updatenote}></i>
                    </div>
                </div>

                <p className="card-text">{note.Description}</p>

            </div>

        </div>
    );
}
export default Noteitem;