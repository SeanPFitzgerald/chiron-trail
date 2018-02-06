require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    name 'John'
    password 'password'
    password_confirmation 'password'
  end

  factory :medication do
    sequence(:name) {|n| "med_#{n}"}
    sequence(:dosage) {|n| "#{n} mg"}
  end
end
