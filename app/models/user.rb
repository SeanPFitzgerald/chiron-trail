class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :prescriptions
  has_many :medications, through: :prescriptions

  has_many :wellness_checks

  has_many :appointments
  has_many :providers

  validates :name, presence: true
end
