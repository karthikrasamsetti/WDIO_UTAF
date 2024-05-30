Feature: As a test developer,I want to assert all recommended events elements are visible on the venue Landing Page.

  Scenario Outline: <venue> VLP 2.0 Recommended Events
    Given I launch <venuePage>
    When I scroll to the recommended events module on home page
    Then I expect to see all <site> recommended events rendered with associated name, venue, dates, times and buy tickets buttons from recommendation event engine api

    Examples:
      | venue                 | venuePage             | site                |
      | Madison Square Garden | madison-square-garden | msg                 |
      | Radio City            | radio-city-music-hall | rcmh                |
      | The Theater	at MSG    | the-theater-at-msg    | the theater at MSG  |
      | Beacon Theatre        | beacon-theatre        | the beacon theatre  |
      | The Chicago Theatre   | the-chicago-theatre   | the chicago theatre |

  Scenario: Navigating to buy tickets
    Given I am on MSG Calendar
    Then I Click on the Buy Ticket Button for all available show in the calendar and I Expect I have navigated to Ticket master Page for the same Show

  Scenario: Visual testing Positive case
    Given I am launching msg application
    Then I am matching the images

  Scenario: Visual testing Negative case
    Given I am launching msg application
    Then I am comparing the images
