class FirebaseController < ApplicationController
  before_action :logged_in_user, only: [:destroy]

  # GET /login
  def new
    redirect_to users_path if logged_in?
  end

  def create
    if decoded_token = authenticate_firebase_id_token
      user = yield(decoded_token)
      log_in(user)
      flash[:success] = 'ログインしました。'
      redirect_back_or(users_path)
    else
      flash[:danger] = 'ログインできませんでした。'
      redirect_to login_url
    end
  end

  def destroy
    log_out if logged_in?
    redirect_to login_url
  end
end
