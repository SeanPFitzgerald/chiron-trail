class CreatePrescriptions < ActiveRecord::Migration[5.1]
  def change
    create_table :prescriptions do |t|
      t.belongs_to :user, null: false
      t.belongs_to :medication, null: false
      t.text :notes

      t.timestamps
    end
  end
end
