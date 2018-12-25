/**
 * @file Link
 * @author iamswf@163.com
 */

import React, {Component} from 'react';
import {createLocation} from 'history';
import RouterContext from './RouterContext';

class Link extends Component {
    handleClick(event, history) {
        this.props.onClick && this.props.onClick(event);
        const {replace, to} = this.props
        event.preventDefault()
        replace ? history.replace(to) : history.push(to)
    }

    render() {
        const {innerRef, replace, to, ...rest} = this.props;
        return (
            <RouterContext.Consumer>
                {
                    contextValue => {
                        const location = typeof to === 'string'
                            ? createLocation(to, null, null, contextValue.location)
                            : null;
                        const href = location
                            ? contextValue.history.createHref(location)
                            : '';
                        /* eslint-disable */
                        return (
                            <a
                                {...rest}
                                onClick={event => this.handleClick(event, contextValue.history)}
                                href={href}
                                ref={innerRef}
                            />
                        );
                    }
                }
            </RouterContext.Consumer>
        );
    }
}

export default Link;
