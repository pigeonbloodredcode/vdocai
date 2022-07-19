import React, {useEffect, useState} from 'react';
import * as Icon from 'react-bootstrap-icons';


const Home = (props:{name: string}) => {   
    const refreshPage = ()=>{
        window.location.reload();  
    }

    return (        
        <section id="animate">
            <section className="section-preview">
                <div className='home' onMouseOver={refreshPage}   >                                
                    Hi {props.name ? "สวัสดีครับ คุณ "+ props.name : "สวัสดีครับ คุณ ... " }<Icon.Person />
                </div>
            </section>
        </section>

    );
}

export default Home;