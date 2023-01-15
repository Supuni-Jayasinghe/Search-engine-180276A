import axios from 'axios';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [choseMetaphor, setChosenMetaphor] = useState(null);
  const [documents, setDocuments] = useState(null);

  const sendSearchRequest = () => {
    const results = {
      method: 'GET',
      url: 'http://localhost:3001/results',
      params: {
        metaphor: choseMetaphor,
      },
    };
    axios
      .request(results)
      .then((response) => {
        console.log(response.data);
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='app'>
      <nav>
        <ul className='nav-bar'>
          <li>Metaphor search engine</li>
        </ul>
      </nav>
      <p className='directions'>
        {' '}
        Search for metaphors using the following criteria:
      </p>
      <div className='main'>
        <div className='type-selector'>
          <ul>
            <li className='form-li'>
              <form>
                <label>
                  <input
                    className='form'
                    type='text'
                    placeholder='Enter metaphor'
                    value={choseMetaphor}
                    onChange={(e) => setChosenMetaphor(e.target.value)}
                  />
                </label>
              </form>
            </li>
            <li className='form-li' style={{width: '38.2px'}}>
              <button onClick={sendSearchRequest}>Search</button>
            </li>
          </ul>
        </div>
        {documents && (
          <div className='search-results'>
            {documents.length > 0 ? (
              <p> Number of hits: {documents.length}</p>
            ) : (
              <p> No results found. Try broadening your search criteria.</p>
            )}
            {documents.map((document) => (
              <div className='results-card'>
                <div className='results-text'>
                  <p>Metaphor: {document._source.metaphor}</p>
                  <p>Interpretation: {document._source.interpretation}</p>
                  <p>Source domain: {document._source.sourcedomain}</p>
                  <p>Target domain: {document._source.targetdomain}</p>
                  <p>Song name: {document._source.songname}</p>
                  <p>Singer: {document._source.singer}</p>
                  <p>Lyricist: {document._source.lyricist}</p>
                  <p>Composer: {document._source.composer}</p>
                  <p>Album: {document._source.album}</p>
                  <p>Year: {document._source.year}</p>
                  <p>Genre: {document._source.genre}</p>
                  <p style={{whiteSpace: 'pre-line'}}>Lyrics: {document._source.lyrics}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;