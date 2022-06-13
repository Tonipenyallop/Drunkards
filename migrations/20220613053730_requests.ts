import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("requests", (table) => {
      table.increments();
      table.integer("userId").notNullable()
      table.string("start_location").notNullable();
      table.string("destination").notNullable();
      table.string("pickupTime").notNullable();
    });
  } 
  
  export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("requests");
  }
