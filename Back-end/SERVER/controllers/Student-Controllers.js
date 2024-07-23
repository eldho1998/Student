const sql = require('mssql');
const { poolPromise } = require('../db');

// 1. Get Students
module.exports.getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 6, name } = req.query;
    const offset = (page - 1) * limit;
    const pool = await poolPromise;

    const countResult = await pool
      .request()
      .query('SELECT COUNT(*) AS total FROM Students');
    const totalStudents = countResult.recordset[0].total;
    let result;
    if (name) {
      const request = pool.request();

      // Prevent SQL Injection
      request.input('name', sql.VarChar, `%${name.toLowerCase()}%`);
      request.input('offset', sql.Int, parseInt(offset, 10));
      request.input('limit', sql.Int, parseInt(limit, 10));

      result = await request.query(
        `SELECT * FROM Students 
            WHERE LOWER(Name) LIKE @name
            ORDER BY StudentId
            OFFSET @offset ROWS 
            FETCH NEXT @limit ROWS ONLY`
      );

      // result = await pool.request().query(
      //   `SELECT * FROM Students
      // WHERE LOWER(Name) LIKE '%'
      //     +${searchStudent}+ '%'
      //   ORDER BY StudentId
      //   OFFSET ${offset} ROWS
      //   FETCH NEXT ${limit} ROWS ONLY`
      // );
    } else {
      result = await pool.request().query(`SELECT * FROM Students 
    ORDER BY StudentId
    OFFSET ${offset} ROWS 
    FETCH NEXT ${limit} ROWS ONLY`);
    }

    res.json({
      students: result.recordset,
      total: totalStudents,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 2. Get student by id
module.exports.getStudentById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { id } = req.params;
    const result = await pool
      .request()
      .input(`id`, sql.Int, id)
      .query(`SELECT * FROM Students WHERE StudentId=@id`);
    // res.json(result.recordset);
    if (result.recordset.length === 0) {
      return res.status(404).send({ message: 'Student not found' });
    }

    res.send(result.recordset[0]);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//3. Create(post) a student by admin
module.exports.postStudent = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { Name, Age, Dob, Course } = req.body;
    const result = await pool
      .request()
      .input('Name', sql.NVarChar, Name)
      .input('Age', sql.Int, Age)
      .input('Dob', sql.Date, Dob)
      .input('Course', sql.NVarChar, Course)
      .query(
        'INSERT INTO Students (Name,Age,Dob,Course) VALUES (@Name,@Age,@Dob,@Course)'
      );
    res.status(201).send({ message: 'Student created successfully', result });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//4. Update(Patch) a student by id
module.exports.patchStudentById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { id } = req.params;
    const { Name, Age, Dob, Course } = req.body;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .input('Name', sql.NVarChar, Name)
      .input('Age', sql.Int, Age)
      .input('Dob', sql.Date, Dob)
      .input('Course', sql.NVarChar, Course)
      .query(
        'UPDATE Students SET Name=@Name,Age=@Age,Dob=@Dob,Course=@Course WHERE StudentId=@id'
      );
    res.send({ message: 'Student updated successfully', result });
  } catch (err) {}
};

//5. delete a student by id

module.exports.deleteStudentById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { id } = req.params;
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Students WHERE StudentId = @id');
    res.send({ message: 'Student Deleted', result });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
