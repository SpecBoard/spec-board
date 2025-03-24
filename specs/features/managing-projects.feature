Feature:  MP - Managing Projects
Projects are highest group of the reports. Projects are created automatically when the first test run report is uploaded.

Rule: CP - Creating Projects

    Scenario: [E2E][CP/MP-001]: Creating new project automatically
        Given Uploading report for 'Bold Ideas' project
        Then 'Bold Ideas' project should be created

    Scenario: [E2E][CP/MP-002]: Do not create new project
        Given 'Bold Ideas' project has report
        When Uploading report for 'Bold Ideas' project
        Then 'Bold Idieas' project should not be created again