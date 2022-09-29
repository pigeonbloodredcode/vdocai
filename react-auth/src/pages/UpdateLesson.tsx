import React, { useContext, useEffect, useState } from "react";
import { Alert } from 'react-bootstrap';

function UpdateVdoLesson() {
  console.log("UpdateVdoLesson") ;
  return <>
   <Alert variant="success">
       <Alert.Heading>บันทึก</Alert.Heading>
           <p>ดำเนินการอัพเดจข้อมูลบทเรียน</p>                
   </Alert>            
   {  <meta http-equiv="refresh" content="3;url=/lesson" /> }
  </>;
  
}

export default UpdateVdoLesson;


