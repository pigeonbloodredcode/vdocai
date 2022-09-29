import { SyntheticEvent, useState, useEffect } from 'react';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Alert } from 'react-bootstrap';



function Register  ()    {    
    const [name, setName]           = useState('');
    const [email, setEmail]         = useState('');
    const [city, setCity]           = useState('');
    const [password, setPassword]   = useState('');
    const [goPage, setRedirect]     = useState(false);
    
    // ต้องหาทางเซต เปิด cors ทางฝั่ง golang
    const submit = async  (e: SyntheticEvent) =>{
        e.preventDefault();        
       
       // console.log("ON", name, email, city, password);        
        //let  res  = await fetch("10.3.3.234/api/employee", {
        const  response  = fetch("http://localhost:8080/api/register", {    
            headers:{'Content-Type': 'application/json'},//headers:{'Content-Type': 'application/json'},              
            method:'Post',     
            body: JSON.stringify(
                {
                   "name":name,
                   "email":email,
                   "city":city,
                   "password":password
                }
            )
            //body: JSON.stringify({"name":"nuttakit2","email":"tum@rich.money2","city":"RichTown2","password":"pass2"})
        });
        const content = await (await response).json();       
       //can add employee susscess  to do set redirect to login page
       console.log("content.EmployeeID", content.EmployeeID);
       if(content.EmployeeID != 0){
            setRedirect(true);
       }
       console.log("setRedirect(ON)", content, content.name);
       
    };
    
    if (goPage ){        
        return <>
        <Alert variant="success">
            <Alert.Heading>ขอบคุณครับ</Alert.Heading>
                <p>ระบบสร้างผู้ใช้งาให้แล้วครับ</p>
                <hr />
                <p className="mb-0">สามารถ <a href="http://localhost:3000/login">คลิกแล้ว</a> Login ใช้งานได้เลยครับ</p>
        </Alert>       
        </>;
        //<Navigate  to="/login"/>
        
    }
    
    return (        
        <div className="container " style={{paddingTop:222,paddingLeft:22, color: "black", width:'44%', height:777}} >
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">ลงทะเบียน </h1>
                <input type="input" className="form-control"  placeholder="name" required  //value="nuttakit2"
                    onChange={e => setName(e.target.value)}
                /><br/>            
                <input type="email" className="form-control"  placeholder="name@example.com" required  //value="makerichtee@gmail.com2"
                    onChange={e => setEmail(e.target.value)}
                /><br/>
                <input type="input" className="form-control"  placeholder="city"required //value="RichTown2"
                    onChange={e => setCity(e.target.value)}
                /><br/>
                <input type="password" className="form-control"  placeholder="Password" required  //value="RichTUM2"
                    onChange={e => setPassword(e.target.value)}
                /><br/>
                <button className="w-100 btn btn-lg btn-outline-dark" type="submit">บันทึก</button>                    
            </form>            
        </div>
        
        
    );
}
export default Register;

































// import { render } from '@testing-library/react';
// import { SyntheticEvent, useState } from 'react';
// import React from 'react';




// function Register  ()    {    
//     const [name, setName]           = useState('');
//     const [email, setEmail]         = useState('');
//     const [city, setCity]           = useState('');
//     const [password, setPassword]   = useState('');
//     // ต้องหาทางเซต เปิด cors ทางฝั่ง golang
//     let submit = async (e: SyntheticEvent) =>{
//         e.preventDefault();
//         try{
//         let  res  = await fetch("http://localhost:8080/employees", {
//             method:'POST',
//             headers:{'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 name:name ,            
//                 email:email ,            
//                 city:city ,
//                 password:password ,
//             }),
//         });/*.then(response =>{
//             if (!response.ok) {
//                  throw new Error(response.statusText)
//             }
//             return response.json()
//         })*//*.catch(err=>{
//             console.log(err)
//         });*/
//          let resJson = await res.json();
//           if (res.status === 200) {
//             setName("");
//             setEmail("");
//             console.log("User created successfully");
//           } else {
//             console.log("Some error occured");
//           }

//         }catch (err) {
//          console.log(err);
//         }

//         //console.log({           name,            email,            password        })
//     }
    
