/**
 * @file Route
 * @author iamswf@163.com
 */

import React, {Component} from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';


class Route extends Component {
    render() {
        return (
            <RouterContext.Consumer>
                {
                    contextValue => {
                        const location = contextValue.location;
                        const match = this.props.computedMatch
                            ? this.props.computedMatch
                            : this.props.path
                                ? matchPath(location.pathname, this.props)
                                : contextValue.match;
                        const {component, render} = this.props;
                        if (match) {
                            const props = {
                                ...contextValue,
                                match
                            };
                            return (
                                <RouterContext.Provider value={props}>
                                    {
                                        component
                                            ? React.createElement(component, props)
                                            : render(props)
                                    }
                                </RouterContext.Provider>
                            );
                        } else {
                            return null;
                        }
                    }
                }
            </RouterContext.Consumer>
        );
    }
}

export default Route;
