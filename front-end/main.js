import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import Footer from './components/Footer.jsx';
import Main from './components/Main.jsx';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Footer} >
            <IndexRoute component={Main}/>
            <Route path="main" component={Main}/>
        </Route>
    </Router>,
    document.getElementById('mount-point')
);