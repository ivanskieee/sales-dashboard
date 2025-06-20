class CreateTopMenuItems < ActiveRecord::Migration[7.2]
  def change
    create_table :top_menu_items do |t|
      t.string :name
      t.integer :orders
      t.string :category

      t.timestamps
    end
  end
end
