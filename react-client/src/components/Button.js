const Button = (props) => {
  return (
    <div>
      <button className='btn' onClick={props.onClick}>{props.btnName}</button>
    </div>
  )
}

Button.defaultProps = {
  btnName: 'Button',
}

export default Button
