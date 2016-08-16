require "net/http"
require "json"

class Abstractions::Sponsors
  class << self
    def all
      Net::HTTP.get(uri)
    end

    private

    def uri
      URI("#{Abstractions::BASE_URI}/api/sponsors.json")
    end
  end
end
