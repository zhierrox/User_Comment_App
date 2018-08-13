import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentInput from '../components/CommentInput';
import { addComment } from '../reducers/comments';

class CommentInputContainer extends Component {
    static propTypes = {
        comments: PropTypes.array,
        onSubmit: PropTypes.func
    }

    constructor() {
        super();
        this.state = {
            username: '',
            content: ''
        }
    }

    componentWillMount() {
        this._loadUsername();
        this._loadContent()
    }

    _loadUsername() {
        const username = localStorage.getItem('username');
        if (username) {
            this.setState({ username })
        }
    }

    _loadContent() {
        const content = localStorage.getItem('content');
        if (content) {
            this.setState({ content });
        }
    }

    _saveUsername(username) {
        localStorage.setItem('username', username)
    }

    _saveContent(content) {
        localStorage.setItem('content', content)
    }

    _cleanContent() {
        localStorage.setItem('content', "");
    }

    handleSubmitComment(comment) {
        if (!comment) {
            return;
        }
        if (!comment.username) {
            return alert('请输入用户名')
        }
        if (!comment.content) {
            return alert('请输入评论内容')
        }
        const { comments } = this.props;
        const newComments = [...comments, comment];
        localStorage.setItem('comments', JSON.stringify(newComments));
        if (this.props.onSubmit) {
            this.props.onSubmit(comment);
        } 
    }

    render() {
        return (
            <CommentInput 
                username={this.state.username}
                content={this.state.content}
                onUserNameInputBlur={this._saveUsername.bind(this)}
                onContentInputBlur={this._saveContent.bind(this)}
                _cleanContent={this._cleanContent.bind(this)}
                onSubmit={this.handleSubmitComment.bind(this)}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (comment) => {
            dispatch(addComment(comment))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentInputContainer)