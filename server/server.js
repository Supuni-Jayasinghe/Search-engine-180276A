const { Client } = require('@elastic/elasticsearch');
const client = require('./elasticsearch/client');
const express = require('express');
const cors = require('cors');

const app = express();

const data = require('./data_management/retrieve_and_ingest_data');

app.use('/ingest_data', data);

app.use(cors());

app.get('/results', (req, res) => {
  const passedMetaphor = req.query.metaphor;
  const domain = req.query.domain;
  const passedSinger = req.query.singer;

  var selectedSinger;
  if (passedSinger===undefined){
    selectedSinger = ['අමරදේව ඩබ්ලිව් ඩී','අමරසිරි පීරිස්','නන්දා මාලනී','එඩ්වඩ් ජයකොඩි','ටී එම් ජයරත්න','වික්ටර් රත්නායක','සුනිල් එදිරිසිංහ','කරුණාරත්න දිවුල්ගනේ']
  } else {
    selectedSinger = [passedSinger]
  }

  async function sendESRequest() {
    if (domain === 'source'){
      const body = await client.search({
        index: 'sinsongsdb',
        body: {
          query: {
            bool: {
              must: [
                {
                  match_bool_prefix: {
                    sourcedomain: passedMetaphor
                  }
                },
                {
                  terms: {singer: selectedSinger}
                }
              ]
            }
          }
        },
      });
    res.json(body.hits.hits);
    } else if (domain === 'target'){
      const body = await client.search({
        index: 'sinsongsdb',
        body: {
          query: {
            bool: {
              must: [
                {
                  match_bool_prefix: {
                    targetdomain: passedMetaphor
                  }
                },
                {
                  terms: {singer: selectedSinger}
                }
              ]
            }
          }
        },
      });
      res.json(body.hits.hits);
    } else {
      const body = await client.search({
        index: 'sinsongsdb',
        body: {
          query: {
            bool: {
              must: [
                {
                  multi_match: {
                    query: passedMetaphor,
                    type: 'bool_prefix',
                    fields: ['sourcedomain', 'targetdomain']
                  }
                },
                {
                  terms: {singer:selectedSinger}
                }
              ]
            }
          }
        },
      });
      res.json(body.hits.hits);
    }
  }
  sendESRequest();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.group(`Server started on ${PORT}`));