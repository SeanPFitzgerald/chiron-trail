class WellnessCheck < ApplicationRecord
  belongs_to :user

  validates_inclusion_of :mood, in: 1..5
  validates_inclusion_of :energy, in: 1..5
  validates_inclusion_of :sociability, in: 1..5
  validates_inclusion_of :clear_mindedness, in: 1..5
  validates_date :date
end
