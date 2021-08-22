import{ React , useState} from 'react';
import './Chat.css';
import {Avatar , IconButton } from '@material-ui/core';
import {SearchOutlined ,MoreVert , AttachFile} from '@material-ui/icons';
import InsertEmotIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';


const Chat = () => {
const [input, setInput] = useState('');

const sendMessage = () =>{

}

    return (
        <div className='chat'>
            <div className='chat_header'>
                    <Avatar />

                <div className='chat_headerInfo'>
                    <h3>Room name</h3>
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
                    <p className='chat_message'>
                        <span className='chat_name' > Sahil</span>
                        
                        This is the Message

                        <span className='chat_timestamp'>
                                {new Date().toTimeString()}
                        </span>
                        
                    </p>

                    <p className='chat_message  chat_reciever'>
                        <span className='chat_name' > Sahil</span>
                        
                        This is the Message

                        <span className='chat_timestamp'>
                                {new Date().toTimeString()}
                        </span>
                        
                    </p>
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
