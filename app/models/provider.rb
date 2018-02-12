class Provider < ApplicationRecord
  validates :name, presence: true
  validates :provider_type, presence: true

  has_many :appointments
  has_many :users, through: :appointments
end
