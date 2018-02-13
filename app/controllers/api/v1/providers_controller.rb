class Api::V1::ProvidersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    provider = Provider.new(provider_params)
    provider.user = current_user
    
    if provider.save
      render status: 201, json: {
        message: "Successfully created new provider.",
        provider: provider
      }.to_json
    else
      render json: { error: provider.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def provider_params
    params.require(:provider).permit(:name, :provider_type)
  end
end
