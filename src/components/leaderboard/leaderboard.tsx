import { LeaderboardItem } from './leaderboardItem';

export function Leaderboard({
  members,
}: {
  members: {
    id: number;
    avatarUrl: string;
    username: string;
    messageCount: number;
    patCount: number;
    xp: number;
    level: number;
  }[];
}) {
  return (
    <div className="shadow-xs relative mb-4 rounded-lg bg-base-300 lg:col-span-2">
      <h3 className="flex items-start justify-between px-6 py-4 text-xl text-white lg:py-6">
        Leaderboard
      </h3>
      <div className="p-6 pt-0">
        <hr className="border-neutral py-1" />
        <div className="grid grid-cols-1 gap-1.5">
          <div className="grid grid-cols-3 py-3 pl-6 pr-4">
            <div className="col-span-2 flex items-center justify-start">
              <p className="mr-6 w-9 text-center text-sm text-base-content">
                #
              </p>
              <p className="text-sm text-base-content">User</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <p className="hidden text-center text-sm text-base-content lg:block">
                Pats
              </p>
              <p className="hidden text-center text-sm text-base-content lg:block">
                Messages
              </p>
              <p className="text-center text-sm text-base-content">Level</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {members.map((member, i) => (
              <LeaderboardItem
                key={i}
                place={i + 1}
                avatarUrl={member.avatarUrl}
                username={member.username}
                patCount={member.patCount}
                messageCount={member.messageCount}
                xp={member.xp}
                level={member.level}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
