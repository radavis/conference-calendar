require "net/http"
require "json"

class Abstractions::Schedule
  class << self
    def all
      response
    end

    private
    def response
      @_response ||= Net::HTTP.get(uri)
    end

    def uri
      URI("#{Abstractions::BASE_URI}/api/schedule.json")
    end
  end
end
