const { State, LngLat } = require("./schema");

// load and parse states/territories boundary data
const stateShapes = require("./resources/us-state-boundaries.json");
const stateNameToShape = new Map();
const stateNameToCenter = new Map();
stateShapes.forEach((shape) => {
  stateNameToShape.set(
    shape.fields.basename.toLowerCase(),
    shape.fields.st_asgeojson.coordinates[0].map(
      (arr) => new LngLat(parseFloat(arr[0]), parseFloat(arr[1]))
    )
  );
  let center = shape.geometry.coordinates;
  stateNameToCenter.set(
    shape.fields.basename.toLowerCase(),
    new LngLat(parseFloat(center[0]), parseFloat(center[1]))
  );
});

// helper function to parse CSV file
function parseCSV(str) {
  let parsedObject = [];
  lines = str.split("\r\n");
  let header = true;
  for (let line of lines) {
    if (header) {
      header = false;
      continue;
    }

    let data = line.split(",");
    let nameKey = data[1].trim().toLowerCase();

    parsedObject.push(
      new State(require("crypto").randomBytes(10).toString("hex"), {
        type: data[0].trim(),
        name: data[1].trim(),
        abbreviation: data[2].trim(),
        boundary: stateNameToShape.get(nameKey),
        center: stateNameToCenter.get(nameKey),
      })
    );
  }
  return parsedObject;
}

// load states from CSV file
let stateAndTerritoriesFile = require("fs").readFileSync(
  "./resources/us-states-territories.csv",
  "utf8"
);
let parsedDB = parseCSV(stateAndTerritoriesFile);

// export states data
exports.stateDB = parsedDB.sort((a, b) => a.name.localeCompare(b.name));
