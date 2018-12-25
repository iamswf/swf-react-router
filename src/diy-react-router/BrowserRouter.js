/**
 * @file BrowserRouter
 * @author iamswf@163.com
 */

import React, {Component} from 'react';
import {createBrowserHistory as createHistory} from 'history';
import RouterContext from './RouterContext';

class BrowserRouter extends Component {
    constructor(props) {
        super(props)
        this.history = createHistory(props);

        this.state = {
            location: this.history.location
        };
    }

    componentDidMount() {
        this.unListen = this.history.listen(location => {
            this.setState({location});
        })
    }

    componentWillUnmount() {
        this.unListen && this.unListen();
    }

    render() {
        debugger
        const rootMatch = {
            path: '/',
            url: '/',
            params: {},
            isExact: this.state.location.pathname === "/"
        };
        return (
            <RouterContext.Provider value={{
                history: this.history,
                location: this.state.location,
                match: rootMatch
            }}>
                {this.props.children || null}
            </RouterContext.Provider>
        );
    }
}


export default BrowserRouter;
