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

  const res = await supabase
    .from('member')
    .select()
    .eq('guild_id', id)
    .gte('message', 1);

  if (res.error) notFound();
  if (res.data.length < 1) notFound();

  if (!process.env.DISCORD_BOT_TOKEN)
    throw new Error('Discord Bot Token not in ENV file');

  const userPromises = res.data.map(async (v) => {
    const user = await fetch(`https://discord.com/api/users/${v.member_id}`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
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

async function fetchLevelRanks(id: string): Promise<JSX.Element[]> {
  const levelRanks: JSX.Element[] = [];
  const res = await supabase.from('guild').select().eq('guild_id', id);

  if (res.error) notFound();
  if (1 > res.data.length || res.data.length < 1) notFound();

  const guild = await fetch(`https://discord.com/api/guilds/${id}`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
  }).then((v) => v.json());

  const levelRoles = [];

  for (let i = 0; i < guild.roles.length; i++) {
    const currID = guild.roles[i].id;
    const matchingElement = res.data[0].level_ranks.find(
      (e) => e.role_id === currID
    );

    if (matchingElement) {
      levelRoles.push({
        name: guild.roles[i].name,
        color: `#${guild.roles[i].color.toString(16)}`,
        level: matchingElement.level,
      });
    }
  }

  levelRoles.sort((a, b) => b.level - a.level);

  for (const role of levelRoles) {
    levelRanks.push(
      <div className="mb-3 font-normal">
        <p className="text-neutral-500 mb-1 text-xs">LEVEL {role.level}</p>
        <div className="flex items-center justify-start gap-2 flex-wrap bg-neutral-600 rounded-full max-w-max pl-1 pr-2 py-[0.05rem] text-white">
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: role.color }}></div>
          @{role.name}
        </div>
      </div>
    );
  }

  return levelRanks;
}

// Caches the page and rechecks it every 30mins
// https://beta.nextjs.org/docs/data-fetching/caching
export const revalidate = 30 * 60;

export default async function LeaderboardPage({ params }: any) {
  const leaderboardItems: JSX.Element[] = await fetchLeaderboardItems(
    params.id
  );

  const levelRanks: JSX.Element[] = await fetchLevelRanks(params.id);

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
        {discordGuild.icon ? (
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-10">
        <div className="relative bg-neutral-900 shadow-xs sub_feature_card mb-4 rounded-lg lg:col-span-2">
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
        <div>
          <div className="bg-neutral-900 rounded-lg mb-4">
            <h3 className="text-h6 py-4 lg:py-6 px-6">How it works</h3>
            <div className="p-6 pt-0 text-neutral-400">
              <div className="w-full border-t border-solid border-neutral-700 pt-4"></div>
              <p>
                Every two minutes that you&apos;re messaging, you randomly gain
                between 15 and 20 XP.
              </p>
              <p className="mt-4">
                To avoid spamming, the server can select which channels you can
                earn XP from.
              </p>
            </div>
          </div>
          <div className="bg-neutral-900 rounded-lg mb-4">
            <h3 className="text-h6 py-4 lg:py-6 px-6">Role Rewards</h3>
            <div className="p-6 pt-0 text-neutral-400 text-sm">
              <div className="w-full border-t border-solid border-neutral-700 pt-4"></div>
              {levelRanks}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
