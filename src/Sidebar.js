import React , { useState , useEffect } from 'react';
import "./Sidebar.css";
import  DonutLargeIcon  from '@material-ui/icons/DonutLarge';
import {Avatar , IconButton } from '@material-ui/core'
import MoreVertIcon   from '@material-ui/icons/MoreVert';
import ChatIcon   from '@material-ui/icons/Chat';
import {SearchOutlined, Unsubscribe } from '@material-ui/icons'
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';


const Sidebar = ( {messages} ) => {
const [rooms, setRooms] = useState([]);
const [{ user }, dispatch] = useStateValue();


const createChat = () =>{
    const roomName = prompt("please enter the chat room for chat");
    if(roomName){
        db.collection('rooms').add({
            name: roomName,
        })
    }
}


useEffect ( () =>{
  const unsubscribe =  db.collection('rooms').onSnapshot( snapshot =>{
        setRooms(snapshot.docs.map((doc )=>({
            id:doc.id,
            data: doc.data(),
        })))
    });
    return () =>{
        unsubscribe();
    }
},[])



    return (
        <div className='sidebar'>
              <div className='sidebar_header'>

                  <Avatar 
                  src={user?.photoURL}
                  />

                    <div className='sidebar_headerRight'>
                        <IconButton>

                            <DonutLargeIcon />

                        </IconButton>

                        <IconButton>

                            <ChatIcon />

                        </IconButton>

                        <IconButton>

                            <MoreVertIcon />

                        </IconButton>
                       
                    </div>
              </div>

              <div className='sidebar_search'>
                    <div className='sidebar_searchContainer'>
                         <SearchOutlined />
                         <input 
                         placeholder='Search or Start new chat'
                         type='text'
                         />
                    </div>
              </div>

              <div className='addChat' 
              onClick={createChat}  
             >
                  <h1>Add New Chat</h1>
              </div>

              <div className='sidebar_chats'>
                    
                    {
                        rooms.map(room => (
                            <SidebarChat key={room.id} 
                            id={room.id}
                            name={room.data.name}
                            messages={messages}
                            />
                        ))
                    }
              </div>
        </div>
    )
}

export default Sidebar
