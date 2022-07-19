import React from 'react';
import { Link } from 'react-router-dom';
/// ถ้าทำนาฟิกาถอยหลังให้ refresh

// import * from  'utf8';
// const utf8 = require('utf8');
// utf8.encode(string)

const Nav = (props:{ name: string ,setName:(name: string) => void 
    ,isAdmin:boolean, setIsAdmin:(isAdmin: boolean) =>void
    ,isLogin:boolean, setIsLogin:(isAdmin: boolean) =>void}) => {
    let menu;
    //let isLogin = false;

    const refreshPage = ()=>{
        window.location.reload();  
    }
    


    ///LOGOUT
    const logout = async () => {
        //const  response  =   await fetch(urlBackEnd+ "/api/logout", {
        const  response  =   await fetch("http://localhost:8080/api/logout", {            
            method:'GET',            
            headers:{'Content-Type': 'application/json'},
            credentials:'include',
        });

        const content = await (await response).json();       
        props.setName("");            
    }


   

    
    //if(props.name === ""){//// === จะเปรียบเทียบทั้งตัวชนิดข้อมูล และ ข้อมูล

    if(props.isLogin == false ){//// === จะเปรียบเทียบทั้งตัวชนิดข้อมูล และ ข้อมูล
        console.log("props.name=null props show menu Login Register[", props.name, "]")
        menu = (
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link to="/login" className="navbar-brand" >Login</Link>                        
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="navbar-brand" >Register</Link>                        
                        </li>                    
                    </ul>
        )
    }else{
        console.log("props.name=not null props show menu Logout[", props.name,"]") 
        if(props.isAdmin){
                menu = (    
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">                                                        
                            
                            <Link to="/view-lessons/0" className="navbar-brand" >บทเรียนทั่วไป {props.isAdmin}</Link>
                            <Link to="/create-lesson" className="navbar-brand" >เพิ่มบทเรียน {props.isAdmin}</Link>
                            <Link to="/lessons" className="navbar-brand" >บทเรียนทั้งหมด {props.isAdmin}</Link>

                            <Link to="/employees" className="navbar-brand" >แก้ไขผู้ใช้งาน {props.isAdmin}</Link>                               
                            <Link to="/login" className="navbar-brand" onClick={logout}>Logout</Link>
                        </li>      
                    </ul>         
                )
        }else{
                menu = (    
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">                            
              
                            <Link to="/login" className="navbar-brand" onClick={logout}>Logout</Link>
                        </li>      
                    </ul>         
                )
        }
    }




    return (        
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                <Link to="/" className="navbar-brand" >หน้าหลัก รร. ตชด </Link>                
                <div >
                    {menu}                        
                </div>
                </div>
            </nav>
    );
}

export default Nav;