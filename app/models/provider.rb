class Provider < ApplicationRecord
  has_many :appointments
  belongs_to :user

  validates :name, presence: true
  validates :type, presence: true
end
