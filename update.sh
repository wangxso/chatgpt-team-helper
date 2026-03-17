#!/bin/bash
set -e

echo "=================================================="
echo "       chatgpt-team-helper 一键更新脚本"
echo "=================================================="
echo ""

# 检查当前目录是否有 Dockerfile 和 docker-compose.yml
if [ ! -f "Dockerfile" ] || [ ! -f "docker-compose.yml" ]; then
    echo "错误：当前目录缺少 Dockerfile 或 docker-compose.yml"
    echo "请确保你在项目根目录执行此脚本"
    exit 1
fi

echo "[1/5] 停止并删除旧容器..."
docker compose down
echo "✓ 已停止"
echo ""

echo "[2/5] 清理旧镜像..."
docker image prune -f
echo "✓ 清理完成"
echo ""

echo "[3/5] 重新构建镜像（这可能需要几分钟，请耐心等待）..."
docker compose build --no-cache
echo "✓ 构建完成"
echo ""

echo "[4/5] 启动新容器..."
docker compose up -d
echo "✓ 容器已启动"
echo ""

echo "[5/5] 检查容器状态..."
sleep 3
docker compose ps
echo ""

echo "=================================================="
echo "                更新完成！"
echo "=================================================="
echo ""
echo "容器状态："
docker compose ps | grep auto-gpt-team
echo ""
echo "查看实时日志：docker compose logs -f"
echo "访问地址：http://localhost:5173"
echo ""
