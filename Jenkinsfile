pipeline {
  agent {
    // this image provides everything needed to run Cypress
    docker {
      image 'cypress/base:10'
    }
  }

  stages {
    // first stage installs node dependencies and Cypress binary
    stage('build') {
      steps {
        // there a few default environment variables on Jenkins
        // on local Jenkins machine (assuming port 8080) see
        // http://localhost:8080/pipeline-syntax/globals#env
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        sh 'npm ci'
      }
    }

    stage('build react app') {
      steps {
        // start local server in the background
        // we will shut it down in "post" command block
        sh 'npm run build'
      }
    }

    stage('boot server') {
      steps {
         // start local server in the background
         // we will shut it down in "post" command block
         sh 'nohup npm run start &'
      }
    }

    // this stage runs end-to-end tests, and each agent uses the workspace
    // from the previous stage
    stage('cypress parallel tests') {
      // https://jenkins.io/doc/book/pipeline/syntax/#parallel
      parallel {
        // start several test jobs in parallel, and they all
        // will use Cypress Dashboard to load balance any found spec files
        stage('tester A') {
          steps {
            echo "Running build ${env.BUILD_ID}"
            sh "npx cypress run --headless"
          }
        }
      }

    }
    
    stage('Sonarqube analysis') {
      withSonarQubeEnv('sonarqube') {
        sh 'sonar-scanner -Dsonar.projectKey=frontend -Dsonar.sources=. -Dsonar.host.url=http://192.168.2.160:9000 -Dsonar.login=8b40f8bd3d63d9d0e1b1c3732dd806fde72f66e0'  
      }
    }
  }

  post {
    // shutdown the server running in the background
    always {
      echo 'Stopping local server'
      sh 'pkill -9 node'
    }
  }
}
