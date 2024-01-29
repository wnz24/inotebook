import React , {useEffect} from 'react'
import {
    Link
  } from "react-router-dom";
  import { useLocation } from 'react-router-dom';
 
const Navbar = () => {
    let location = useLocation();

    useEffect(() => {
     
  console.log(location.pathname)
    }, [location]);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand  fs-10" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fs-5 ">
                            <li className="nav-item">
                                <Link className={`nav-link  ${location.pathname === "/" ? "active":" "} `} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={`nav-link  ${location.pathname === "/about" ? "active":" "}`} to="/about">About</Link>
                            </li>
                           

                        </ul>
                       
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar