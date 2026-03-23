import { AbsoluteFill, interpolate, useCurrentFrame, Sequence, Video, staticFile } from 'remotion';

export const Main: React.FC = () => {
    const frame = useCurrentFrame();

    // Durations based on 30 fps
    // Intro: ~23.16s -> 695 frames
    // Main: ~3124.59s -> 93738 frames
    // Outro: ~10.09s -> 303 frames

    const INTRO_DUR = 695;
    const VIDEO_DUR = 93738;
    const OUTRO_DUR = 303;

    // Crossfade duration in frames
    const FADE_DUR = 30;

    // Video Opacity: fade in as intro ends, fade out as outro begins
    const videoOpacity = interpolate(
        frame,
        [INTRO_DUR - FADE_DUR, INTRO_DUR, INTRO_DUR + VIDEO_DUR - FADE_DUR, INTRO_DUR + VIDEO_DUR],
        [0, 1, 1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Outro Opacity: fade in as video ends
    const outroOpacity = interpolate(
        frame,
        [INTRO_DUR + VIDEO_DUR - FADE_DUR, INTRO_DUR + VIDEO_DUR],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            {/* Intro Sequence */}
            <Sequence from={0} durationInFrames={INTRO_DUR}>
                <AbsoluteFill>
                    <Video src={staticFile('Restorative_Intro.mp4')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </AbsoluteFill>
            </Sequence>

            {/* Main Video Sequence */}
            <Sequence from={INTRO_DUR - FADE_DUR} durationInFrames={VIDEO_DUR + FADE_DUR}>
                <AbsoluteFill style={{ opacity: videoOpacity }}>
                    <Video src={staticFile('APeacefulRestorativeMorning.mp4')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </AbsoluteFill>
            </Sequence>

            {/* Outro Sequence */}
            <Sequence from={INTRO_DUR + VIDEO_DUR - FADE_DUR} durationInFrames={OUTRO_DUR + FADE_DUR}>
                <AbsoluteFill style={{ opacity: outroOpacity }}>
                    <Video src={staticFile('Rising_Moon_Outro.mp4')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </AbsoluteFill>
            </Sequence>
        </AbsoluteFill>
    );
};
