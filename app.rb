require "sinatra"
require_relative "models/abstractions"
# require "pry"

get "/" do
  date = Abstractions::Dates.today_or_default
  redirect to("/abstractions/#{date}")
end

get "/abstractions/:date" do
  @date = params["date"]
  erb :calendar
end

get "/api/abstractions/speakers" do
  content_type :json
  Abstractions::Speakers.all
end

get "/api/abstractions/sponsors" do
  content_type :json
  Abstractions::Sponsors.all
end

get "/api/abstractions/schedule" do
  content_type :json
  Abstractions::Schedule.all
end
