import './navbar.css';
import { NavLink } from 'react-router-dom';
import { HomeFilled, LineHeightOutlined } from '@ant-design/icons';

const NavBar = () => {
  return (
    <div className="navbar-main">
      <NavLink style={{ textDecoration: 'none' }} to={'/'}>
        <div className="home">
          <HomeFilled />
          <p>Home</p>
        </div>
      </NavLink>
      <NavLink style={{ textDecoration: 'none' }} to={'/form'}>
        <div className="form-image">
          <img className="imageform" src="form1.png" />
          <p>Student Form</p>
        </div>
      </NavLink>
      <NavLink style={{ textDecoration: 'none' }} to={'/list'}>
        <div className="student-list">
          <img src="student.png" />
          <p>Student List</p>
        </div>
      </NavLink>

      <NavLink style={{ textDecoration: 'none' }}>
        <div className="login">
          <img src="log.png" />
          <p>SignIn</p>
        </div>
      </NavLink>
    </div>
  );
};

export default NavBar;
