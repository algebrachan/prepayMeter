import React from 'react';
import 'antd/dist/antd.css';

import SuperAdmin from './SuperAdmin';
import AgentAdmin from './AgentAdmin';
import { getLoginVertificate } from '../../../../utils/Session';

class HomeMenu extends React.Component {
  render() {

    const type = getLoginVertificate().Type;

    return (
      // 二选一
      <div >

        {type === 1 ? <SuperAdmin /> : <AgentAdmin />}

      </div>
    )
  }
}

export default HomeMenu;