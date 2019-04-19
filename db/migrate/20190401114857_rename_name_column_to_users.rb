class RenameNameColumnToUsers < ActiveRecord::Migration[5.1]
  def change
    rename_column :users, :name, :email
  end
end
