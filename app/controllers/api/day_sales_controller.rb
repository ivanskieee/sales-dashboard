module Api
  class DaySalesController < ApplicationController
    def index
      render json: DaySale.all
    end
  end
end
