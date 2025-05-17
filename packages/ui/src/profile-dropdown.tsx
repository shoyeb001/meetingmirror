type TMenu = {
    name: string;
    path: string;
    icon: React.ReactNode;
}

export const ProfileDropdown = ({ photo, name, menu }: { photo?: string, name: string, menu: TMenu[] }) => {
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost flex items-center gap-2">
                <div className="avatar placeholder">
                    <div className="w-12 rounded-full">
                        <img src={photo || "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"} alt={name} className="w-full rounded-full" />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold">{name}</span>
                    <span className="text-xs text-base-content/50">Admin</span>
                </div>
            </div>

            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-35">
                {
                    menu?.map((item, index) => {
                        return (
                            <li key={index}><a>{item.name}</a></li>
                        )
                    })
                }
            </ul>
        </div >
    )
}