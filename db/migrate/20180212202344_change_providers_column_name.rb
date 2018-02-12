class ChangeProvidersColumnName < ActiveRecord::Migration[5.1]
  def up
    rename_column :providers, :type, :provider_type
  end

  def down
    rename_column :providers, :provider_type, :type
  end
end
