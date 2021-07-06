import './App.css';
import { ReactComponent as Logo } from './assets/logo.svg'

import {
  InstantSearch,
  Configure,
  Hits,
  RefinementList
} from 'react-instantsearch-dom'
import { indexName, searchClient } from './assets/lib/algoliaSeatch';

function App() {
  return (
    <div className="flex w-full h-full flex-col">

      <header className="flex w-full">
        <Logo className={'w-2/10 h-2/10'} />
      </header>

      <InstantSearch searchClient={ searchClient } indexName={'Record Stores' }>

      <div className={'flex h-full w-full bg-red-50'}>
        <div className={'flex flex-col w-1/4 bg-blue-50'}>
          <Hits hitComponent={ hit => <div>{ hit.hit.objectID }</div>}/>
        </div>
        <div className={'flex flex-col w-full bg-green-50'}>
        </div>
      </div>
      </InstantSearch>

      </div>
  );
}

export default App;
