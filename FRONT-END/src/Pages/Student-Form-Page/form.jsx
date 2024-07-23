import { useState } from 'react';
import { Button, Input } from 'antd';
import './form.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Form = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    Name: '',
    Age: '',
    Dob: '',
    Course: '',
  });

  const onChange = (e, key) => {
    setformData({ ...formData, [key]: e.target.value });
  };

  const OnBtnClick = async e => {
    try {
      const response = await axios.post(
        'http://localhost:6001/student',
        formData
      );
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('There was an error!', e);
    }
  };

  return (
    <div className="form-main">
      <div className="form">
        <div className="name">
          <label>NAME *</label>
          <Input onChange={e => onChange(e, 'Name')} />
        </div>
        <div className="age">
          <label>AGE</label>
          <Input onChange={e => onChange(e, 'Age')} />
        </div>
        <div className="dob">
          <label>DATE OF BIRTH</label>
          <Input onChange={e => onChange(e, 'Dob')} />
        </div>
        <div className="course">
          <label>COURSE *</label>
          <Input onChange={e => onChange(e, 'Course')} />
        </div>
        <Button className="button" type="primary" onClick={OnBtnClick}>
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default Form;
