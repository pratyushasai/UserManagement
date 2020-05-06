import React, { Component } from 'react';
		
export class SearchForm extends Component{
	constructor(props){
		super(props);
	}
	
	handleClick(e){
				
        if(this.refs.firstName.value.trim()!="" || this.refs.lastName.value.trim()!="" || this.refs.email.value.trim() !=""){
		this.props.onSearch(this.refs.firstName.value,
			this.refs.lastName.value,
            this.refs.email.value);
        }else{
            return;
        }
    }
    
    handleReset(){		
        this.refs.firstName.value="";
        this.refs.lastName.value="";
        this.refs.email.value="";
		this.props.onReset();
	}
	
	render(){
		return (
			<main>
				
			<form className="form-inline">
			<h1>User Search</h1>
			<div id="column-a"><label id="id">First Name :</label></div>
			<div id="column-b"><input type="text" ref="firstName"/></div>
			<div id="column-a"><label id="title">Last Name :</label></div>
			<div id="column-b"><input type="text" ref="lastName"/></div>
			<div id="column-a"><label id="description">Email :</label></div>
			<div id="column-b"><input type="text" ref="email"/></div>
			<p>
				<button type="button" onClick={this.handleClick.bind(this)}>Search</button>
                <button type="button" onClick={this.handleReset.bind(this)}>Reset</button>
			</p>
			</form>
		</main>
		);
	}
}