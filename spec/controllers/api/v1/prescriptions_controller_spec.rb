require 'rails_helper'

RSpec.describe Api::V1::PrescriptionsController, type: :request do
  let!(:user) { FactoryBot.create(:user) }
  let!(:medication) { FactoryBot.create(:medication) }
  let!(:date) { DateTime.now }
  let!(:valid_params) do
    {
      medication: {
        name: 'med',
        dosage: 'dose'
      },
      prescription: {
        'date(1i)': date.year,
        'date(2i)': date.month,
        'date(3i)': date.day,
        'time(1i)': date.year,
        'time(2i)': date.month,
        'time(3i)': date.day,
        'time(4i)': date.hour,
        'time(5i)': date.minute,
        interval: '1',
        day: ['', 'monday', 'friday'],
        count: 0,
        rule: 'weekly',
        notes: 'testing notes'
      }
    }
  end
  let!(:invalid_params) do
    {
      medication: {
        name: nil,
        dosage: nil
      },
      notes: 'testing notes'
    }
  end

  describe 'POST /api/v1/prescriptions' do
    context 'with valid parameters' do
      before { allow_any_instance_of(Api::V1::PrescriptionsController).to receive(:current_user).and_return(user) }

      it 'creates a new prescription' do
        expect { post api_v1_prescriptions_path, params: valid_params }.to change(Prescription, :count).by(+1)
        expect { post api_v1_prescriptions_path, params: valid_params }.to change(Schedule, :count).by(+1)
        expect(response).to have_http_status :created
        expect(response.content_type).to eq('application/json')
      end

      it "returns the json of all the user's prescriptions" do
        post api_v1_prescriptions_path, params: valid_params

        returned_json = JSON.parse(response.body)

        expect(returned_json).to be_kind_of(Array)
        expect(returned_json).to_not be_kind_of(Hash)

        expect(returned_json[-1]['user_id']).to eq user.id
        expect(returned_json[-1]['medication_id']).to eq (medication.id + 1)
        expect(returned_json[-1]['notes']).to eq valid_params[:prescription][:notes]
      end

      it 'creates prescription with the correct attributes' do
        post api_v1_prescriptions_path, params: valid_params

        expect(Prescription.last.user).to eq user
        expect(Prescription.last.medication.id).to eq (medication.id + 1)
        expect(Prescription.last.notes).to eq valid_params[:prescription][:notes]
      end
    end

    context 'with invalid parameters' do
      it 'returns the json of of an unprocessable entity with invalid name and dosage' do
        allow_any_instance_of(Api::V1::PrescriptionsController).to receive(:current_user).and_return(user)
        post api_v1_prescriptions_path, params: invalid_params

        expect(response.status).to eq 422
        expect(response.content_type).to eq('application/json')

        returned_json = JSON.parse(response.body)

        expect(returned_json['error'][0]).to eq "Name can't be blank"
        expect(returned_json['error'][1]).to eq "Dosage can't be blank"
      end

      it 'returns the json of of an unprocessable entity with invalid user' do
        post api_v1_prescriptions_path, params: valid_params

        expect(response.status).to eq 422
        expect(response.content_type).to eq('application/json')

        returned_json = JSON.parse(response.body)

        expect(returned_json['error'][0]).to eq 'User must exist'
        expect(returned_json['error'][1]).to eq "User can't be blank"
      end
    end
  end
end
