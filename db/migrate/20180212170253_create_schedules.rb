class CreateSchedules < ActiveRecord::Migration[5.1]
  def change
    create_table :schedules do |t|
      t.references :schedulable, polymorphic: true

      t.date :date
      t.time :time

      t.string :rule
      t.string :interval

      t.text :day
      t.text :day_of_week

      t.datetime :until
      t.integer :count

      t.timestamps
    end
  end
end
