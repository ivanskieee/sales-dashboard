Rails.application.routes.draw do
  namespace :api do
    resources :day_sales, only: [:index]
    resources :dining_preferences, only: [:index]
    resources :menu_category_sales, only: [:index]
    resources :monthly_sales, only: [:index]
    resources :top_menu_items, only: [:index]
  end
end
