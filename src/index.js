import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/index';
import intl from 'react-intl-universal';
const { localStorage } = window;
const locales = {
    "en_US": require('./locales/en-US.json'),
    "zh_CN": require('./locales/zh-CN.json'),
};
// const AppStart = (
//     <ConfigProvider locale={zhCN}>
//         <BrowserRouter>
//             <Provider store={store}>
//                 <App />
//             </Provider>
//         </BrowserRouter>
//     </ConfigProvider>
// )
class AppStart extends React.Component {
    changeLocale() {
        let locale = null;
        console.log('1233');
        switch (localStorage.getItem('locale')) {
            case 'zh_CN': locale = zh_CN; break;
            case 'en_US': locale = en_US; break;
            default:
                localStorage.setItem('locale', 'zh_CN');
                locale = zh_CN;
                break;
        }
        this.loadLocales();
        return locale;
    }
    loadLocales() {
        intl.init({
            currentLocale: localStorage.getItem('locale'),
            locales,
        })
            .then(() => {
            });
    }

    render() {
        return (
            <ConfigProvider locale={this.changeLocale()}>
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>
            </ConfigProvider>
        )
    }

}

ReactDOM.render(<AppStart />, document.getElementById('root'));