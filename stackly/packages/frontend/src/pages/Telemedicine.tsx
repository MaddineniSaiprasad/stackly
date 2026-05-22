import { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Paper, Grid, TextField } from '@mui/material';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const socket = io('http://localhost:5000');

export default function Telemedicine() {
  const [roomId, setRoomId] = useState('demo-room');
  const [joined, setJoined] = useState(false);
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance>();

  const joinRoom = () => {
    setJoined(true);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (myVideo.current) myVideo.current.srcObject = stream;

      socket.emit('join-room', roomId);

      socket.on('user-connected', (userId) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });
        peer.on('signal', (data) => socket.emit('offer', { offer: data, roomId }));
        peer.on('stream', (userStream) => {
          if (userVideo.current) userVideo.current.srcObject = userStream;
        });
        socket.on('answer', ({ answer }) => peer.signal(answer));
        connectionRef.current = peer;
      });

      socket.on('offer', ({ offer }) => {
        const peer = new Peer({ initiator: false, trickle: false, stream });
        peer.on('signal', (data) => socket.emit('answer', { answer: data, roomId }));
        peer.on('stream', (userStream) => {
          if (userVideo.current) userVideo.current.srcObject = userStream;
        });
        peer.signal(offer);
        connectionRef.current = peer;
      });
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Telemedicine Consultation</Typography>
      {!joined ? (
        <Paper sx={{ p: 3, maxWidth: 400 }}>
          <TextField fullWidth label="Room ID" value={roomId} onChange={e => setRoomId(e.target.value)} sx={{ mb: 2 }} />
          <Button variant="contained" onClick={joinRoom}>Join Consultation</Button>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper sx={{ p: 1 }}>
              <Typography>My Camera</Typography>
              <video playsInline muted ref={myVideo} autoPlay style={{ width: '100%' }} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ p: 1 }}>
              <Typography>Doctor/Patient Camera</Typography>
              <video playsInline ref={userVideo} autoPlay style={{ width: '100%' }} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="error" onClick={() => window.location.reload()}>End Call</Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
