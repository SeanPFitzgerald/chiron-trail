require 'rails_helper'

RSpec.describe Prescription, type: :model do
  let!(:med) { FactoryBot.create(:medication) }
  let!(:user) { FactoryBot.create(:user) }

  it { should have_valid(:medication).when(med) }
  it { should_not have_valid(:medication).when(nil) }

  it { should have_valid(:user).when(user) }
  it { should_not have_valid(:user).when(nil) }

  it { should have_valid(:notes).when('test', '', ' ') }

  it { should belong_to(:medication) }
  it { should belong_to(:user) }
end
