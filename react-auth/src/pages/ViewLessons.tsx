import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import JoLPlayer from "jol-player";
import { Editor } from "@tinymce/tinymce-react";


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

const ViewLessons =  ()=>{
    //const [getId, setMyId]: [URLSearchParams, Function] = useSearchParams();
    var { id }= useParams();
    //const  [lessonvdoList, setLessonVdoList] = useState<string[]>([]);
    const [lessonvdoList, setLessonVdoList] = useState<any[]>([])    
    //const [lessonvdoList, setLessonVdoList] = useState([]);

    const [getId, setId]            = useState([]);
    const [getHeader, setHeader]    = useState([]);
    const [getContent, setContent]  = useState([]);
    const [getUrl, setUrl]          = useState([]);
    

    useEffect( ()=>{
        const timeout = setTimeout(() => {  }, 2000);//จริงก็ยังไม่ค่อยเข้าใจ timeout ที่ต้องใส่เพราะ เวปโหลดหน้าเป็นพันต่อวิ
        //async ()=>{                        
           const  responce =  fetch("http://localhost:8080/api/view-lessons/", 
            {              
                method:'GET',            
                headers:{'Content-Type': 'application/json'},
                credentials:'include',
            })            
            .then((response)  =>  response.json())
            .then((data)=>{                
                //console.log(" Data responce", data[0]["lesson_id"])                console.log(" Data responce", data)                
                setLessonVdoList(data)
                console.log(" get Lessonvdo ", lessonvdoList)
            })      
       //}
       return () => clearTimeout(timeout);
    },[]);

    
    console.log("Count Lessonvdo length", lessonvdoList.length);
    console.log("Datas Lessonvdo ", lessonvdoList);
    console.log("Datas Datas", lessonvdoList[0]);
    const setStarPoint =(e: any)=>{
            console.log("Even", e);
    }


return(                
        <div 
         className="container "                 
         style={{marginBlockStart:0,marginLeft:80, }}>
                { 
                        lessonvdoList.length > 0 ?(                                
                            lessonvdoList.map((item, index) => {
                                var backLesson = "";var nextLesson = "";var linkVdo ="";
                                if(index == 0)    
                                    backLesson   ="/view-lessons/"+lessonvdoList[0].lesson_id;
                                else 
                                    backLesson   ="/view-lessons/"+lessonvdoList[index-1].lesson_id;
                                if(index == lessonvdoList.length-1) 
                                    nextLesson   = "/view-lessons/"+lessonvdoList[lessonvdoList.length-1].lesson_id;
                                else 
                                    nextLesson   = "/view-lessons/"+lessonvdoList[index+1].lesson_id;                                
                                
                                console.log(id, " =ID =", item.lesson_id, "xxx", item['header'])    
                                ///  LessnID lessson_id ดูดีๆๆ มันเปลี่ยนไปเปลี่นมา
                                if(id == "0") id = item.lesson_id; //id =  lessonvdoList[0].LessonID
                                    if(item.lesson_id == id ){
                                        var embedG;
                                        embedG = "https://docs.google.com/forms/d/e/"+item.embed_google+"/viewform?embedded=true"
                                        linkVdo = "http://localhost:3000/uploads/" + item.lesson_id + ".mp4"                                        
                                    return( 

                                        <div className="row col-sm-12">
                                            <div className="row col-sm-8" >
                                            <div className="col-sm-8 rounded-top" style={{backgroundColor:"#3B3B3B",color:"whitesmoke"}}>&nbsp;{item.header}</div>                                             
                                            <div className="border border-dark" style={{ height:777}} >
                                                        <div className="rows " style={{paddingTop:22,paddingLeft:20, color: "black", width:789}} > 
                                                            <div id="video-container" className="col-md" style={{backgroundColor:"gray", border: "1px solid black" , width:'77', height:"444"}}>
                                                                <JoLPlayer                                                                                    
                                                                        option={{                                                                                                                
                                                                            videoSrc:linkVdo,
                                                                            width: 765,
                                                                            height: 444,
                                                                        }}
                                                                    />  
                                                            </div>
                                                            <div className="col-md"><b> </b></div>
                                                            {/* <div className="col-md " style={{color: "gray",fontSize:12,}} ><b>{sanitizeHtml(item.content)}  </b></div>   */}
                                                            <div className="col-md " style={{color: "gray",fontSize:12,}} >
                                                            <Editor 
                                                                apiKey='qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc' 
                                                                initialValue={item.content}
                                                                init={{
                                                                    skin: "snow",icons: "thin",
                                                                    height: 300,
                                                                    menubar: false,
                                                                    plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview','anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen','insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],
                                                                    toolbar:"",
                                                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                                //toolbar:"undo redo | styleselect | fontsizeselect| code | bold italic | alignleft aligncenter alignright alignjustify | outdent indent "       //toolbar: 'undo redo | blocks | '+'bold italic forecolor | alignleft aligncenter ' +'alignright alignjustify | bullist numlist outdent indent | ' +'removeformat | help',// onInit={(evt, editor) => editorRef.current = editor}
                                                                }}
                                                                disabled={true} value={item.content} 
                                                            />
                                                                </div> 
                                                            
                                                        </div>   
                                                    </div>
                                                    <div  className="col-sm-6" style={{fontSize:18,color:"black", marginTop:2}}>
                                                            <span>ให้คะแนน </span>&nbsp;&nbsp;&nbsp;
                                                            <Icon.StarFill onAuxClick={setStarPoint}
                                                            name="star1" values="1" style={{"cursor":"pointer"}} title="1 คะแนน"/>
                                                            <Icon.StarFill name="star2" values="2" style={{cursor:"pointer"}} title="2 คะแนน"/>
                                                            <Icon.StarFill name="star3" values="3" style={{cursor:"pointer"}} title="3 คะแนน"/>
                                                            <Icon.StarFill name="star4" values="4" style={{cursor:"pointer"}} title="4 คะแนน"/>
                                                            <Icon.StarFill name="star5" values="5" style={{cursor:"pointer"}} title="5 คะแนน"/>
                                                        </div> 
                                                    <div className="col-md-12 clearfix text-center" style={{paddingTop:0, paddingLeft:5}}>
                                                        <Link to= {backLesson} className="btn btn-secondary btn-lg float-right fs-6" >ก่อนหน้า</Link> 
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <Link to= {nextLesson} className="btn btn-secondary btn-lg float-left fs-6" >ต่อไป</Link>
                                                    </div>                                            
                                            </div>
                                            <div className="col-sm-4"  style={{marginBlockStart:0,marginLeft:8}}>   
                                                <div className="col-sm-8 rounded-top" style={{backgroundColor:"#858585",color:"whitesmoke"}}>&nbsp;ส่วนของ ถามตอบ</div>                                                 
                                                <div style={{border: "1px solid #858585", color:"#858585", height:777, width:456}} >
                                                <iframe src= {embedG} width="444" height="777" frameBorder="0" >กำลังโหลด…</iframe>
                                                {/* <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSezra08VMfz8VzFhfsVdZKSH5i2E6cV9fD4VdV95jCWE5aV2A/viewform?embedded=true" width="444" height="777" frameBorder="0" >กำลังโหลด…</iframe> */}
                                                </div>
                                                <div className="col-md-12 clearfix text-center" style={{paddingTop:28, paddingLeft:5}}>
                                                        {/* <Link to= {""} className="btn btn-secondary btn-lg float-right fs-6" > บันทึก </Link>  */}
                                                
                                                </div>                                            
                                            </div>
                                            
                                        </div>
                                        
                                    )
                                    }
                            //}
                            })
                           ):(<div ><p>Loading  data .... </p></div>)                         
                }                        
        </div>        
    );
}
export default ViewLessons









 // for(let i = 0; i < lessonvdoList.length; i++){
                                //     var backLesson = "";var nextLesson = "";var linkVdo ="";
                                //     if(i == 0)    
                                //         backLesson   ="/view-lessons/"+lessonvdoList[0].lesson_id;
                                //     else 
                                //         backLesson   ="/view-lessons/"+lessonvdoList[i-1].lesson_id;
                                //     if(i == lessonvdoList.length-1)    
                                //         nextLesson   = "/view-lessons/"+lessonvdoList[lessonvdoList.length-1].lesson_id;
                                //     else 
                                //         nextLesson   = "/view-lessons/"+lessonvdoList[i+1].lesson_id;
                                //     console.log(id, " = For ID =", lessonvdoList[0].LessonID,  );

                                //     if(id == "0") 
                                //         id = lessonvdoList[0].lesson_id; 
                                //     /// KK อ่านสองแบบเลยขี้เกียจละ
