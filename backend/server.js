import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/restaurants", restaurants) // General format for address (api/version/name of api)
app.use("*", (req, res) => res.status(404).json({ error: "not found"})) // * means wildcard if some other value is entered

export default app