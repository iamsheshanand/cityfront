import React, {useState} from "react";
import axios from "axios";
import './App.css';

const baseUrl = 'http://localhost:8080'
const axiosInstance = axios.create({
  baseURL: baseUrl,
})

function App() {
  const[letter, setLetter] = useState('');
  const [count, setCount] = useState('');
  const [error, setError] = useState('');
  const [cities, setCities] = useState([])

  const getCity =  async (e) => {
      e.preventDefault();
      setError('');
      setCount(null);


    if (!letter.match(/^[a-zA-Z]$/)) {
      setError('Please enter a letter');
    }
    try {
        const response = await axiosInstance.get(`/cities/count?letter=${letter}`);
        const {count, cities} = response.data;
        setCount(count)
        setCities(cities || [])
    }catch (err){
        setError(err.message+' Please check the url '+baseUrl);
    }
  };

  return (
      <div>
        <h1>City Counter</h1>
        <form onSubmit={getCity}>
            <label>Enter a letter:<input type="text" value={letter}
                     onChange={(e) => setLetter(e.target.value)}/>
            </label>
          <button type="submit">Get City Count</button>
        </form>
          {count && <p>Number of cities starting with letter "{letter}": {count}</p>}
          {cities.length>0 && <p>Cities : {cities.join(", ")}</p>}
          {error && <p className="error">{error}</p>}
      </div>
  )
}

export default App;
