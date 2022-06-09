import dotenv from "dotenv";
import knex from "knex";

dotenv.config();

const knexFile = require("../../knexfile");
const mode = "development";
const db = knexFile[mode];

// export = ?
export default knex(db);
