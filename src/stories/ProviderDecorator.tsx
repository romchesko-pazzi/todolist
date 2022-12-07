import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '../state/store';

export const ProviderDecorator = (story: any) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{story()}</BrowserRouter>
    </Provider>
  );
};
