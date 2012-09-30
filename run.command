#!/bin/bash
BASEDIR="`dirname "$0"`"
echo $BASEDIR
open -a Google\ Chrome --args --disable-web-security --app "$BASEDIR/examples/3d-printing/index.html"
