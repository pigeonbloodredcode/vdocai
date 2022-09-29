import React, { useContext, useEffect, useState,useRef } from "react";
import { Alert } from "react-bootstrap";

function AddVdoLesson() {
  console.log("UpdateVdoLesson") ;
  return <>
   <Alert variant="success">
       <Alert.Heading>บันทึก</Alert.Heading>
           <p>ดำเนินการเพิ่มข้อมูลบทเรียน</p>                
   </Alert>            
   {  <meta http-equiv="refresh" content="3;url=/lesson" /> }
  </>;
  
}

export default AddVdoLesson;











































































































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
