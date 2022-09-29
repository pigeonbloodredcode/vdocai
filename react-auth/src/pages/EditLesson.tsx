import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { SyntheticEvent } from "react-draft-wysiwyg";
import { validateFileSize,  validateFileType } from "../service/fileValidatorServices";
import JoLPlayer from "jol-player";
import FileService from "../service/fileService";
import { Editor } from "@tinymce/tinymce-react";


function EditVdoLesson() {
      const [getHeader, setHeader]             = useState(String);
      const [getContent, setContent]           = useState(String);
      const [getSrcUrl, setSrcUrl]             = useState(String);
      const [getValue, setValue] = useState<string>('')
      const { id } = useParams();
  
      /// จริงๆควรตรวจ paramister ทุกตัวก่อนนำมาใช้งาน
      const url = "http://localhost:8080/api/edit-lesson/"+id;    
      const  responce = fetch( url, {                
          method:'GET',            
          headers:{'Content-Type': 'application/json'},
          credentials:'include',
      })
      .then( (response)  =>  response.json())
      .then((data)=>{
          console.log(" getEmployees responce", data)    
          setHeader(data.Header)
          setContent(data.content)          
          //setValue(data.content)          
          setSrcUrl("http://localhost:3000/uploads/" + data.LessonID + ".mp4")
               
          console.log("xxxLesson ", getHeader, getContent, getSrcUrl)    
      });   
         
      const [uploadFormError, setUploadFormError] = useState<string>('')
      const handleLessonCreate =  async (element: HTMLInputElement) => {    //console.log(element)
        const file = element.files       
        if (file === null )      return 
        else console.log("file != null: ", file)
        const validFileSize = await validateFileSize(file[0].size)
        const validFileType = await validateFileType(FileService.getFileExtension(file[0].name))
        if (!validFileSize.isValid){setUploadFormError(validFileSize.errorMessage);}
        if(!validFileType.isValid){setUploadFormError(validFileType.errorMessage);  }
        if(uploadFormError && validFileSize.isValid){setUploadFormError('');}
  }    

 

  return  (
    <div className="container">  
    <form 
      action="http://localhost:8080/api/update-lesson"
      encType="multipart/form-data"
      method="Post"
      > 
      <input type="hidden" name="id" value={id}></input>
      <h6>สร้างบทเนื้อหาบทเรียน</h6>

      <div className="mb-3">
        <label htmlFor="header" className="form-label">ชื่อเรื่อง</label>
        <input className="form-control" type="input"  id="header" name="header" placeholder={getHeader} defaultValue={getHeader} />
      </div>
      <div className="mb-3">          
        <label htmlFor="content" className="form-label">เนื้อหา</label>
        {/* <textarea  className="form-control" id="content" name="content" ></textarea> */}        
        <input type="hidden" id="setContent" name="setContent" value={getValue} defaultValue={getContent}/>   
        <Editor id="content" 
        apiKey='qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc' initialValue={getContent}
        init={{          
          skin: "snow",icons: "thin",
          height: 500,
          menubar: false,
          plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview','anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen','insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],
          toolbar:"undo redo | styleselect | fontsizeselect| code | bold italic forecolor | alignleft aligncenter alignright alignjustify | outdent indent ",            
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          //toolbar:"undo redo | styleselect | fontsizeselect| code | bold italic | alignleft aligncenter alignright alignjustify | outdent indent "       //toolbar: 'undo redo | blocks | '+'bold italic forecolor | alignleft aligncenter ' +'alignright alignjustify | bullist numlist outdent indent | ' +'removeformat | help',// onInit={(evt, editor) => editorRef.current = editor}
        }}
          value={getValue}                    
          onEditorChange={ (content: any, editor: any)=>{
              const set_Content = document.getElementById('setContent') as HTMLDivElement | null;              
              setValue(content);console.log(content);              
            }
          }
        />      
      </div> 
      <div className="col-md-12" style={{ height:200}}>
          <input style={{color:"green",width:444, float:"left" ,backgroundColor:"silver" }} className="col-md-8"
            name ="formData"  multiple={false}    type="file"         
            onChange={(e: SyntheticEvent) => handleLessonCreate(e.currentTarget as HTMLInputElement)}
            />{ uploadFormError  && <div>{uploadFormError}</div> }

          <div style={{backgroundColor:"gray",width:111, height:111,marginLeft:11,float:"left" }}>
            <JoLPlayer   option={{ videoSrc:getSrcUrl, width: 111,height: 111,}} />      </div>            
          <button className="btn btn-lg btn-dark" style={{color:"green",width:155, height:155,marginLeft:200,float:"left" }} type="submit">บันทึก</button>
      </div>
     </form>     
     
     </div>
   )
  
}

export default EditVdoLesson;


