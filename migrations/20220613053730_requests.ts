import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("requests", (table) => {
      table.increments();
      table.integer("userId").notNullable()
      table.string("startLocation").notNullable();
      table.string("destination").notNullable();
      table.dateTime("pickupTime").notNullable();
      table.boolean("is_deleted").notNullable();
      table.string("reservationID").notNullable();
    });
  } 
  
  export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("requests");
  }
