# require 'rails_helper'
#
# RSpec.describe Api::V1::AppointmentsController, type: :request do
#   let!(:user) { FactoryBot.create(:user) }
#   let!(:provider) { FactoryBot.create(:provider) }
#   let!(:date) { DateTime.now }
#
#   let!(:valid_params) do
#     {
#       appointment: {
#         name: 'Name',
#         provider: {
#           id: Provider.last.id,
#           name: 'Dr. Smith',
#           provider_type: 'GP'
#         },
#         'date(1i)': date.year,
#         'date(2i)': date.month,
#         'date(3i)': date.day,
#         'time(1i)': date.year,
#         'time(2i)': date.month,
#         'time(3i)': date.day,
#         'time(4i)': date.hour,
#         'time(5i)': date.minute,
#         interval: '1',
#         day: ['', 'monday', 'friday'],
#         count: 0,
#         rule: 'weekly',
#         notes: 'notes'
#       }
#     }
#   end
#   let!(:invalid_params) do
#     {
#       appointment: {
#         name: nil,
#         dosage: nil
#       },
#       notes: 'testing notes'
#     }
#   end
#
#   describe 'POST /api/v1/appointments' do
#     context 'with valid parameters' do
#       before { allow_any_instance_of(Api::V1::AppointmentsController).to receive(:current_user).and_return(user) }
#
#       it 'creates a new appointment' do
#         expect { post api_v1_appointments_path, params: valid_params }.to change(Appointment, :count).by(+1)
#         expect { post api_v1_appointments_path, params: valid_params }.to change(Schedule, :count).by(+1)
#         expect(response).to have_http_status :created
#         expect(response.content_type).to eq('application/json')
#       end
#
#       it "returns the json of all the user's appointments" do
#         post api_v1_appointments_path, params: valid_params
#
#         returned_json = JSON.parse(response.body)
#
#         expect(returned_json).to be_kind_of(Array)
#         expect(returned_json).to_not be_kind_of(Hash)
#
#         expect(returned_json[-1]['user_id']).to eq user.id
#         expect(returned_json[-1]['provider_id']).to eq provider.id
#         expect(returned_json[-1]['name']).to eq valid_params[:appointment][:name]
#         expect(returned_json[-1]['notes']).to eq valid_params[:appointment][:notes]
#       end
#
#       it 'creates appointment and schedule association with the correct attributes' do
#         post api_v1_appointments_path, params: valid_params
#
#         expect(Appointment.last.user).to eq user
#         expect(Appointment.last.provider).to eq provider
#         expect(Appointment.last.name).to eq valid_params[:appointment][:name]
#         expect(Appointment.last.notes).to eq valid_params[:appointment][:notes]
#
#         expect(Appointment.last.schedule.schedulable_type).to eq 'Appointment'
#         expect(Appointment.last.schedule.date.to_s).to eq date.strftime('%Y-%m-%d')
#         expect(Appointment.last.schedule.time.to_s).to eq date.strftime('%Y-%m-%d %H:%M:%S')+' UTC'
#         expect(Appointment.last.schedule.rule).to eq valid_params[:appointment][:rule]
#         expect(Appointment.last.schedule.day).to eq valid_params[:appointment][:day]
#         expect(Appointment.last.schedule.interval).to eq valid_params[:appointment][:interval]
#         expect(Appointment.last.schedule.count).to eq valid_params[:appointment][:count]
#       end
#     end
#
#     context 'with invalid parameters' do
#       it 'returns the json of of an unprocessable entity with invalid name and dosage' do
#         allow_any_instance_of(Api::V1::AppointmentsController).to receive(:current_user).and_return(user)
#         post api_v1_appointments_path, params: invalid_params
#
#         expect(response.status).to eq 422
#         expect(response.content_type).to eq('application/json')
#
#         returned_json = JSON.parse(response.body)
#
#         expect(returned_json['error'][0]).to eq "Name can't be blank"
#         expect(returned_json['error'][1]).to eq "Dosage can't be blank"
#       end
#
#       it 'returns the json of of an unprocessable entity with invalid user' do
#         post api_v1_appointments_path, params: valid_params
#
#         expect(response.status).to eq 422
#         expect(response.content_type).to eq('application/json')
#
#         returned_json = JSON.parse(response.body)
#
#         expect(returned_json['error'][0]).to eq 'User must exist'
#       end
#     end
#   end
# end
