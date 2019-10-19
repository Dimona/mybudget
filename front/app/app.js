/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import FontFaceObserver from 'fontfaceobserver';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
import { Logger } from 'services';

import SnackbarProvider from 'components/snackbars/components/SnackbarProvider';

import { auth, store } from 'config';
import { setTokenAction } from 'components/auth/actions';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions

// import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Import material theme
// import theme from './styles/theme';
// import './styles/scss/style.scss';
// import 'components/redux-form-material/messages/validators';

import { version } from '../package.json';

Logger.info(`version: ${version}`);

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
    document.body.classList.add('fontLoaded');
});

// Create redux store with history
// const initialState = {};
// const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const cookieToken = auth.TokenStorage.get();

if (cookieToken) {
    store.dispatch(setTokenAction(cookieToken));
}

const render = messages => {
    ReactDOM.render(
        <Provider store={store}>
            <LanguageProvider messages={messages}>
                <ConnectedRouter history={history}>
                    <SnackbarProvider>
                        {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
                        {/* <MuiThemeProvider theme={theme}> */}
                            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                            <CssBaseline />
                            <App />
                        {/* </MuiThemeProvider> */}
                    </SnackbarProvider>
                </ConnectedRouter>
            </LanguageProvider>
        </Provider>,
        MOUNT_NODE
    );
};

if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['./i18n', 'containers/App'], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render(translationMessages);
    });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
    new Promise(resolve => {
        resolve(import('intl'));
    })
        .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')])) // eslint-disable-line prettier/prettier
        .then(() => render(translationMessages))
        .catch(err => {
            throw err;
        });
} else {
    render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
    require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
