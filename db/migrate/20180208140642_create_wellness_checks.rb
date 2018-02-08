class CreateWellnessChecks < ActiveRecord::Migration[5.1]
  def change
    create_table :wellness_checks do |t|
      t.belongs_to :user, null: false
      t.integer :mood, null: false
      t.integer :energy, null: false
      t.integer :sociability, null: false
      t.integer :clear_mindedness, null: false
      t.date :date, null: false
      t.text :notes

      t.timestamps
    end
  end
end
