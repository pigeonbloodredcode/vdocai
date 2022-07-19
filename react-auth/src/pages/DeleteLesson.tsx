import React , { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
// ปัญหาคือ สั่งเรียกครั้งเดียว แต่มันเรียกตั้งหลายรอบ
function DeleteLesson(){    
    const [getData, setData] = useState("")    
    var { id } = useParams();    
    const url = "http://localhost:8080/api/delete-lesson/"+id;    
    const  responce = fetch( url, {                
        method:'Delete',            
        headers:{'Content-Type': 'application/json'},
        credentials:'include',
    })
    .then( (response)  =>  response.json())
    .then((data)=>{
        setData(data.message);
        console.log("data", data ,"data.",data.message)              
    });   
    

    return (        

        <div id="editEmp" className="container">             
            {getData == "deletelesson"?"ลบข้อมูลบทเรียนแล้ว":"ข้อมูลบทเรียนมีปัญหาทางการลบ" }
            {  <meta http-equiv="refresh" content="0;url=/lessons" /> }
            {/* <Navigate to="/lessons" replace={true} />*/}
        </div>
        
    );
}
export default DeleteLesson;

