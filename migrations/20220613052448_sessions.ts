import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("sessions", (table) => {
      table.increments();
      table.string("userId").notNullable();
      table.string("sessionToken").notNullable();
    });
  }
  
  export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("sessions");
  }
