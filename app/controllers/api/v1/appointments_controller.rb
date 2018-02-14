class Api::V1::AppointmentsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    binding.pry
    appointment = Appointment.new(construct_params)
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
    params.require(:appointment).permit(:name, :provider, :notes, :date, :time)
  end

  def construct_params
    ap = appointment_params
    day_of_week = ActionController::Parameters.new("monday"=>[""],
      "tuesday"=>[""], "wednesday"=>[""], "thursday"=>[""], "friday"=>[""],
      "saturday"=>[""], "sunday"=>[""]).permit!

    schedule_attributes = ActionController::Parameters.new("date(1i)"=>"2018",
      "date(2i)"=>"2", "date(3i)"=>"13", "time(1i)"=>"2018", "time(2i)"=>"2",
      "time(3i)"=>"13", "time(4i)"=>"17", "time(5i)"=>"48", "rule"=>"weekly",
      "until"=>"", "count"=>"0", "interval"=>"1", "day"=>["","monday"],
      "day_of_week"=>day_of_week).permit!

    ActionController::Parameters.new("name"=>"", "schedule_attributes"=>schedule_attributes).permit!
  end
end
