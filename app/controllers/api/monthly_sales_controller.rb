module Api
  class MonthlySalesController < ApplicationController
    def index
      render json: MonthlySale.all
    end
  end
end
