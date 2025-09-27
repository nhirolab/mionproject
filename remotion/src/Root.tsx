import {Composition} from "remotion";
import {MionOpening} from "./MionOpening";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MionOpening"
        component={MionOpening}
        width={1920}
        height={1080}
        durationInFrames={600}
        fps={30}
        defaultProps={{
          title: "Echoes of Dawn",
          subtitle: "透明な歌声で紡ぐ、未来のポップス",
        }}
      />
    </>
  );
};
