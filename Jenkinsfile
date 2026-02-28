pipeline {
    agent any

    tools {
        nodejs 'NodeJS-Local'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/vindyasam/Playwright-SauceDemo-Framework.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'npm list'
                bat 'npx playwright install chromium'
            }
        }

        // ---------------- DEV ----------------
        /*
        stage('DEV Tests') {
            steps {
                bat 'if exist allure-results rmdir /s /q allure-results'
                bat 'npx playwright test --config=playwright.config.dev.ts'
            }
            post {
                always {
                    allure([
                        includeProperties: true,
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results']]
                    ])
                }
            }
        }
            */
        // ---------------- QA ----------------
        stage('QA Tests') {
            steps {
                bat 'if exist allure-results rmdir /s /q allure-results'
                bat 'npx playwright test --config=playwright.config.qa.ts'
            }
            post {
                always {
                    allure([
                        includeProperties: true,
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results']]
                    ])
                }
            }
        }

        // ---------------- STAGE ----------------
        /*
        stage('STAGE Tests') {
            steps {
                bat 'if exist allure-results rmdir /s /q allure-results'
                bat 'npx playwright test --config=playwright.config.stage.ts'
            }
            post {
                always {
                    allure([
                        includeProperties: true,
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results']]
                    ])
                }
            }
        }

        // ---------------- PROD ----------------
        stage('PROD Tests') {
            steps {
                bat 'if exist allure-results rmdir /s /q allure-results'
                bat 'npx playwright test --config=playwright.config.prod.ts'
            }
            post {
                always {
                    allure([
                        includeProperties: true,
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results']]
                    ])
                }
            }
        }
            */
    }
}