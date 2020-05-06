import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from './dropDown';
import Modal from 'react-modal';


const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		width: 'auto'
	}
};

let genderOptions = ['Male', 'Female'];

export class RegistrationForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Gender: "",
			modalIsOpen: this.props.modalState,
			fields: {},
			errors: {}
		}
		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
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
	onChangeGender(event) {
		this.setState({
			Gender: event.target.value
		})
	}

	handleValidation(){
    	let fields = this.state.fields;
      let errors = {};
	  let formIsValid = true;
	//password
	  if(!fields["password"]){
		formIsValid = false;
		errors["password"] = "Cannot be empty";
	}

	  //First Name
	  if(!fields["firstName"]){
		formIsValid = false;
		errors["firstName"] = "Cannot be empty";
	}
	
	if(typeof fields["firstName"] !== "undefined"){
		if(!fields["firstName"].match(/^[a-zA-Z]+$/)){
		formIsValid = false;
		errors["firstName"] = "Only letters";
	  }      	
	}
	
			//Last Name
      if(!fields["lastName"]){
          formIsValid = false;
          errors["lastName"] = "Cannot be empty";
      }
      
      if(typeof fields["lastName"] !== "undefined"){
      	if(!fields["lastName"].match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          errors["lastName"] = "Only letters";
        }      	
      }
      
      //Email
      if(!fields["email"]){
          formIsValid = false;
          errors["email"] = "Cannot be empty";
      }
      
      if(typeof fields["email"] !== "undefined"){
      	let lastAtPos = fields["email"].lastIndexOf('@');
      	let lastDotPos = fields["email"].lastIndexOf('.');

		  if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 
		  && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            formIsValid = false;
            errors["email"] = "Email is not valid";
        }
      }
      this.setState({errors: errors});
      return formIsValid;
    }
		
    handleChange(field, e){    		
    		let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }
	handleClick(e) {
		e.preventDefault();
		if(this.handleValidation()){
		this.props.onUserInput(this.refs.firstName.value,
			this.refs.lastName.value,
			this.refs.email.value, this.state.Gender, this.refs.password.value);
			alert("Form submitted");
		this.props.closeDialog();
		}
		else{
			alert("Form has errors.")
		}
	}

	render() {
		return (<Modal
			isOpen={this.props.modalState}
			onAfterOpen={this.afterOpenModal}
			onRequestClose={this.closeModal}
			style={customStyles}
			contentLabel="Example Modal"
		>
			<h2 ref={subtitle => this.subtitle = subtitle}>Create a new Account</h2>
			<main>
				<form className="login" style={{ display: '-webkit-inline-box', maxWidth: '500px', marginTop: '50px' }}>
					<div id="column-a"><label id="id">First Name :</label></div>
					<div id="column-b"><input type="text" ref="firstName" 
					onChange={this.handleChange.bind(this, "firstName")} value={this.state.fields["firstName"]}/>
					<span style={{color: "red"}}>{this.state.errors["firstName"]}</span></div>
					<div id="column-a"><label id="title">Last Name :</label></div>
					<div id="column-b"><input type="text" ref="lastName" 
					onChange={this.handleChange.bind(this, "lastName")} value={this.state.fields["lastName"]}/>
					<span style={{color: "red"}}>{this.state.errors["lastName"]}</span></div>
					<div id="column-a"><label id="title">Gender :</label></div>
					<div id="column-b"><Select name="gender" selectedOption={this.state.Gender}
						controlFunc={this.onChangeGender.bind(this)} placeholder="Gender" options={genderOptions} /></div>
					<div id="column-a"><label id="description">Email :</label></div>
					<div id="column-b"><input type="text" ref="email" 
					onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
					 <span style={{color: "red"}}>{this.state.errors["email"]}</span></div>
					<div id="column-a"><label id="description">Password :</label></div>
					<div id="column-b"><input type="password" ref="password" 
					onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]}/>
					<span style={{color: "red"}}>{this.state.errors["password"]}</span></div>
					<p>
						<button type="button" onClick={this.handleClick.bind(this)}>Confirm</button>
						{/* <button type="button" ><Link to='/'>Cancel</Link></button> */}
					</p>
				</form>
			</main></Modal>
		);
	}
}