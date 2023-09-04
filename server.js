let express = require("express");
let app = express();
require("./dbConnection");
let router = require("./routers/router");

let port = process.env.PORT || 3000;

const { Socket } = require("socket.io");
let http = require("http").createServer(app);
let io = require("socket.io")(http);

app.use(express.static(__dirname + "/"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/kitchen", router);

io.on("connection", (socket) => {
	console.log("user connected");
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});

	setInterval(() => {
		socket.emit("number", parseInt(Math.random() * 10));
	}, 1000);
});

http.listen(port, () => {
	console.log("server start");
	//runDB();
});

/* Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
	version: ServerApiVersion.v1,
	strict: true,
	deprecationErrors: false,
	},
});
*/
/*
async function runDB() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		//await client.connect();
		collection = client.db().collection("kitchen");
		//console.log(collection);

		// Send a ping to confirm a successful connection
		//await client.db("admin").command({ ping: 1 });
		//console.log(
		//  "Pinged your deployment. You successfully connected to MongoDB!"
		//);
	} catch (err) {
		console.error(err);
	}

	//finally {
	// Ensures that the client will close when you finish/error
	//  await client.close();
	//}
}
*/

// app.get("/", (req, res) => {
// 	res.render("index.html");
// });

// app.get("/api/kitchen", (req, res) => {
// 	getAllKitchens((err, result) => {
// 		if (!err) {
// 			res.json({
// 				statusCode: 200,
// 				data: result,
// 				message: "get all kitchen success",
// 			});
// 		}
// 	});
// });

// app.post("/api/kitchen", (req, res) => {
// 	let kitchen = req.body;
// 	postKitchen(kitchen, (err, result) => {
// 		if (!err) {
// 			result.json({ statuscode: 201, data: result, message: "success" });
// 		}
// 	});
// });

// app.get("/api/kitchens", (req, res) => {
// 	getAllKitchens_Promise().then((result) => {
// 		console.log(result);
// 	});
// });

// function postKitchen(kitchen, callback) {
// 	collection.insertOne(kitchen, callback);
// }

// function getAllKitchens(callback) {
// 	collection.find({}).toArray(callback);
// }

/*
let getAllKitchens_Promise = () => {
	return new Promise((resolve, reject) => {
	getAllKitchens((err, result) => {
		if (!err) return resolve(result);
		});
	});
};

getAllKitchens_Promise().then((result) => {
	console.log(result);
});
*/
