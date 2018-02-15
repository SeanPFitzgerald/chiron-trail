class Api::V1::WellnessChecksController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:index, :create]

  def index
    if params['from'].nil?
      checks = WellnessCheck.where(user: current_user).order(:date)
    else
      checks = WellnessCheck.where(user: current_user).where(date: params['from']..params['to']).order(:date)
    end

    dates = checks.pluck(:date)
    mood = checks.pluck(:mood)
    energy = checks.pluck(:energy)
    sociability = checks.pluck(:sociability)
    clear_mindedness = checks.pluck(:clear_mindedness)

    levels = {
      dates: dates,
      mood: mood,
      energy: energy,
      sociability: sociability,
      clearMindedness: clear_mindedness
    }

    render json: levels
  end

  def create
    check = WellnessCheck.find_by(date: wellness_check_params[:date], user: current_user)

    if check.nil?
      check = WellnessCheck.new(wellness_check_params)
      check.user = current_user

      if check.save
        render json: {
          wellness_check: check,
          message: "Successfully created new wellness check for #{format_date(check)}."
        }.to_json, status: 201
      else
        render_errors(check)
      end
    else
      if check.update(wellness_check_params)
        render json: {
          wellness_check: check,
          message: "Successfully updated wellness check for #{format_date(check)}."
        }.to_json, status: 200
      else
        render_errors(check)
      end
    end
  end

  private

  def wellness_check_params
    params.require(:wellness_check).permit(:mood, :energy, :sociability, :clear_mindedness, :date, :notes, :user)
  end

  def render_errors(check)
    render json: { error: check.errors.full_messages }, status: :unprocessable_entity
  end

  def format_date(check)
    "#{Date::ABBR_DAYNAMES[check.date.wday]}, #{check.date.to_formatted_s(:rfc822)}"
  end
end
