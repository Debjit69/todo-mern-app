ENDPOINT = process.env.ENDPOINT || "http://localhost:3001"
function api(path=""){
  return ENDPOINT + String(path)
}

module.exports = {
  ENDPOINT, api
}
