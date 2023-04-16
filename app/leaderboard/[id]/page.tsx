import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import LeaderboardItem from './LeaderboardItem';

async function fetchLeaderboardItems(id: string): Promise<JSX.Element[]> {
  type User = {
    id: number;
    avatarURL: string;
    username: string;
    messages: number;
    xp: number;
    level: number;
  };

  const users: User[] = [];

  const leaderboardItems: JSX.Element[] = [];

  const res = await supabase.from('member').select().eq('server_id', id);

  if (res.error) notFound();
  if (res.data.length < 1) notFound();

  if (!process.env.DISCORD_BOT_TOKEN)
    throw new Error('Discord Bot Token not in ENV file');

  const userPromises = res.data.map(async (v) => {
    const user = await fetch(`https://discord.com/api/users/${v.member_id}`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
      next: {
        revalidate: 30 * 60,
      },
    }).then((v) => v.json());

    return {
      id: v.id,
      avatarURL: `https://cdn.discordapp.com/avatars/${v.member_id}/${user.avatar}.webp`,
      username: user.username,
      messages: v.message,
      xp: v.xp,
      level: v.level,
    };
  });

  const fetchedUsers = await Promise.all(userPromises);

  users.push(...fetchedUsers);

  users.sort((a, b) => {
    if (b.level === a.level) return b.xp - a.xp;
    else if (b.xp === a.xp) return b.messages - a.messages;
    else return b.level - a.level;
  });

  users.forEach((v, i) =>
    leaderboardItems.push(
      <LeaderboardItem
        key={v.id}
        place={i + 1}
        avatarURL={v.avatarURL}
        username={v.username}
        messages={v.messages}
        xp={v.xp}
        level={v.level}
      />
    )
  );

  return leaderboardItems;
}

export default async function LeaderboardPage({ params }: any) {
  const leaderboardItems: JSX.Element[] = await fetchLeaderboardItems(
    params.id
  );

  const discordGuild = await fetch(
    `https://discord.com/api/guilds/${params.id}`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    }
  ).then((v) => v.json());

  if (discordGuild.message === 'Unknown Guild') notFound();

  return (
    <div>
      <div className="flex justify-center items-center my-4">
        {true ? (
          <div
            className="mx-auto h-[12rem] w-[12rem] rounded-3xl border-4 border-solid border-white bg-cover bg-center relative z-20"
            style={{
              backgroundImage: `url(https://cdn.discordapp.com/icons/${discordGuild.id}/${discordGuild.icon}.webp?size=512)`,
            }}></div>
        ) : (
          <div className="rounded-3xl border-4 border-white bg-neutral-900 min-w-[12rem] aspect-square flex justify-center items-center text-6xl">
            <p>{discordGuild.name[0]}</p>
          </div>
        )}
      </div>
      <h1 className="text-3xl text-center my-3 font-bold">
        {discordGuild.name}
      </h1>
      <div className="relative bg-neutral-900 shadow-xs sub_feature_card mb-4 rounded-lg">
        <h3 className="text-h6 text-neutral-100 flex justify-between items-start hover:text-neutral-200 py-4 lg:py-6 px-6">
          Leaderboard
        </h3>
        <div className="p-6 pt-0">
          <div className="grid w-full border-t border-solid border-neutral-700 pt-4"></div>
          <div className="grid grid-cols-1 gap-1.5">
            <div className="grid grid-cols-3 pl-6 pr-4 py-3">
              <div className="col-span-2 flex items-center justify-start">
                <p className="text-sm text-neutral-300 w-9 text-center mr-6">
                  #
                </p>
                <p className="text-sm text-neutral-300">User</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <p className="text-sm text-neutral-300 text-center hidden lg:block">
                  Messages
                </p>
                <p className="text-sm text-neutral-300 text-center hidden lg:block">
                  XP
                </p>
                <p className="text-sm text-neutral-300 text-center">Level</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1.5">{leaderboardItems}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
