class CreateDaySales < ActiveRecord::Migration[7.2]
  def change
    create_table :day_sales do |t|
      t.string :day
      t.integer :sales
      t.string :status
      t.float :percent_weekly_sales

      t.timestamps
    end
  end
end
