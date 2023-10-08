export function SideBar({
  guildRoles,
}: {
  guildRoles: { name: string; color: string; level: number }[];
}) {
  return (
    <div>
      <div className="mb-4 rounded-lg bg-base-300">
        <h3 className="text-h6 px-6 py-4 lg:py-6">How it works</h3>
        <div className="p-6 pt-0 text-base-content">
          <hr className="border-neutral py-1" />
          <p>
            Every two minutes that you&apos;re messaging, you randomly gain
            between 15 and 20 XP.
          </p>
          <p className="mt-4">
            To avoid spamming, the server can select which channels you can earn
            XP from.
          </p>
        </div>
      </div>
      <div className="mb-4 rounded-lg bg-base-300">
        <h3 className="text-h6 px-6 py-4 lg:py-6">Role Rewards</h3>
        <div className="p-6 pt-0 text-sm text-base-content">
          <hr className="border-neutral py-1" />
          {guildRoles.map((role, i) => (
            <div key={i} className="mb-3 font-normal">
              <p className="mb-1 text-xs text-neutral-500">
                LEVEL {role.level}
              </p>
              <div className="flex max-w-max flex-wrap items-center justify-start gap-2 rounded-full bg-neutral-600 py-[0.05rem] pl-1 pr-2 text-white">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: role.color }}></div>
                @{role.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
