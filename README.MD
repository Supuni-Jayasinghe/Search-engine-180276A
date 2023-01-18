# Search engine for metaphors of Sinhala songs

This repository contains the web crawler and the search engine for metaphors built using ElasticSearch.
This search engine provides search results based on target domain and source domain of metaphors.

# Demo

- Create an Elastic cloud deployment
- Create an index called `sinsongsdb` with the mapping using `Kibana Dev Tools`
- Clone the Repository - `git clone https://github.com/Supuni-Jayasinghe/Search-engine-180276A.git`
- Change the directory to repository - `cd Search-engine-180276A`
- Execute `npm install` within the `Search-engine-180276A` directory and the `client` directory
- Change the `cloudID, username, password` in `config/default.json` with your cloud ID and the credential of the deployment
- To create REST API execute `npm install -g json-server` and run `json-server --watch db.json` in the `Search-engine-180276A` directory
- Start the server by executing `npm start`
- Copy and paste `http://localhost:3001/ingest_data/sinsongsdb` url in the address bar of your browser and hit enter. Then it will start to retrieve, transform, and ingest data into Elasticsearch
- Start the server again by executing `npm start`
- Execute `npm install` within the `client` directory to start the client. It will redirect you to ` http://localhost:3000`
- Enter target domain or source domain to retrieve a relevant metaphor
