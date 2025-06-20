class CreateMonthlySales < ActiveRecord::Migration[7.2]
  def change
    create_table :monthly_sales do |t|
      t.string :month
      t.integer :units_sold
      t.integer :revenue

      t.timestamps
    end
  end
end
