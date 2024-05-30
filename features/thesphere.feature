Feature: As a test developer I want to assert all events elements are visible on the Events Calendar Showtimes

  Scenario Outline: <eventpage> Calendar Showtimes
    Given I am opening the <eventpage>
    When I scroll to the available showtimes and tickets calendar component
    Then I expect to see title, year dropdown, events rendered with month, date, day, buttons with time and load more button
    Then I click on any event time button and showtime selected modal render with the related event information
    When I click on buy tickets button on modal pop up ticket master page shows with related event information

    Examples:
      | eventpage              |
      | shows/dead-and-company |
      | shows/2024-nhl-draft   |

  Scenario: MSGSphere Homepage Hero
    Given I am opening Msgsphere homepage
    Then I validate hero elements, video autoplay and play in loop if possible, buy ticket button
    When I click on Buy ticket button show sphere experience page display.
