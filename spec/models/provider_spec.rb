require 'rails_helper'

RSpec.describe Provider, type: :model do
  let!(:user) { FactoryBot.create(:user) }

  it { should have_valid(:name).when('Dr. Testing') }
  it { should_not have_valid(:name).when(nil, '', ' ') }

  it { should have_valid(:provider_type).when('GP') }
  it { should_not have_valid(:provider_type).when(nil, '', ' ') }

  it { should have_valid(:user).when(user) }
  it { should_not have_valid(:user).when(nil) }

  it { should have_many(:appointments) }
  it { should belong_to(:user) }
end
