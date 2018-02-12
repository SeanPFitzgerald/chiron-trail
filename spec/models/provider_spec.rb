require 'rails_helper'

RSpec.describe Provider, type: :model do
  it { should have_valid(:name).when('Dr. Testing') }
  it { should_not have_valid(:name).when(nil, '', ' ') }

  it { should have_valid(:provider_type).when('GP') }
  it { should_not have_valid(:provider_type).when(nil, '', ' ') }

  it { should have_many(:appointments) }
  it { should belong_to(:users) }
end
