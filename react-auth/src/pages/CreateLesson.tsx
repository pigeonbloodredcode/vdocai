import React, { useContext, useEffect, useState,useRef } from "react";
import { SyntheticEvent } from "react-draft-wysiwyg";

import { validateFileSize,  validateFileType } from "../service/fileValidatorServices";
import FileService from "../service/fileService";
import { Editor } from "@tinymce/tinymce-react";



// import fs from 'fs';
// import FormData from 'form-data';
import axios from 'axios';import cors from 'cors';
import DocumentFileSizeValidator from "../validators/DocumentFileSizeValidator";

function CreateVdoLesson() {
  
  const [uploadFormError, setUploadFormError] = useState<string>('')
  const [getValue, setValue] = useState<string>('')
  const handleLessonCreate =  async (element: HTMLInputElement) => {    //console.log(element)
    const file = element.files       
    if (file === null )      return 
    else console.log("file != null: ", file)
    const validFileSize = await validateFileSize(file[0].size)
    const validFileType = await validateFileType(FileService.getFileExtension(file[0].name))
    if (!validFileSize.isValid){
      setUploadFormError(validFileSize.errorMessage)
    }
    if(!validFileType.isValid){
      setUploadFormError(validFileType.errorMessage)  
    }
    if(uploadFormError && validFileSize.isValid){
      setUploadFormError('')
    }
    // const fileService = new FileService(file[0])
    // fileService.uploadFile()    
  }    

  const handleEditorChange = (content: any, editor: any) => {
    console.log("Content was updated:", content);
  };

 
  

  return  (
    <div className="container">  
    <form action="http://localhost:8080/api/create-lesson"
      encType="multipart/form-data"
      method="POST"
    > 
      <h6>สร้างบทเนื้อหาบทเรียน</h6>

      <div className="mb-3">
        <label htmlFor="header" className="form-label">ชื่อเรื่อง</label>
        <input   type="input"  className="form-control" id="header" name="header" placeholder=""/>
      </div>
      <div className="mb-3">
        <label htmlFor="quiz" className="form-label">embed google</label>
        <input   type="input"  className="form-control" id="embedG" name="embedG" placeholder="1FAIpQLSezra08VMfz8VzFhfsVdZKSH5i2E6cV9fD4VdV95jCWE5aV2A" value="1FAIpQLSezra08VMfz8VzFhfsVdZKSH5i2E6cV9fD4VdV95jCWE5aV2A"/>
      </div>
      <div className="mb-3">          
        <label htmlFor="content" className="form-label">เนื้อหา</label>
        {/* <textarea  className="form-control" id="content" name="content" ></textarea> */}        
        <input type="hidden" id="setContent" name="setContent" value={getValue}/>   
        <Editor id="content" 
        apiKey='qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc' initialValue=""
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
          onInit={(evt, editor) => {  handleEditorChange  }}
          onEditorChange={ (content: any, editor: any)=>{
              const set_Content = document.getElementById('setContent') as HTMLDivElement | null;              
              setValue(content);console.log(content);//alert(set_Content.set)
              
            }
          }
        />      
      </div> 
      
      <input 
        name ="formData"  multiple={false}    type="file"         
        onChange={(e: SyntheticEvent) => handleLessonCreate(e.currentTarget as HTMLInputElement)}
        />
        {
          uploadFormError  &&
          <div>{uploadFormError}</div>
        }
        <br/><br/>

      <button className="w-100 btn btn-lg btn-dark"  type="submit">บันทึก</button> <br/><br/>
      
     </form>
     
     
     </div>
   )
  
}

export default CreateVdoLesson;











































































































//  <div className="mb-3">
//         <label htmlFor="content" className="form-label">เนื้อหา</label>
//         {/* <textarea  className="form-control" id="content" name="content" ></textarea> */}
//         <Editor id="content" tagName="content"
//         apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
//         // initialValue="<p>This is the initial content of the editor</p>"
//         init={{
//           skin: "snow",
//           icons: "thin",
//           placeholder: "Ask a question or post an update...",

//           height: 200,
//           menubar: true,
//           plugins: [
//             "advlist autolink lists link image charmap print preview anchor",
//             "searchreplace visualblocks code fullscreen textcolor ",
//             "insertdatetime media table paste code help wordcount"
//           ],
//           textcolor_rows: "4",

