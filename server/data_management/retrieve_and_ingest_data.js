const express = require('express');
const router = express.Router();
const axios = require('axios');
const client = require('../elasticsearch/client');
require('log-timestamp');

const URL = `http://localhost:3000/songs`;

router.get('/sinsongsdb', async function (req, res) {
  console.log('Loading Application...');
  res.json('Running Application...');

  indexData = async () => {
    try {
      console.log('Retrieving data');
      // Send request to api
      const SINHALASONGS = await axios.get(`${URL}`, {
        headers: {
          'Content-Type': ['application/json', 'charset=utf-8'],
        },
      }); 

      console.log('Data retrieved!');

      results = SINHALASONGS.data;

      console.log('Indexing data...');

      results.map(
        async (results) => (
          (songObject = {
            id: results.id,
            singer: results.singer,
            songname: results.songname,
            lyricist: results.lyricist,
            composer: results.composer,
            album: results.album, 
            year: results.year,
            genre: results.genre,
            lyrics: results.lyrics, 
            metaphor: results.metaphor,
            interpretation: results.interpretation,
            sourcedomain: results.sourcedomain,
            targetdomain: results.targetdomain,
          }), 

          // to index transformed data
          await client.index({
            index: 'sinsongsdb',
            id: results.id,
            body: songObject,
          })
        )
      );

      if (SINHALASONGS.data.length) {
        indexData();
      } else {
        console.log('Data has been indexed successfully!');
      }
    } catch (err) {
      console.log(err);
    }

    console.log('Preparing for the next round of indexing...');
  };
  indexData();
});

module.exports = router;