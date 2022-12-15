import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
//import * as serviceWorker from './serviceWorker';

import { App } from './app';
import { Provider } from 'react-redux';
import { store } from './store/store';

//import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
//import { database } from './services/data/watermelon-db';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
        </Provider>
    </React.StrictMode>
)

//serviceWorker.unregister();