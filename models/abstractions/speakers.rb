require "net/http"
require "json"

class Abstractions::Speakers
  class << self
    def all
      Net::HTTP.get(uri)
    end

    private

    def uri
      URI("#{Abstractions::BASE_URI}/api/speakers.json")
    end
  end
end
