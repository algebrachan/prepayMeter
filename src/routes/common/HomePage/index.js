import React, { Component } from 'react';
import SuperHome from './SuperHome';
import AgentHome from './AgentHome';
import { getLoginVertificate } from '../../../utils/Session';

class HomePage extends Component {

    render() {
        const type = getLoginVertificate().Type;

        return (
            <div>
                {type === 1 ? <SuperHome /> : <AgentHome />}
            </div>
        )
    }
}
export default HomePage;