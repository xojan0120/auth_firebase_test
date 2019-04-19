class SessionsController < FirebaseController
  # POST /login
  def create
    super do |decoded_token|
      User.find_by(uid: decoded_token['uid'])
    end
  end

  # DELETE /logout
  def destroy
    flash[:success] = 'ログアウトしました。'
    super
  end
end
