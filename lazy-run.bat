@echo off

cd %~dp0
node cook.js --excels
node cook.js --textmaps-extra
node cook.js --textmaps 
pause