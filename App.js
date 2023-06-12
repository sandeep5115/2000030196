import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [urls, setUrls] = useState('');
  const [numbers, setNumbers] = useState([]);

  const handleUrlsChange = (event) => {
    setUrls(event.target.value);
  };

  const fetchNumbers = async () => {
    try {
      const urlsArray = urls.split(',').map(url => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          return `http://${url.trim()}`;
        }
        return url.trim();
      });

      const response = await axios.get(`http://localhost:8008/numbers?url=${urlsArray.join('&url=')}`);
      setNumbers(response.data.numbers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Numbers App</h1>
      <p>URLs:</p>
      <input type="text" value={urls} onChange={handleUrlsChange} />
      <button onClick={fetchNumbers}>click for Numbers</button>
      {numbers.length > 0 && (
        <div>
          <h2>Numbers:</h2>
          <ul>
            {numbers.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
