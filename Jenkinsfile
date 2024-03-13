pipeline {
       agent any
          environment {
      PATH = "/opt/sonar-scanner/bin:$PATH"
    }
stages{
    // Code quality checks
    stage('SonarQube analysis for Feature-Branch') {
            when{ 
                expression {return (env.CHANGE_BRANCH ==~ /^(feature|fix|hotfix)\/.*$/) && env.CHANGE_TARGET == 'development' }
             }
            steps {
                    withSonarQubeEnv('INVENTORY_SONAR_HOST_URL') {
                    sh 'sonar-scanner -Dsonar.projectKey=Inventory-manegement -Dsonar.projectName="Inventory-manegement" -Dsonar.qualitygate.wait=true -Dsonar.login=0115f98314ab5dbb9b91bd9981afbcc06ec1af6c || true'                    
                    echo "Auto mergening"
                    echo "SOURCE_BRANCH: ${env.CHANGE_BRANCH } ----> TARGET_BRANCH: ${env.CHANGE_TARGET}"
                    sh 'rm -rf inventory-apis-nodejs'
                    sh 'git clone git@bitbucket.org-harsha-anadariya:solutionanalystspvtltd/inventory-apis-nodejs.git'
                    dir('inventory-apis-nodejs')
                    {
                    sh 'git fetch origin'
                    sh 'git branch -a' 
                    sh 'git config --global user.email harsha.anadariya@solutionanalysts.com'
                    sh 'git config --global user.name harsha-anadariya'
                    sh 'git checkout $CHANGE_TARGET' 
                    sh 'git merge origin/$CHANGE_BRANCH'
                    sh 'git push origin $CHANGE_TARGET'
                }
            }
            }
        }   
    

    stage('Build for DEV') {
        when {
            branch 'development'
        }
        steps {
            echo "Build started"
            sh "docker build -t inventory-api-docker-image-dev-$BUILD_NUMBER ."
        }
    }  
    stage('Deploying to DEV server') {
        when {
            branch 'development'
        }
        steps {
            echo "Deployment started"
            sh "docker run --name inventory-api-docker-container-dev-$BUILD_NUMBER -d inventory-api-docker-image-dev-$BUILD_NUMBER"
        //    sh "ssh ubuntu@3.111.49.39 sh '/home/ubuntu/script/npm.sh'"
            sh 'docker cp inventory-api-docker-container-dev-$BUILD_NUMBER:/app/. .'
            sh "rsync -zvhr --exclude 'node_modules' -e ssh . ubuntu@3.110.116.31:/var/sites/dev/inventory-apis-nodejs/"
            sh "ssh ubuntu@3.110.116.31 sh '/home/ubuntu/script/inventory-apis-nodejs.sh'"
            sh "ssh ubuntu@3.110.116.31 'pm2 restart inventory-management-dev'"
            sh "docker rm inventory-api-docker-container-dev-$BUILD_NUMBER"
            sh "docker rmi inventory-api-docker-image-dev-$BUILD_NUMBER"   
        }
    } 
      stage('Build for STAGE') {
        when {
            branch 'stage'
        }
        steps {
            echo "Build started"
            sh "docker build -t api-docker-image-stage-$BUILD_NUMBER ."
        }
    }  
    stage('Deploying to STAGE server') {
        when {
            branch 'stage'
        }
        steps {
            echo "Deployment started"
            sh "docker run --name api-docker-container-stage-$BUILD_NUMBER -d api-docker-image-stage-$BUILD_NUMBER"
            sh 'docker cp api-docker-container-stage-$BUILD_NUMBER:/app/. .'
            sh "rsync -zvhr --exclude 'node_modules' -e ssh . ubuntu@3.110.116.31:/var/sites/stage/inventory-apis-nodejs/"
            sh "ssh ubuntu@3.110.116.31 sh '/home/ubuntu/script/inventory-stage-apis-nodejs.sh'"
            sh "ssh ubuntu@3.110.116.31 'pm2 restart inventory-management-stage'"
            sh "docker rm api-docker-container-stage-$BUILD_NUMBER"
            sh "docker rmi api-docker-image-stage-$BUILD_NUMBER"   
        }
    }    
    }
} 