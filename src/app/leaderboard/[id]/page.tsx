import { Leaderboard } from '@/components/leaderboard/leaderboard';
import { SideBar } from '@/components/leaderboard/sideBar';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

type User = {
  id: number;
  avatarUrl: string;
  username: string;
  messageCount: number;
  patCount: number;
  xp: number;
  level: number;
};

export default async function Page({ params }: { params: { id: string } }) {
  const supaResGuild = await supabase
    .from('guild')
    .select()
    .eq('guild_id', params.id);

  const supaResMember = await supabase
    .from('member')
    .select()
    .eq('guild_id', params.id)
    .gte('message', 1);

  if (supaResGuild.error || supaResMember.error) notFound();

  const discordGuild = await fetch(
    `https://discord.com/api/guilds/${params.id}`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    }
  );

  if (!discordGuild.ok) notFound();

  const discordGuildJson = await discordGuild.json();

  if (discordGuildJson.message === 'Unknown Guild') notFound();

  const guildRoles: { name: string; color: string; level: number }[] = [];

  for (const role of discordGuildJson.roles) {
    const currId = role.id;
    const matchingRole = supaResGuild.data[0].level_ranks.find(
      (e) => e.role_id === currId
    );

    if (matchingRole) {
      guildRoles.push({
        name: role.name,
        color: `#${role.color.toString(16)}`,
        level: matchingRole.level,
      });
    }
  }

  guildRoles.sort((a, b) => b.level - a.level);

  const memebers: User[] = [];

  const memberPromises = supaResMember.data.map(async (v): Promise<User> => {
    const user = await fetch(`https://discord.com/api/users/${v.member_id}`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    }).then((v) => v.json());

    return {
      id: v.id,
      avatarUrl: user.avatar.startsWith('a_')
        ? `https://cdn.discordapp.com/avatars/${v.member_id}/${user.avatar}.gif?size=60`
        : `https://cdn.discordapp.com/avatars/${v.member_id}/${user.avatar}.webp?size=60`,
      username: user.username,
      messageCount: v.message,
      patCount: v.pat,
      xp: v.xp,
      level: v.level,
    };
  });

  const fetchedMembers = await Promise.all(memberPromises);

  memebers.push(...fetchedMembers);

  memebers.sort((a, b) => {
    if (b.level === a.level) return b.messageCount - a.messageCount;
    else return b.level - a.level;
  });

  return (
    <div>
      <div className="my-4 flex items-center justify-center">
        {discordGuildJson.icon ? (
          <div
            className="relative z-20 mx-auto h-[12rem] w-[12rem] rounded-3xl border-4 border-solid border-white bg-cover bg-center"
            style={{
              backgroundImage: `url(https://cdn.discordapp.com/icons/${discordGuildJson.id}/${discordGuildJson.icon}.webp?size=512)`,
            }}></div>
        ) : (
          <div className="flex aspect-square min-w-[12rem] items-center justify-center rounded-3xl border-4 border-white bg-base-300 text-6xl">
            <p>{discordGuildJson.name[0]}</p>
          </div>
        )}
      </div>
      <h1 className="my-3 text-center text-3xl font-bold">
        {discordGuildJson.name}
      </h1>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-10">
        <Leaderboard members={memebers} />
        <SideBar guildRoles={guildRoles} />
      </div>
    </div>
  );
}
