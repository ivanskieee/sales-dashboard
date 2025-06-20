module Api
  class TopMenuItemsController < ApplicationController
    def index
      render json: TopMenuItem.all
    end
  end
end
