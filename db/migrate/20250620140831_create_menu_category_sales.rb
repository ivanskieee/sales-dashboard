class CreateMenuCategorySales < ActiveRecord::Migration[7.2]
  def change
    create_table :menu_category_sales do |t|
      t.string :category
      t.integer :sales
      t.integer :sales_percentage

      t.timestamps
    end
  end
end
