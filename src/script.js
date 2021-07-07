const fs = require("fs").promises;

const fn = async () => {
  let data = [];
  data = await fs.readFile("./public/record-stores.json", "utf8");
  data = JSON.parse(data);
  await data.map((register) => {
    register._geoloc = { lat: register.fields.lat, lng: register.fields.lng };
    return register;
  });
  console.log("ok");
  const dataToBeWrite = await JSON.stringify(data);
  await fs.writeFile("./public/record-stores-geoloc.json", dataToBeWrite);
}

fn();