//     return (        
//         <form onSubmit={submit}>
//             <h1 className="h3 mb-3 fw-normal">ลงทะเบียน </h1>
//             <input type="input" className="form-control"  placeholder="name" required  value="Tum"
//                 onChange={e => setName(e.target.value)}
//             />            
//             <input type="email" className="form-control"  placeholder="name@example.com" required  value="makerichtee@gmail.com"
//                 onChange={e => setEmail(e.target.value)}
//             />
//             <input type="input" className="form-control"  placeholder="city"required value="RichTown"
//                 onChange={e => setCity(e.target.value)}
//             />
//             <input type="password" className="form-control"  placeholder="Password" required  value="RichTUM"
//                 onChange={e => setPassword(e.target.value)}
//             />
            
//             <button className="w-100 btn btn-lg btn-primary" type="submit">บันทึก</button>
            
//         </form>
//     );
// }

// export default Register;








// const Register = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [city, setCity] = useState('');
//     const [password, setPassword] = useState('');

//     const submit = async (e: SyntheticEvent) =>{
//         e.preventDefault();

//         const responce  = await fetch("http://localhost:8080/employees", {
//             method:'POST',
//             headers:{'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 name,            
//                 email,            
//                 city,
//                 password ,
//             })
//         });

//         const content = await responce.json();
//         console.log(content); 
//         //console.log({           name,            email,            password        })
//     }
//     return (        
//         <form onSubmit={submit}>
//             <h1 className="h3 mb-3 fw-normal">ลงทะเบียน </h1>
//             <input type="input" className="form-control"  placeholder="name" required  value="Tum"
//                 onChange={e => setName(e.target.value)}
//             />            
//             <input type="email" className="form-control"  placeholder="name@example.com" required  value="makerichtee@gmail.com"
//                 onChange={e => setEmail(e.target.value)}
//             />
//             <input type="input" className="form-control"  placeholder="city"required value="RichTown"
//                 onChange={e => setCity(e.target.value)}
//             />
//             <input type="password" className="form-control"  placeholder="Password" required  value="RichTUM"
//                 onChange={e => setPassword(e.target.value)}
//             />
            
//             <button className="w-100 btn btn-lg btn-primary" type="submit">บันทึก</button>
            
//         </form>
//     );
// }

// export default Register;







//  onSubmit = event => {
//     event.preventDefault();
//     fetch("localhost:3000/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: this.state.email,
//         password: this.state.password
//       })
//     })
//       .then(res => {
//         console.log("response: ", res);
//       })
//       .catch(err => {
//         console.log("error:", err);
//       });
//   };



////แบบบเก่า 
// import React ,{ Component } from "react";
// class Register extends Component{
//     state = {
//         hasError:false,
//         users:{

//         }
//     }
//     componentDidMount(){
//         fetch('https://randomuser.me/api/')
//             .then(res => res.json())
//             .then(res => this.setState({ users: res}))
//             .catch(() => this.setState({ hasError: true}))
//     }

//     render(){
//         return <div>{JSON.stringify(this.state.users)}</div>
//     }
// }
// export default Register;


///แบบใหม่ 
//import React, {  useState, useEffect } from "react";

// import '../App.css';
// const Register = () =>{
//     const [hasError, setErrors] = useState(false)
//     const [users, setUsers] = useState({})
//     async  function fetchData(){
                
            
//     //  const res = await fetch('https://randomuser.me/api/');
//         const res = await fetch('http://localhost:8080/employees');
//         res 
            
//             .json()
//             .then(res => setUsers(res))
//             .catch(err => setErrors(err));
//     }
//     useEffect(() => {
        
//         fetchData();
//        })


//     return <div>
//         <span>{JSON.stringify(users)}</span>
//         <hr/>
//         <span> has Error {JSON.stringify(hasError)}</span>
//         </div>

// }

// export default Register;















// import React, { useState } from "react";

// function Register() {
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");

//   const onTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setTitle(e.target.value);
//   const onBodyChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setBody(e.target.value);

//   const handleSubmit = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();

//     const data = { title, body };
//     const requestOptions = {
//       method: "POST",
//       //mode: "cors",
//       headers: { 
//         //"Content-Type": "application/json"
//         "Content-Type": "text/plain"
//      },
//       body: JSON.stringify(data)
//     };
    
//     fetch("http://localhost:8080/employees", requestOptions)
//     //fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
//       .then(response => response.json())
//       .then(res => console.log(res));
//   };

//   return (
//       <div className="App">
//         <form>
//           <input  placeholder="Title" value={title}
//             onChange={onTitleChange} required />
//           <textarea placeholder="Body" value={body}
//             onChange={onBodyChange} required />
//           <button type="submit" onClick={handleSubmit}>
//            Create Post
//           </button>
//         </form>
//       </div>
//   );
// }

// export default Register;
