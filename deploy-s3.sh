#!/bin/sh

export REACT_APP_ORIGIN="http://todoapp-hosting-storage.s3-website-ap-northeast-1.amazonaws.com"
export REACT_APP_BACKEND_HOST="https://muhdmtrs4f.execute-api.ap-northeast-1.amazonaws.com/Prod"
npm run build


aws s3 sync ./build s3://todoapp-hosting-storage
