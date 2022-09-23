import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { FinalScreen } from './pages/finalScreen/FinalScreen';
import { Questions } from './pages/questions/Questions';
import { Settings } from './pages/settings/Settings';
import  Layout  from './components/layout/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' exact element={ <Settings /> }/>
          <Route path='/questions' element={ <Questions /> } />
          <Route path='/score' element={ <FinalScreen /> } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
