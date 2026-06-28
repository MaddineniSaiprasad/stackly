import { useState, useRef } from 'react';
import { Box, Button, Typography, Grid, TextField, Card, Avatar, IconButton, Tooltip } from '@mui/material';
import { VideoCall, Mic, MicOff, Videocam, VideocamOff, CallEnd, LiveTv } from '@mui/icons-material';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const socket = io('http://localhost:5000');

export default function Telemedicine() {
  const [roomId, setRoomId] = useState('demo-room');
  const [joined, setJoined] = useState(false);
  const [micActive, setMicActive] = useState(true);
  const [camActive, setCamActive] = useState(true);
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance>(null!);

  const joinRoom = () => {
    setJoined(true);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (myVideo.current) myVideo.current.srcObject = stream;

      socket.emit('join-room', roomId);

      socket.on('user-connected', () => {
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
    }).catch(err => {
      console.warn('Media devices not fully accessible in this environment. Showing placeholder frames.', err);
    });
  };

  return (
    <Box sx={{ py: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <VideoCall color="primary" sx={{ fontSize: 32 }} />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>Telemedicine Consultation</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>High-fidelity, end-to-end encrypted WebRTC audio/video consults</Typography>
        </Box>
      </Box>

      {!joined ? (
        <Card
          sx={{
            p: 4,
            maxWidth: 440,
            mx: 'auto',
            mt: 4,
            bgcolor: 'rgba(17, 24, 39, 0.4)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
            Join Virtual Clinic Room
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3.5, textAlign: 'center' }}>
            Enter your secure clinical room ID below to establish the peer-to-peer connection.
          </Typography>
          <TextField
            fullWidth
            label="Room ID / Meeting Code"
            variant="outlined"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={joinRoom}
            sx={{
              py: 1.5,
              fontWeight: 700,
              boxShadow: '0 4px 15px rgba(6, 182, 212, 0.25)',
            }}
          >
            Start Virtual Session
          </Button>
        </Card>
      ) : (
        <Box>
          <Grid container spacing={3}>
            {/* My Feed */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  bgcolor: '#030712',
                  aspectRatio: '16/9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    zIndex: 10,
                    bgcolor: 'rgba(7, 10, 19, 0.6)',
                    backdropFilter: 'blur(8px)',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444', animation: 'pulse 1.5s infinite' }} />
                  <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.05em' }}>MY CAMERA (PATIENT)</Typography>
                </Box>

                <video
                  playsInline
                  muted
                  ref={myVideo}
                  autoPlay
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
                />

                {!camActive && (
                  <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(17, 24, 39, 0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', width: 64, height: 64 }}><VideocamOff /></Avatar>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Camera is turned off</Typography>
                  </Box>
                )}
              </Card>
            </Grid>

            {/* Remote Feed */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  bgcolor: '#030712',
                  aspectRatio: '16/9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    zIndex: 10,
                    bgcolor: 'rgba(7, 10, 19, 0.6)',
                    backdropFilter: 'blur(8px)',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981', animation: 'pulse 1.5s infinite' }} />
                  <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.05em', color: '#10b981' }}>DOCTOR (LIVE)</Typography>
                </Box>

                <video
                  playsInline
                  ref={userVideo}
                  autoPlay
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Simulated/Placeholder feed if no client is streaming */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(17, 24, 39, 0.95)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    zIndex: 1,
                  }}
                >
                  <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}>
                    <LiveTv />
                  </Avatar>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>Waiting for provider to connect...</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Share Room ID: "{roomId}" with your provider</Typography>
                </Box>
              </Card>
            </Grid>

            {/* Video Controls Bar */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 2.5,
                  p: 2,
                  bgcolor: 'rgba(17, 24, 39, 0.4)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  maxWidth: 600,
                  mx: 'auto',
                  mt: 1,
                }}
              >
                <Tooltip title={micActive ? 'Mute microphone' : 'Unmute microphone'}>
                  <IconButton
                    onClick={() => setMicActive(!micActive)}
                    aria-label={micActive ? 'Mute microphone' : 'Unmute microphone'}
                    sx={{
                      bgcolor: micActive ? 'rgba(255, 255, 255, 0.05)' : 'rgba(239, 68, 68, 0.15)',
                      color: micActive ? '#fff' : '#ef4444',
                      p: 1.5,
                      border: '1px solid',
                      borderColor: micActive ? 'rgba(255, 255, 255, 0.1)' : 'rgba(239, 68, 68, 0.2)',
                      '&:hover': { bgcolor: micActive ? 'rgba(255, 255, 255, 0.1)' : 'rgba(239, 68, 68, 0.25)' },
                    }}
                  >
                    {micActive ? <Mic /> : <MicOff />}
                  </IconButton>
                </Tooltip>

                <Tooltip title={camActive ? 'Turn off camera' : 'Turn on camera'}>
                  <IconButton
                    onClick={() => setCamActive(!camActive)}
                    aria-label={camActive ? 'Turn off camera' : 'Turn on camera'}
                    sx={{
                      bgcolor: camActive ? 'rgba(255, 255, 255, 0.05)' : 'rgba(239, 68, 68, 0.15)',
                      color: camActive ? '#fff' : '#ef4444',
                      p: 1.5,
                      border: '1px solid',
                      borderColor: camActive ? 'rgba(255, 255, 255, 0.1)' : 'rgba(239, 68, 68, 0.2)',
                      '&:hover': { bgcolor: camActive ? 'rgba(255, 255, 255, 0.1)' : 'rgba(239, 68, 68, 0.25)' },
                    }}
                  >
                    {camActive ? <Videocam /> : <VideocamOff />}
                  </IconButton>
                </Tooltip>

                <Box sx={{ width: '1px', height: 28, bgcolor: 'rgba(255, 255, 255, 0.1)', mx: 1 }} />

                <Button
                  variant="contained"
                  color="error"
                  startIcon={<CallEnd />}
                  onClick={() => window.location.reload()}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    borderRadius: 3,
                    bgcolor: '#ef4444',
                    color: '#fff',
                    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)',
                    '&:hover': { bgcolor: '#dc2626' },
                  }}
                >
                  End Session
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
