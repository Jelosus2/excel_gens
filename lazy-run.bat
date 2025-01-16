@echo off

cd %~dp0
node cook.js --download-content
node cook.js --excels
node cook.js --skilltrees
node cook.js --textmaps-extra
node cook.js --textmaps 
pause