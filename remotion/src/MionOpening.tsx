import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, spring} from "remotion";
import type {FC} from "react";

type MionOpeningProps = {
  title: string;
  subtitle: string;
};

const AccentRings: FC<{frame: number; fps: number}> = ({frame, fps}) => {
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });

  const opacity = interpolate(frame, [0, 120], [0, 0.25], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        width: 800,
        height: 800,
        borderRadius: "50%",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        transform: `scale(${1 + scale * 0.05})`,
        opacity,
        top: "50%",
        left: "50%",
        marginLeft: -400,
        marginTop: -400,
        filter: "blur(0.5px)",
      }}
    />
  );
};

const Waveform: FC<{frame: number; fps: number}> = ({frame, fps}) => {
  const waveOffset = interpolate(frame, [0, fps * 4], [0, Math.PI * 4]);
  const bars = new Array(60).fill(null);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 160,
        width: "70%",
        left: "15%",
        display: "flex",
        justifyContent: "space-between",
        opacity: interpolate(frame, [40, 80], [0, 0.8], {extrapolateRight: "clamp"}),
      }}
    >
      {bars.map((_, index) => {
        const x = index / bars.length;
        const height = 60 + Math.sin(waveOffset + x * Math.PI * 2) * 40;
        return (
          <div
            key={index}
            style={{
              width: "1.5%",
              minWidth: 6,
              borderRadius: 8,
              height,
              background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(168,219,255,0.4))",
              boxShadow: "0 6px 16px rgba(50, 140, 240, 0.25)",
            }}
          />
        );
      })}
    </div>
  );
};

export const MionOpening: FC<MionOpeningProps> = ({title, subtitle}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const heroOpacity = spring({frame, fps, delay: 10, config: {damping: 200}});
  const subtitleY = interpolate(frame, [35, 80], [60, 0], {extrapolateRight: "clamp"});
  const glow = interpolate(frame, [0, 150], [0.35, 0.6], {extrapolateRight: "clamp"});

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at top, #1f7acb 0%, #0b1024 55%, #02030a 100%)",
        color: "white",
        fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif",
      }}
    >
      <AbsoluteFill
        style={{
          background: "linear-gradient(135deg, rgba(140,196,255,0.22) 0%, rgba(19,36,77,0.65) 60%, rgba(2,5,15,0.95) 100%)",
          mixBlendMode: "screen",
        }}
      />

      <AccentRings frame={frame} fps={fps} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 120px",
          filter: `drop-shadow(0 0 120px rgba(82, 186, 255, ${glow}))`,
        }}
      >
        <Img
          src={staticFile("assets/mion-icon.svg")}
          style={{
            width: 220,
            height: 220,
            marginBottom: 60,
            opacity: interpolate(frame, [0, 25], [0, 1], {extrapolateRight: "clamp"}),
          }}
        />
        <h1
          style={{
            fontSize: 110,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            margin: 0,
            opacity: heroOpacity,
          }}
        >
          MION
        </h1>
        <p
          style={{
            marginTop: 24,
            fontSize: 42,
            letterSpacing: "0.08em",
            opacity: heroOpacity,
          }}
        >
          {title}
        </p>
        <p
          style={{
            marginTop: 28,
            fontSize: 32,
            fontWeight: 300,
            opacity: interpolate(frame, [40, 85], [0, 1], {extrapolateRight: "clamp"}),
            transform: `translateY(${subtitleY}px)`
          }}
        >
          {subtitle}
        </p>
      </AbsoluteFill>

      <Waveform frame={frame} fps={fps} />

      <div
        style={{
          position: "absolute",
          bottom: 72,
          width: "100%",
          textAlign: "center",
          fontSize: 26,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          opacity: interpolate(frame, [80, 140], [0, 0.75], {extrapolateRight: "clamp"}),
        }}
      >
        Suno Collaboration 2024
      </div>
    </AbsoluteFill>
  );
};
