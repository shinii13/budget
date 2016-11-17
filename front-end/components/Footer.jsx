//todo: style less
import React from 'react';
import $ from 'jquery';
import {Row, Col, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {Link} from 'react-router';
import {Nav, NavItem, MenuItem, NavDropdown, Image} from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

const Footer= React.createClass({
    getInitialState: function(){
        this.login();
        return {
            data:
                [
                ],
            user:''
        }

    },

    login: function () {
        $.ajax({
            url: '/web/api/login',
            dataType: 'json',
            success: function(data) {
                return this.setState({user: data});
            }.bind(this),
            error: function(status, errorMsg) {
                alert(status);
                this.login();
            }.bind(this)
        })
    },
    componentDidMount: function() {
        $.ajax({
            url: './json/footer1.json',
            dataType: 'json',
            success: function(data) {
                return this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        })
    },

    render: function() {

        return (
            <div >
                    <div className='container footer' style={{'marginBottom': '20px'}}>
                        <Nav bsStyle="tabs" activeKey="5" onSelect={this.handleSelect}>

                                    {
                                        this.state.data.map(function(item){
                                            let a;
                                            if (item.children === ''){
                                                a=<Item key={item.link} data={item}/>;
                                            }
                                            else {
                                                a=<Down key={item.link} data={item}/>;
                                            }
                                            return (a);

                                        })
                                    }
                            <div className="footerUser">
                                Добро пожаловать {this.state.user.user}
                            </div>

                        </Nav>
                    </div>
                    {this.props.children}
            </div>
        )
    }
});

const Item = React.createClass({
    render: function(){
        return(
            <NavItem eventKey={this.props.data.link} href={'#'+this.props.data.link}>

                    {this.props.data.name}

            </NavItem>
        )

}
});

const Down = React.createClass({
    render: function(){
        return(
            <NavDropdown eventKey={this.props.data.link} title={this.props.data.name} id="nav-dropdown">
                <img src={'./img/'+this.props.data.img} width="200"  alt="альтернативный текст"/>
                <MenuItem divider />
            {
                this.props.data.children.map(function(item) {
                    return(
                        <Item key={item.link} data={item}/>
                        )
                })
            }

            </NavDropdown>
            )
    }
});

module.exports = Footer;