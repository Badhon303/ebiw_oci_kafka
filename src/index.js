const { Kafka } = require("kafkajs")
const express = require("express")
const path = require("path")
// const mongoose = require("mongoose")

const port = 3000
const app = express()

const staticPath = path.join(__dirname, "../public")

app.use(express.static(staticPath))
app.get("/light", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/templates/indw.html"))
})

//---------------------------------------------------mongo---------------------------------------------------------

// const MONGODB_URL = "mongodb://127.0.0.1:27017/cpudata"
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(MONGODB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     console.log("mongoDB connected: ", conn.connection.host)
//   } catch (error) {
//     console.log("mongoError: ", error.message)
//     process.exit(1)
//   }
// }

// connectDB()

// User model
// const CpuData = mongoose.model("CpuData", {
//   cpu: { type: Number },
// })

//---------------------------------------------------mongo end---------------------------------------------------------

const kafka = new Kafka({
  brokers: ["cell-1.streaming.us-ashburn-1.oci.oraclecloud.com:9092"],
  ssl: true,
  sasl: {
    mechanism: "plain",
    username:
      "ebiwocidev/bhaswati@ebiw.com/ocid1.streampool.oc1.iad.amaaaaaafcron3aai4sgpesswehlslv3724v677q777u4bq5kkukxnqg7yya",
    password: "h5oGJ1DIn3[hN#zl2wsW",
  },
})

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`)
})

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
})

const consumer = kafka.consumer({ groupId: "test-group" })

const run = async () => {
  io.on("connection", async (client) => {
    console.log("Connected", client)
    try {
      await consumer.connect()
      await consumer.subscribe({ topic: "ebiw123", fromBeginning: true })
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          let data = JSON.parse(message.value)
          console.log("data: ", data)
          await client.emit("event", data)
        },
      })
      client.on("disconnect", async () => {
        console.log("Client disconnected")
        await consumer.disconnect()
      })
    } catch (err) {
      console.log(err)
    }
  })
}

run().catch(console.error)
