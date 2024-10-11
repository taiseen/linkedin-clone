import { Camera } from "lucide-react"


const BannerImg = ({ editedData, userData, isEditing, handleImageChange }) => {

    return (
        <div
            className='relative h-48 rounded-t-lg bg-cover bg-center'
            style={{
                backgroundImage: `url('${editedData.bannerImg || userData.bannerImg || "/banner.png"}')`,
            }}
        >
            {
                isEditing && (
                    <label className='absolute top-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer'>
                        <Camera size={20} />

                        <input
                            type='file'
                            accept='image/*'
                            name='bannerImg'
                            className='hidden'
                            onChange={handleImageChange}
                        />
                    </label>
                )
            }
        </div>
    )
}

export default BannerImg