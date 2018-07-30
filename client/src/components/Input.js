import React, { Component } from 'react';
import { Picker, Emoji } from 'emoji-mart';

class Input extends Component {

  state = {
    message: '',
    cursorPosition: 0,
    popupemoji: false
  }

  changeHandler = e => {
    this.setState({
      message: e.target.value,
    })
  }

  addEmoji = emoji => {
    const {message, cursorPosition} = this.state;
    document.querySelector('.Input > input').focus();   
    this.setState({
      message: message.slice(0, cursorPosition) + ` ${emoji.colons} ` + message.slice(cursorPosition, message.length),
      popupemoji: !this.state.popupemoji
    })
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.addMsg(this.state.message);
    this.setState({message: ''})
  }

  toggleEmojiPicker = () => {
    this.setState({
      popupemoji: !this.state.popupemoji
    })
  }

  getCursorPosition = (e) => {
    this.setState({cursorPosition: e.target.selectionStart})
  }

  render() {
    return (
      <section>
      {
        this.state.popupemoji ?
        <Picker
          onSelect={this.addEmoji}
          set="twitter"
          color="#1E88E5"
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '15px'
          }}
          showPreview={false}
        /> : null
      }
      <form className="Input" onSubmit={this.submitHandler}>
        <span onClick={this.toggleEmojiPicker} className="Input__smiles">
          <Emoji emoji='blush' set="twitter" size={22} />
        </span>
        <input
          onChange={this.changeHandler}
          onBlur={this.getCursorPosition}
          value={this.state.message}
          type="text"
          placeholder="Сообщение..." />
      </form>
      </section>
    );
  }
}

export default Input;

/*

*/