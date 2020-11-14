pipeline {
    stages {
        stage('Cleaning') {
            cleanWs()
        }
        stage('Checkout') {
            checkout scm
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sshPublisher(publishers: [sshPublisherDesc(configName: 'Blog Api', transfers: [sshTransfer(cleanRemote: false, excludes: '**/.git', execCommand: 'docker-compose down && docker-compose up -d', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '**/**')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true)])
            }
        }
    }
}