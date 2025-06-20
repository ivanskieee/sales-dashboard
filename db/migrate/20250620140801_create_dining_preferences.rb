class CreateDiningPreferences < ActiveRecord::Migration[7.2]
  def change
    create_table :dining_preferences do |t|
      t.string :preference
      t.string :customer_count_range
      t.string :percentage

      t.timestamps
    end
  end
end
