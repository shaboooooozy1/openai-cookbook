// mirror_server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
// The CRA dev server answers on both localhost and 127.0.0.1, so allow both
// by default; MIRROR_ALLOWED_ORIGIN accepts a comma-separated list.
const allowedOrigins = (
  process.env.MIRROR_ALLOWED_ORIGIN || 'http://localhost:3000,http://127.0.0.1:3000'
)
  .split(',')
  .map((s) => s.trim());
const io = new Server(server, {
  cors: { origin: allowedOrigins }
});

io.on('connection', (socket) => {
  console.log('Client connected', socket.id);

  socket.on('mirrorAudio:fr', (audioChunk) => {
    socket.broadcast.emit('audioFrame:fr', audioChunk);
  });

  socket.on('mirrorAudio:es', (audioChunk) => {
    socket.broadcast.emit('audioFrame:es', audioChunk);
  });

  socket.on('mirrorAudio:tl', (audioChunk) => {
    socket.broadcast.emit('audioFrame:tl', audioChunk);
  });

  socket.on('mirrorAudio:en', (audioChunk) => {
    socket.broadcast.emit('audioFrame:en', audioChunk);
  });

  socket.on('mirrorAudio:zh', (audioChunk) => {
    socket.broadcast.emit('audioFrame:zh', audioChunk);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

server.listen(3001, process.env.MIRROR_HOST || '127.0.0.1', () => {
  console.log('Socket.IO mirror server running on port 3001');
});