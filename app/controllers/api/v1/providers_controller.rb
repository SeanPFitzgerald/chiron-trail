class Api::V1::ProvidersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    provider = Provider.find_or_initialize_by(provider_params)

    if provider.id.nil?
      if provider.save
        render status: 201, json: {
          message: "Successfully created new provider.",
          provider: provider
        }.to_json
      else
        render json: { error: provider.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: provider.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def provider_params
    params.require(:provider).permit(:name, :provider_type)
  end
end
