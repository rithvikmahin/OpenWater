import React, { Component } from "react";
import { auth } from "../components/Firebase/firebase";
import { db } from "../components/Firebase/firebase";
import Sidebar from './Sidebar';
import { Container, Col, Row } from "reactstrap";

const items = [
  { name: 'Profile', label: 'My Profile' },
  { name: 'notifications', label: 'Notifications' },
  { name: 'requests', label: 'Mentee Requests' },
  { name: 'message', label: 'Messages' },
  "divider",
  { name: 'interests', label: 'Areas of Interest', 
  items: [
    { name: 'SQL', label: 'SQL' },
    { name: 'Data Viz', label: 'Data Visualization' },
    { name: 'Python', label: 'Python' },
    { name: 'copywriting', label: 'Copywriting' },
    { name: 'NLP', label: 'Natural Language Processing' }
  ]}
]

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: '',
      readError: null,
      writeError: null,
      loadingChats: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    try {
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) { return a.timestamp - b.timestamp })
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid
      });
      this.setState({ content: '' });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  render() {
    return (
      <div>
        
        <Container>
          <Row>
            <Col sm="-4" >
              <Sidebar items={items} />
            </Col>
            <Col sm= '7' className='image-container'>
              <img src={ require('../assets/images/Logo.png') } alt='' className='image-banner' />
            </Col>
          </Row>

          <Row>
            <Col sm="10">
              <div className="chat-area" ref={this.myRef}>
                {this.state.loadingChats ? <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
                </div> : ""}
          
                {this.state.chats.map(chat => {
                  return <p key={chat.timestamp} className={"chat-bubble " + (this.state.user.uid === chat.uid ? "current-user" : "")}>
                  {chat.content}
                  <br />
                 <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span>
                  </p>
                  })}
              </div>
              <form onSubmit={this.handleSubmit} className="mx-1">
                <textarea className="form-control" rows='1' name="content" onChange={this.handleChange} value={this.state.content}></textarea>
                 {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                <button type="submit" className="btn btn-submit px-5 mt-4">Send</button> &nbsp; &nbsp; &nbsp; &nbsp; 
                <button className="btn btn-submit px-5 mt-4 " onClick={() => auth().signOut()}>Logout</button>
              </form>
              <p></p>
            </Col>
          </Row>
        </Container>        
      </div>
    );
  }
}