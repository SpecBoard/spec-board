Feature:  MP - Managing Projects
Projects are highest group of the reports. Projects are created automatically when the first test run report is uploaded.

Rule: CP - Creating Projects

    @specstore
    @specboard
    Scenario: [E2E][CP/MP-001]: Creating new project automatically
        Given Uploading report for 'bold_ideas' project
        Then 'bold_ideas' project should be created

    @specstore
    @specboard
    Scenario: [E2E][CP/MP-002]: Do not create new project
        Given 'crave' project has report
        When Uploading report for 'crave' project
        Then 'crave' project should not be created again