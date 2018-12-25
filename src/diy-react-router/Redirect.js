/**
 * @file Redirect
 * @author iamswf@163.com
 */

import React from 'react';
import RouterContext from './RouterContext';
import Lifecycle from './Lifecycle';

function Redirect({to, push = false}) {
    return (
        <RouterContext.Consumer>
            {
                contextValue => {
                    const history = contextValue.history;
                    const method = push ? history.push : history.replace;
                    return (
                        <Lifecycle
                            onMount={() => {
                                method(to);
                            }}
                            onUpdate={(self, prevProps) => {
                                if (prevProps.to !== to) {
                                    method(to);
                                }
                            }}
                            to={to}
                        />
                    );
                }
            }
        </RouterContext.Consumer>
    )
}

export default Redirect;
