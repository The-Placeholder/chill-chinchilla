import io from 'socket.io-client'
import { useEffect,useState } from "react"
import Messagelog from "./Messagelog.jsx"
import socket from '../../utils/socket.js';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext.jsx';

// required input: username & room
const Messenger=()=>{
    const { suiteroom,setSuiteroom } = useContext(UserContext); 
    const [chatlog,setChatlog]=useState(null)
        // DELETE ON IMPLEMENTATION
    const [username, setUsername]=useState(`guest${Math.floor(Math.random()*1000)}`)

    useEffect(()=>{
        setChatlog(null)
        socket.emit('ComponentLoad',[username,suiteroom])
        socket.on('chatRecordTransfer',(message)=>{
            setChatlog(message)
        })
    },[])

    const sendIT=(event)=>{
        if(event.key==='Enter'&&event.target.value!==''){
            socket.emit('MessageRequest',event.target.value)
            event.target.value=''
        }
    }

    const globalorprivate=()=>{
        let returnStr 
        suiteroom==='global'?
            returnStr='Global':
            returnStr='Private'
        return returnStr
    }

    return(
        <>
            <div id='msgr_ctn' className={suiteroom==='global'?"h-screen":"h-1/2"}>
                <h1>{globalorprivate()} Chat</h1>
                <div id="msgr_log">
                    {chatlog&&<Messagelog chatlog={chatlog} username={username}/>}
                </div>
                <input id="msgr_input" onKeyUp={sendIT} className="textarea textarea-bordered textarea-md w-full max-w-xs" placeholder="chat here" autoComplete="off" autoFocus></input>                
            </div>
        </>
    )
    
}


export default Messenger