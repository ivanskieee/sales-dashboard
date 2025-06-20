module Api
  class MenuCategorySalesController < ApplicationController
    def index
      render json: MenuCategorySale.all
    end
  end
end
