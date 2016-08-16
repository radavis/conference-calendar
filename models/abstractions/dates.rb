require "date"

class Abstractions::Dates
  VALID_DATES = ["2016-08-18", "2016-08-19", "2016-08-20"]

  class << self
    def today_or_default
      VALID_DATES.include?(today) ? today : VALID_DATES.first
    end

    private

    def today
      Date.today.strftime(date_format)
    end

    def date_format
      "%Y-%m-%d"
    end
  end
end
