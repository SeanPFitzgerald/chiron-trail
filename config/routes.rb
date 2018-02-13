Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  resources :prescriptions, only: [:new]
  resources :providers, only: [:new]
  resources :appointments, only: [:new]
  resources :wellness_checks, only: [:new]

  namespace :api do
    namespace :v1 do
      resources :prescriptions, only: [:index, :create]
      resources :providers, only: [:index, :create]
      resources :appointments, only: [:create]
      resources :wellness_checks, only: [:index, :create]
    end
  end
end
