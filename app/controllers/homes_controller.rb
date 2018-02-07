class HomesController < ApplicationController
  before_action :authenticate_user!

  def index
    @current_user = current_user
  end
end
