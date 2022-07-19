import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';


function LockEmployee()    {    
    var { id }  = useParams();
    var { set } = useParams();

    const url = "http://localhost:8080/api/lock-employee/"+id+"/"+set;    
    const  responce = fetch( url, {                
        method:'Get',            
        headers:{'Content-Type': 'application/json'},
        credentials:'include',
    })  
    console.log("lock emp", url) 
    
    return (        
        <div id="adminEmp" className="container">
              <Navigate to="/employees" replace={true} />
        </div>        
        
    );
}
export default LockEmployee;

