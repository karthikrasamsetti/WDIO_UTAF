Feature: Accessibility Testing

  Scenario: Accessibility testing using axe-core
    Given I am on the homepage
    When I run the accessibility tests
    Then There should be no accessibility violations
