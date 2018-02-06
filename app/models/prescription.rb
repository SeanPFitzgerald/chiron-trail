class Prescription < ApplicationRecord
  belongs_to :user
  belongs_to :medication
  
  validates :user, presence: true
  validates :medication, presence: true
end
