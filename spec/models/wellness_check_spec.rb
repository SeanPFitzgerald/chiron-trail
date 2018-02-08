require 'rails_helper'

RSpec.describe WellnessCheck, type: :model do
  let!(:user) { FactoryBot.create(:user) }

  it { should have_valid(:mood).when(1, 3, 5) }
  it { should_not have_valid(:mood).when(nil, -1, 0, 6) }

  it { should have_valid(:energy).when(1, 3, 5) }
  it { should_not have_valid(:energy).when(nil, -1, 0, 6) }

  it { should have_valid(:sociability).when(1, 3, 5) }
  it { should_not have_valid(:sociability).when(nil, -1, 0, 6) }

  it { should have_valid(:clear_mindedness).when(1, 3, 5) }
  it { should_not have_valid(:clear_mindedness).when(nil, -1, 0, 6) }

  it { should have_valid(:user).when(user) }
  it { should_not have_valid(:user).when(nil) }

  it { should belong_to(:user) }
end
