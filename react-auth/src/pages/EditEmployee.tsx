import {  useState } from 'react';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';

var SaveFinish = false;
   
function EditEmployee(){    
    /// const let คือ อยู่ภายใต้ block    
    var [nameGet, setGetName]             = useState(String);
    var [emailGet, setGetEmail]           = useState(String);
    var [cityGet, setGetCity]             = useState(String);
    var [passwordGet, setGetPassword]     = useState(String);

    
    var { id } = useParams();

    ///get by data
    const url = "http://localhost:8080/api/edit-employee/"+id;    
    const  responce = fetch( url, {                
        method:'GET',            
        headers:{'Content-Type': 'application/json'},
        credentials:'include',
    })
    .then( (response)  =>  response.json())
    .then((data)=>{
        console.log(" getEmployees responce", data)    
        setGetName(data.name)
        setGetEmail(data.email)
        setGetCity(data.city)
             
        console.log("xxxGet ", nameGet, emailGet, cityGet)    
    });   

    


    function assertIsFormFieldElement(element: Element): asserts element is HTMLInputElement | HTMLSelectElement | HTMLButtonElement {
    // Customize this list as necessary −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        if (!("value" in element)) {
            throw new Error(`Element is not a form field element`);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const navigate = useNavigate();
        
        const nameField = event.currentTarget[0]; //First Name Last Name
        assertIsFormFieldElement(nameField);
        //setGetName(nameField.value) //ฟังชันพวกนี้ไม่เคยสมมาตรเลย สั่งแล้วไม่ทำงาน  ไม่รู้ว่าต้อง ใช้ const  หรือ  let

        const emailField = event.currentTarget[1]; //Email
        assertIsFormFieldElement(emailField);

        const cityField = event.currentTarget[2]; //City
        assertIsFormFieldElement(cityField);

        const passwordField = event.currentTarget[3]; //Password
        assertIsFormFieldElement(passwordField);

        // console.log("when send Field", nameField.value, emailField.value, email, city,password);
        // console.log("when send value", id, nameGet, emailGet, cityGet,passwordGet);
       
        const  response  = fetch("http://localhost:8080/api/update-employee", {    
                headers:{'Content-Type': 'application/json'},                
                method: 'PUT',                               
                body: JSON.stringify(
                    {
                    "id":id,
                    "name": nameField.value,
                    "email":emailField.value,
                    "city":cityField.value,
                    "password":passwordField.value
                    }
                )                    
        }).then(responce =>{            
            
            if(!responce.ok){                
                //throw new Error(response.statusText)
            }else{
            }
            console.log("res", responce)
        })
                        
    };
  
    return (        

        <div id="editEmp" className="container">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">แก้ไขผู้ใช้งาน </h1>
                <input type="input" className="form-control" id="name"  placeholder="name"   
                    defaultValue={nameGet}//onChange={e => setGetName(e.target.value) }
                    //onChange={handleChange}
                /><br/>            
                <input type="email" className="form-control" id="email" placeholder="name@example.com"                       
                    defaultValue={emailGet}//onChange={e => setGetEmail(e.target.value)}
                    //onChange={handleChange}
                /><br/>
                <input type="input" className="form-control" id="city" placeholder="city"                  
                    defaultValue={cityGet}//onChange={e => setGetCity(e.target.value)}
                    //onChange={handleChange}
                /><br/>
                <input type="password" className="form-control" id="password" placeholder="Password" />
                <br/><br/>
                <button className="w-100 btn btn-lg  btn-outline-dark " type="submit">บันทึก</button>                
            </form>
            
        </div>
    );
}
export default EditEmployee;













function useNavigate() {
    throw new Error('Function not implemented.');
}
// //import { render } from '@testing-library/react';
// import { SyntheticEvent, useState } from 'react';
// import React from 'react';
// import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
// //import {useDispatch} from 'react-redux';


// function EditEmployee()    {    
//     const [name, setName]           = useState(String);
//     const [email, setEmail]         = useState(String);
//     const [city, setCity]           = useState(String);
//     const [password, setPassword]   = useState(String);
    
    
    
//     let { id } = useParams();
//     const url = "http://localhost:8080/api/edit-employee/"+id
//     console.log("url ", url)
//     const  responce = fetch( url, {                
//         method:'GET',            
//         headers:{'Content-Type': 'application/json'},
//         credentials:'include',
//     })
//     .then( (response)  =>  response.json())
//     .then((data)=>{
//         console.log(" getEmployees responce", data)    
//         setName(data.name)
//         setEmail(data.email)
//         setCity(data.city)
                
