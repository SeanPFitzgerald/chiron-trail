class Appointment < ApplicationRecord
  acts_as_schedulable :schedule
  
  belongs_to :provider
  belongs_to :user
end
