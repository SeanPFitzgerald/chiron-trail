class Api::V1::AppointmentsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    appointment = Appointment.new(appointment_params)
    appointment.user = current_user

    if appointment.save
      render status: 201, json: {
        message: "Successfully created new appointment.",
        appointment: appointment
      }.to_json
    else
      render json: { error: appointment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:name, :provider, :notes)
  end
end
