class AddUserToProviders < ActiveRecord::Migration[5.1]
  def change
    add_column :providers, :user_id, :bigint, null: false
    add_index :providers, :user_id
  end
end
