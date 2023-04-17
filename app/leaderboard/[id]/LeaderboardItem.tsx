import Image from 'next/image';
import FirstMedal from '@/public/t-medal-1.svg';
import SecondMedal from '@/public/t-medal-2.svg';
import ThirdMedal from '@/public/t-medal-3.svg';

type Props = {
  place: number;
  avatarURL: string;
  username: string;
  messages: number;
  xp: number;
  level: number;
};

function LevelProgress(level: number, xp: number): JSX.Element {
  const xpNeededForNextLevel = (level: number, xp: number) => {
    return Math.ceil(
      5 * (level + 1) * (level + 1) + 50 * (level + 1) + 100 - xp
    );
  };

  const maxXP = xpNeededForNextLevel(level, xp);
  const progess = 360 * (xp / maxXP);

  if (progess <= 180) {
    return (
      <div className="leaderboardPlayerStat flex flex-col justify-center lg:items-center rounded-full p-px w-[40px] h-[40px] min-w-[40px] min-h-[40px] relative p30">
        <div className="h-full w-full border-2 border-solid border-neutral-900 absolute rounded-full"></div>
        <div
          className="absolute w-[40px] h-[40px] min-w-[40px] min-h-[40px] top-0 left-0"
          style={{ clip: 'rect(0px, 40px, 40px, 20px)' }}>
          <div
            className="absolute border-2 border-solid w-[40px] h-[40px] min-w-[40px] min-h-[40px] top-0 left-0 rounded-full border-orange-400"
            style={{
              clip: 'rect(0px, 20px, 40px, 0px)',
              transform: `rotate(${progess}deg)`,
            }}></div>
        </div>
        <div className="flex flex-col items-center justify-center -mt-px">
          <div className="font-bold text-white text-base">{level}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="leaderboardPlayerStat flex flex-col justify-center lg:items-center rounded-full p-px w-[40px] h-[40px] min-w-[40px] min-h-[40px] relative p82">
        <div className="h-full w-full border-2 border-solid border-neutral-900 absolute rounded-full"></div>
        <div
          className="absolute w-[40px] h-[40px] min-w-[40px] min-h-[40px] top-0 left-0"
          style={{ clip: 'rect(auto, auto, auto, auto)' }}>
          <div
            className="absolute border-2 border-solid w-[40px] h-[40px] min-w-[40px] min-h-[40px] top-0 left-0 rounded-full border-green-400"
            style={{
              clip: 'rect(0px, 20px, 40px, 0px)',
              transform: `rotate(${progess}deg)`,
            }}></div>
          <div
            className="absolute border-2 border-solid w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-full top-0 left-0 border-green-400"
            style={{
              clip: 'rect(0px, 20px, 40px, 0px)',
              transform: 'rotate(180deg)',
            }}></div>
        </div>
        <div className="flex flex-col items-center justify-center -mt-px">
          <div className="font-bold text-white text-base">{level}</div>
        </div>
      </div>
    );
  }
}

export default function LeaderboardItem(props: Props) {
  return (
    <div className="block">
      <div className="rounded-lg py-3 pl-6 pr-4 w-full grid grid-cols-3 bg-neutral-800">
        <div className="flex items-center justify-start col-span-2">
          <p className="min-w-[2rem] w-8 h-8 rounded-full flex items-center justify-center mr-6 font-bold text-dark-100 bg-dark-500 text-base">
            {props.place === 1 ? (
              <Image src={FirstMedal} alt="First Place" />
            ) : props.place === 2 ? (
              <Image src={SecondMedal} alt="Second Place" />
            ) : props.place === 3 ? (
              <Image src={ThirdMedal} alt="Third Place" />
            ) : (
              props.place
            )}
          </p>
          <Image
            className="w-9 aspect-square rounded-full"
            src={props.avatarURL}
            alt={`${props.username}'s avatar`}
            width={512}
            height={512}
          />
          <p className="ml-3 font-semibold text-neutral-100">
            {props.username}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <p className="text-neutral-300 hidden lg:flex items-center justify-center">
            {props.messages}
          </p>
          <p className="text-neutral-300 hidden lg:flex items-center justify-center">
            {props.xp}
          </p>
          <div className="flex items-center justify-center">
            {LevelProgress(props.level, props.xp)}
          </div>
        </div>
      </div>
    </div>
  );
}
