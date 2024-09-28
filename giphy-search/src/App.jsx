import NavBar from './components/NavBar'
import GifContainer from './components/GifContainer'
import GifSearch from './components/GifSearch'
import { handleFetch } from './utils';
import { useState, useEffect } from 'react';
// import API_KEY from './config'; // I coomented this outwe no longer need this here because we are using the server.
// import { API_KEY } from '../../server/';

// We need to change this to reflect the server's route
// const URL = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&offset=0&rating=g&bundle=messaging_non_clips`
// Remember that you set up the proxy in the vite.config.js file, this allows just to use the end point without the full URL
const URL = `/api/gifs`;// I added this line to connect to the server

function App() {
  const [gifs, setGifs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const doFetch = async () => {
      const [data, error] = await handleFetch(URL);
      if (error) setErrorMessage(error.message);
      if (data) setGifs(data.data);
    }
    doFetch();
  }, []);

  return (
    <div>
      <NavBar color='black' title="Giphy Search" />
      <div className="ui container">
        <GifContainer gifs={gifs} />
      </div>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </div>
  );
}

export default App;
