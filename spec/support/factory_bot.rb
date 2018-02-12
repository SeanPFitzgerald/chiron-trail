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

  factory :provider do
    name 'Dr. Testing'
    provider_type 'Therapist'
  end

  factory :schedule do
    date Date.today
    time Time.now

    rule 'weekly'

    day ['monday', 'wednesday']

    sequence(:until) { Date.today + 60 }
    count 8
  end
end
