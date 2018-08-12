import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentInput extends Component {
    static propTypes = {
        onSubmit: PropTypes.func
    }

    constructor() {
        super();
        this.state = {
            username: '',
            content: ''
        };
    }

    componentWillMount() {
        this._loadUsername();
        this._loadContent() 
    }

    componentDidMount() {
        this.textarea.focus();
    }

    _loadUsername() {
        let username = localStorage.getItem('username');
        this.setState({ username });
    }

    _loadContent() {
        let content = localStorage.getItem('content');
        this.setState({ content })
    }

    _saveUsername(username) {
        localStorage.setItem('username', username);
    }

    _saveContent(content) {
        localStorage.setItem('content', content)
    }

    _cleanContent() {
        this.setState({ content: '' }) //clean content area
        localStorage.setItem('content', ""); // 避免已经提交的content，也会重新加载
    }

    handleUsernameBlur(event) {
        this._saveUsername(event.target.value);
    }

    // 已经提交的content，也会重新加载
    handleContentBlur(event) {
        this._saveContent(event.target.value);
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    
    handleContentChange(event) {
        this.setState({content: event.target.value});
    }

    handleSubmit() {
        if (this.props.onSubmit) {
            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                createdTime: +new Date()
            });
        }
        
        //在submit成功后，再清空
        this._cleanContent();
        // this.setState({ content: '' }) //clean content area
    }


    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名</span>
                    <div className='comment-field-input'>
                        <input 
                            value={this.state.username}
                            onBlur={this.handleUsernameBlur.bind(this)}
                            onChange={this.handleUsernameChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容</span>
                    <div className='comment-field-input'>
                        <textarea
                            ref={(textarea) => this.textarea = textarea}
                            onBlur={this.handleContentBlur.bind(this)} 
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button
                        onClick={this.handleSubmit.bind(this)}>发布</button>
                </div>
            </div>    
        );
    }
}

export default CommentInput;