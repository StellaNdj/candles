const Button = ({text, type, onClick}) => {
  return (
    <button
      className="main-btn p-2 my-4"
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  )
}

export default Button;
