class Api::V1::AppointmentsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    appointments = Appointment.where(user: current_user)

    render json: appointments, include: [:schedule, :provider]
  end

  def create
    appointment = Appointment.new(construct_params)
    appointment.user = current_user
    appointment.provider = Provider.find(provider_params['id'])

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
    params.require(:appointment).permit(:name, :notes, :date, :time, :rule, day: [])
  end

  def provider_params
    params.require(:appointment).require(:provider).permit(:id)
  end

  def construct_params
    ap = appointment_params
    day_of_week = ActionController::Parameters.new("monday"=>[""],
      "tuesday"=>[""], "wednesday"=>[""], "thursday"=>[""], "friday"=>[""],
      "saturday"=>[""], "sunday"=>[""]).permit!

    schedule_attributes = ActionController::Parameters.new("date(1i)"=>ap['date(1i)'],
      "date(2i)"=>ap['date(2i)'], "date(3i)"=>ap['date(3i)'], "time(1i)"=>ap['time(1i)'], "time(2i)"=>ap['time(2i)'],
      "time(3i)"=>ap['time(3i)'], "time(4i)"=>(ap['time(4i)'].to_i+5).to_s, "time(5i)"=>ap['time(5i)'], "rule"=>ap['rule'],
      "until"=>"", "count"=>"0", "interval"=>"1", "day"=>ap['day'],
      "day_of_week"=>day_of_week).permit!

    ActionController::Parameters.new("name"=>ap['name'], "notes"=>ap['notes'], "schedule_attributes"=>schedule_attributes).permit!
  end
end
