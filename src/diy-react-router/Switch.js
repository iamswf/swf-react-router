/**
 * @file Switch
 * @author iamswf@163.com
 */

import React, {Component} from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';

class Switch extends Component {
    render() {
        return (
            <RouterContext.Consumer>
                {
                    contextValue => {
                        const location = contextValue.location;
                        let match, element;
                        React.Children.forEach(this.props.children, child => {
                            if (match == null && React.isValidElement(child)) {
                                element = child;
                                const path = child.props.path;
                                match = path
                                    ? matchPath(location.pathname, {...child.props})
                                    : contextValue.match
                            }
                        });
                        return match
                            ? React.cloneElement(element, {computedMatch: match})
                            : null
                    }
                }
            </RouterContext.Consumer>
        );
    }
}

export default Switch;
