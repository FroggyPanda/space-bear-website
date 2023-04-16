import Image from 'next/image';

type Props = {
  place: number;
  avatarURL: string;
  username: string;
  messages: number;
  xp: number;
  level: number;
};

export default function LeaderboardItem(props: Props) {
  return (
    <div className="block">
      <div className="rounded-lg py-3 pl-6 pr-4 w-full grid grid-cols-3 bg-neutral-800">
        <div className="flex items-center justify-start col-span-2">
          <p className="min-w-[2rem] w-8 h-8 rounded-full flex items-center justify-center mr-6 font-bold text-dark-100 bg-dark-500 text-base">
            {props.place}
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
            <div className="leaderboardPlayerStat flex flex-col justify-center lg:items-center rounded-full p-px w-[40px] h-[40px] min-w-[40px] min-h-[40px] relative p72">
              <div className="flex flex-col items-center justify-center -mt-px">
                <p className="font-bold text-white text-base">{props.level}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
