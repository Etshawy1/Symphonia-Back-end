pipeline {
    
   agent any

   stages {
      stage('SCM Check') {
         steps {
            git credentialsId: '95f22d8f-3ff4-46e8-ad52-136a1f5c61d6', url: 'https://github.com/Etshawy1/Symphonia-Back-end.git'
         }
      }
      stage('Build') {
         steps {
            sh 'sudo npm i'
            sh 'sudo npm i -g nodemon'
        
         }
      }
     
     
   }
    
}
