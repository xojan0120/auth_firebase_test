class UsersController < ApplicationController
  before_action :logged_in_user

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end
end
