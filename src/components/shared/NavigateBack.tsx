import { useNavigate } from 'react-router-dom'
import CustomButton from '../buttons/CustomButton'
import { IoIosArrowBack } from 'react-icons/io'
interface INavigateBack {
  text : string
}
function NavigateBack({text}:INavigateBack) {
  const navigate = useNavigate()
  return (
    <CustomButton onClick={()=>navigate(-1)}
      className="c8 p-6 gap-3 |  flex items-center | bg-slate-50" 
      direction="left" text={text}  >
      <IoIosArrowBack className='c6' />
    </CustomButton>
  )
}

export default NavigateBack