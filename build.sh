#!/usr/bin/env sh

BASE_DIR="/home/runner/work/kiranparajuli589/kiranparajuli589"
DIST_BRANCH="dist"

echo "Building Started...."
pnpm build

echo "Building Completed."
echo "Deploying Started...."
mkdir -p "${BASE_DIR}""/temp"
mv docs "${BASE_DIR}""/temp"

git fetch origin ${DIST_BRANCH}
git checkout ${DIST_BRANCH}

rm -rf docs
mv "${BASE_DIR}"/temp/docs .

if [ -n "$(git status --porcelain)" ]; then
  echo "kiranparajuli.com.np" > docs/CNAME
  git add .
  git -c user.name="Github Bot" -c user.email="kiranparajuli589@gmail.com" commit -m "Update the build code"
  git push origin ${DIST_BRANCH}
fi

rm -rf "${BASE_DIR}""/temp"
echo "Deploying Completed"
