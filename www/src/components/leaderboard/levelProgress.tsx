export function LevelProgress({ level, xp }: { level: number; xp: number }) {
  const xpNeededForNextLevel = (level: number, xp: number) => {
    return Math.ceil(
      5 * (level + 1) * (level + 1) + 50 * (level + 1) + 100 - xp
    );
  };

  const maxXP = xpNeededForNextLevel(level, xp);
  const progess = 360 * (xp / maxXP);

  if (progess <= 180) {
    return (
      <div className="leaderboardPlayerStat p30 relative flex h-[40px] min-h-[40px] w-[40px] min-w-[40px] flex-col justify-center rounded-full p-px lg:items-center">
        <div className="absolute h-full w-full rounded-full border-2 border-solid border-neutral-900"></div>
        <div
          className="absolute left-0 top-0 h-[40px] min-h-[40px] w-[40px] min-w-[40px]"
          style={{ clip: 'rect(0px, 40px, 40px, 20px)' }}>
          <div
            className="absolute left-0 top-0 h-[40px] min-h-[40px] w-[40px] min-w-[40px] rounded-full border-2 border-solid border-orange-400"
            style={{
              clip: 'rect(0px, 20px, 40px, 0px)',
              transform: `rotate(${progess}deg)`,
            }}></div>
        </div>
        <div className="-mt-px flex flex-col items-center justify-center">
          <div className="text-base font-bold text-base-content">{level}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="leaderboardPlayerStat p82 relative flex h-[40px] min-h-[40px] w-[40px] min-w-[40px] flex-col justify-center rounded-full p-px lg:items-center">
        <div className="absolute h-full w-full rounded-full border-2 border-solid border-neutral-900"></div>
        <div
          className="absolute left-0 top-0 h-[40px] min-h-[40px] w-[40px] min-w-[40px]"
          style={{ clip: 'rect(auto, auto, auto, auto)' }}>
          <div
            className="absolute left-0 top-0 h-[40px] min-h-[40px] w-[40px] min-w-[40px] rounded-full border-2 border-solid border-green-400"
            style={{
              clip: 'rect(0px, 20px, 40px, 0px)',
              transform: `rotate(${progess}deg)`,
            }}></div>
          <div
            className="absolute left-0 top-0 h-[40px] min-h-[40px] w-[40px] min-w-[40px] rounded-full border-2 border-solid border-green-400"
            style={{
              clip: 'rect(0px, 20px, 40px, 0px)',
              transform: 'rotate(180deg)',
            }}></div>
        </div>
        <div className="-mt-px flex flex-col items-center justify-center">
          <div className="text-base font-bold text-base-content">{level}</div>
        </div>
      </div>
    );
  }
}
