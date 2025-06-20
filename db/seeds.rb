# Clear existing data (use cautiously in production)
DaySale.delete_all
DiningPreference.delete_all
MenuCategorySale.delete_all
MonthlySale.delete_all
TopMenuItem.delete_all

# Then recreate
DaySale.create!([
  { day: "Monday", sales: 9000, status: "Open", percent_weekly_sales: 20.45 },
  { day: "Tuesday", sales: 8500, status: "Open", percent_weekly_sales: 19.32 },
  { day: "Wednesday", sales: 8000, status: "Open", percent_weekly_sales: 18.18 },
  { day: "Thursday", sales: 7000, status: "Open", percent_weekly_sales: 15.91 },
  { day: "Friday", sales: 7000, status: "Open", percent_weekly_sales: 15.91 },
  { day: "Saturday", sales: 7000, status: "Open", percent_weekly_sales: 15.91 },
  { day: "Sunday", sales: 0, status: "Closed", percent_weekly_sales: 0.0 },
])

DiningPreference.create!([
  { preference: "Dine-in", customer_count_range: "80 to 100", percentage: "57%-61%" },
  { preference: "Take-out", customer_count_range: "30 to 40", percentage: "21%-29%" },
  { preference: "Delivery", customer_count_range: "15 to 25", percentage: "11%-18%" }
])

MenuCategorySale.create!([
  { category: "Meals", sales: 31150, sales_percentage: 70 },
  { category: "Desserts", sales: 6675, sales_percentage: 15 },
  { category: "Snacks", sales: 4450, sales_percentage: 10 },
  { category: "Drinks", sales: 2225, sales_percentage: 5 }
])

MonthlySale.create!([
  { month: "January", units_sold: 935, revenue: 187000 },
  { month: "February", units_sold: 1000, revenue: 200000 },
  { month: "March", units_sold: 1050, revenue: 210000 },
  { month: "April", units_sold: 975, revenue: 195000 },
  { month: "May", units_sold: 1050, revenue: 210000 }
])

TopMenuItem.create!([
  { name: "Kare-Kare", orders: 15, category: "Meal" },
  { name: "Pork Sisig", orders: 15, category: "Meal" },
  { name: "Pork Sinigang", orders: 18, category: "Meal" },
  { name: "Chicken Fillet Ala King", orders: 15, category: "Meal" },
  { name: "Chicken Adobo", orders: 12, category: "Meal" },
  { name: "Tofu Sisig", orders: 10, category: "Meal" },
  { name: "Carbonara", orders: 12, category: "Snack" },
  { name: "Halo-Halo", orders: 15, category: "Dessert" },
  { name: "Shakes", orders: 10, category: "Drink" },
  { name: "Tiramisu", orders: 8, category: "Dessert" },
  { name: "Chocolate Cake Slices", orders: 6, category: "Dessert" }
])
