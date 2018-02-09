require 'rails_helper'

RSpec.describe Api::V1::WellnessChecksController, type: :request do
  let!(:user) { FactoryBot.create(:user) }
  let!(:valid_params) do
    {
      wellness_check: {
        mood: 1,
        energy: 2,
        sociability: 1,
        clear_mindedness: 5,
        date: Date.new(2018,2,5),
        notes: 'testing notes'
      }
    }
  end
  let!(:nil_params) do
    {
      wellness_check: {
        mood: nil,
        energy: nil,
        sociability: nil,
        clear_mindedness: nil,
        date: nil,
        notes: 'testing notes'
      }
    }
  end
  let!(:invalid_params) do
    {
      wellness_check: {
        mood: -2,
        energy: 0,
        sociability: 6,
        clear_mindedness: 'dsf',
        date: 'date',
        notes: 'testing notes'
      }
    }
  end

  describe 'POST /api/v1/wellness_checks' do
    context 'with valid parameters' do
      before { allow_any_instance_of(Api::V1::WellnessChecksController).to receive(:current_user).and_return(user) }

      it 'creates a new wellness check' do
        expect { post api_v1_wellness_checks_path, params: valid_params }.to change(WellnessCheck, :count).by(+1)
        expect(response).to have_http_status :created
        expect(response.content_type).to eq('application/json')
      end

      it 'returns the json of a new wellness check' do
        post api_v1_wellness_checks_path, params: valid_params

        returned_json = JSON.parse(response.body)

        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json).to_not be_kind_of(Array)

        expect(returned_json['wellness_check']['user_id']).to eq user.id
        expect(returned_json['wellness_check']['mood']).to eq valid_params[:wellness_check][:mood]
        expect(returned_json['wellness_check']['energy']).to eq valid_params[:wellness_check][:energy]
        expect(returned_json['wellness_check']['sociability']).to eq valid_params[:wellness_check][:sociability]
        expect(returned_json['wellness_check']['clear_mindedness']).to eq valid_params[:wellness_check][:clear_mindedness]
        expect(returned_json['wellness_check']['date']).to eq valid_params[:wellness_check][:date].strftime("%Y-%m-%d")
        expect(returned_json['wellness_check']['notes']).to eq valid_params[:wellness_check][:notes]
      end

      it 'creates wellness check with the correct attributes' do
        post api_v1_wellness_checks_path, params: valid_params

        expect(WellnessCheck.last.user).to eq user
        expect(WellnessCheck.last.mood).to eq valid_params[:wellness_check][:mood]
        expect(WellnessCheck.last.energy).to eq valid_params[:wellness_check][:energy]
        expect(WellnessCheck.last.sociability).to eq valid_params[:wellness_check][:sociability]
        expect(WellnessCheck.last.clear_mindedness).to eq valid_params[:wellness_check][:clear_mindedness]
        expect(WellnessCheck.last.date).to eq valid_params[:wellness_check][:date]
        expect(WellnessCheck.last.notes).to eq valid_params[:wellness_check][:notes]
      end
    end

    context 'with invalid parameters' do
      it 'returns the json of of an unprocessable entity with nil parameters' do
        allow_any_instance_of(Api::V1::WellnessChecksController).to receive(:current_user).and_return(user)
        post api_v1_wellness_checks_path, params: nil_params

        expect(response.status).to eq 422
        expect(response.content_type).to eq('application/json')

        returned_json = JSON.parse(response.body)

        expect(returned_json['error'][0]).to eq 'Mood is not included in the list'
        expect(returned_json['error'][1]).to eq 'Energy is not included in the list'
        expect(returned_json['error'][2]).to eq 'Sociability is not included in the list'
        expect(returned_json['error'][3]).to eq 'Clear mindedness is not included in the list'
        expect(returned_json['error'][4]).to eq 'Date translation missing: en.activerecord.errors.models.wellness_check.attributes.date.invalid_date'
      end

      it 'returns the json of of an unprocessable entity with invalid parameters' do
        allow_any_instance_of(Api::V1::WellnessChecksController).to receive(:current_user).and_return(user)
        post api_v1_wellness_checks_path, params: invalid_params

        expect(response.status).to eq 422
        expect(response.content_type).to eq('application/json')

        returned_json = JSON.parse(response.body)

        expect(returned_json['error'][0]).to eq 'Mood is not included in the list'
        expect(returned_json['error'][1]).to eq 'Energy is not included in the list'
        expect(returned_json['error'][2]).to eq 'Sociability is not included in the list'
        expect(returned_json['error'][3]).to eq 'Clear mindedness is not included in the list'
        expect(returned_json['error'][4]).to eq 'Date translation missing: en.activerecord.errors.models.wellness_check.attributes.date.invalid_date'
      end

      it 'returns the json of of an unprocessable entity with invalid user' do
        post api_v1_wellness_checks_path, params: valid_params

        expect(response.status).to eq 422
        expect(response.content_type).to eq('application/json')

        returned_json = JSON.parse(response.body)

        expect(returned_json['error'][0]).to eq 'User must exist'
      end
    end
  end
end
