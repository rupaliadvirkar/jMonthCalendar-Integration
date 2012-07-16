class CreateEvents < ActiveRecord::Migration
  def self.up
    create_table :events do |t|
      t.string :name, :limit => 25
      t.text :description,:null => false
      t.datetime :begin_time, :null=>true
      t.datetime :end_time, :null=>true
      t.string :location, :limit => 25
      t.timestamps
    end
  end
  
  def self.down
    drop_table :events
  end
end
