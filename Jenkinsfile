pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                echo 'Cleaning workspace...'
                cleanWs()
                echo 'Deploying....'
                sshPublisher(publishers: [sshPublisherDesc(configName: 'Blog Api', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'docker-compose down && docker-compose up -d', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '**/**')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
    }
}