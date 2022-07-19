import React, { SyntheticEvent, useState } from "react";

import { Navigate } from "react-router-dom";

const Login = (props:{setName: (name: string) => void }) =>{
    const [email, setEmail]         = useState('');    
    const [password, setPassword]   = useState('');
    const [goPage, setRedirect]     = useState(false);

    const submit = async (e : SyntheticEvent) =>{
        e.preventDefault();
       const  response  =  fetch("http://localhost:8080/api/login", {
            method:'POST',            
            headers:{'Content-Type': 'application/json'},
            credentials:'include',
            body: JSON.stringify({              
                "email":email,
                "password":password,
            }),
        });        
        const content = await (await response).json();       
        console.log("login  async",content, "Login IS:", content.name)       
        if (content.message === "login"){
            props.setName(content.name);///  เซตตอนนี้ไปก็ยังไม่เข้า เหมือนกับ ต้องสังให้ nav fetch
        } 
        setRedirect(true);        
        
    }
    if (goPage ){
        /// มันต้องมี redirect ระบบจะเข้าไปแต่ไม่ได้ไปเรียก Nav เลยไม่ได้ส่งค่า ชื่อ ที่เรียกจาก cookie
        //console.log("login   goPage =",goPage)    
        //return <Navigate  to="/"/>;       
        //window.location.reload();
        return <Navigate  to="/"/>;
    }
    
    return(
        <div className="container" style={{paddingTop:222,paddingLeft:22, color: "black", width:'28%', height:777}}>
            <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">ยืนยันตัวเข้าระบบ</h1>
            
                <input type="email" className="form-control"  placeholder="name@example.com" //value="tum@rich.money "
                    onChange={e => setEmail(e.target.value)}
                /><br/>
                <input type="password" className="form-control"  placeholder="Password" //value="pass"
                    onChange={e => setPassword(e.target.value)}
                /><br />
            
            <button className="w-100 btn btn-lg btn-dark" type="submit">เข้าสู่ระบบ</button>
            
            </form>
        </div>
    );
}

export default Login;