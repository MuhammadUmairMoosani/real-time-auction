import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './container/App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import store from './components/store/store';
import './firebase/firebase'









ReactDOM.render(
    <Provider store={store}>
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
