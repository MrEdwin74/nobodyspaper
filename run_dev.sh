#!/bin/bash

# Funksjon for å drepe bakgrunnsprosesser når scriptet avsluttes
cleanup() {
    echo "Stopper servere..."
    kill $(jobs -p) 2>/dev/null
    exit
}

# Sett opp trap for SIGINT (Ctrl+C)
trap cleanup SIGINT

echo "Starter Nobodyspaper utviklingsmiljø..."

# Start Backend
echo "Starter Django backend..."
source .venv/bin/activate
python backend/manage.py runserver 0.0.0.0:8000 &
BACKEND_PID=$!

# Vent litt for å la backend starte
sleep 3

# Start Frontend
echo "Starter React frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!

# Vent på at prosessene skal kjøre (holder scriptet i gang)
wait $BACKEND_PID $FRONTEND_PID
