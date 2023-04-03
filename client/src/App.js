import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [description, setDescription] = useState('');
  const [resumes, setResumes] = useState([]);
  const [results, setResults] = useState([]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleResumeChange = (e) => {
    const files = e.target.files;
    setResumes(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('description', description);
    for (let i = 0; i < resumes.length; i++) {
      formData.append('resumes', resumes[i]);
    }
    axios
      .post('http://localhost:5000/match', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': 'http:localhost:3000',
        },
      })
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Job Matching App</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='description'>Job Description:</label>
          <textarea
            id='description'
            name='description'
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label htmlFor='resumes'>Resumes:</label>
          <input
            type='file'
            id='resumes'
            name='resumes'
            onChange={handleResumeChange}
            multiple
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Resume</th>
              <th>Match Percentage</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.filename}</td>
                <td>{Math.floor(result.match_percentage)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
