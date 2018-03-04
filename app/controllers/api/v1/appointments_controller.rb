class Api::V1::AppointmentsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    appointments = Appointment.where(user: current_user)

    render json: appointments, include: [:schedule, :provider]
  end

  def create
    if params[:method].nil?
      appointment = Appointment.new(construct_params)
      appointment.user = current_user
      appointment.provider = Provider.find(appointment_params[:provider])

      if appointment.save
        render status: 201, message: 'Successfully created new appointment.',
          json: Appointment.where(user: current_user), include: [:schedule, :provider]
      else
        render json: { error: appointment.errors.full_messages }, status: :unprocessable_entity
      end
    elsif params[:method] == 'PATCH'
      appointment = Appointment.find(appointment_params[:id])
      appointment.provider = Provider.find(appointment_params[:provider])

      if appointment.update(construct_params)
        render status: 200, message: 'Successfully updated appointment.',
          json: Appointment.where(user: current_user), include: [:schedule, :provider]
      else
        render json: { error: appointment.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:id, :name, :provider, :notes, :date, :time, :rule, day: [])
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
      "time(3i)"=>ap['time(3i)'], "time(4i)"=>ap['time(4i)'], "time(5i)"=>ap['time(5i)'], "rule"=>ap['rule'],
      "until"=>"", "count"=>"0", "interval"=>"1", "day"=>ap['day'],
      "day_of_week"=>day_of_week).permit!

    ActionController::Parameters.new("name"=>ap['name'], "notes"=>ap['notes'], "schedule_attributes"=>schedule_attributes).permit!
  end
end
