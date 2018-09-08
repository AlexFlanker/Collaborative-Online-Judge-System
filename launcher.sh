# #! /bin/bash
# redis-server &
# # cd oj-client
# # ng build --watch &
# # cd ..
# python3 executor/executor_server.py &
# cd oj-server
# npm start &

# fuser -k 3000/tcp
# fuser -k 5000/tcp

# service redis_6379 start
redis-server &
cd oj-server
# //npm install
npm start &
# cd ../oj-client
# //npm install
# ng build --watch &
cd ../executor
# pip install -r requirements.txt
python3 executor_server.py &

echo“====================================”
read -p "PRESS [ENTER] TO TERMINATE PROCESSES" PRESSKEY

fuser -k 3000/tcp
fuser -k 5000/tcp
brew services stop redis