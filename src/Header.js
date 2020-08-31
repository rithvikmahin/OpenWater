import React from 'react'
import PersonIcon from '@material-ui/icons/Person';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import "./Header.css";
function Header()

{

    return (
        <div className = "header">
            <PersonIcon />
        {/* <h2> I am header</h2> */}
        <img 
        className = "header_logo"
        src = "data:image/png;base64,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" alt ="Buddy-me Logo"/>
       <ChatBubbleIcon/>
        </div>
    );
}

export default Header;