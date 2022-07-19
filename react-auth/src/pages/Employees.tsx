import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import { useInterval } from 'usehooks-ts'


// type getEmployee = {
// 	EmployeeID     :string, 
// 	Name           :string,
// 	City           :string,
// 	Email          :string,
// 	Status         :string  , 
// 	Password       :string,
// };
	
const Employees = () => {     
    const [empList, setEmployeeList] = useState<any[]>([])    
    useEffect( ()=>{
        const timeout = setTimeout(() => {/*console.log('This will be called after 2 seconds');*/ }, 2000);//จริงก็ยังไม่ค่อยเข้าใจ timeout ที่ต้องใส่เพราะ เวปโหลดหน้าเป็นพันต่อวิ
        (
            async ()=>{
                const  responce = await fetch("http://localhost:8080/api/employees", {                
                 method:'GET',            
                 headers:{'Content-Type': 'application/json'},
                 credentials:'include',
                })
                .then( (response)  =>  response.json())
                .then((data)=>{
                    setEmployeeList(data)
                    console.log(" getEmployees responce", data)
                    // if (data) {
                    //     return <div>{data.name}</div>;
                    //   } else {
                    //     return null;
                    //   }             
                });      
            }   
        )(/*Loading*/ );               
        return () => clearTimeout(timeout);
    },[]);
    

   
   
    /* .col-6 .col-md-4 .col-6 .col-md-4 .col-6 .col-md-4  */
    return(        
        <>  
                <div className="container">                    
                    All Employee

                    <div className="row" >
                        <div className="col-md-4">ชื่อ สกุล</div>
                        <div className="col-md-4">อีเมล์</div>
                        <div className="col-md-3">สถานที่</div>
                        <div className="col-md-1">คำสั่ง</div>
                        
                    </div>
                    {empList.length > 0 ?(
                        empList.map((item, index) => {
                            const editEmp   = "/edit-employee/"     +item.employee_id
                            const deleteEmp = "/delete-employee/"   +item.employee_id
                            //const lockEmp   = "/lock-employee/"     +item.employee_id
                            const setLock   = "/lock-employee/"     +item.employee_id+(item.status == 1?"/tolock":"/tounlock")                            
                            const setAdmin  = "/admin-employee/"    +item.employee_id+(item.role == "viewer"?"/toadmin":"/toviewer")
                            //let setAdmin  = "" 
                            // if(item.role == "viewer"){
                            //     setAdmin  = "/admin-employee/"    +item.employee_id+"/toadmin"
                            // }else{
                            //     setAdmin  = "/admin-employee/"    +item.employee_id+"/toviewer"
                            // }

                            return (
                                <div className="row border-top border-gray"  key={index} >                                
                                    <div className="col-md-4">{item.name}</div>
                                    <div className="col-md-3">{item.email}</div>
                                    <div className="col-md-2">{item.city} </div>
                                    <div className="col-md-3 text-end" style={{color: "red"}} >
                                        <Link to= {editEmp}     className="btn-dark fs-6" >Edit</Link>&nbsp;
                                        <Link to= {deleteEmp}   className="btn-dark fs-6" ><Icon.XCircle></Icon.XCircle></Link>&nbsp; 
                                        <Link to= {setAdmin}    className="btn-dark fs-6" style={item.role == "admin"?{color: "white"}:{color: "gray"} }><Icon.Person />                                           </Link>&nbsp; 
                                        <Link to= {setLock}     className="btn-dark fs-6" >{item.status == 1?<Icon.Unlock/>:<Icon.Lock/>}</Link>&nbsp;
                                        
                                    </div>
                                </div>
                            )
                        })
                    ):(<div className='row'><p>Loading  data .... </p></div>)}                       
                    {/* {JSON.stringify(empList)}                        */}
                    
 
                </div>
            
        </>
    );
}
export default Employees;














   {/*                         
                         {empList.length > 0 ?(
                            empList.map((item, index) => {
                                return (
                                    <div className='col' key={index}>
                                        
                                            Id :<strong>{item.id}</strong>
                                            Name :<strong>{item.name}</strong>
                                            Email :<strong>{item.email}</strong>
                                        
                                    </div>
                                )
                         })

                         ):(<div className='col'><p>Loading  data .... </p></div>)}  */}

                                /// โพรเซอร์วิ่งแยะจัด
        
    // useEffect( ()=>{
    //     (
    //        async () => {
    //         const getEmployee = async () => {
    //             const response = await fetch("http://localhost:8080/api/employees", {
    //                              method:'GET',            
    //                              headers:{'Content-Type': 'application/json'},
    //                              credentials:'include',
    //             })            
    //             .then((response)  =>  response.json())
    //             .then((data)=>{
    //                 console.log(" getEmplooy responce", data)
    //                 setEmployeeList(data)
    //             });          
    //         }    
    //        }

    //     )();                 
      
    
    // },[]);
    
                       

    //const [employees, setEmployees] = useState<{id: string; name: string}[]>(    [],  );

   
    // useEffect( ()=>{
    //     (
    //         async ()=>{
    //             const responce = await fetch("http://localhost:8080/api/employees", {
    //              method:'GET',            
    //              headers:{'Content-Type': 'application/json'},
    //              credentials:'include',
    //             });
    //             const content = await responce.json()                
                
    //             console.log("useEffect content ", content)
    //             // setName(content.name);
    //             // setEmail(content.email);
    //             // setCity(content.city);
    //             // setStatus(content.status);
    //             // setPassword(content.password);
                
    //             setEmployeeList(content);
    //         }
        
                    
    //     )();
    // });

      // useEffect(() => {
        // const fetchData = async () => {
        //     const response = await fetch(`http://localhost:8080/api/employees`);
        //     const data = await response.json();
        //     setEmployeeList(data)
        // };

        // fetchData();
        // });

