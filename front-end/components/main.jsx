import React from 'react';
import {Row, Col, Button, FormGroup, ControlLabel, FormControl, Table} from 'react-bootstrap';
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
        this.categor();
        var today = new Date();
        var dateToday = today.getFullYear()+ '-' +(today.getMonth() < 9 ? '0' : '') + (today.getMonth() + 1)+ '-' +(today.getDate() < 10 ? '0' : '') + today.getDate();
        var dateStart = today.getFullYear()+ '-' +((today.getMonth())< 10 ? '0' : '') + today.getMonth()+ '-' +(today.getDate() < 10 ? '0' : '') + today.getDate();
        this.info(dateToday, dateStart);
        return {

            data: {
                category: [
                {
                    "children":[]
                }
            ]},
            date: dateToday,
            dateStart: dateStart,
            amount:'',
            category:'0',
            subcategory: '0',
            note:'',
            info: [{
                "id_categor": '12'
                }]


    }},

    categor: function() {
        $.ajax({
            url: '/web/category',
            dataType: 'json',
            success: function(data) {
                return this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        })
    },
    graf: function(data) {
        console.log(data);
        var obj = {};
        var a = '[["Money","Money per Month"]';
        for (var i = 0; i < data.length; i++) {
            var str = data[i].categorName;
            if (str in obj)
                obj[str] = parseInt(obj[str]) + parseInt(data[i].sum);
            else
                obj[str] = data[i].sum
        }
        for(var key1 in obj) {
            a = a + ',["' + key1 + '",' + obj[key1] + ']';
        }
        a=a+']';
        this.setState({graf1: obj});
        this.setState({graf: a});
        console.log(obj);
        console.log(a);
    },
    info: function (dateToday, dateStart) {
        $.ajax({
            url: '/web/api/date',
            dataType: 'json',
            type: 'POST',
            data: {dateEnd: dateToday, dateStart: dateStart},
            success: function(data) {
                this.graf(data);
                return this.setState({info: data});
            }.bind(this),
            error: function(status, errorMsg) {
                alert("Данные не удалось загрузить");
            }.bind(this)
        })
    },

    ajax(url, data) {
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
        $.ajax({
            url: '/web/api',
            data: {date: this.state.date, sum: this.state.amount, categorId: this.state.category, subcategorId: this.state.subcategory, comments: this.state.note,},
            type: "POST",
            dataType: 'json',
            success: function(data) {
                alert(data);
                this.info(this.state.date, this.state.dateStart);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        })
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
        this.setState({category: event.target.value, subcategory: '0'});
    },
    handleSubcategory(event) {
        this.setState({subcategory: event.target.value});
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

                                <Chart
                                    onChange={this.handleGraf}
                                    chartType="PieChart"
                                    data={eval(this.state.graf)}
                                    options={{"title":"Расходы за месяц","pieHole":0.4,"is3D":false}}
                                    width="100%"
                                    chartEvents={[{eventName: this.handleGraf}]}
                                    chartAction={[{'eventName': this.handleGraf}]}
                                />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>

                                    <FormGroup controlId="formControlsSelect">
                                        <DateField
                                            onChange={this.handleDate}
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

                                        <ControlLabel>Категория</ControlLabel>
                                        <FormControl
                                            componentClass="select"
                                            placeholder="select"
                                            value={this.state.categor}
                                            onChange={this.handleCategory}
                                        >

                                            {
                                                this.state.data.category.map(function (item) {
                                                    return (<option key={item.id} value={item.id}>{item.name}</option>)

                                                })
                                            }
                                        </FormControl>
                                        <ControlLabel>Подкатегория</ControlLabel>
                                        <FormControl
                                            componentClass="select"
                                            placeholder="select"
                                            value={this.state.subcategory}
                                            onChange={this.handleSubcategory}
                                        >
                                            {
                                                this.state.data.category[this.state.category].children.map(function (item) {
                                                    return (<option key={item.subcategorId} value={item.subcategorId}>{item.subcategorName}</option>)

                                                })
                                            }
                                        </FormControl>
                                        <ControlLabel>Примечания</ControlLabel>
                                        <FormControl
                                            componentClass="textarea"
                                            placeholder="Введите примечание"
                                            onChange={this.handleNote}
                                        />

                                        <Button onClick={this.createAmount}>
                                            Зафиксировать плату
                                        </Button>
                                    </FormGroup>

                        </Col>
                    </Row>
                    <div>
                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Дата</th>
                                    <th>Имя</th>
                                    <th>Категория</th>
                                    <th>Подкатегория</th>
                                    <th>Сумма</th>
                                    <th>Комментарий</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.info.map(function(item, index) {
                                        return(
                                            <tr key={index}>
                                                <td className="footerUser">{index+1}</td>
                                                <td className="footerUser">{item.date}</td>
                                                <td>{item.userName}</td>
                                                <td>{item.categorName}</td>
                                                <td>{item.subcategorName}</td>
                                                <td className="footerUser">{item.sum}</td>
                                                <td>{item.comments}</td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
                )
    }
});

export default Main;