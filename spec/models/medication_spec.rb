require 'rails_helper'

RSpec.describe Medication, type: :model do
  it { should have_valid(:name).when('My Med') }
  it { should_not have_valid(:name).when(nil, '', ' ') }

  it { should have_valid(:dosage).when('20mg') }
  it { should_not have_valid(:dosage).when(nil, '', ' ') }

  it { should have_many(:prescriptions) }
  it { should have_many(:users).through(:prescriptions) }
end
