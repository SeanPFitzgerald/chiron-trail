class CreateProviders < ActiveRecord::Migration[5.1]
  def change
    create_table :providers do |t|
      t.string :name, null: false
      t.string :type, null: false

      t.timestamps
    end
  end
end
