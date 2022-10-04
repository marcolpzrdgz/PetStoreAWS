#!/bin/bash

#download node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16
sudo yum install mariadb-server mariadb-libs mariadb -y


#create our working directory if it doesnt exist
DIR="/home/ec2-user/nodejs-express"
if [ -d "$DIR" ]; then
    echo "${DIR} exists"
else 
    echo "Creating ${DIR} directory"
    mkdir ${DIR}
fi

DIR2="/home/ec2-user/"
line2=$(grep -o '[^ ]*masterdb[^ ]*' /home/ec2-user/nodejs-express/db.config.js | awk '{print substr($0, 2, length($0) - 3)}')

mysql -h ${line2} -P 3306 -u dbuser -ppet123456! petDb < ${DIR}/petstore.sql



sudo chmod -R 777 /home/ec2-user/nodejs-express
#navifate into our worling directory where we have all our github files
cd /home/ec2-user/nodejs-express

#add npm and node to path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # loads nvm bash_copletion (node is in)

#install node modules
npm install
npm install -g pm2
pm2 start npm --name "myApp"
#start our node app in the background
node app.js > app.out.log 2> app.err.log < /dev/null &



