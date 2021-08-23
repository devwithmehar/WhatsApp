import{ React , useState , useEffect} from 'react';
import './Chat.css';
import {Avatar , IconButton } from '@material-ui/core';
import {SearchOutlined ,MoreVert , AttachFile} from '@material-ui/icons';
import InsertEmotIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios';
import { Link , useParams } from 'react-router-dom'
import db from './firebase';





const Chat = ( {messages} ) => {
const [input, setInput] = useState('');
const [seed, setSeed] = useState("");
const {roomId} = useParams();
const [roomName, setRoomName] = useState("");

useEffect( () =>{
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot( snapshot =>{
                setRoomName(snapshot.data().name)
            })
        }
},[roomId])


useEffect( () =>{
    setSeed(Math.floor(Math.random() *5000));
},[roomId])



const sendMessage = (e) =>{

    e.preventDefault();

    axios.post('/messages/new',{
        message: input,
        name: roomName,
        timestamp:'Just Now',
        recieved:false,
    });

    setInput("")
}

    return (
        <div className='chat'>
            <div className='chat_header'>
                    <Avatar 
                    src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
                    />

                <div className='chat_headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last seen at..</p>
                </div>

                <div className='chat_headerRight'>
                        <IconButton>
                            <SearchOutlined />
                        </IconButton>

                        <IconButton>
                            <AttachFile />
                        </IconButton>


                        <IconButton>
                            <MoreVert />
                        </IconButton>
                </div>
            </div>

            <div className='chat_body'>

                {
                    messages.map( (message) =>(

                    <p className={message.recieved ? 'chat_message ' : 'chat_message chat_sender'}
                    key={message._id}>
                        <span className='chat_name' >  
                            {message.name}
                        </span>
                        
                          { message.message }

                        <span className='chat_timestamp'>
                                {message.timestamp}
                        </span>
                        
                    </p>
                    ))
                }

                    
                   
            </div>

                    <div className='chat_footer'> 
                        <InsertEmotIcon />

                        <form>
                            <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Type a message'
                            type='text'
                            
                            />

                            <button
                            onClick={sendMessage}
                            type='submit'
                            >
                                Send a message
                            </button>
                        </form>

                        <MicIcon />
                    </div>
        </div>
    )
}

export default Chat