//           toolbar:
//             "undo redo | styleselect | fontsizeselect| code | bold italic | alignleft aligncenter alignright alignjustify | outdent indent "
//         }}
//         onEditorChange={handleEditorChange}
//         //outputFormat="html"
//         // toolbar="code"
//       />
//       </div> 
      
//accept="image/*" //style={{ display:"none"}}//onChange={handleFileChange}//onChange={handleFileSelect2 }//onMouseOver={uploadFile}             
//</form><form onSubmit={ handleSubmit  }> 
//<form action="http://localhost:8080/api/create-vdo-lesson" method="post" encType="multipart/form-data">

// const [fileSelected, setFileSelected] = React.useState<File>() 
// const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
//     const fileList = e.target.files;
//     if (!fileList) return;    
//     setFileSelected(fileList[0]);
// };
// const formData = new FormData(); 

// const uploadFile = async function(e: React.MouseEvent<HTMLSpanElement, MouseEvent>){
//   if(fileSelected){
//     formData.append("vdo",fileSelected , fileSelected.name) 
    
    
//     console.log("fileSelected ===", fileSelected)
//     console.log("formData ===", formData)
//     console.log("getAll===", formData.getAll("vdo"))
//   }else{
//     console.log("Error fileSelected ===", fileSelected)
//   }
//   // const requestHeaders: HeadersInit = new Headers();  
//   // const uploadResponse = await fetch('http://localhost:8080/api/create-vdo-lesson', {      
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'multipart/form-data',
//   //     },
//   //     body: fileSelected,   
//   // });
//   const response = await axios({
//     method: "POST",
//     url: "http://localhost:8080/api/create-vdo-lesson",
//     data: formData,
//     headers: { "Content-Type": "multipart/form-data" },
//   });
// }




  // const [file, setFile] =  React.useState<File>()
  // const handleFileSelect = (event: any) => {    
  //   setFile(event.currentTarget.files[0]) //selectedFile = event.currentTarget.files;     //setSelectedFile(event.target.files[0])    //event.currentTarget.files
  //   console.log("Onchang set selectedFile: ", event.currentTarget.files)
  //   console.log( "file=>", file)    
  // }  
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {    
  //   e.preventDefault()
  //   const url = 'http://localhost:8080/api/create-vdo-lesson'
  //   const formData = new FormData();    
  //   formData.append("file", file); 
  //   formData.append("fileName", file.name);       //formData.append("selectedFile", document.querySelector('#file-input').files[0]);    //    var options = { content: formData };
  //   console.log("Set  formData = ", formData)
  //   const response =  axios({        
  //       method: "POST",        
  //       url: url,
  //       data: formData,             
  //       headers:{ 
  //                 "Content-Type": "multipart/form-data"  ,          
  //                 //"Origin":"*",
  //                 //"Origin":"Content-Type,Accept",
  //                 //"Content-Range":"8325"//มันบอกว่า Error by header
  //                 //"Enctype":"Multipart/form-data"
  //               },    		

  //   }).then(function (response) {
  //       //handle success
  //       console.log("HSucc", response);
  //   }).catch(function (response) {
  //       //handle error
  //       console.log("Herr",response);
  //   });


  //     console.log("fromData", formData)
  //     console.log("res", response)
   
  // } 

  // const uploadFile = (e:  React.MouseEvent<HTMLSpanElement, MouseEvent>) => {    
  //   if (fileSelected2){
  //     var formData = new FormData();
  //     var url= "http://localhost:8080/api/create-vdo-lesson";
  //     formData.append("image", fileSelected2, fileSelected2.name)
  //     console.log("fileSelected2.name", fileSelected2.name);
  //     console.log("fileSelected2", fileSelected2);
  //     console.log("formData", formData);      
      
  //     const response =  axios({        
  //       method: "post",        
  //       url: "http://localhost:8080/api/create-vdo-lesson",
  //       data: formData,             
  //       headers:{ "Content-Type": "multipart/form-data" },
  //       timeout:120000,
  //     }).then(function (response) {
  //       //handle success
  //       console.log("HSucc", response);
  //     })
  //     .catch(function (response) {
  //       //handle error
  //       console.log("Herr",response);
  //     });

  //   }else{
  //     console.log("fileSelect2 == nil",fileSelected2);
  //   }

  // }  
