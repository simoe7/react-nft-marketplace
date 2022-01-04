import React, { useEffect } from 'react'
import './Profile.css'


function Profile({account}) {
    
   
    return (
        <> 
            <div style={{paddingTop:"60px"}} >
                <div style={{maxWidth:"680px"}} className="pt-4 mx-auto container">

                </div>
                <h1>
                    Your Profile page 
                </h1>
                <h3>
                    Your account {account}
                </h3>
            </div>
         
        </>
        
    )
}

export default Profile
