import dotenv from "dotenv";
import knex from "knex";

dotenv.config();

const knexFile = require("../../knexfile");
const mode = "development";
const db = knexFile[mode];
// require("dotenv").config();
// const config = process.env.MODE || "development";
// const knexfile = require("../../knexfile");
// const db = knexfile[config];
// const database = knexfile[config];
// module.exports = require("knex")(database);


// export = ?
module.exports =  knex(db);

