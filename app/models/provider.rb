class Provider < ApplicationRecord
  has_many :appointments
  belongs_to :user

  validates :name, presence: true
  validates :provider_type, presence: true
end
