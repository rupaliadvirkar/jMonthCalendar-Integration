# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_rtest_session',
  :secret      => '7623d56365585a2313e110fa361961e33746a69ea4840ed5f0c1f21e930c1b7e6e954d2f79b8b95c748f6fed810b30b8af74fecca78979a65bd41588f510d856'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