//     });         



//     const defaultFormData = {
//         title: "",
//         //body:"",
//     }
//     const[formData, setFormData] = useState(defaultFormData)
//     const{ 
//         title,
//     //    body 
//     } = formData;
//     const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData((prevState) =>({
//             ...prevState,
//             [e.target.id]: e.target.value,
//         }));
//     };
//     const onSubmit = (e :React.FormEvent<HTMLFormElement>) =>{
//         e.preventDefault();        
//         console.log(formData)
//         setFormData(defaultFormData)
//     }
               
        
//     const submit = async  (e: SyntheticEvent) =>{
//         e.preventDefault();        
                   
//     };
    
//     return (        
//         <div>

//             <div className="container">
//             <form onSubmit={onSubmit} >
//                 <input
                
//                 type="text" 
//                 id ="title"               
//                 value={title}
//                 onChange={onChange}                        
//                 />
           
//                 <button type="submit" className="btn">Submit</button>
//             </form>
//             </div>

//         <form onSubmit={submit}>
//             <h1 className="h3 mb-3 fw-normal">ลงทะเบียน </h1>
//             <input type="input" className="form-control" id="name"  placeholder="name"   
//                 value={name}
//                 // onChange={e => alert(e.target.id)}
//             />            
//             <input type="email" className="form-control" id="email" placeholder="name@example.com"   
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//             />
//             <input type="input" className="form-control" id="city" placeholder="city"  
//                 value={city}
//                 onChange={e => setCity(e.target.value)}
//             />
//             <input type="password" className="form-control" id="password" placeholder="Password"  
//                 onChange={e => setPassword(e.target.value)}
//             />
//             <button className="w-100 btn btn-lg btn-primary" type="submit">บันทึก</button>



                
//         </form>
//         </div>
//     );
// }
// export default EditEmployee;


// import { render } from '@testing-library/react';
// import { SyntheticEvent, useState } from 'react';
// import React from 'react';
// import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
// //import {useDispatch} from 'react-redux';


// function EditEmployee()    {    
    
//     const [nameGet, setName]           = useState(String);
//     const [emailGet, setEmail]         = useState(String);
//     const [cityGet, setCity]           = useState(String);
//     const [password, setPassword]   = useState(String);
    
    
    
//     let { id } = useParams();
//     const url = "http://localhost:8080/api/edit-employee/"+id
//     console.log("url ", url)
//     const  responce = fetch( url, {                
//         method:'GET',            
//         headers:{'Content-Type': 'application/json'},
//         credentials:'include',
//     })
//     .then( (response)  =>  response.json())
//     .then((data)=>{
//         console.log(" getEmployees responce", data)    
//         setName(data.name)
//         setEmail(data.email)
//         setCity(data.city)
                
//     });         


// ///////////////////////////////////////////////  โย้ว
//     const defaultFormData = {
//         name: nameGet,//const [nameGet, setName]           = useState(String);
//         email:emailGet,
//         city:cityGet
//     }
//     const[formData, setFormData] = useState(defaultFormData)
//     const{ 
//         name,
//         email,
//         city,

//     } = formData;
//     const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData((prevState) =>({
//             ...prevState,
//             [e.target.id]: e.target.value,
//         }));
//     };
//     const onSubmit = (e :React.FormEvent<HTMLFormElement>) =>{
//         e.preventDefault();        
//         console.log(formData)
//         setFormData(defaultFormData)
//     }
               
        
//     const submit = async  (e: SyntheticEvent) =>{
//         e.preventDefault();        
                   
//     };
    
//     return (        
//         <div>

//             <div className="container">
                
//             <form onSubmit={onSubmit} >
//                 <input
//                 type="text" id ="title" value={name}
//                 onChange={onChange}                        
//                 />
           
//                 <button type="submit" className="btn">Submit</button>
//             </form>
//             </div>

//         <form onSubmit={submit}>
//             <h1 className="h3 mb-3 fw-normal">ลงทะเบียน </h1>
//             <input type="input" className="form-control" id="name"  placeholder="name"   
//                 value={name}
//                 // onChange={e => alert(e.target.id)}
//             />            
//             <input type="email" className="form-control" id="email" placeholder="name@example.com"   
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//             />
//             <input type="input" className="form-control" id="city" placeholder="city"  
//                 value={city}
//                 onChange={e => setCity(e.target.value)}
//             />
//             <input type="password" className="form-control" id="password" placeholder="Password"  
//                 onChange={e => setPassword(e.target.value)}
//             />
//             <button className="w-100 btn btn-lg btn-primary" type="submit">บันทึก</button>



                
//         </form>
//         </div>
//     );
// }
// export default EditEmployee;











