import React, {useEffect, useState} from 'react';
import * as Icon from 'react-bootstrap-icons';


const Home = (props:{name: string}) => {   
    //window.location.reload();  
    const refreshPage = ()=>{setTimeout(location.reload.bind(location), 888);}
    
    //onMouseOver={refreshPage} onLoad={refreshPage}
    return (        
        <section id="animate">
            <section className="section-preview">
                <div className='home'    onMouseOver={refreshPage} >
                    Hi {props.name ? "สวัสดีครับ คุณ "+ props.name : "สวัสดีครับ คุณ ... " }<Icon.Person />                    
                </div>
            </section>
        </section>
        
    );
}

export default Home;