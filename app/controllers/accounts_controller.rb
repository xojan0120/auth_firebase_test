class AccountsController < FirebaseController
  # POST /accounts
  def create
    super do |decoded_token|
      User.create(
        email: decoded_token['decoded_token'][:payload]['email'],
        uid:   decoded_token['uid']
      )
    end
  end

  # DELETE /accounts
  def destroy
    current_user.destroy
    flash[:danger] = 'アカウント削除しました。'
    super
  end
end
