@echo off

call build/scripts/prebuild.cmd
node build/scripts/run_build.js clean
