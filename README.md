# exam-helper
考试宝典

## server 打包并制作docker镜像，并上传到远程docker仓库
使用命令: `mvn clean package docker:build docker:push` 或 `mvn clean install docker:build docker:push` </br>
_注意： docker:build 是构建镜像  docker:push 是推送镜像到 docker 仓库_