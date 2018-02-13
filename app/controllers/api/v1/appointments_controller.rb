class Api::V1::AppointmentsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    appointment = Appointment.new(appointment_params)
    appointment.user = current_user
binding.pry
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
    params.require(:appointment).permit(:name, :provider, :notes, schedule_attributes: Schedulable::ScheduleSupport.param_names)
  end

  def construct_appointment_schedule
    binding.pry
    days_of_week = ActionController::Parameters.new("monday"=>[""], "tuesday"=>[""], "wednesday"=>[""], "thursday"=>[""], "friday"=>[""], "saturday"=>[""], "sunday"=>[""]).permit!
    schedule_attributes = ActionController::Parameters.new("date(1i)"=>"",
      "date(2i)"=>"", "date(3i)"=>"", "time(1i)"=>"", "time(2i)"=>"",
      "time(3i)"=>"", "time(4i)"=>"", "time(5i)"=>"", "rule"=>"", "until"=>"",
      "count"=>"", "interval"=>"1", "day"=>["", "", "", ""], "day_of_week"=>days_of_week).permit!
    appointment = ActionController::Parameters.new("name"=>"", "schedule_attributes"=>schedule_attributes).permit!
  end
end
