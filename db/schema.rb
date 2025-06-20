# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_06_20_140904) do
  create_table "day_sales", force: :cascade do |t|
    t.string "day"
    t.integer "sales"
    t.string "status"
    t.float "percent_weekly_sales"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "dining_preferences", force: :cascade do |t|
    t.string "preference"
    t.string "customer_count_range"
    t.string "percentage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "menu_category_sales", force: :cascade do |t|
    t.string "category"
    t.integer "sales"
    t.integer "sales_percentage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "monthly_sales", force: :cascade do |t|
    t.string "month"
    t.integer "units_sold"
    t.integer "revenue"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "top_menu_items", force: :cascade do |t|
    t.string "name"
    t.integer "orders"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end
end
