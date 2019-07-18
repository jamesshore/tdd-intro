@echo off

call build/scripts/prebuild.cmd
node src/cli/run.js %*
