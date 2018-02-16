class Prescription < ApplicationRecord
  acts_as_schedulable :schedule
  belongs_to :user
  belongs_to :medication

  validates :user, presence: true
  validates :medication, presence: true
end
