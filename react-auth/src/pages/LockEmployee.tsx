import React from 'react';
import { Alert } from 'react-bootstrap';
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
    console.log("lock emp", responce) 
    
    
    return <>
        <Alert variant="success">
            <Alert.Heading>บันทึก</Alert.Heading>
                <p>ดำเนินการอัพเดจข้อมูลผู้ใช้งาน</p>                
        </Alert>            
        {  <meta http-equiv="refresh" content="3;url=/employees" /> }
        </>;
    // return (        
    //     <div id="adminEmp" className="container">
    //           <Navigate to="/employees" replace={true} />
    //     </div>                
    // );
}
export default LockEmployee;

