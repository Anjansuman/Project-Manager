
interface ProfileCircleProps {
    size?: string,
    img?: string
}

export const ProfileCircle = ({ size, img }: ProfileCircleProps) => {
    return <div className="h-16 w-16 bg-[#653AD847] p-0.5 rounded-full "
        style={{ width: size, height: size }}
    >
        <div className="h-full w-full bg-[#653AD847] rounded-full overflow-hidden">
            <img src={img} alt="" />
        </div>
    </div>
}