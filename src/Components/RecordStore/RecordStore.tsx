import { ReactComponent as ShopCenter } from "../../assets/shop-center.svg";
import React, { useEffect, useState } from "react";
import { GeoHit } from "../../types/StoreHit";

// Declaración del componente Record Store de tipo JSX.Element

//  1.- Recibe lo siguiente:
// Un elemento Record Store de tipo GeoHit
// Un onClick que recibe como argumento un objeto (Evento) y devuelve void
// CurrentRecordStore que indica que actualmente hay seleccionada una record store. Si existe es de tipo GeoHit si no, es null

const RecordStore = ({
  recordStore,
  onClick,
  currentRecordStore,
}: {
  recordStore: any;
  onClick: (store: GeoHit) => void;
  currentRecordStore?: GeoHit | null;
}): JSX.Element => {
  // Hooks
  // 1.- useState para indicar que hay una Record Store seleccionada
  // 2.- useEffect para setear la record store seleccionada si la hay

  const [selectedStore, setSelectedStore] = useState(false);

  useEffect(() => {
    setSelectedStore(recordStore.objectID === currentRecordStore?.objectID);
  }, [currentRecordStore]);

  return (
    <article
      className={`${
        selectedStore
          ? "bg-purple-100 hover:bg-purple-50 ring ring-purple-800"
          : "bg-white hover:bg-gray-50"
      } overflow-hidden shadow-lg rounded-lg m-0 cursor-pointer  m-1 p-4 py-0 flex`}
      onClick={() => onClick(recordStore)}
    >
      <ShopCenter className={"w-8 stroke-current text-purple-800"} />
      <div className="sm:p-6">
        <h2 className={"font-medium text-lg"}>{recordStore.fields?.name}</h2>
        <p className={"font-normal text-sm"}>
          {recordStore.fields?.city} {recordStore.fields?.countrycode}
        </p>
        <div className={"flex gap-2 my-2 flex-wrap"}>
          <span
            className={
              "bg-purple-100 text-sm font-normal text-purple-800 px-2 gap-13 rounded-full"
            }
          >
            {recordStore.fields?.hasclosed}
          </span>
        </div>
      </div>
    </article>
  );
};

export default RecordStore;
