Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  resources :treatments, only: [:new]

  namespace :api do
    namespace :v1 do
      resources :prescriptions, only: [:index, :create]
    end
  end
end
