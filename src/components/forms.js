import React, { Component } from 'react';
import Select from './dropDown';

let genderOptions = ['Male','Female'];
let stateOptions = ['Bihar','UP','MP','AP'];
let cityOptions=['Patna', 'Lucknow','Bhopal','Indore','Hyderabad'];
		
export class Form extends Component{
	constructor(props){
		super(props);
		this.state={
			Gender : "",
			State :	"",
			City : "",
			fields: {},
			errors: {}
		};
	}
	handleValidation(){
    	let fields = this.state.fields;
      let errors = {};
	  let formIsValid = true;
	//Gender
	 //First Name
	 if(!fields["gender"]){
		formIsValid = false;
		errors["gender"] = "*Required";
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
	handleClick(e){
		e.preventDefault();
		if(this.handleValidation()){		
		this.props.onUserInput(this.refs.firstName.value,
			this.refs.lastName.value,
			this.refs.email.value,this.state.Gender);
			alert("Form submitted");
		}else{
			alert("Form has errors.")
			return;
		}
	}
	onChangeGender(field,e){
		let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
		this.setState({
			Gender : e.target.value
		})
	}
	onChangeState(event){
		this.setState({
			State : event.target.value
		})
	}
	onChangeCity(event){
		this.setState({
			City : event.target.value
		})
	}
	render(){
		return (
			<main style={{display:"inline-table"}}>
			<form className="login">
			<h1>Add User</h1>
			<div id="column-b"><input type="text" ref="firstName" placeholder="First Name"
			onChange={this.handleChange.bind(this, "firstName")} value={this.state.fields["firstName"]}/>
			<span style={{color: "red"}}>{this.state.errors["firstName"]}</span></div>
			<div id="column-b"><input type="text" ref="lastName" placeholder="Last Name"
			onChange={this.handleChange.bind(this, "lastName")} value={this.state.fields["lastName"]}/>
			<span style={{color: "red"}}>{this.state.errors["lastName"]}</span></div>
			<div id="column-b"><Select name="gender" selectedOption={this.state.Gender} 
			controlFunc={this.onChangeGender.bind(this,"gender")} placeholder="Gender" options={genderOptions} 
			value={this.state.fields["gender"]}/><span style={{color: "red"}}>{this.state.errors["gender"]}</span></div>
			<div id="column-b"><Select name="state" selectedOption={this.state.State}
			controlFunc={this.onChangeState.bind(this)} placeholder="State" options ={stateOptions} /></div>
			<div id="column-b"><Select name="city" selectedOption={this.state.City}
			controlFunc={this.onChangeCity.bind(this)} placeholder="City" options={cityOptions} /></div>
			<div id="column-b"><input type="text" ref="email" placeholder="email"
			onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
			<span style={{color: "red"}}>{this.state.errors["email"]}</span></div>
			<p>
				<button type="button" onClick={this.handleClick.bind(this)}>Add User</button>
			</p>
			</form>
		</main>
		);
	}
}