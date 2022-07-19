import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import JoLPlayer from "jol-player";




function ViewLesson()    {        
    const [vlList, setViewLesson] = useState<any[]>([])    

    let [getId, setId]                     = useState(String);
    let [getHeader, setHeader]             = useState(String);
    let [getContent, setContent]           = useState(String);
    let [getVdo, setVdo]                   = useState(String);
    let [linkVdo, setLinkVdo]              = useState(String);
    

    let { id } = useParams();
     useEffect( ()=>{
        const timeout = setTimeout(() => { }, 2000);
        (
            async ()=>{
            const  responce =  fetch("http://localhost:8080/api/view-lesson/"+id, {                
                method:'GET', headers:{'Content-Type': 'application/json'}, credentials:'include',
            }).then( (response)  =>  response.json())
            .then((data)=>{
               setViewLesson(data)

               
               setId(data.lesson_id) 
               setHeader(data.header) 
               setContent(data.content)
               setVdo(data.src_dir)
               setLinkVdo("http://localhost:3000/uploads/"+data.lesson_id+".mp4")

               
               
              console.log(" getview lesson responce", data)          
            });      
            }  
        )(/*Loading*/ );               
            return () => clearTimeout(timeout);
     },[]);
    
             
    return(        
        <>  
                <div className="container ">                                      
                  {/* ไอดี{getId} บทเรียน {linkVdo} https://dtmoodle.mahidol.ac.th/4.mp4  https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4 */}

                    <div className="row" >
                        <div className="col-md-8" style={{color:"gray"}} ></div>                        
                        <div className="col-md-4" style={{color:"gray"}}></div>
                    </div>
                    <div className="row shadow-lg" >
                        <div className="col-md-8" style={{ height:500}} >
                            <div style={{color:"orange",backgroundColor:"#F8F0F0"}}>
                            หัวเรื่อง {getHeader}  
                            </div>
                            <div style={{color:"red",backgroundColor:"#D5D5D5"}}>
                            เนื้อหา {getContent}
                            </div>                            
                        </div>
                        <div className="col-md-4" style={{color:"green",paddingBlockEnd:5}}>
                        <>
                            <JoLPlayer
                                option={{                                    
                                videoSrc:linkVdo,
                                width: 350,
                                height: 220,
                                }}
                            />                        
                        </>
                        <br></br>
                        </div>
                    </div>
                    
                    
                    
                    
                </div>
            
        </>
    );
}
export default ViewLesson;





