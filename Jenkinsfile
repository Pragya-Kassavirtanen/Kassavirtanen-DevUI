#!/usr/bin/env groovy

/**
 * Build Cashflow Frontend
 */

def notifySlack(String buildStatus) {
  // Build status of null means success.
  buildStatus = buildStatus ?: 'SUCCESS'

  def color

  if (buildStatus == 'STARTED') {
    color = '#D4DADF'
  } else if (buildStatus == 'SUCCESS') {
    color = '#BDFFC3'
  } else if (buildStatus == 'UNSTABLE') {
    color = '#FFFE89'
  } else {
    color = '#FF9FA1'
  }

  def msg = "${buildStatus}: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n${env.BUILD_URL}"

  slackSend(color: color, message: msg, channel: '#cashflow-project')
}

pipeline {

  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
    timeout(time: 10, unit: 'MINUTES')
  }

  agent any

  triggers {
    cron('H 01 1 * *')
    pollSCM('H/10 * * * *')
  }

  stages {
    stage("Checkout") {
      steps {
        notifySlack('STARTED')
        checkout scm
      }
    }

    stage("Install dependencies") {
      steps {
        sh "yarn install"
      }
    }

    stage("Check licences") {
      steps {
        sh "yarn license"
      }
    }

    stage("Test") {
      steps {
        sh "yarn test"
      }
    }

    stage("Webpack package") {
      steps {
        sh "yarn dist"
      }
    }

    stage("Deploy staging") {
      steps {
        sh "scp -r dist/assets/app.js root@kassavirtanen.in.absum.net:/var/www/html/wp-content/themes/wordpress-theme-kassavirtanen/scripts/app-${env.BUILD_NUMBER}.js"
        sh "ssh root@kassavirtanen.in.absum.net 'ln -sf /var/www/html/wp-content/themes/wordpress-theme-kassavirtanen/scripts/app-${env.BUILD_NUMBER}.js /var/www/html/wp-content/themes/wordpress-theme-kassavirtanen/scripts/app.js'"
      }
    }

  }

  post {
    always {
      junit allowEmptyResults: true, testResults: '**/results/*.xml'
    }

    success {
      notifySlack('SUCCESS')
    }

    failure {
      notifySlack('FAILURE')
    }
  }
}