//const [employeeList, setEmployeeList] = useState<getEmployee[]>([])    //const [employeeList, setEmployeeList] = useState([])


// const [delay, setDelay] = useState<number>(1000)
//     const [isPlaying, setPlaying] = useState<boolean>(false)
//     useInterval(
//         () => {
//           setDelay(500)
//           setPlaying(true)
         
          
//         },/* Delay in milliseconds or null to stop it*/
//         isPlaying ? delay : null,
//     )


// import axios from 'axios';
// import React, {useEffect, useState} from 'react';
// import { Button, Col, Row } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { useInterval } from 'usehooks-ts'


// type getEmployee = {
// 	EmployeeID     :string, 
// 	Name           :string,
// 	City           :string,
// 	Email          :string,
// 	Status         :string  , 
// 	Password       :string,
// };
	
// const Employees = () => {       
      


//     const [empList, setEmployeeList] = useState<any[]>([])    
//     useEffect( ()=>{
//         (
//             async ()=>{
//                 const  responce = await fetch("http://localhost:8080/api/employees", {                
//                  method:'GET',            
//                  headers:{'Content-Type': 'application/json'},
//                  credentials:'include',
//                 })
//                 .then( (response)  =>  response.json())
//                 .then((data)=>{
//                     console.log(" getEmployees responce", data)
//                     setEmployeeList(data)
//                     // if (data) {
//                     //     return <div>{data.name}</div>;
//                     //   } else {
//                     //     return null;
//                     //   }             
//                 });      
//             }       
//         )(/*Loading*/ );               
        
//     },[]);

   
//     /* .col-6 .col-md-4 .col-6 .col-md-4 .col-6 .col-md-4  */
//     return(        
//         <>        
            
//                 <div className="container">
                    
//                     All Employee
//                     <div className="row" >
//                         <div className="col-md-4">ชื่อ สกุล</div>
//                         <div className="col-md-4">อีเมล์</div>
//                         <div className="col-md-3">สถานที่</div>
//                         <div className="col-md-1">คำสั่ง</div>
                        
//                     </div>
//                     {empList.length > 0 ?(
//                         empList.map((item, index) => {
//                             const editEmp   = "/edit-employee/"+item.EmployeeID
//                             const deleteEmp = "/delete-employee/"+item.EmployeeID
//                             const lockEmp   = "/lock-employee/"+item.EmployeeID
//                             const setAdmin  = "/setAdmin-employee/"+item.EmployeeID
                         

//                             return (

//                                 <div className="row border-top border-gray"  key={index} >                                
//                                     <div className="col-md-4">{item.name}</div>
//                                     <div className="col-md-3">{item.email}</div>
//                                     <div className="col-md-2">{item.city}</div>                                
//                                     <div className="col-md-3 text-end" style={{color: "red"}} >
//                                         <Link to= {lockEmp}     className="btn-dark fs-6" >Lock</Link>&nbsp;
//                                         <Link to= {editEmp}     className="btn-dark fs-6" >Edit</Link>&nbsp;
//                                         <Link to= {deleteEmp}   className="btn-dark fs-6" >Delete</Link>&nbsp; 
//                                         <Link to= {setAdmin}    className="btn-dark fs-6" >setAdmin</Link>&nbsp; 
                                        
                                        
//                                     </div>
                                
//                                 </div>
                                
                                
//                             )
//                         })
//                     ):(<div className='row'><p>Loading  data .... </p></div>)}                       
//                     {/* {JSON.stringify(empList)}                        */}
                    
 
//                 </div>
            
//         </>
//     );
// }
// export default Employees;

