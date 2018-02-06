class Medication < ApplicationRecord
  has_many :prescriptions
  has_many :users, through: :prescriptions

  validates :name, presence: true
  validates :dosage, presence: true
end
