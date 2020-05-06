import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width : '450px'
    }
};

export class EditDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: this.props.modalState,
            id:this.props.data.id,
            firstName: this.props.data.firstName,
            lastName: this.props.data.lastName,
            email: this.props.data.email
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    openModal() {
        this.props.openModal();
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.props.closeDialog();
    }
    handleClick() {
        this.props.onTableUpdate( this.state.id, this.refs.firstName.value,
            this.refs.lastName.value,
            this.refs.email.value);
        this.props.closeDialog();
    }
    handleChange(event) {
        this.setState({
            firstName: this.refs.firstName.value,
            lastName: this.refs.lastName.value,
            email: this.refs.email.value
        });
    }
    render() {
        return (<Modal
            isOpen={this.props.modalState}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <h2 ref={subtitle => this.subtitle = subtitle}>Edit User</h2>
            <form>
                
                <div id="column-a"><label id="id">First Name :</label></div>
                <div id="column-b"><input type="text" ref="firstName" value={this.state.firstName} onChange={this.handleChange.bind(this)} /></div>
                <div id="column-a"><label id="title">Last Name :</label></div>
                <div id="column-b"><input type="text" ref="lastName" value={this.state.lastName} onChange={this.handleChange.bind(this)} /></div>
                <div id="column-a"><label id="description">Email :</label></div>
                <div id="column-b"><input type="text" ref="email" value={this.state.email} onChange={this.handleChange.bind(this)} /></div>
                <p>
                    <button type="button" onClick={this.handleClick.bind(this)}>Update</button>
                    <button onClick={this.closeModal}>Cancel</button>
                </p>
            </form>
        </Modal>
        );
    }
}