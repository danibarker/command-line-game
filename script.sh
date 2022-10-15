#!/bin/bash
echo "Press the Left Joystick Button (q) to Start the Game"
while true; do
  read -rsn1 input
  if [ "$input" = "w" ]; then
    curl -s http://localhost:8080/forward
  elif [ "$input" = "s" ]; then
    curl -s http://localhost:8080/backward
  elif [ "$input" = "a" ]; then
    curl -s http://localhost:8080/left
  elif [ "$input" = "d" ]; then
    curl -s http://localhost:8080/right
  elif [ "$input" = "h" ]; then
    curl -s http://localhost:8080/x
  elif [ "$input" = "g" ]; then
    curl -s http://localhost:8080/y
  elif [ "$input" = "k" ]; then
    curl -s http://localhost:8080/b
  elif [ "$input" = "l" ]; then
    curl -s http://localhost:8080/a
  elif [ "$input" = "p" ]; then
    curl -s http://localhost:8080/rb
  elif [ "$input" = "o" ]; then
    curl -s http://localhost:8080/lb
  elif [ "$input" = "r" ]; then
    curl -s http://localhost:8080/start
  elif [ "$input" = "x" ]; then
    curl -s http://localhost:8080/select
  elif [ "$input" = "z" ]; then
    curl -s http://localhost:8080/rj
  elif [ "$input" = "q" ]; then
    curl -s http://localhost:8080/

  fi
  printf "\n"
done
