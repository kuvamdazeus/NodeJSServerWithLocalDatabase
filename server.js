const express = require('express') // Express module
const fs = require('fs') // Used to read/write the local_data.json file
const cors = require('cors') // Used in middlewares

const FILE = './local_data.json'

// Setting up functions for local database
const readData = () => {
    const fileData = fs.readFileSync(FILE)
    const jsonData = JSON.parse(fileData)
    return jsonData
}

const writeData = (jsonData) => {
    const fileData = fs.readFileSync(FILE) // Read the file
    const json = JSON.parse(fileData) // Parse the string file body into a json object type (to perform json operations on it if needed)

    json.push(jsonData) // Push the data (a Json operation or a lis operation)
    fs.writeFileSync(FILE, JSON.stringify(json, null, 2))

}

// APP CONFIG
const app = express()
const PORT = 8000 // Can use "process.env.PORT" if using a server
// const PORT = process.env.PORT || 8000

// MIDDLEWARE
app.use(cors())
app.use(express.json())

// API ENDPOINTS
app.get('/data', (req, res) => { // GET Enpoint setted up at 'http(s)://.../data

    const data = readData() // Read the data using readData() function defined above
    res.status(200).send(data) // send a 200 status and data in response

})

app.post('/post/data', (req, res) => { // POST Enpoint setted up at 'http(s)://.../post/data
    writeData(req.body)
    res.status(201).send("Data saved")
})

// LISTENER
app.listen(PORT, () => { console.log("Listening at port:", PORT) }) // Listen at the specified port
