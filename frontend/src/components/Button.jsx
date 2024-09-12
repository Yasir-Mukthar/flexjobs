
const Button = ({onClickHandler, value,title}) => {
  return (
    <div>
        <button
            className="  text-black border text-base hover:bg-blue hover:text-white py-1 px-4 "
            onClick={onClickHandler}
            value={value}
        >
            {title}
        </button>
    </div>
  )
}

export default Button