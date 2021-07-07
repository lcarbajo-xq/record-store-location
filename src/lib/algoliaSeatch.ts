import algoliasearch from "algoliasearch";

const indexName = 'Record Stores'

const searchClient = algoliasearch(
    process.env.REACT_APP_ALOGILA_APP_ID as string,
    process.env.REACT_APP_ALGOLIA_API_KEY as string
)

console.log( process.env.REACT_APP_ALOGILA_APP_ID)

export { indexName, searchClient }