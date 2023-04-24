let allowlist = ["http://localhost:3000", "http://example2.com"];

let corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  console.log("req.header(Origin)", req.header("Origin"));
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

export default corsOptionsDelegate;
