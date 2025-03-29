Feature:  MP - Managing Projects
Projects are highest group of the reports. Projects are created automatically when the first test run report is uploaded.

Rule: CP - Creating Projects

    @specstore
    @specboard
    Scenario: [E2E][CP/MP-001]: Creating new project automatically
        Given Uploading report for 'bold_ideas' project with version '1.0.0'
        Then 'bold_ideas' project should exists with version '1.0.0'

    @specstore
    @specboard
    Scenario: [E2E][CP/MP-002]: Do not create new project
        Given 'crave' project has report with version '1.0.0'
        When Uploading report for 'crave' project with version '1.1.0'
        Then 'crave' project should exists with version '1.1.0'