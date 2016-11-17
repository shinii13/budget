import React from 'react';
import {Row, Col, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import $ from 'jquery';
import { DateField, TransitionView, Calendar, DatePicker } from 'react-date-picker';
import './index.css'

import {Chart} from 'react-google-charts'

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

const Main =  React.createClass({
    getInitialState: function(){
        var today = new Date();
        var dateObj = today.getFullYear()+ '-' +(today.getMonth() < 10 ? '0' : '') + (today.getMonth() + 1)+ '-' +(today.getDate() < 10 ? '0' : '') + today.getDate();
        return {
            data:
                [
                    {
                        "main":
                            [
                            ],
                        "img": '',
                        "category":[
                        ],
                        "news":
                            [
                            ]
                    }
                ],
            date: dateObj,
            amount:'',
            category:'food',
            note:'',

    }},
    componentDidMount: function() {
        $.ajax({
            url: './json/main.json',
            dataType: 'json',
            success: function(data) {
                return this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        })
    },

    ajax(url, data) {
        var Auth = this.getCookie('Auth');
        $.ajax({
            url: url,
            data: data,
            type: "POST",
            dataType: 'json',
            success: function(data) {
                alert(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        })
    },

    createAmount() {
        var data = {date: this.state.date, sum: this.state.amount, id_categor: this.state.category, comments: this.state.note};
        var url='/web/api';
        this.ajax(url, data);
    },

    handleGraf(event) {
        this.setState({graf: event.value});
    },
    handleDate(event) {
        this.setState({date: event});
    },
    handleAmount(event) {
        this.setState({amount: event.target.value});
    },
    handleCategory(event) {
        this.setState({category: event.target.value});
    },
    handleNote(event) {
        this.setState({note: event.target.value});
    },


    render() {
        return (
                <div className='container'>
                    <Row>
                        <Col xs={12} md={6}>
                            <div className={"my-pretty-chart-container"}>

                                <Chart onChange={this.handleGraf}

                                    chartType="PieChart"
                                    data={[["Task","Hours per Day"],["Work",11],["Eat",2],["Commute",2],["Watch TV",2],["Sleep",7]]}
                                    options={{"title":"My Daily Activities","pieHole":0.4,"is3D":false}}
                                    width="100%"
                                    chartEvents={[{eventName: this.handleGraf}]}
                                    chartAction={[{'eventName': this.handleGraf}]}
                                />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div>
                                <form>
                                    <DateField onChange={this.handleDate}
                                        dateFormat="YYYY-MM-DD"
                                        forceValidDate={true}
                                        updateOnDateClick={true}
                                        collapseOnDateClick={true}
                                        expandOnFocus={false}
                                        defaultValue={this.state.date}
                                        showClock={false}
                                    >
                                        <DatePicker
                                            navigation={true}
                                            locale="en"
                                            forceValidDate={true}
                                            highlightWeekends={true}
                                            highlightToday={true}
                                            weekNumbers={true}
                                            weekStartDay={1}
                                        />
                                    </DateField>
                                    <FieldGroup onChange={this.handleAmount}
                                        id="formControlsText"
                                        type="amount"
                                        label="Сумма"
                                        placeholder="Введите сумму"
                                    />
                                    <FormGroup controlId="formControlsSelect">
                                        <ControlLabel>Категория</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select" value={this.state.value} onChange={this.handleCategory}>
                                            {
                                                this.state.data[0].category.map(function (item) {
                                                    return (<option key={item.type} value={item.type} className={'' + (item.name.substring(0,3) !== "---" ? 'greyList' : '')}>{item.name}</option>)

                                                })
                                            }
                                        </FormControl>
                                        <ControlLabel>Примечания</ControlLabel>
                                        <FormControl componentClass="textarea" placeholder="Введите примечание" onChange={this.handleNote}/>
                                    </FormGroup>
                                    <Button onClick={this.createAmount}>
                                        Зафиксировать плату
                                    </Button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </div>
                )
    }
});

export default Main;