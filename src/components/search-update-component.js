import React, { Component } from 'react';
import { EditDialog } from './edit-dialog';
import { SearchForm } from './searchForm';

class NameSpaceComponent extends Component {

	render() {
		return (
			<table id="customers" className='table'>
				{this.props.children}
			</table>);
	}
}

NameSpaceComponent.Row = class Row extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen: false
		}
	}
	openModal() {
		console.log("set state open");
		this.setState({ modalIsOpen: true });
	}
	afterOpenModal() {
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

	onDelEvent() {
		this.props.onDelEvent(this.props.r);

	}

	onEditDetails() {
		this.props.onTableUpdate(this.props.r);

	}
	onSelect() {
		this.setState({ details: this.props.r, modalIsOpen: true });
	}
	render() {
		var onTableUpdate = this.props.onTableUpdate;
		return (
			<tr>
				<td>{this.props.r.name}</td>
				<td>{this.props.r.email}</td>
				<td>{this.props.r.gender}</td>
				<td>
					<button type="button" onClick={this.onSelect.bind(this)}>Edit</button>
					<EditDialog onTableUpdate={onTableUpdate.bind(this)} data={this.props.r}
						modalState={this.state.modalIsOpen} openModal={this.openModal.bind(this)}
						closeDialog={this.closeModal.bind(this)}  />
				</td>
				<td>
					<button type="button" onClick={this.onDelEvent.bind(this)} index={this.props.key}>Remove</button>
				</td>
			</tr>
		);
	}
}

NameSpaceComponent.Rows = class Rows extends Component {

	render() {
		var onTableUpdate = this.props.onTableUpdate;
		var rowDel = this.props.onRowDel;
		var filterText = this.props.filterText;
		var rows = this.props.cardsList.map(function (name, index) {
			return <NameSpaceComponent.Row onDelEvent={rowDel.bind(this)}
				onTableUpdate={onTableUpdate.bind(this)}
				key={index} r={name} />
		});

		return <tbody>{rows}</tbody>;
	}
}

NameSpaceComponent.Heading = class Heading extends Component {
	render() {
		return (<th>{this.props.h}</th>);
	}
}

NameSpaceComponent.Headings = class Headings extends Component {
	render() {
		var headings = this.props.headings.map((name, index) =>
			<NameSpaceComponent.Heading key={index} h={name} />
		);
		return (<tbody><tr>{headings}</tr></tbody>);
	}
}

let cards = [
	{
		id: 1,
		name: "User1 XXX",
		email: "test1@user1.com",
		gender: "Male",
	},
	{
		id: 2,
		name: "User2 YYY",
		email: "test2@user2.com",
		gender: "Female",
	}
];

class SearchUpdate extends Component {

	constructor(props) {
		super(props);

		this.state = {
			headings: ['Name', 'Email', 'Gender', 'Edit', 'Remove'],
			cardsList: cards,
		}
	}

	editTable(id, firstName, lastName, email) {
		var item = {
			id: id,
			name: firstName,
			email: email
		};
		var cardsList = this.state.cardsList;
		var newcards = cardsList.map(function (card, index) {
			if (card.id == item.id) {
				card.name = item.name;
				card.email = item.email;
			}
			return card;
		});
		this.setState({ cardsList: newcards });
	}

	handleRowDel(cardsList) {
		var index = this.state.cardsList.indexOf(cardsList);
		this.state.cardsList.splice(index, 1);
		this.setState(this.state.cardsList);
	}

	updateSearch(firstName, lastName, email) {
		var cardsList = cards;
		var filteredCards = cardsList.filter((card) => {
			var firstNameIndex = firstName.trim() != "" ?
				card.name.toLowerCase().indexOf(firstName.toLowerCase()) : -1;
			var lastNameIndex = lastName.trim() != "" ?
				card.name.toLowerCase().indexOf(lastName.toLowerCase()) : -1;
			var emailIndex = email.trim() != "" ?
				card.email.toLowerCase().indexOf(email.toLowerCase()) : -1;
				
			if (firstNameIndex !== -1 || lastNameIndex !== -1 || emailIndex !== -1) {
				return card;
			}
		});
		if(filteredCards.length==0){
			alert("No records found")
		}
		this.setState({
			cardsList: filteredCards
		});
	}
	resetSearch() {
		this.setState({ cardsList: cards });
	}

	render() {
		return (
			<div className="addUser">
				<table style={{width:"1300px"}}>
                    <tbody><tr><td>
				<SearchForm onSearch={this.updateSearch.bind(this)} onReset={this.resetSearch.bind(this)} /></td>
				<td>
				<div id="test">
					<NameSpaceComponent>
						<NameSpaceComponent.Headings headings={this.state.headings} />
						<NameSpaceComponent.Rows onTableUpdate={this.editTable.bind(this)} onRowDel={this.handleRowDel.bind(this)}
							filterText={this.state.filterText} cardsList={this.state.cardsList} />
					</NameSpaceComponent>
				</div></td></tr>
                    </tbody>
                </table>
			</div>);
	}
}

export default SearchUpdate;