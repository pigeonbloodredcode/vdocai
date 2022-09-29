import * as React from 'react';//import logo from './logo.svg';
import './App.css';
import {   BrowserRouter as Router,  Routes,  Route,          BrowserRouter } from 'react-router-dom';
import { useEffect, useState }  from 'react';


import Nav      from './components/Nav';

import Login                    from './pages/Login';
import Home                     from './pages/Home';
import Register                 from './pages/Register';


import Employees                from './pages/Employees';
import EditEmployee             from './pages/EditEmployee';
import DeleteEmployee           from './pages/DeleteEmployee';
import AdminEmployee            from './pages/AdminEmployee';
import LockEmployee             from './pages/LockEmployee';

import CreateLesson             from './pages/CreateLesson';
import Lessons                  from './pages/Lessons';
import ReadViewLessons          from './pages/ReadViewLessons'
import EditLesson               from './pages/EditLesson';
import UpdateLesson             from './pages/UpdateLesson';
import DeleteLesson             from './pages/DeleteLesson';
import ViewLesson               from './pages/ViewLesson';
import ViewLessons              from './pages/ViewLessons';

import Edit              from './pages/Edit';
import AddLesson from './pages/AddLesson';





// declare var urlBackEnd:string ;
// urlBackEnd              = "http://localhost:8080"
function App()  {  
  //const [email, setEmail] = useState("");    
  let [myVarible] = useState('save to reload');
  const [name, setName]         = useState("");  
  const [isLogin, setIsLogin]   = useState(false);

  var   [isAdmin, setIsAdmin]   = useState(false);
  var   [isUser, setIsUser]     = useState(false);
   

  useEffect(
    ()=>{
          (
              async ()=>{
                const resaponse = await fetch("http://localhost:8080/api/synemployee", {              //  const resaponse = await fetch(urlBackEnd+"/api/synemployee", {
                  method:'GET',            
                  headers:{'Content-Type': 'application/json'},
                  credentials:'include',
                  });
                  const content = await resaponse.json()                              
                  setName(content.name);

                  console.log("content.access_poin=", content.access_poin);
                  if(content.access_poin == "all"){
                    console.log("useEffectAdmin content ", content);
                    setIsAdmin(true);
                    setIsUser(false);
                  
                  }else if(content.access_poin=="viewer"){//viewer
                    console.log("useEffectGeneral content ", content);                    
                    setIsAdmin(false);
                    setIsUser(true);
                  }

                  if(content.name !== "") setIsLogin(true);
                  if(content.name === "  ") setIsLogin(false);
                  if(content.name === undefined ) setIsLogin(false); ///     if (content.message === "unauthenticated") isLogin = false;                        
              }                    
          )();
    },);
  // isAdmin //isUser  //else is notAccount
  if(isAdmin){
    return (                      
        <div className="App">                    
        <BrowserRouter>
        <Nav name={name} setName={setName}  isAdmin={isAdmin} setIsAdmin={setIsAdmin} isLogin={isLogin} setIsLogin={setIsLogin} />
        <main className="form">     
            <Routes>            
                <Route path="/"                           element = {<Home name={name} />} /> exact
              
                if(isLogin == false) <Route path="/login"      element = {<Login setName={setName}/>} /> 
              
                <Route path="/register"                   element = {<Register/>} /> 
                <Route path="/employees"                  element = {<Employees/> }  /> 

                <Route path="/edit-employee/:id"          element = {<EditEmployee/> }  /> 
                <Route path="/delete-employee/:id"        element = {<DeleteEmployee/> }  /> 
                <Route path="/admin-employee/:id/:set"    element = {<AdminEmployee/> }  /> 
                <Route path="/lock-employee/:id/:set"     element = {<LockEmployee/> }  /> 
                
                <Route path="/view-lessons/:id"           element = {<ViewLessons/> }  /> 
                
                <Route path="/lessons"                    element = {<Lessons/> }  /> 
                <Route path="/create-lesson"              element = {<CreateLesson/> }  /> 
                <Route path="/add-lesson"                 element = {<AddLesson/> }  /> 
                <Route path="/edit-lesson/:id"            element = {<EditLesson/> }  /> 
                <Route path="/update-lesson"              element = {<UpdateLesson/> }  />                               
                <Route path="/delete-lesson/:id"          element = {<DeleteLesson/> }  /> 
                <Route path="/view-lesson/:id"            element = {<ViewLesson/> }  /> 
                
                <Route path="/edit/"                      element = {<Edit /> }  /> 
              </Routes>        
          </main> 
        </BrowserRouter>
        </div>      
    );
  }
  else if(isUser){
    return (      
      <div className="App">                    
        <BrowserRouter>
        <Nav name={name} setName={setName}  isAdmin={isAdmin} setIsAdmin={setIsAdmin} isLogin={isLogin} setIsLogin={setIsLogin} />
        <main className="form">     
            <Routes>            
                <Route path="/"                           element = {<Home name={name} />} /> exact
                <Route path="/ReadViewLessons"            element = {<ReadViewLessons/> }  />                                 
                <Route path="/view-lessons/:id"           element = {<ViewLessons/> }  /> 
                <Route path="/login"                      element = {<Login setName={setName} />} />
                
                <Route path="/edit/"                      element = {<Edit /> }  />                                                 
              </Routes>        
          </main> 
        </BrowserRouter>
      </div>      
    );   
  }
  else{
    return (              
          <div className="App">              
          <BrowserRouter>ยังไม่ได้ล็อคอิน
            <Nav name={name} setName={setName}  isAdmin={isAdmin} setIsAdmin={setIsAdmin} isLogin={isLogin} setIsLogin={setIsLogin} />
            <main className="form">     
                <Routes>            
                    <Route path="/"                           element = {<Home name={name} />} /> exact            
                    <Route path="/login"                      element = {<Login setName={setName} />} />

                    <Route path="/register"                   element = {<Register/>} />               
                  </Routes>        
            </main>           
          </BrowserRouter>
          </div>            
    );

  }


}

