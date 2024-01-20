import { useState, React } from "react";
import { Notecontext } from "./notecontext";

const Notestate = (props) => {

    return (
        <div>
            <Notecontext.Provider value={{ state, update }}>
                {props.children}
            </Notecontext.Provider>
        </div>
    );
}

export default Notestate;