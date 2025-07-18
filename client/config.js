ENDPOINT = process.env.ENDPOINT || "https://todo-mern-app-c2ev.onrender.com"
function api(path=""){
  return ENDPOINT + String(path)
}

module.exports = {
  ENDPOINT, api
}
