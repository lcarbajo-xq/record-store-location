import "./App.css";

import {
  InstantSearch,
  Configure,
  Hits,
  RefinementList,
} from "react-instantsearch-dom";

import Header from "./Components/Header/Header";
import RecordStore from "./Components/RecordStore/RecordStore";
import Map from "./Components/Map/Map";
import { indexName, searchClient } from "./lib/algoliaSeatch";
import { useState } from "react";
import { GeoHit } from "../types/StoreHit";

function App() {
  const [currentStore, setCurrentStore] = useState<GeoHit | null>(null);

  return (
    <div className="flex w-full h-full flex-col">
      <Header />

      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <Configure aroundLatLngViaIP={true} />
        <div className={"flex h-full w-full"}>
          <div className={"flex flex-col w-1/4"}>
            <div>
              <RefinementList attribute={"fields.countrycode"} />
            </div>

            <Hits<GeoHit>
              hitComponent={(hit) => (
                <RecordStore
                  key={hit.hit.objectID}
                  recordStore={hit.hit}
                  onClick={(store) => setCurrentStore(store)}
                  currentRecordStore={currentStore}
                />
              )}
            />
          </div>
          <div className={"flex flex-col w-full"}>
            <Map
              currentStore={
                currentStore ? currentStore.geometry.coordinates : [0, 0]
              }
              onClickMarker={(storeCoordinate) => {}}
            />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

export default App;
