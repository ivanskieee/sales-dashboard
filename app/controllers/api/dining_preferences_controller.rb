module Api
  class DiningPreferencesController < ApplicationController
    def index
      render json: DiningPreference.all
    end
  end
end
