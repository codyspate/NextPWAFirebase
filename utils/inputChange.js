import checkValidity from "./checkValidity"
import updateObject from './updateObject';

const inputChanged = (ctx) => (event, controlName) => {
  const updatedControls = updateObject(ctx.state.controls, {
    [controlName]: updateObject(ctx.state.controls[controlName], {
      value: event.target.value,
      valid: checkValidity(event.target.value, ctx.state.controls[controlName].validation)[0],
      touched: true,
      errors: {
        message: checkValidity(event.target.value, ctx.state.controls[controlName].validation)[0]
          ? null
          : checkValidity(event.target.value, ctx.state.controls[controlName].validation)[1]
      }
    })
  })

  ctx.setState({ controls: updatedControls })
}

export default inputChanged
