class Api::V1::WellnessChecksController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    check = WellnessCheck.new(wellness_check_params)
    check.user = current_user

    if check.save
      render status: 201, json: {
        message: 'Successfully created new wellness check.',
        wellness_check: check
      }.to_json
    else
      render json: { error: check.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def wellness_check_params
    params.require(:wellness_check).permit(:mood, :energy, :sociability, :clear_mindedness, :date, :notes)
  end
end
