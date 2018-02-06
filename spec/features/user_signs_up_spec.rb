require 'rails_helper'

feature 'user registers', %Q{
  As a prospective user
  I want to create an account
  So that I can begin to track my wellness
} do

  # Acceptance Criteria:
  # * I must specify a valid email address,
  #   password, and password confirmation
  # * I must specify a first name
  # * If I don't specify the required information, I am presented with
  #   an error message
  # * If I don't match my passwords, I am presented with an error message

  scenario 'provide valid registration information' do
    visit new_user_registration_path

    fill_in 'First Name', with: 'John'
    fill_in 'Email', with: 'john@example.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password Confirmation', with: 'password'

    click_button 'Sign Up'

    expect(page).to have_content('Welcome! You have signed up successfully.')
    expect(page).to have_content('Sign Out')
  end

  scenario 'provide invalid registration information' do
    visit new_user_registration_path

    click_button 'Sign Up'

    expect(page).to have_content("Email can't be blank")
    expect(page).to have_content("Password can't be blank")
    expect(page).to have_content("Name can't be blank")
    expect(page).to_not have_content('Sign Out')
  end

  scenario 'provide mismatching passwords and confirmation' do
    visit new_user_registration_path

    fill_in 'First Name', with: 'John'
    fill_in 'Email', with: 'john@example.com'
    fill_in 'Password', with: 'password1'
    fill_in 'Password Confirmation', with: 'password2'

    click_button 'Sign Up'

    expect(page).to have_content("Password confirmation doesn't match Password")
    expect(page).to_not have_content('Sign Out')
  end
end
