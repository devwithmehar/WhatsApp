import React, { useEffect , useState } from 'react';
import Pusher from 'pusher-js';
import axios from './axios';
import './App.css';
import Sidebar from './Sidebar';
import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom';
import Chat from './Chat';
import Login from './Login';
import { useStateValue } from './StateProvider';
import dotenv from 'dotenv'
dotenv.config()


function App() {
  const [{ user }, dispatch] = useStateValue();

  

  const [messages, setMessages] = useState([]);

  useEffect( () =>{
    axios.get('/message/sync')
    .then( response => {
   
      setMessages(response.data);
    })
  },[])

  useEffect ( () =>{
    const pusher = new Pusher(process.env.React_App_pusher_key, {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted',(newMessages) => {
      setMessages([...messages,newMessages])
    });

    return () =>{
      channel.unbind_all();
      channel.unsubscribe();
    }

  },[messages]);

  console.log(messages); 
 
  return (
    <div className="app">

      {!user ? (
        <Login />
      ) : (

      
     <div className='app_body'>
       <Router>
       <Sidebar messages={messages}  />
         <Switch>
         
        <Route path='/rooms/:roomId'>
        
          <Chat messages={messages}   />
        </Route>

           <Route path='/'>
           
           <Chat messages={messages}   />
           </Route>

       
      
       <Sidebar />

         
       
       {/* Chat Component */}
       <Chat messages={messages} />

       </Switch>
       </Router>

       </div>
       )} 
    </div>
  );
}

export default App;
