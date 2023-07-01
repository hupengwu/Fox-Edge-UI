::删除node_modules
rd node_modules  /s/q

::使用阿里镜像上的源，进行install
call npm install --registry=https://registry.npm.taobao.org

::生成发布版本
call npm run build:prod

::npm view axios versions

pause
