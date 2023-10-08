import Image from 'next/image';
import FirstMedal from '@/../public/t-medal-1.svg';
import SecondMedal from '@/../public/t-medal-2.svg';
import ThirdMedal from '@/../public/t-medal-3.svg';
import { LevelProgress } from './levelProgress';

export function LeaderboardItem(props: {
  place: number;
  avatarUrl: string;
  username: string;
  messageCount: number;
  patCount: number;
  xp: number;
  level: number;
}) {
  return (
    <div className="block">
      <div className="grid w-full grid-cols-3 rounded-lg bg-base-100 py-3 pl-6 pr-4">
        <div className="col-span-2 flex items-center justify-start">
          <p className="bg-dark-500 mr-6 flex h-8 w-8 min-w-[2rem] items-center justify-center rounded-full text-base font-bold text-base-content">
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
            className="aspect-square w-9 rounded-full"
            src={props.avatarUrl}
            alt={`${props.username}'s avatar`}
            width={512}
            height={512}
          />
          <p className="ml-3 font-semibold text-neutral-100">
            {props.username}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <p className="hidden items-center justify-center text-base-content lg:flex">
            {props.patCount}
          </p>
          <p className="hidden items-center justify-center text-base-content lg:flex">
            {props.messageCount}
          </p>
          <div className="flex items-center justify-center">
            <LevelProgress level={props.level} xp={props.xp} />
          </div>
        </div>
      </div>
    </div>
  );
}
