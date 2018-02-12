class Provider < ApplicationRecord
  validates :name, presence: true
  validates :type, presence: true

  has_many :appointments
  has_many :users, through: :appointments
end
