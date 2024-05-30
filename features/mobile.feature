Feature: As a test developer,I want to assert recommended event elements are visible on the venue Landing Page on Mobile.

  Scenario Outline: <venue> VLP 2.0 Recommended Events
    Given I open <venuePage>
    When I scroll to the recommended events module on page
    Then I expect to see <site> recommended events rendered with associated name, venue, dates, times and buy tickets buttons from recommendation event engine api
    Then I clicked Buy Tickets Button

    Examples:
      | venue                 | venuePage             | site |
      | Madison Square Garden | madison-square-garden | msg  |
