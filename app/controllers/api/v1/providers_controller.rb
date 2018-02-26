class Api::V1::ProvidersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:index, :create]

  def index
    providers = Provider.where(user: current_user)

    render json: providers
  end

  def create
    if params[:method].nil?
      provider = Provider.new(provider_params)
      provider.user = current_user

      if provider.save
        render status: 201, message: 'Successfully created new provider.',
          json: Provider.where(user: current_user)
      else
        render json: { error: provider.errors.full_messages }, status: :unprocessable_entity
      end
    elsif params[:method] == 'PATCH'
      pp = provider_params

      provider = Provider.find(pp[:id])

      if provider.update(pp)
        render status: 200, message: 'Successfully updated provider.',
          json: Provider.where(user: current_user)
      else
        render json: { error: provider.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  private

  def provider_params
    params.require(:provider).permit(:id, :name, :provider_type)
  end
end
