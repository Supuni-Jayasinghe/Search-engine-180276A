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

  async function sendESRequest() {
    const body = await client.search({
      index: 'sinsongsdb',
      body: {
        query: {
          bool: {
            filter: [
              {
                match: { metaphor: passedMetaphor },
              },
            ],
          },
        },
      },
    });
    res.json(body.hits.hits);
  }
  sendESRequest();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.group(`Server started on ${PORT}`));