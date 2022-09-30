import React, { SyntheticEvent, useState , useEffect} from "react";
//import { Navigate } from "react-router-dom";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Alert } from 'react-bootstrap';



const Login = (props:{setName: (name: string) => void }) =>{
    const [email,       setEmail]      = useState('');    
    const [password,    setPassword]   = useState('');
    const [goPage,      setGopage]     = useState(false);
    

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
              
        if (content.message == "login"){            
            console.log("login  async",content, "Login IS:", content.name) 
            props.setName(content.name);///  เซตตอนนี้ไปก็ยังไม่เข้า เหมือนกับ ต้องสังให้ nav fetch //ต้องเซตเพื่อที่ไปทำหน้าต่อไป
            setGopage(true);
        }else if (content.message=="unlogin"){
            return <>
            <Alert variant="success">
                <Alert.Heading>ล็อคอินไม่ผ่าน</Alert.Heading>
                <p>อาจยังไม่ได้ลงทะเบียน</p>
                <p>รหัสผ่านอาจจะผิดพลาด</p>
                <hr />
                <p className="mb-0">สามารถ <a href="http://localhost:3000/login">คลิกแล้ว</a> Login ใช้งานได้เลยครับ</p>
            </Alert>       
            </>;
        }

    }

    if (goPage ){
        /// มันต้องมี redirect ระบบจะเข้าไปแต่ไม่ได้ไปเรียก Nav เลยไม่ได้ส่งค่า ชื่อ ที่เรียกจาก cookie
        console.log("login   goPage =",goPage)    
        //return <Navigate  to="/"/>;       
        //window.location.reload();
        // return<><Navigate  to="/"/></> ;
        return <>
        <Alert variant="success">
            <Alert.Heading>ทำการ Login </Alert.Heading>            
            <img src="uploads/emoji_thai_hi.png" height={88} width={88}></img>
            <p>ขอบคุณครับ</p>

        </Alert>            
        {  <meta http-equiv="refresh" content="3;url=/" /> }
        </>;
    }
    
    return (
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