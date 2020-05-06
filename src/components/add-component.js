import React, { Component } from 'react';
import { Form } from './forms';
import { EditDialog } from './edit-dialog';

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
                <td>{this.props.r.firstName + " " + this.props.r.lastName}</td>
                <td>{this.props.r.email}</td>
                <td>{this.props.r.gender}</td>
                <td>
                    <button type="button" onClick={this.onSelect.bind(this)}>Edit</button>
                    <EditDialog onTableUpdate={onTableUpdate.bind(this)} data={this.props.r}
                        modalState={this.state.modalIsOpen} openModal={this.openModal.bind(this)}
                        closeDialog={this.closeModal.bind(this)} />
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
            // if (name.id.indexOf(filterText) === -1) {
            //     return;
            //   }
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



class AddUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headings: ['Name', 'Email', 'Gender', 'Edit', 'Remove'],
            cardsList: [
                {
                    id: 1,
                    firstName: "User1",
                    lastName: "XXX",
                    email: "test1@user1.com",
                    gender: "Male",
                },
                {
                    id: 2,
                    firstName: "User2",
                    lastName: "ZZZ",
                    email: "test2@user2.com",
                    gender: "Female",
                }
            ],
            
        }
    }

    editTable(id, firstName, lastName, email) {
        var item = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email
        };
        var cardsList = this.state.cardsList;
        var newcards = cardsList.map(function (card, index) {
            if (card.id == item.id) {
                card.firstName = item.firstName;
                card.lastName = item.lastName;
                card.email = item.email;
            }
            return card;
        });
        this.setState({ cardsList: newcards });
        //  console.log(this.state.products);
    }

    handleRowDel(cardsList) {
        var index = this.state.cardsList.indexOf(cardsList);
        this.state.cardsList.splice(index, 1);
        this.setState(this.state.cardsList);
    }

    handleUserInput(firstName, lastName, email, gender) {
        var newRowInfo = this.state.cardsList;
        var id = this.state.cardsList.length + 1;
        newRowInfo.push({
            id: id, firstName: firstName, lastName: lastName, email: email, gender: gender
        });
        this.setState({
            cardsList: newRowInfo
        });
    }

    render() {
        return (
            <div className="addUser">
                <table style={{width:"1300px"}}>
                    <tbody><tr><td>
                        <Form onUserInput={this.handleUserInput.bind(this)} /></td>
                        <td>
                            <div id="test" style={{paddingLeft:"0px"}}>
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

export default AddUser;