export default App;
 






 
// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";

// ReactDOM.render(
//   <BrowserRouter>
//     {/* The rest of your app goes here */}
//   </BrowserRouter>,
//   root
// );


// React router v4 or v5
//<Route path="/" component={Home} /> 

// React router v5.1
//<Route exact path="/">
    //<Home />
//</Route>

// React router v6
//<Route path="/" element={<Home />} /> 





// function App() {
//   return (      
//       <div className="App">        
//         <main className="form-signin">
//           <Nav/>
//           <BrowserRouter>
//            <Routes>
//               <Route path="/"  element = {<Home/>} /> 
//               <Route path="/login"  element = {<Login/>} /> 
//               <Route path="/register"  element = {<Register/>} /> 
//             </Routes>
//           </BrowserRouter>
  
  
//         </main> 
        
//       </div>
//   );
// }

// export default App;








// import * as React from 'react';
// //import logo from './logo.svg';
// import './App.css';
// import * as ReactDOM from "react-dom";

// import { 
//   BrowserRouter as Router,
//   Routes, // instead of "Switch"
//   Route,      
//   Link,
  
// } from 'react-router-dom';

// import Nav from './components/Nav';
// import Login from './pages/Login';
// import Home from './pages/Home';
// import Register from './pages/Register';
// import { useEffect } from 'react';


// function App() {
//   const  [name, setName] = React.useState("");

//   //  useEffect( ()=>{
//   //       (
//   //           async ()=>{
//   //               const resaponse = await fetch("http://localhost:8080/api/employee", {
//   //                method:'GET',            
//   //                headers:{'Content-Type': 'application/json'},
//   //                //credentials:'include',
//   //               });
//   //               const content = await resaponse.json()
//   //               setName(content.name);
//   //           }

//   //       )();
//   //   });

//   return (      
          
//       <div className="App">        
//       <Router>
//       <Nav/>
//         <main className="form-signin">          
        
//            <Routes>
            
//               <Route path="/" element = {<Home/>} /> 
//               <Route path="/login"  element = {<Login/>} /> 
//               <Route path="/register"  element = {<Register/>} /> 
//             </Routes>    
  
//         </main> 
//       </Router>        
//       </div>
    
//   );
// }

//  export default App;



// return (      
        
//       <div className="App">              
//       <BrowserRouter>

//       <Nav name={name} setName={setName} />
//       <main className="form-signin">     
//            <Routes>            
//               <Route path="/"  element = {  <Home name={name} />} /> exact
//               <Route path="/login"  element = {<Login setName={setName} />} /> 
//               <Route path="/register"  element = {<Register/>} /> 
//               <Route path="/employees"  element = {<Employees/> }  /> 
              
//             </Routes>    
  
//         </main> 

//       </BrowserRouter>
//       </div>
    
//   );