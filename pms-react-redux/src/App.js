import Employee from './components/Employee/Employee.jsx';
import Project from './components/Project/Project';
import Navingation from './components/Shared/Navigation.jsx';
import { Provider } from 'react-redux';
import { store } from './actions/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { ToastProvider } from 'react-toast-notifications';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ToastProvider autoDismiss={true}>
          <Navingation />
        </ToastProvider>
      </Provider>
    </>
  );
};

export default App;
