import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: ['http://localhost:5173'],
});

export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
}


// use to store online store
const userSocketMap = {};


io.on('connection', (socket) => { 
  console.log('a user connected',socket.id);

  const userId = socket.handshake.query.userId;
  if(userId) userSocketMap[userId] = socket.id;

  io.emit('getOnlineUsers',Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('user disconnected',socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers',Object.keys(userSocketMap));
  });
});

export {io,app, server};