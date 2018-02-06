class CreateMedications < ActiveRecord::Migration[5.1]
  def change
    create_table :medications do |t|
      t.string :name, null: false
      t.string :dosage, null: false

      t.timestamps
    end
  end
end
