class CreateAppointments < ActiveRecord::Migration[5.1]
  def change
    create_table :appointments do |t|
      t.string :name
      t.text :notes
      t.belongs_to :provider, null: false
      t.belongs_to :user, null: false

      t.timestamps
    end
  end
end