// import { Text } from "@zeit-ui/react";
// import React, { FC } from "react";
// import styles from "./styles.module.css"
// import { AssetDocs } from "./types";
// import sanitizeHtml from "sanitize-html"


// export const DocContainer: FC<{docs: AssetDocs}> = ({docs}) => {

//   const createMarkup = () => {
//     if (docs.description)
//       return {__html: sanitizeHtml(docs.description)};
//   }

//   return (
//     <div className={styles.docContainer}>
//       <Text h2 style={{color:"#26ff91"}}>Docs</Text>
//       <div dangerouslySetInnerHTML={createMarkup()} />
//     </div>
//   );
// }
{/* {lessonvdoList.length > 0 ?(
                        lessonvdoList.map((item, index) => {
                            const editEmp   = "/edit-lesson/"+item.LessonID
                            const deleteEmp = "/delete-lesson/"+item.LessonIDH
                            const lockEmp   = "/lock-lesson/"+item.LessonID
                            const setAdmin  = "/view-lesson/"+item.LessonID
                            return (
                                <div className="row border-top border-gray"  key={index} >                                
                                    <div className="col-md-4">{item.Header.substring(0, 30)}</div>
                                    <div className="col-md-5">{item.content.substring(0,30)}</div>
                                    <div className="col-md-1">{item.status}</div>                                
                                    <div className="col-md-2 text-end" style={{color: "red"}} >
                                        <Link to= {lockEmp}     className="btn-dark fs-6" >Next</Link>&nbsp;
                                        <Link to= {editEmp}     className="btn-dark fs-6" >Back</Link>&nbsp;                                      
                                    </div>
                                </div>
                            )
                        })
                    ):(<div className='row'><p>Loading  data .... </p></div>)
                    }{JSON.stringify(empList)} */}

{/* <div className="col-md" style={{color: "gray",fontSize:12,}} ><b>{sanitizeHtml(item.content)}  </b></div>                      */}
