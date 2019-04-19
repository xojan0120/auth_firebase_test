Rails.application.routes.draw do
  root 'firebase#new'

  get    '/login',    to: 'firebase#new'
  post   '/login',    to: 'sessions#create'
  delete '/logout',   to: 'sessions#destroy'
  post   '/accounts', to: 'accounts#create'
  delete '/accounts', to: 'accounts#destroy'

  resources :users, only: :index
end
