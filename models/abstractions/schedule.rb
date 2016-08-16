require "net/http"
require "json"

class Abstractions::Schedule
  class << self
    def all
      Net::HTTP.get(uri)
    end

    private

    def uri
      URI("#{Abstractions::BASE_URI}/api/schedule.json")
    end
  end
end