// //import { render } from '@testing-library/react';
// import { SyntheticEvent, useState } from 'react';
// import React from 'react';
// import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
// import { ModuleReference } from 'typescript';
// //import {useDispatch} from 'react-redux';

   
// function EditEmployee()    {    
        
    
//     const [nameGet, setGetName]           = useState(String);
//     const [emailGet, setGetEmail]         = useState(String);
//     const [cityGet, setGetCity]           = useState(String);
//     const [passwordGet, setGetPassword]   = useState(String);

//     const [name, setName]           = useState(String);
//     const [email, setEmail]         = useState(String);
//     const [city, setCity]           = useState(String);
//     const [password, setPassword]   = useState(String);
//     let { id } = useParams();

//     ///get by data
//     const url = "http://localhost:8080/api/edit-employee/"+id;    
//     const  responce = fetch( url, {                
//         method:'GET',            
//         headers:{'Content-Type': 'application/json'},
//         credentials:'include',
//     })
//     .then( (response)  =>  response.json())
//     .then((data)=>{
//        // console.log(" getEmployees responce", data)    
//         setGetName(data.name)
//         setGetEmail(data.email)
//         setGetCity(data.city)
             
                
//     });   

    


//     const [formData, setFormData] = useState({nameGet: "", emailGet: "", cityGet: "", passwordGet: ""})
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
//         //setFormData({...formData, [e.target.name]: e.target.value})
//         //console.log(  "ชินจัง", idGet, nameGet, emailGet, cityGet,passwordGet, "Value ===", e.target.value)   
//         if(e.target.id === "name"){
//             //setName(e.target.value)
//         }   
//         if(e.target.id === "email"){
//             //setEmail(e.target.value)        
//         }  
//         if(e.target.id === "city"){
//             //setCity(e.target.value)
//         }   

//       // console.log("name:", name, "email:", email, "city:",e.target.innerHTML)
//     }

  
//     function assertIsFormFieldElement(element: Element): asserts element is HTMLInputElement | HTMLSelectElement | HTMLButtonElement {
//     // Customize this list as necessary −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//         if (!("value" in element)) {
//             throw new Error(`Element is not a form field element`);
//         }
//     }
//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
//         event.preventDefault();
//         const firstField = event.currentTarget[0];
//         assertIsFormFieldElement(firstField);

//         const secordField = event.currentTarget[1];
//         assertIsFormFieldElement(secordField);
//         console.log("Field", firstField.value, secordField.value);
//     };


//     ///update
//     const submit = async  (e: SyntheticEvent) =>{
//         e.preventDefault();        
//         const  response  = fetch("http://localhost:8080/api/update-employee", {    
//                 headers:{'Content-Type': 'application/json'},                
//                 method: 'PUT',
                               
//                 body: JSON.stringify(
//                     {
//                     "id":id,
//                     "name": name,
//                     "email":email,
//                     "city":city,
//                     "password":password
//                     }
//                 )
                    
//         });
//         console.log("when send ", id, name, email, city,password);

//     };

    
    
    
//     return (        

//         <div id="editEmp" className="container">             
            
//             <form onSubmit={handleSubmit}>
//                 <h1 className="h3 mb-3 fw-normal">แก้ไขผู้ใช้งาน </h1>
//                 <input type="input" className="form-control" id="name"  placeholder="name"   
//                     defaultValue={nameGet}//onChange={e => setGetName(e.target.value) }
//                     //onChange={handleChange}
//                 />            
//                 <input type="email" className="form-control" id="email" placeholder="name@example.com"                       
//                     defaultValue={emailGet}//onChange={e => setGetEmail(e.target.value)}
//                     //onChange={handleChange}
//                 />
//                 <input type="input" className="form-control" id="city" placeholder="city"                  
//                     defaultValue={cityGet}//onChange={e => setGetCity(e.target.value)}
//                     //onChange={handleChange}
//                 />
//                 <input type="password" className="form-control" id="password" placeholder="Password"                    
//                     onChange={handleChange}
//                 />
//                 <button className="w-100 btn btn-lg btn-primary" type="submit">บันทึก</button>
                
//             </form>
//         </div>
//     );
// }
// export default EditEmployee;





















