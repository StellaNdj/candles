const Button = ({text, onClick}) => {
  return (
    <button
      className="main-btn p-2 my-4"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button;
