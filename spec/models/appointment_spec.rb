require 'rails_helper'

RSpec.describe Appointment, type: :model do
  let!(:user) { FactoryBot.create(:user) }
  let!(:provider) { FactoryBot.create(:provider) }
  let!(:schedule) { FactoryBot.create(:schedule) }

  it { should have_valid(:user).when(user) }
  it { should_not have_valid(:user).when(nil) }

  it { should have_valid(:provider).when(provider) }
  it { should_not have_valid(:provider).when(nil) }

  it { should have_valid(:schedule).when(schedule) }

  it { should belong_to(:user) }
  it { should belong_to(:provider) }
end
