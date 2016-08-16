require "net/http"
require "json"

class Abstractions::Sponsors
  class << self
    def all
      response
    end

    private
    def response
      @_response ||= Net::HTTP.get(uri)
    end

    def uri
      URI("#{Abstractions::BASE_URI}/api/sponsors.json")
    end
  end
end
