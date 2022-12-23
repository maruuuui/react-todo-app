#!/bin/sh

export REACT_APP_ORIGIN="http://s3.maruuuui.tk/"
export REACT_APP_BACKEND_HOST="https://lambda.maruuuui.tk"
npm run build


aws s3 sync ./build s3://s3.maruuuui.tk
