import axios from 'axios';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './App.css';

const App = () => {
  const [choseMetaphor, setChosenMetaphor] = useState(null);
  const [chosenSinger, setChosenSinger] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [domain, setDomain] = useState('all');

  const handleChange = (event) => {
    setDomain(event.target.value);
  };

  const sendSearchRequest = () => {
    const results = {
      method: 'GET',
      url: 'http://localhost:3001/results',
      params: {
        metaphor: choseMetaphor,
        domain: domain,
        singer: chosenSinger,
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
          <li>Sinhala Metaphor search engine</li>
        </ul>
      </nav>
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
            <li className='form-li'>
              <select
                name='types'
                id='types'
                value={chosenSinger}
                onChange={(e) => setChosenSinger(e.target.value)}
                className="singer-select"
              >
                <option value={null}>සියලුම ගායකයන්</option>
                <option value='අමරදේව ඩබ්ලිව් ඩී'>අමරදේව ඩබ්ලිව් ඩී</option>
                <option value='අමරසිරි පීරිස්'>අමරසිරි පීරිස්</option>
                <option value='නන්දා මාලනී'>නන්දා මාලනී</option>
                <option value='එඩ්වඩ් ජයකොඩි'>එඩ්වඩ් ජයකොඩි</option>
                <option value='ටී එම් ජයරත්න'>ටී එම් ජයරත්න</option>
                <option value='වික්ටර් රත්නායක'>වික්ටර් රත්නායක</option>
                <option value='සුනිල් එදිරිසිංහ'>සුනිල් එදිරිසිංහ</option>
                <option value='කරුණාරත්න දිවුල්ගනේ'>කරුණාරත්න දිවුල්ගනේ</option>
              </select>
            </li>
            <li className='form-li' style={{height: '38.2px'}}>
              <button onClick={sendSearchRequest}>Search</button>
            </li>
          </ul>
          <div style={{margin: '24px', paddingTop: '20px'}}>
            <FormControl style={{marginLeft: '24px'}}>
              <FormLabel id="radio-buttons-group" style={{color: 'white'}}>Domain of the metaphor</FormLabel>
              <RadioGroup
                aria-labelledby="radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={domain}
                onChange={handleChange}
                className="radio-group"
              >
                <FormControlLabel value="all" control={<Radio />} label="Both domains" />
                <FormControlLabel value="source" control={<Radio />} label="Source domain" />
                <FormControlLabel value="target" control={<Radio />} label="Target domain" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        {documents && (
          <div className='search-results'>
            {documents.length > 0 ? (
              <p> Number of hits: {documents.length}</p>
            ) : (
              <p> No results found.</p>
            )}
            {documents.map((document) => (
              <div className='results-card'>
                <div className='results-text'>
                  <p style={{color: '#a0e0ff', fontSize: '20px', fontWeight: 'bold'}}>Metaphor: {document._source.metaphor}</p>
                  <hr />
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