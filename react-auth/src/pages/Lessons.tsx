import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useInterval } from 'usehooks-ts'
import * as Icon from 'react-bootstrap-icons';

// type getLessVdo = {
// 		LessonID :string, 
// 		Header   :string, 
// 		Content  :string, 
// 		Title    :string, 
// 		Src_dir  :string, 
// 		Director :string, 
// 		Status   :string, 
// };
/* หา count ทั้งหมด กำหนด limit ใช่loop สร้าง ตัว เริ่มต้น และ สิ้นสุด limit  */
const Lessons = ()=>{
    var [lessonvdoList, setLessonVdoList] = useState<any[]>([])
    useEffect( ()=>{
        //const timeout = setTimeout(() => {  }, 2000);//จริงก็ยังไม่ค่อยเข้าใจ timeout ที่ต้องใส่เพราะ เวปโหลดหน้าเป็นพันต่อวิ
        //async ()=>{
            const  responce =  fetch("http://localhost:8080/api/lessons", 
            {              
                method:'GET',            
                headers:{'Content-Type': 'application/json'},//credentials:'include',
            })            
            .then((response)  =>  response.json())
            .then((data)=>{
                console.log(" getLesson responce", data)
                setLessonVdoList(data)          
            })      
       //}
       //return () => clearTimeout(timeout);
    },[]);
    console.log("LessonvdoListlength", lessonvdoList.length)
    
 

      


 return(        
        <>      
            

                <div className="container"><i>รายวิชา</i>
                    <div className="row" >
                        <div className="col-md-4"><b>หัวเรื่อง</b></div>
                        <div className="col-md-5"><b>เนื้อเรื่อง</b></div>
                        <div className="col-md-1"><b>สถานะ</b></div>
                        <div className="col-md-2 " ><b>คำสั่ง</b></div>                        
                    </div>
                    
                    {lessonvdoList.length > 0 ?(
                        lessonvdoList.map((item, index) => {
                            const editEmp   = "/edit-lesson/"+item.LessonID
                            const deleteEmp = "/delete-lesson/"+item.LessonID
                            const lockEmp   = "/lock-lesson/"+item.LessonID
                            const setAdmin  = "/view-lesson/"+item.LessonID
                         

                            return (

                                <div className="row border-top border-gray"  key={index} >                                
                                    <div className="col-md-4">{item.Header.substring(0, 30)}</div>
                                    {/* <div dangerouslySetInnerHTML={{ __html: item.content.substring(0,30) }}></div> */}
                                    <div className="col-md-5">{item.content.substring(0,30)}</div>
                                    <div className="col-md-1">{item.status}</div>                                
                                    <div className="col-md-2 text-end" style={{color: "red"}} >
                                        <Link to= {lockEmp}     className="btn-dark fs-6" >Lock</Link>&nbsp;
                                        <Link to= {editEmp}     className="btn-dark fs-6" >Edit</Link>&nbsp;
                                        <Link to= {deleteEmp}   className="btn-dark fs-6" >Delete</Link>&nbsp;                                         
                                        <Link to= {setAdmin}    className="btn-dark fs-6" ><Icon.Vimeo />iew</Link>&nbsp; 
                                    </div>
                                </div>
                            )
                        })
                    ):(<div className='row'><p>Loading  data .... </p></div>)}{/* {JSON.stringify(empList)}*/}
 
                </div>
        </>
    );
}

export default Lessons


