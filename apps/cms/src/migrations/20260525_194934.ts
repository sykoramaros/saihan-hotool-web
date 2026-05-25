import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`home_content_locales\` ADD \`reserve_button\` text;`)
  await db.run(sql`ALTER TABLE \`home_content_locales\` ADD \`pricing_title\` text;`)
  await db.run(sql`ALTER TABLE \`home_content_locales\` ADD \`gallery_title\` text;`)
  await db.run(sql`ALTER TABLE \`footer_content_locales\` ADD \`reservation_label\` text;`)
  await db.run(sql`ALTER TABLE \`order_modal_content_locales\` ADD \`contact_step\` text;`)
  await db.run(sql`ALTER TABLE \`order_modal_content_locales\` ADD \`continue_button\` text;`)
  await db.run(sql`ALTER TABLE \`order_modal_content_locales\` ADD \`back_button\` text;`)
  await db.run(sql`ALTER TABLE \`order_modal_content_locales\` ADD \`economy_price\` text;`)
  await db.run(sql`ALTER TABLE \`order_modal_content_locales\` ADD \`superior_price\` text;`)
  await db.run(sql`ALTER TABLE \`order_modal_content_locales\` ADD \`deluxe_price\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`home_content_locales\` DROP COLUMN \`reserve_button\`;`)
  await db.run(sql`ALTER TABLE \`home_content_locales\` DROP COLUMN \`pricing_title\`;`)
  await db.run(sql`ALTER TABLE \`home_content_locales\` DROP COLUMN \`gallery_title\`;`)
  await db.run(sql`ALTER TABLE \`footer_content_locales\` DROP COLUMN \`reservation_label\`;`)
  await db.run(sql`ALTER TABLE \`order_modal_content_locales\` DROP COLUMN \`contact_step\`;`)
  await db.run(sql`ALTER TABLE \`order_modal_content_locales\` DROP COLUMN \`continue_button\`;`)
  await db.run(sql`ALTER TABLE \`order_modal_content_locales\` DROP COLUMN \`back_button\`;`)
  await db.run(sql`ALTER TABLE \`order_modal_content_locales\` DROP COLUMN \`economy_price\`;`)
  await db.run(sql`ALTER TABLE \`order_modal_content_locales\` DROP COLUMN \`superior_price\`;`)
  await db.run(sql`ALTER TABLE \`order_modal_content_locales\` DROP COLUMN \`deluxe_price\`;`)
}
