require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module AuthFirebaseTest
  class Application < Rails::Application
    config.time_zone = 'Tokyo'
    config.generators.fixture_replacement :factory_bot, dir: 'spec/factories'
    config.generators do |g| g.test_framework :rspec, view_specs: false, helper_specs: false, routing_specs: false, controller_specs: false end
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end
