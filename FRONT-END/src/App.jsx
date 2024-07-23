import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/StudentNavBar/navbar';
import Home from './Pages/HomePage/home';
import Form from './Pages/Student-Form-Page/form';
import StudentList from './Pages/Students-Page/student-list';
import Details from './Pages/Stud-Details-Page/details';
import Footer from './components/StudentFooter/footer';

const App = () => {
  return (
    <div className="app-main">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/list" element={<StudentList />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
