pipeline {
    agent any

    tools {
        nodejs 'Node'
    }

    stages {
        stage ('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh '''
                    echo "PATH = ${PATH}"
                '''
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Docker') {
            steps {
                sh 'docker build -t 172.16.0.10:5000/frontend:${env.BRANCH_NAME} .'
            }
        }

        stage('Push') {
            steps {
                sh 'docker push 172.16.0.10:5000/frontend:${env.BRANCH_NAME}'
            }
        }
    }
}
