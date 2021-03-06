# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180215155939) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appointments", force: :cascade do |t|
    t.string "name"
    t.text "notes"
    t.bigint "provider_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["provider_id"], name: "index_appointments_on_provider_id"
    t.index ["user_id"], name: "index_appointments_on_user_id"
  end

  create_table "medications", force: :cascade do |t|
    t.string "name", null: false
    t.string "dosage", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "prescriptions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "medication_id", null: false
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["medication_id"], name: "index_prescriptions_on_medication_id"
    t.index ["user_id"], name: "index_prescriptions_on_user_id"
  end

  create_table "providers", force: :cascade do |t|
    t.string "name", null: false
    t.string "provider_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_providers_on_user_id"
  end

  create_table "schedules", force: :cascade do |t|
    t.string "schedulable_type"
    t.bigint "schedulable_id"
    t.date "date"
    t.time "time"
    t.string "rule"
    t.string "interval"
    t.text "day"
    t.text "day_of_week"
    t.datetime "until"
    t.integer "count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["schedulable_type", "schedulable_id"], name: "index_schedules_on_schedulable_type_and_schedulable_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", default: "", null: false
    t.string "phone_number"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "wellness_checks", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "mood", null: false
    t.integer "energy", null: false
    t.integer "sociability", null: false
    t.integer "clear_mindedness", null: false
    t.date "date", null: false
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_wellness_checks_on_user_id"
  end

end
