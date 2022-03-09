const sonarqubeScanner = require('sonarqube-scanner')

sonarqubeScanner({
        serverUrl: "http://localhost:9000",
        token: "",
        options: {
            "sonar.projectName": "MeinMusikApp",
            "sonar.projectVersion": "0.0.1",
            "sonar.projectDescription": "Spotify Api App",
            "sonar.projectKey": "MeinMusikApp:Test",
            "sonar.sources": ".",
            "sonar.inclusions": "src/**",
            "sonar.tests": "src",
            "sonar.test.inclusions": "**/*.spec.ts",
            "sonar.javascript.lcov.reportPaths": "coverage/meinmusikapp/lcov.info"
        }
    },
    () => {}
);