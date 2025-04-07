const { connectDb } = require("./config/db")
const app =require("./index")


const port = 3000;


app.listen(port, async()=> {
    await connectDb()
    console.log("server started on ", port)
})

