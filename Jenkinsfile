pipeline {
    agent any

    stages {
        // stage('Build') {
        //     steps {
        //         checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/LostDakota/blog-api']]])
        //         sh 'cd src && npm install'
        //         sh 'cp -r /home/drew/'
        //     }
        // }
        // stage('Test') {
        //     steps {
        //         echo 'Testing..'
        //     }
        // }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sshPublisher(publishers: [sshPublisherDesc(configName: 'Blog Api', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'cd /home/drew/blog-api/src && docker-compose down && npm install && docker-compose up -d', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '**/**')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                echo 'Published!'
            }
        }
    }
}