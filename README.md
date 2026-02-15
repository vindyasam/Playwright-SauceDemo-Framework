# Playwright SauceDemo E2E Framework

## Overview

This project is a scalable End-to-End Test Automation Framework built using Playwright with TypeScript. It automates core user workflows of the SauceDemo application following industry best practices.

The framework is designed with reusability, maintainability, structured architecture, and CI/CD integration in mind.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)
- Data-Driven Testing
- Allure Reporting
- GitHub Actions

## Framework Architecture

### Project Structure

pages/
Page Object classes representing application screens.

tests/
Test specification files covering functional workflows.

utils/
Reusable utility classes and helpers.

data/
Externalized test data for data-driven execution.

.github/workflows/
CI configuration for automated execution.

## Implemented Test Scenarios

- Login validation
- Product listing validation
- Add to cart
- Cart item removal
- Checkout workflow validation
- Multiple product selection (data-driven approach)

## How to Run the Project

### Install dependencies

    npm install

### Run all tests

    npx playwright test

### Run in headed mode

    npx playwright test --headed

### Generate Allure Report

    allure generate ./allure-results --clean
    allure open

## Reporting

Playwright HTML report (default).
Allure report with screenshots and failure attachments.

## CI/CD Integration

Tests are automatically executed using GitHub Actions on push events.

## Purpose

This framework demonstrates modern automation architecture using Playwright and reflects real-world automation design practices. It showcases structured test development, reusable components, reporting integration, and CI-based execution aligned with professional QA engineering standards.
