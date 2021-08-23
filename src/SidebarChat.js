import React , {useState , useEffect} from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import { Link} from 'react-router-dom';



const SidebarChat = ( {id , name , addNewChat , messages } ) => {
    const [seed, setSeed] = useState("");

    useEffect( () =>{
        setSeed(Math.floor(Math.random() *5000));
    },[])
    
    const lastMessage  = messages[messages.length - 1].message

    


    return  (
        <Link to={`/rooms/${id}`}>        
        <div className='sidebarChat' >
            <Avatar 
             src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
             />

            <div className='sidebarChat_info'>
                    <h2>{name}</h2>
                    <p> The last message... </p>
            </div>
        </div> 
    </Link>

    ) 
    
}

export default SidebarChat
