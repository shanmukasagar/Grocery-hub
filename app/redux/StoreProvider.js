"use client"

import { Provider } from 'react-redux';
import store from './store';

export const storeProvider = ({children}) => {
    <Provider store={store}>
        {children}
    </Provider>
}