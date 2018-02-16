class Api::V1::PrescriptionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    scripts = Prescription.where(user: current_user)

    render json: scripts, include: [:medication, :schedule]
  end

  def create
    med = Medication.find_or_initialize_by(medication_params)

    if !med.id.nil? || med.save
      script = Prescription.new(construct_params)
      script.user = current_user
      script.medication = med

      if script.save
        render status: 201, json: {
          message: "Successfully created new prescription.",
          prescription: script
        }.to_json
      else
        render json: { error: script.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: med.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def prescription_params
    params.require(:prescription).permit(:notes, :date, :time, :rule, day: [])
  end

  def medication_params
    params.require(:medication).permit(:name, :dosage)
  end

  def construct_params
    pp = prescription_params
    day_of_week = ActionController::Parameters.new("monday"=>[""],
      "tuesday"=>[""], "wednesday"=>[""], "thursday"=>[""], "friday"=>[""],
      "saturday"=>[""], "sunday"=>[""]).permit!

    schedule_attributes = ActionController::Parameters.new("date(1i)"=>pp['date(1i)'],
      "date(2i)"=>pp['date(2i)'], "date(3i)"=>pp['date(3i)'], "time(1i)"=>pp['time(1i)'], "time(2i)"=>pp['time(2i)'],
      "time(3i)"=>pp['time(3i)'], "time(4i)"=>(pp['time(4i)'].to_i+5).to_s, "time(5i)"=>pp['time(5i)'], "rule"=>pp['rule'],
      "until"=>"", "count"=>"0", "interval"=>"1", "day"=>pp['day'],
      "day_of_week"=>day_of_week).permit!

    ActionController::Parameters.new("notes"=>pp['notes'], "schedule_attributes"=>schedule_attributes).permit!
  end
end
