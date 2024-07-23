import './student-list.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Input, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async (page, limit) => {
    const response = await axios.get(
      `http://localhost:6001/student?page=${page}&limit=${limit}`
    );
    setList(response.data.students);
    setTotal(response.data.total);
  };
  console.log(list);

  const onPageChange = newPage => {
    if (newPage > 0 && newPage <= Math.ceil(total / limit)) {
      setPage(newPage);
    }
  };

  const onSearch = e => {
    setSearch(e.target.value);
  };

  const onSearchClick = async () => {
    const response = await axios.get(
      `http://localhost:6001/student?name=${search}`
    );
    setList(response.data.students);
  };

  useEffect(() => {
    fetchData(page, limit);
  }, [page, limit]);

  return (
    <div className="student-list-main">
      <h2>OUR SCHOOL STUDENT LIST</h2>
      <div className="search">
        <Input onChange={onSearch} placeholder="Search Students" />
        <Button onClick={onSearchClick} type="primary">
          Search
        </Button>
      </div>
      <div className="list">
        {list.map((item, index) => {
          return (
            <div
              onClick={() => {
                navigate(`/details/${item.StudentId}`);
              }}
              className="cards"
              key={index}
            >
              <div className="name">
                <h4>NAME</h4>
                <p>{item.Name}</p>
              </div>
              <div className="age">
                <h4>AGE</h4>
                <p>{item.Age}</p>
              </div>
              <div className="dob">
                <h4>DATE OF BIRTH</h4>
                <p>{item.Dob}</p>
              </div>
              <div className="course">
                <h4>COURSE</h4>
                <p>{item.Course}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <Pagination
          defaultCurrent={1}
          total={total}
          defaultPageSize={6}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default StudentList;
