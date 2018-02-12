require 'rails_helper'

RSpec.describe Api::V1::ProvidersController, type: :request do
  let!(:user) { FactoryBot.create(:user) }
  let!(:valid_params) do
    {
      provider: {
        name: 'Dr. Testing',
        provider_type: 'GP'
      }
    }
  end
  let!(:invalid_params) do
    {
      provider: {
        name: nil,
        provider_type: nil
      }
    }
  end

  describe 'POST /api/v1/providers' do
    context 'with valid parameters' do
      before { allow_any_instance_of(Api::V1::ProvidersController).to receive(:current_user).and_return(user) }

      it 'creates a new provider' do
        expect { post api_v1_providers_path, params: valid_params }.to change(Provider, :count).by(+1)
        expect(response).to have_http_status :created
        expect(response.content_type).to eq('application/json')
      end

      it 'returns the json of a new provider' do
        post api_v1_providers_path, params: valid_params

        returned_json = JSON.parse(response.body)

        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json).to_not be_kind_of(Array)

        expect(returned_json['provider']['name']).to eq valid_params[:provider][:name]
        expect(returned_json['provider']['provider_type']).to eq valid_params[:provider][:provider_type]
      end

      it 'creates provider with the correct attributes' do
        post api_v1_providers_path, params: valid_params

        expect(Provider.last.user).to eq user
        expect(Provider.last.name).to eq valid_params[:provider][:name]
        expect(Provider.last.provider_type).to eq valid_params[:provider][:provider_type]
      end
    end

    context 'with invalid parameters' do
      it 'returns the json of of an unprocessable entity with invalid name and dosage' do
        allow_any_instance_of(Api::V1::ProvidersController).to receive(:current_user).and_return(user)
        post api_v1_providers_path, params: invalid_params

        expect(response.status).to eq 422
        expect(response.content_type).to eq('application/json')

        returned_json = JSON.parse(response.body)

        expect(returned_json['error'][0]).to eq "Name can't be blank"
        expect(returned_json['error'][1]).to eq "Provider type can't be blank"
      end

      it 'returns the json of of an unprocessable entity with invalid user' do
        post api_v1_providers_path, params: valid_params

        expect(response.status).to eq 422
        expect(response.content_type).to eq('application/json')

        returned_json = JSON.parse(response.body)

        expect(returned_json['error'][0]).to eq 'User must exist'
        expect(returned_json['error'][1]).to eq "User can't be blank"
      end
    end
  end
end
