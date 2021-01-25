const Button = (props) => {
  return (
    <div>
      <button className='btn'>{props.btnName}</button>
    </div>
  )
}

Button.defaultProps = {
  btnName: 'Button',
}

export default Button
