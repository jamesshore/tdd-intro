@echo off

call build/scripts/prebuild.cmd

:loop
node build/scripts/watch.js %*
if not %errorlevel%==0 goto :end
echo Restarting...
goto :loop

:end