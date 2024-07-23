import './details.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);

  const fetchDetailsById = async () => {
    const response = await axios.get(`http://localhost:6001/student/${id}`);
    setDetails(response.data);
  };

  useEffect(() => {
    fetchDetailsById();
  }, []);
  console.log(details);

  return (
    <div className="details">
      <h1>Student Details Page</h1>
      <div className="detailed-card">
        <div className="Studentt">
          <div className="namee">
            <label>Name of the Student</label>
            <h4>{details.Name}</h4>
          </div>
          <div className="agee">
            <label>Age</label>
            <h4>{details.Age}</h4>
          </div>
          <div className="dobb">
            <label>Date of Birth</label>
            <h4>{details.Dob}</h4>
          </div>
          <div className="coursee">
            <label>Course</label>
            <h4>{details.Course}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
