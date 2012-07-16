# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120712032646) do

  create_table "events", :force => true do |t|
    t.string   "name",        :limit => 25
    t.text     "description",               :null => false
    t.datetime "begin_time"
    t.datetime "end_time"
    t.string   "location",    :limit => 25
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.integer  "department_id"
    t.integer  "age"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end